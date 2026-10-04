import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), ".mock-data", "db.json");
const baseTheme = {
  primaryColor: "#2563eb",
  mode: "light",
  position: "right",
  borderRadius: 16,
  fontFamily: "system",
};

const baseTexts = {
  botName: "Demo Dental Assistant",
  avatarUrl: "",
  greetingMessage: "Hi! How can I help with your visit today?",
  inputPlaceholder: "Ask a question…",
  launcherLabel: "Chat with us",
  starterQuestions: ["Book an appointment", "What services do you offer?"],
  offlineMessage: "We are offline right now.",
};

const defaultSettings = {
  notificationEmails: ["hello@demodental.example"],
  whatsappNumber: "",
  sendConfirmationEmail: true,
  allowedDomains: ["example.com"],
  assistantRules:
    "Never provide medical advice. Always redirect to the dental office for clinical questions.",
  workingHours: {
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "10:00", close: "14:00", closed: false },
    sunday: { open: "00:00", close: "00:00", closed: true },
  },
  bookingFields: [
    { id: "name", label: "Full name", type: "text", required: true },
    { id: "phone", label: "Phone", type: "phone", required: true },
    {
      id: "preferred_time",
      label: "Preferred time",
      type: "date",
      required: false,
    },
  ],
};

const seed = () => ({
  user: { name: "Alex Morgan", email: "alex@example.com" },
  plan: "free",
  onboarding: {
    skipped: false,
    step: 0,
    checklist: {
      botCreated: false,
      knowledgeAdded: false,
      lookCustomized: false,
      snippetInstalled: false,
      firstTestDone: false,
    },
  },
  usage: { conversations: 32, messages: 184, leads: 15, limit: 50 },
  bots: [
    {
      id: "demo",
      name: "Demo Dental Assistant",
      status: "active",
      theme: { ...baseTheme },
      texts: { ...baseTexts },
      features: { leadCapture: true },
      branding: { showBadge: true },
      settings: { ...defaultSettings },
    },
    {
      id: "second-bot",
      name: "Second bot",
      status: "active",
      theme: { ...baseTheme, primaryColor: "#16a34a" },
      texts: {
        ...baseTexts,
        botName: "Second Bot",
        greetingMessage:
          "Hi! I can answer general questions about your services.",
        launcherLabel: "Ask a question",
      },
      features: { leadCapture: true },
      branding: { showBadge: true },
      settings: {
        ...defaultSettings,
        notificationEmails: ["hello@secondbot.example"],
      },
    },
  ],
  leads: Array.from({ length: 15 }, (_, i) => ({
    id: `lead-${i + 1}`,
    botId: i % 2 === 0 ? "demo" : "second-bot",
    name: ["Maya Reed", "Daniel Kim", "Priya Shah", "Noah Lee", "Alicia Chen"][
      i % 5
    ],
    phone: `555-010${i}`,
    email: `lead${i + 1}@example.com`,
    status: ["new", "confirmed", "done"][i % 3],
    source: i % 2 === 0 ? "Website widget" : "Knowledge base",
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    fields: { preferred_time: "Next Tuesday", concern: "General inquiry" },
  })),
  documents: Array.from({ length: 8 }, (_, i) => ({
    id: `doc-${i + 1}`,
    botId: "demo",
    name: [
      "Welcome FAQ.pdf",
      "Services.txt",
      "Pricing notes.docx",
      "About the clinic URL",
      "Emergency policies.txt",
    ][i % 5],
    type: i % 2 === 0 ? "file" : "url",
    status: ["ready", "processing", "failed"][i % 3],
    size: `${12 + i * 9} KB`,
    updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
    source: ["Upload", "Website", "Manual"][i % 3],
  })),
  conversations: Array.from({ length: 25 }, (_, i) => ({
    id: `conv-${i + 1}`,
    botId: "demo",
    visitor: `Visitor ${i + 1}`,
    preview:
      i % 4
        ? "I would like to know more about booking an appointment."
        : "What are your opening hours?",
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    unanswered: i % 4 === 0,
    transcript: [
      {
        role: "user",
        text: "Can I book a consultation online?",
        time: "09:14 AM",
      },
      {
        role: "assistant",
        text: "Yes — I can help with availability and contact details.",
        time: "09:15 AM",
      },
    ],
  })),
});

export function readDb() {
  if (!fs.existsSync(file)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(seed(), null, 2));
  }

  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeDb(db) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
  return db;
}

export function getBot(id) {
  return readDb().bots.find((bot) => bot.id === id);
}

export function resetDb() {
  const fresh = seed();
  writeDb(fresh);
  return fresh;
}
