"""
main.py
--------------------------------------------------------------------------
Optional FastAPI backend for the site.

Two endpoints:

  POST /api/chat     - Answer a chatbot message. Ships with the SAME
                        rule-based logic as the frontend's local engine,
                        as a Python reference implementation, plus a
                        clearly marked spot to plug in a real LLM
                        (OpenAI, Anthropic, etc.) instead.

  POST /api/contact   - Receive a contact-form submission and store it
                        to a local JSON file (contact_submissions.json).
                        Swap the `save_submission` function for a real
                        database or an email send (see comments below)
                        when you're ready.

Run it:
    pip install -r requirements.txt
    uvicorn main:app --reload

Interactive API docs are auto-generated at http://localhost:8000/docs
--------------------------------------------------------------------------
"""

import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(
    title="AI Agency Site API",
    description="Chat + contact-form endpoints for the AI agency landing page.",
    version="1.0.0",
)

# Allow the local Vite dev server (and any origin, by default) to call this
# API. Tighten `allow_origins` to your real domain before deploying.
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


# Same intents as frontend/src/utils/chatbotEngine.js, kept as a Python
# reference implementation so the backend works identically to the local
# frontend fallback. Order matters: the first matching pattern wins.
INTENTS = [
    (
        [r"how much.*chatbot", r"chatbot.*cost", r"chatbot.*price"],
        "The Starter AI Bot Package is $250 to set up, then $69/month for "
        "maintenance. It includes a custom-trained website chatbot, lead "
        "capture, and FAQ handling, deployed in 2-4 weeks.",
    ),
    (
        [r"how much.*maintenance", r"monthly.*(cost|fee|price)"],
        "Monthly maintenance is $69 on Starter, $129 on Medium, and $200 on "
        "Pro. It covers hosting, monitoring, and keeping the system trained "
        "on your business - cancellable with 30 days notice.",
    ),
    (
        [r"pric(e|ing)", r"how much.*(cost|charge)", r"rates?\b"],
        "There are three packages: Starter ($250 setup + $69/mo), Medium "
        "($399 setup + $129/mo), and Pro ($699 setup + $200/mo). Starter is "
        "a website chatbot, Medium adds appointment booking and CRM "
        "workflow, Pro adds a full AI voice receptionist and multi-channel "
        "automation.",
    ),
    (
        [r"voice agent", r"voice receptionist", r"phone calls?", r"answer.*calls?"],
        "Yes - AI voice agents are part of the Pro package. They can answer "
        "incoming calls, handle routine questions, book appointments by "
        "voice, and route anything important to a real person.",
    ),
    (
        [r"automat", r"workflow", r"crm", r"calendar"],
        "Automation systems connect your website, calendar, CRM and "
        "messaging so leads get captured and followed up without manual "
        "data entry. That's included from the Medium package up.",
    ),
    (
        [r"how long.*(take|project|build)", r"timeline", r"turnaround"],
        "Most projects take 2-4 weeks from kickoff to launch, depending on "
        "scope. Starter chatbots are on the faster end; Pro systems with "
        "voice and multi-channel automation take longer.",
    ),
    (
        [r"what.*(build|do|offer|services)", r"what.*you.*do"],
        "I build AI chatbots, AI voice agents, automation systems, "
        "\"AI employee\" workflows, lead & appointment automation, and "
        "fully custom AI systems.",
    ),
    (
        [r"contact", r"reach you", r"whatsapp", r"email", r"get started", r"talk to (you|someone)"],
        "Easiest way is WhatsApp or email, both linked in the Contact "
        "section. Tell me what your business is doing manually today and "
        "I'll tell you if it makes sense as an AI system.",
    ),
    (
        [r"hi|hello|hey"],
        "Hey - I can answer questions about services, pricing, chatbots, "
        "voice agents, or automation. What would you like to know?",
    ),
]

FALLBACK_REPLY = (
    "Good question - I don't have a scripted answer for that, but the "
    "fastest way to get a real answer is to reach out directly on "
    "WhatsApp or email in the Contact section."
)


def match_local_intent(message: str) -> str:
    """Keyword/regex intent matching, mirrors chatbotEngine.js."""
    for patterns, reply in INTENTS:
        if any(re.search(pattern, message, re.IGNORECASE) for pattern in patterns):
            return reply
    return FALLBACK_REPLY


def get_llm_reply(message: str, history: List[ChatTurn]) -> Optional[str]:
    """
    Optional: real LLM-backed reply.

    Left unimplemented on purpose so the project runs with zero API keys.
    To enable it:

        1. `pip install anthropic` (or `openai`)
        2. Set ANTHROPIC_API_KEY (or OPENAI_API_KEY) in your `.env`
        3. Uncomment and adapt the example below

    ---------------------------------------------------------------------
    from anthropic import Anthropic

    client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    def get_llm_reply(message, history):
        system_prompt = (
            "You are the website assistant for an independent AI systems "
            "builder. Answer questions about services, pricing, and "
            "timelines briefly and accurately, in a plain, helpful tone."
        )
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=300,
            system=system_prompt,
            messages=[{"role": t.role, "content": t.content} for t in history]
            + [{"role": "user", "content": message}],
        )
        return response.content[0].text
    ---------------------------------------------------------------------
    """
    return None


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    """Answer a single chatbot turn. Tries the LLM hook first (if wired
    up), falls back to the rule-based matcher otherwise."""
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
    Append a submission to a local JSON file.

    This is intentionally the simplest thing that works, so the endpoint
    is useful with zero setup. For production, swap this out for:
      - a database insert (Postgres/SQLite via SQLAlchemy), or
      - an email send (e.g. via smtplib, SendGrid, or Postmark), or
      - forwarding to a CRM webhook.
    """
    existing = []
    if SUBMISSIONS_FILE.exists():
        existing = json.loads(SUBMISSIONS_FILE.read_text())
    existing.append(entry)
    SUBMISSIONS_FILE.write_text(json.dumps(existing, indent=2))


@app.post("/api/contact", response_model=ContactResponse)
def contact(payload: ContactRequest) -> ContactResponse:
    """Receive a contact-form submission."""
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
    """Simple health check, useful for uptime monitoring."""
    return {"status": "ok"}
