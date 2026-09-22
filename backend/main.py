"""
main.py
--------------------------------------------------------------------------
Optional FastAPI backend for the site.

POST /api/chat     - Answer a chatbot message. Uses a real LLM
                      (Anthropic Claude) when ANTHROPIC_API_KEY is set in
                      the environment; otherwise falls back automatically
                      to the same rule-based matcher the frontend uses
                      locally, so the endpoint always works.
POST /api/contact   - Receive a contact-form submission, store it to a
                      local JSON file. See save_submission() for how to
                      swap this for a real database or email send.
GET  /api/health    - Health check.

Run it:
    pip install -r requirements.txt
    cp .env.example .env          # optional: add ANTHROPIC_API_KEY for real AI
    uvicorn main:app --reload

Docs at http://localhost:8000/docs
--------------------------------------------------------------------------
"""

import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Literal, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

app = FastAPI(
    title="Seyi Qing AI Site API",
    description="Chat + contact-form endpoints for the AI systems landing page.",
    version="1.1.0",
)

# Tighten this to your real frontend domain before going fully live,
# e.g. allow_origins=["https://seyi-qiing.vercel.app"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================================
# /api/chat
# ==========================================================================

class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: List[ChatTurn] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str


# Same intents as frontend/src/utils/chatbotEngine.js — used as the
# fallback whenever no LLM API key is configured, or if the LLM call
# fails for any reason, so the chatbot never goes silent.
INTENTS = [
    ([r"how much.*chatbot", r"chatbot.*cost", r"chatbot.*price"],
     "The Starter AI Bot Package is $250 to set up, then $69/month for "
     "maintenance. It includes a custom-trained website chatbot, lead "
     "capture, and FAQ handling, deployed in 2-4 weeks."),
    ([r"how much.*maintenance", r"monthly.*(cost|fee|price)"],
     "Monthly maintenance is $69 on Starter, $129 on Medium, and $200 on "
     "Pro. It covers hosting, monitoring, and keeping the system trained "
     "on your business - cancellable with 30 days notice."),
    ([r"pric(e|ing)", r"how much.*(cost|charge)", r"rates?\b"],
     "There are three packages: Starter ($250 setup + $69/mo), Medium "
     "($399 setup + $129/mo), and Pro ($699 setup + $200/mo)."),
    ([r"voice agent", r"voice receptionist", r"phone calls?", r"answer.*calls?"],
     "Yes - AI voice agents are part of the Pro package. They can answer "
     "incoming calls, handle routine questions, book appointments by "
     "voice, and route anything important to a real person."),
    ([r"automat", r"workflow", r"crm", r"calendar"],
     "Automation systems connect your website, calendar, CRM and "
     "messaging so leads get captured and followed up without manual "
     "data entry. That's included from the Medium package up."),
    ([r"how long.*(take|project|build)", r"timeline", r"turnaround"],
     "Most projects take 2-4 weeks from kickoff to launch, depending on "
     "scope."),
    ([r"lock.?in", r"contract", r"cancel"],
     "No long-term contract. Monthly maintenance is cancellable with 30 "
     "days notice."),
    ([r"what.*(build|do|offer|services)", r"what.*you.*do"],
     "I build AI chatbots, AI voice agents, automation systems, "
     "\"AI employee\" workflows, lead & appointment automation, and "
     "fully custom AI systems."),
    ([r"contact", r"reach you", r"whatsapp", r"email", r"get started", r"talk to (you|someone)"],
     "Easiest way is WhatsApp or email, both linked in the Contact "
     "section."),
    ([r"hi|hello|hey"],
     "Hey - I can answer questions about services, pricing, chatbots, "
     "voice agents, or automation. What would you like to know?"),
]

FALLBACK_REPLY = (
    "Good question - I don't have a scripted answer for that, but the "
    "fastest way to get a real answer is to reach out directly on "
    "WhatsApp or email in the Contact section."
)

SYSTEM_PROMPT = (
    "You are the website assistant for Seyi Qing, an independent AI "
    "systems builder who helps small and mid-sized businesses automate "
    "repetitive work with chatbots, voice agents, and automation "
    "systems. Answer questions about services, pricing, and timelines "
    "briefly (2-4 sentences), accurately, and in a plain, helpful tone. "
    "Pricing: Starter package is $250 setup + $69/mo (website chatbot, "
    "lead capture, FAQs). Medium is $399 setup + $129/mo (adds "
    "appointment booking and CRM workflow) - this is the most popular "
    "tier. Pro is $699 setup + $200/mo (adds AI voice receptionist and "
    "multi-channel automation). Projects typically take 2-4 weeks. No "
    "long-term contract; monthly maintenance is cancellable with 30 "
    "days notice. If asked something you cannot answer confidently, "
    "direct the person to the Contact section (WhatsApp or email) "
    "rather than guessing."
)


def match_local_intent(message: str) -> str:
    for patterns, reply in INTENTS:
        if any(re.search(pattern, message, re.IGNORECASE) for pattern in patterns):
            return reply
    return FALLBACK_REPLY


def get_llm_reply(message: str, history: List[ChatTurn]) -> Optional[str]:
    """
    Real LLM-backed reply via Anthropic's Claude API. Returns None (so
    the caller falls back to the rule-based matcher) whenever no API key
    is configured or the call fails for any reason - the chatbot should
    never go silent just because of an API hiccup.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return None

    try:
        from anthropic import Anthropic  # imported lazily so the app still
        # starts even if the package isn't installed and no key is set

        client = Anthropic(api_key=api_key)
        messages = [{"role": t.role, "content": t.content} for t in history[-10:]]
        messages.append({"role": "user", "content": message})

        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=messages,
        )
        return response.content[0].text
    except Exception as exc:  # noqa: BLE001 - deliberately broad: any
        # failure here should fall back, not crash the request
        print(f"LLM reply failed, falling back to rule-based reply: {exc}")
        return None


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    reply = get_llm_reply(payload.message, payload.history)
    if reply is None:
        reply = match_local_intent(payload.message)
    return ChatResponse(reply=reply)


# ==========================================================================
# /api/contact
# ==========================================================================

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    status: Literal["received"]


SUBMISSIONS_FILE = Path(__file__).parent / "contact_submissions.json"


def save_submission(entry: dict) -> None:
    """
    Appends to a local JSON file - fine for getting started, but most
    hosts (Railway, Render, etc.) don't guarantee the filesystem persists
    across redeploys. For anything you're relying on, swap this for a
    database insert or an email send (see README for pointers).
    """
    existing = []
    if SUBMISSIONS_FILE.exists():
        existing = json.loads(SUBMISSIONS_FILE.read_text())
    existing.append(entry)
    SUBMISSIONS_FILE.write_text(json.dumps(existing, indent=2))


@app.post("/api/contact", response_model=ContactResponse)
def contact(payload: ContactRequest) -> ContactResponse:
    entry = {
        **payload.model_dump(),
        "received_at": datetime.now(timezone.utc).isoformat(),
    }
    try:
        save_submission(entry)
    except OSError as exc:
        raise HTTPException(status_code=500, detail="Could not save submission") from exc
    return ContactResponse(status="received")


@app.get("/api/health")
def health():
    return {"status": "ok", "llm_configured": bool(os.environ.get("ANTHROPIC_API_KEY"))}
