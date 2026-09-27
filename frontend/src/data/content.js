/**
 * content.js
 * ----------------------------------------------------------------------
 * Single source of truth for every piece of copy on the site.
 * Edit this file to rebrand or update pricing/services/FAQ/projects —
 * components read from here so you rarely need to touch component code.
 * ----------------------------------------------------------------------
 */

export const brand = {
  name: "Seyi Qing",
  tagline: "AI systems for businesses",
  logoText: "Seyi Qing",
};

export const hero = {
  eyebrow: "Independent AI builder · Now booking new projects",
  headline:
    "Your business already knows what needs fixing. I build the system that fixes it.",
  subhead:
    "I'm Seyi. I build chatbots, voice agents, and automation that pick up the slack — the questions you answer twenty times a day, the leads that go cold because nobody followed up fast enough, the forms nobody has time to process. You keep running the business. The system handles the repeats.",
  subheadMobile:
    "I'm Seyi. I build chatbots, voice agents, and automation that handle the repeats — so you can run the business.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See what I build", href: "#services" },
  badges: [
    { label: "Built for real businesses", detail: "No jargon, no fluff" },
    { label: "Replies in seconds", detail: "24/7 · always on" },
  ],
};

export const valueProps = [
  { title: "Fewer repeats", detail: "The tenth time someone asks your hours, price, or availability, a system answers it — not you." },
  { title: "Nothing falls through", detail: "Every inquiry gets a response, even the one that comes in at midnight on a Saturday." },
  { title: "Leads don't go cold", detail: "Follow-up happens the moment someone shows interest — not whenever you get around to it." },
  { title: "Your time back", detail: "Less time on repeat tasks means more time on the parts of the business only you can do." },
];

export const services = [
  { id: "chatbots", name: "AI Chatbots", detail: "A chatbot trained on your business, sitting on your website, answering the questions customers ask before they'll pick up the phone — and flagging you the ones that actually need a human." },
  { id: "voice-agents", name: "AI Voice Agents", detail: "A voice system that picks up the phone when you can't — handles the routine calls, books what it can, and passes anything real straight to you." },
  { id: "automation", name: "AI Automation", detail: "The repetitive parts of your workflow — the copy-paste, the re-entry, the reminders — running on their own instead of eating your afternoon." },
  { id: "ai-employees", name: "AI Employees", detail: "A system built to own one specific job in your business — intake, follow-up, first response — the way you'd hand it to a new hire, minus the training curve." },
  { id: "lead-automation", name: "Lead & Appointment Automation", detail: "Every lead that comes in through your site, ads, or socials lands straight in your calendar or CRM — nobody typing it in by hand." },
  { id: "custom-systems", name: "Custom AI Systems", detail: "If none of the above quite fits, I build around the actual way your business runs — not a template of how businesses are supposed to run." },
  { id: "custom-software", name: "Custom Software", detail: "Full websites and web apps outside the AI-automation lane — a bank demo, a school platform, a church site. If it just needs to be built well, not necessarily automated, that's still work I take on." },
];

export const pricing = [
  {
    id: "starter", tier: "Starter", name: "Starter AI Bot Package", setupFee: "$250", monthly: "$69",
    description: "A focused website AI chatbot that answers customer questions and captures leads 24/7 — perfect for small businesses getting started.",
    features: ["AI website chatbot", "Custom-trained on your business", "Lead capture form", "FAQs and basic qualification", "Website deployment", "2–4 week build"],
    footnote: "Cancellable with 30 days notice", highlight: false,
  },
  {
    id: "medium", tier: "Medium · Most popular", name: "Medium Automation Package", setupFee: "$399", monthly: "$129",
    description: "Everything in Starter, plus appointment booking, CRM workflow, and email confirmations — the right fit for most service businesses.",
    features: ["Everything in Starter", "Appointment booking + confirmations", "Google Calendar / Sheets workflow", "Lead qualification + automated follow-up", "Email + WhatsApp handoff", "30 days post-launch support"],
    footnote: "Best value for growing teams", highlight: true,
  },
  {
    id: "pro", tier: "Pro", name: "Pro AI System Package", setupFee: "$699", monthly: "$200",
    description: "The full system: AI voice receptionist, multi-channel automation, and custom workflows built end-to-end around how your business runs.",
    features: ["Everything in Medium", "AI voice receptionist", "Voice appointment booking", "Multi-channel automation (web, WhatsApp, social)", "Custom workflows + integrations", "Advanced reporting"],
    footnote: "For businesses ready to scale", highlight: false,
  },
];

export const about = {
  heading: "Just me. No team, no templates.",
  paragraphs: [
    "I'm Seyi Qing. I build the AI systems businesses use to stop doing the same task over and over — answering the same question, chasing the same lead, typing the same thing into a spreadsheet. I work alone, which means the person who builds your system is the person you're talking to.",
    "Nothing here comes off a shelf. I don't resell a platform with your logo slapped on it, and I don't hand you a system and disappear. If something in your business is repetitive enough that you've thought \"there has to be a better way\" — that's usually something I can build.",
  ],
  stats: [
    { value: "1:1", label: "Direct work" },
    { value: "Custom", label: "No templates" },
    { value: "24/7", label: "Systems that run" },
  ],
  photoUrl: "/headshot.jpg",
};

