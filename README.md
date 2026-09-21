# AI Systems Agency — Web App

A production-ready clone/template of a one-person AI automation agency site
(services, live chatbot demo, pricing, about, contact). Built so you can
reskin it with your own name, services and pricing in minutes.

## Why this stack

| Layer     | Choice                  | Why |
|-----------|--------------------------|-----|
| Frontend  | React 18 + Vite          | Fast dev server, no build config headaches, ships as static files you can host anywhere (Vercel, Netlify, S3, GitHub Pages). |
| Styling   | Plain CSS with CSS variables | No framework lock-in, easy to reskin colors/type in one file (`src/index.css`), keeps bundle small. |
| Backend   | Python + FastAPI          | You asked for a Python option. FastAPI gives you a typed, documented (`/docs`) API in ~120 lines, easy to extend with a real LLM. |
| Chatbot   | Rule-based intent matcher, upgradeable to an LLM | Ships working out of the box with **zero API keys**. Swap in OpenAI/Anthropic in `backend/main.py` when you're ready (instructions inside). |

You do **not** need the backend to run the site. The chatbot works fully
client-side (`frontend/src/utils/chatbotEngine.js`). The backend is there for
when you want to (a) get real AI answers instead of rule-based ones, or
(b) actually receive contact-form submissions by email/DB instead of
`mailto:`/WhatsApp links.

## Project layout

```
ai-agency-app/
├── frontend/                # React + Vite site
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx         # React entry point
│       ├── App.jsx          # Page layout / section order
│       ├── index.css        # Design tokens + all styling
│       ├── data/
│       │   └── content.js   # ALL editable copy: services, pricing, about, contact
│       ├── utils/
│       │   └── chatbotEngine.js   # Rule-based chatbot logic + optional API hook
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── Services.jsx
│           ├── Chatbot.jsx
│           ├── Pricing.jsx
│           ├── About.jsx
│           ├── Contact.jsx
│           └── Footer.jsx
└── backend/                 # Optional FastAPI service
    ├── main.py               # /api/chat and /api/contact endpoints
    ├── requirements.txt
    └── .env.example
```

## Running the frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Build for production:

```bash
npm run build       # outputs static files to frontend/dist
npm run preview      # preview the production build locally
```

Deploy `frontend/dist` to Vercel/Netlify/any static host, exactly like the
original site was deployed.

## Running the backend (optional)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # fill in an OpenAI/Anthropic key if you want real AI
uvicorn main:app --reload     # http://localhost:8000, docs at /docs
```

Then in `frontend/src/utils/chatbotEngine.js`, set `USE_BACKEND = true` and
point `BACKEND_URL` at your running API. The frontend will POST each message
to `/api/chat` instead of answering locally.

## What's implemented (feature parity with the source site)

- Sticky nav with smooth-scroll section links
- Hero with headline, dual CTAs, and an animated "signal" diagram
- "What I do" — 4 value props
- Services — 6 offerings
- **Live chatbot demo** — rule-based, understands pricing/services/voice
  agents/automation/timeline/maintenance questions, with suggested prompts
- Pricing — 3 tiers (Starter / Medium / Pro), monthly + one-time fee, "most
  popular" highlight
- About — bio + 3 stat badges
- Contact — WhatsApp deep link, mailto link, and a working contact **form**
  that posts to the FastAPI backend (falls back to opening the user's email
  client if no backend is configured)
- Fully responsive (mobile nav, stacked layout), keyboard-accessible,
  respects `prefers-reduced-motion`

## Making it yours

Everything editable — your name, services, prices, phone number, email,
bio — lives in **one file**: `frontend/src/data/content.js`. Swap the
values there and every section updates. Colors and fonts live in
`frontend/src/index.css` under `:root`.

## Notes on the chatbot

The default chatbot is intentionally **not** wired to a paid LLM API, so the
project runs immediately with no cost and no keys. It uses keyword/intent
matching (see `chatbotEngine.js`) tuned to the same question types shown in
the demo transcript (pricing, services, voice agents, timelines,
maintenance). This is genuinely how a lot of "AI chatbot" landing-page demos
are built in practice — cheap, instant, no API latency — and it's a
reasonable production choice for a scripted FAQ bot. If you want open-ended
GPT-style answers, flip on the FastAPI backend and add your API key; the
hook is already there.
