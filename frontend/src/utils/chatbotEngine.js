/**
 * chatbotEngine.js
 * ----------------------------------------------------------------------
 * Drives the live chatbot demo.
 *
 * Two modes:
 *
 * 1. LOCAL (default, USE_BACKEND = false)
 *    Pure client-side keyword/intent matching. No network call, no API
 *    key, no cost, instant reply. Good enough for a scripted FAQ bot on
 *    a landing page, which is what most "live chatbot demo" widgets
 *    actually are in production.
 *
 * 2. BACKEND (USE_BACKEND = true)
 *    Posts the conversation to `${BACKEND_URL}/api/chat`, which is
 *    implemented in `backend/main.py`. Wire that endpoint up to a real
 *    LLM (OpenAI, Anthropic, etc.) when you want open-ended answers
 *    instead of scripted ones.
 * ----------------------------------------------------------------------
 */

export const USE_BACKEND = false;
export const BACKEND_URL = "http://localhost:8000";

// Ordered list of intents. First matching pattern wins, so put more
// specific patterns before more general ones.
const INTENTS = [
  {
    patterns: [/how much.*chatbot/i, /chatbot.*cost/i, /chatbot.*price/i],
    reply:
      "The Starter AI Bot Package is $250 to set up, then $69/month for maintenance. It includes a custom-trained website chatbot, lead capture, and FAQ handling, deployed in 2–4 weeks.",
  },
  {
    patterns: [/how much.*maintenance/i, /monthly.*(cost|fee|price)/i],
    reply:
      "Monthly maintenance is $69 on Starter, $129 on Medium, and $200 on Pro. It covers hosting, monitoring, and keeping the system trained on your business — cancellable with 30 days notice.",
  },
  {
    patterns: [/pric(e|ing)/i, /how much.*(cost|charge)/i, /rates?\b/i],
    reply:
      "There are three packages: Starter ($250 setup + $69/mo), Medium ($399 setup + $129/mo), and Pro ($699 setup + $200/mo). Starter is a website chatbot, Medium adds appointment booking and CRM workflow, Pro adds a full AI voice receptionist and multi-channel automation.",
  },
  {
    patterns: [/voice agent/i, /voice receptionist/i, /phone calls?/i, /answer.*calls?/i],
    reply:
      "Yes — AI voice agents are part of the Pro package. They can answer incoming calls, handle routine questions, book appointments by voice, and route anything important to a real person.",
  },
  {
    patterns: [/automat/i, /workflow/i, /crm/i, /calendar/i],
    reply:
      "Automation systems connect your website, calendar, CRM and messaging so leads get captured and followed up without manual data entry. That's included from the Medium package up.",
  },
  {
    patterns: [/how long.*(take|project|build)/i, /timeline/i, /turnaround/i],
    reply:
      "Most projects take 2–4 weeks from kickoff to launch, depending on scope. Starter chatbots are on the faster end; Pro systems with voice and multi-channel automation take longer.",
  },
  {
    patterns: [/what.*(build|do|offer|services)/i, /what.*you.*do/i],
    reply:
      "I build AI chatbots, AI voice agents, automation systems, \"AI employee\" workflows, lead & appointment automation, and fully custom AI systems — see the Services section above for details on each.",
  },
  {
    patterns: [/contact/i, /reach you/i, /whatsapp/i, /email/i, /get started/i, /talk to (you|someone)/i],
    reply:
      "Easiest way is WhatsApp or email — both are linked in the Contact section below. Tell me what your business is doing manually today and I'll tell you if it makes sense as an AI system.",
  },
  {
    patterns: [/hi|hello|hey/i],
    reply:
      "Hey — I can answer questions about services, pricing, chatbots, voice agents, or automation. What would you like to know?",
  },
];

const FALLBACK_REPLY =
  "Good question — I don't have a scripted answer for that, but the fastest way to get a real answer is to reach out directly on WhatsApp or email in the Contact section below.";

/**
 * Match a user message against known intents.
 * @param {string} message
 * @returns {string} reply text
 */
function matchLocalIntent(message) {
  for (const intent of INTENTS) {
    if (intent.patterns.some((pattern) => pattern.test(message))) {
      return intent.reply;
    }
  }
  return FALLBACK_REPLY;
}

/**
 * Get a reply to the given user message. Handles both local and backend
 * modes so components never need to know which one is active.
 *
 * @param {string} message - the latest user message
 * @param {Array<{role: 'user'|'assistant', content: string}>} history - prior turns, oldest first
 * @returns {Promise<string>}
 */
export async function getChatReply(message, history = []) {
  if (!USE_BACKEND) {
    // Simulate a brief thinking delay so the UI feels alive.
    await new Promise((resolve) => setTimeout(resolve, 450));
    return matchLocalIntent(message);
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
    const data = await response.json();
    return data.reply;
  } catch (err) {
    console.error("Chat backend error, falling back to local reply:", err);
    return matchLocalIntent(message);
  }
}

export const suggestedPrompts = [
  "How much does a chatbot cost?",
  "What do you build?",
  "Do you build voice agents?",
  "How long does a project take?",
  "How much is monthly maintenance?",
];
        