export const testimonials = [
  // Add real quotes only — section switches from the proof strip automatically.
  // Example:
  // { quote: "Cut our response time from hours to seconds.", name: "Jordan P.", business: "Riverside Dental" },
];

export const faq = [
  {
    question: "How long does a project take?",
    answer:
      "Most projects take 2–4 weeks from kickoff to launch, depending on scope. A Starter chatbot is on the faster end; a Pro system with voice and multi-channel automation takes longer.",
  },
  {
    question: "What happens after launch — am I locked in?",
    answer:
      "No long-term contract. Monthly maintenance covers hosting, monitoring, and keeping the system trained on your business, and it's cancellable with 30 days notice.",
  },
  {
    question: "What if the chatbot doesn't understand a customer's question?",
    answer:
      "It hands off to you — by email, WhatsApp, or however you prefer — instead of guessing. You always see what it couldn't answer, so the system gets better over time.",
  },
  {
    question: "Do I need any technical knowledge to use this?",
    answer:
      "No. You use it the way you'd use any other business tool — through your normal channels (website, WhatsApp, phone). I handle the technical setup and maintenance.",
  },
  {
    question: "Can this integrate with tools I already use?",
    answer:
      "In most cases, yes — calendars, CRMs, spreadsheets, and common business tools can usually be connected. Tell me what you're using and I'll confirm before we start.",
  },
];

/**
 * Projects. `localThumb` = static asset in /public.
 * `url` drives live mshots screenshots when set.
 */
export const projects = [
  {
    name: "AI Receptionist Chatbot",
    status: "Live",
    description: "The chatbot on this page. Trained on my own pricing, services, and FAQ — answers real visitor questions and hands off anything it can't answer to WhatsApp or email.",
    stack: "React · FastAPI · Claude Sonnet",
    href: "#chatbot",
    url: null,
    localThumb: "/chatbot-thumb.svg",
    thumbKey: null,
  },
  {
    name: "Church Platform",
    status: "Live",
    description: "An all-in-one platform for churches — website, membership and service management, online giving, livestream, and a companion mobile app, with a few AI-assisted pastoral tools built in.",
    stack: "FastAPI · PostgreSQL · Next.js · Expo · Stripe",
    href: "https://church-platform-mu.vercel.app",
    url: "https://church-platform-mu.vercel.app",
    thumbKey: "church",
  },
  {
    name: "Force Schools (School ERP)",
    status: "Live",
    description: "A school management system with separate portals for admins, teachers, students, and parents — attendance, exam scoring, fee collection, payroll, and a public result checker.",
    stack: "Next.js · Prisma · TypeScript · Tailwind",
    href: "https://qing-school.vercel.app",
    url: "https://qing-school.vercel.app",
    thumbKey: "school",
  },
  {
    name: "ModernBank (prototype)",
    status: "Live",
    description: "An educational digital-banking prototype — not a real bank or licensed financial product, but a full-stack build showing account, transaction, and admin flows end-to-end.",
    stack: "Next.js · FastAPI",
    href: "https://modern-bank-silk.vercel.app",
    url: "https://modern-bank-silk.vercel.app",
    thumbKey: "modernbank",
  },
  {
    name: "NCOF Platform",
    status: "Live",
    description: "A membership platform for a nonprofit association — member records, dues and payments through Paystack and Flutterwave, and secret-ballot elections with a verifiable audit trail.",
    stack: "FastAPI · PostgreSQL · Next.js",
    href: "https://ncof.vercel.app",
    url: "https://ncof.vercel.app",
    thumbKey: "ncof",
  },
  {
    name: "Contact Form Triage",
    status: "In progress",
    description: "Every inquiry that comes through the contact form gets automatically read, categorized by urgency, and summarized in one line — so I see what matters before opening the raw message.",
    stack: "FastAPI · Claude Sonnet",
    href: null,
    url: null,
    thumbKey: null,
  },
  {
    name: "AI Voice Receptionist",
    status: "Planned",
    description: "An AI-answered phone line for handling routine calls and booking appointments by voice. Waiting on a telephony provider account before this can go live.",
    stack: "Twilio · Speech-to-text · Claude",
    href: null,
    url: null,
    thumbKey: null,
  },
];

export const contact = {
  heading: "Something in your business running on repeat? Tell me about it.",
  subhead:
    "Tell me what's eating your time right now. I'll tell you honestly whether AI fixes it, and roughly what that would look like.",
  whatsapp: { label: "WhatsApp", value: "+1 312 487 9790", href: "https://wa.me/13124879790" },
  email: { label: "Email", value: "logzmaster.biz@gmail.com", href: "mailto:logzmaster.biz@gmail.com" },
};

export const footer = {
  note: "Independent AI builder",
  tagline: "Built with 💙· No agency, no platform",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Chatbot", href: "#chatbot" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
