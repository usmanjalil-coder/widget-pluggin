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
  usage: { conversations: 32, messages: 184, leads: 12, limit: 50 },
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
        botName: "Second bot",
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
  leads: [
    ["Maya Reed", "maya.reed", "Cleaning", "Website widget"],
    ["Daniel Kim", "daniel.kim", "Whitening", "Website widget"],
    ["Priya Shah", "priya.shah", "New patient exam", "Website widget"],
    ["Noah Lee", "noah.lee", "Emergency visit", "Website widget"],
    ["Alicia Chen", "alicia.chen", "Invisalign consultation", "Website widget"],
    ["Olivia Brooks", "olivia.brooks", "Teeth cleaning", "Website widget"],
    ["Ethan Patel", "ethan.patel", "Crown consultation", "Website widget"],
    ["Sophia Rivera", "sophia.rivera", "Child dental exam", "Website widget"],
    ["Liam Foster", "liam.foster", "Implant consultation", "Website widget"],
    ["Amira Hassan", "amira.hassan", "Tooth sensitivity", "Website widget"],
    ["Lucas Bennett", "lucas.bennett", "Routine checkup", "Website widget"],
    ["Isabella Park", "isabella.park", "Appointment change", "Website widget"],
  ].map(([name, email, intent, source], i) => ({
    id: `lead-${i + 1}`,
    botId: "demo",
    conversationId: `conv-${i + 1}`,
    name,
    phone: `(555) 010-${String(1200 + i)}`,
    email: `${email}@example.com`,
    intent,
    status: ["new", "confirmed", "done"][i % 3],
    source,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    fields: { preferred_time: "Next Tuesday", concern: intent },
  })),
  documents: [
    ["Welcome FAQ.pdf", "file"],
    ["Services.txt", "file"],
    ["Pricing notes.docx", "file"],
    ["About the clinic", "url"],
    ["Emergency policies.txt", "file"],
  ].map(([name, type], i) => ({
    id: `doc-${i + 1}`,
    botId: "demo",
    name,
    type,
    status: "ready",
    size: `${12 + i * 9} KB`,
    updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
    source: type === "url" ? "Website" : "Upload",
  })),
  conversations: [
    "Can I book a cleaning for next Tuesday?",
    "What whitening options do you offer?",
    "Do you accept new patients?",
    "Can I get an emergency appointment today?",
    "How long does an Invisalign consultation take?",
    "What is the price of a routine cleaning?",
    "Can I discuss a damaged crown?",
    "Do you see children under six?",
    "How long does an implant consultation take?",
    "Is tooth sensitivity something you can assess?",
    "Are Saturday checkups available?",
    "Can I change my appointment time?",
  ].map((question, i) => ({
    id: `conv-${i + 1}`,
    botId: "demo",
    visitor: i % 3 === 0 ? `Visitor ${i + 1}` : [
      "Maya Reed", "Daniel Kim", "Priya Shah", "Noah Lee",
      "Alicia Chen", "Olivia Brooks", "Ethan Patel", "Sophia Rivera",
      "Liam Foster", "Amira Hassan", "Lucas Bennett", "Isabella Park",
    ][i],
    preview: question,
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    unanswered: [3, 8, 9].includes(i),
    transcript: [
      {
        role: "user",
        text: question,
        time: "09:14 AM",
      },
      {
        role: "assistant",
        text: [3, 8, 9].includes(i)
          ? "I do not have that detail yet. Please leave your contact information and the clinic will follow up."
          : "I can help with that. Please leave your contact details and the clinic will follow up.",
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
