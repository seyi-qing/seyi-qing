/**
 * content.js
 * ----------------------------------------------------------------------
 * Single source of truth for every piece of copy on the site: your name,
 * services, pricing, bio and contact details.
 *
 * Edit this file and every component that imports from it updates
 * automatically — you should not need to touch component code just to
 * rebrand the site.
 *
 * Replace the placeholder name/phone/email below with your own before
 * deploying.
 * ----------------------------------------------------------------------
 */

export const brand = {
  name: "Seyi Qing",
  tagline: "AI systems for businesses",
  logoText: "Seyi Qing",
};

export const hero = {
  eyebrow: "AI systems for businesses · Available for select projects",
  headline:
    "Building AI systems that quietly run the work your business shouldn't have to do manually.",
  subhead:
    "I'm Seyi — an independent AI builder. I design chatbots, voice agents, and automation systems for small and mid-sized businesses that want fewer repetitive tasks, faster responses, and more time to focus on the work that actually matters.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See what I build", href: "#services" },
  badges: [
    { label: "Built for real businesses", detail: "No jargon, no fluff" },
    { label: "Replies in seconds", detail: "24/7 · always on" },
  ],
};

export const valueProps = [
  {
    title: "Less repetitive work",
    detail: "Stop answering the same questions and re-typing the same responses.",
  },
  {
    title: "Faster responses",
    detail: "Customers and leads get an answer in seconds — even when you're not online.",
  },
  {
    title: "More leads handled",
    detail: "Every website visitor, DM, and missed call gets followed up automatically.",
  },
  {
    title: "More time for the business",
    detail: "You spend time on the work that actually grows the business — not the busywork.",
  },
];

export const services = [
  {
    id: "chatbots",
    name: "AI Chatbots",
    detail:
      "A website assistant that answers customer questions, qualifies leads, and hands off the right inquiries to your team — 24/7, in your tone of voice.",
  },
  {
    id: "voice-agents",
    name: "AI Voice Agents",
    detail:
      "AI-powered voice systems that can answer incoming calls, handle routine customer interactions, and route the important ones to a human.",
  },
  {
    id: "automation",
    name: "AI Automation",
    detail:
      "Automating repetitive workflows so your team spends less time on copy-paste tasks and more time on work that needs a human.",
  },
  {
    id: "ai-employees",
    name: "AI Employees",
    detail:
      "AI systems designed to take over a specific repetitive responsibility in your business — for example, intake, follow-up, or first-line support.",
  },
  {
    id: "lead-automation",
    name: "Lead & Appointment Automation",
    detail:
      "Capture leads from your website, social, or ads and automatically route them into your calendar or CRM — without manual data entry.",
  },
  {
    id: "custom-systems",
    name: "Custom AI Systems",
    detail:
      "A custom AI solution built around a specific workflow in your business — designed end-to-end around how your team actually works.",
  },
];

export const pricing = [
  {
    id: "starter",
    tier: "Starter",
    name: "Starter AI Bot Package",
    setupFee: "$250",
    monthly: "$69",
    description:
      "A focused website AI chatbot that answers customer questions and captures leads 24/7 — perfect for small businesses getting started.",
    features: [
      "AI website chatbot",
      "Custom-trained on your business",
      "Lead capture form",
      "FAQs and basic qualification",
      "Website deployment",
      "2–4 week build",
    ],
    footnote: "Cancellable with 30 days notice",
    highlight: false,
  },
  {
    id: "medium",
    tier: "Medium · Most popular",
    name: "Medium Automation Package",
    setupFee: "$399",
    monthly: "$129",
    description:
      "Everything in Starter, plus appointment booking, CRM workflow, and email confirmations — the right fit for most service businesses.",
    features: [
      "Everything in Starter",
      "Appointment booking + confirmations",
      "Google Calendar / Sheets workflow",
      "Lead qualification + automated follow-up",
      "Email + WhatsApp handoff",
      "30 days post-launch support",
    ],
    footnote: "Best value for growing teams",
    highlight: true,
  },
  {
    id: "pro",
    tier: "Pro",
    name: "Pro AI System Package",
    setupFee: "$699",
    monthly: "$200",
    description:
      "The full system: AI voice receptionist, multi-channel automation, and custom workflows built end-to-end around how your business runs.",
    features: [
      "Everything in Medium",
      "AI voice receptionist",
      "Voice appointment booking",
      "Multi-channel automation (web, WhatsApp, social)",
      "Custom workflows + integrations",
      "Advanced reporting",
    ],
    footnote: "For businesses ready to scale",
    highlight: false,
  },
];

export const about = {
  heading: "One person. Real systems.",
  paragraphs: [
    "I'm Alex Rivera. I build AI-powered systems and automation for businesses that want to spend less time on repetitive work — answering the same questions, chasing the same leads, re-typing the same data. I work independently, so you talk to the person doing the work.",
    "Every system I build is custom. I don't resell templates, I don't plug in a \"platform,\" and I don't disappear after launch. If you have a repetitive task in your business that should be automated, that's exactly what I do.",
  ],
  stats: [
    { value: "1:1", label: "Direct work" },
    { value: "Custom", label: "No templates" },
    { value: "24/7", label: "Systems that run" },
  ],
};

export const contact = {
  heading: "Have a repetitive business task that should be automated? Let's build it.",
  subhead:
    "Tell me what your business is doing manually today. I'll tell you whether it makes sense as an AI system, and what the rough shape of it would be.",
  // Replace with your real details before deploying.
  whatsapp: { label: "WhatsApp", value: "+1 555 010 1234", href: "https://wa.me/15550101234" },
  email: { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
};

export const footer = {
  note: "Independent AI builder",
  tagline: "Built with care · No agency, no platform",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Chatbot", href: "#chatbot" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
    
