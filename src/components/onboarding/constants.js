import { Home, Scissors, ShoppingBag, Smile, Sparkles, UtensilsCrossed } from "lucide-react";

export const STEPS = ["About your business", "Add knowledge", "Make it yours", "Install", "Done"];
export const COLORS = [
  "#2563eb",
  "#0f172a",
  "#0891b2",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#7c3aed",
  "#ec4899",
];
export const INDUSTRIES = [
  ["dental", "Dental", Smile],
  ["salon", "Salon", Scissors],
  ["real-estate", "Real estate", Home],
  ["restaurant", "Restaurant", UtensilsCrossed],
  ["ecommerce", "E-commerce", ShoppingBag],
  ["other", "Other", Sparkles],
];
export const CONTENT = {
  dental: [
    "Dental Assistant",
    "Hi! I can help with opening hours, booking, and services.",
    ["What are your opening hours?", "Can I book an appointment?", "What services do you offer?"],
  ],
  salon: [
    "Salon Assistant",
    "Hi! I can help with services, booking, and prices.",
    ["What services do you offer?", "Can I book an appointment?", "What are your prices?"],
  ],
  "real-estate": [
    "Property Assistant",
    "Hi! I can help with listings, viewings, and pricing.",
    ["What listings are available?", "Can I book a viewing?", "What are the prices?"],
  ],
  restaurant: [
    "Dining Assistant",
    "Hi! I can help with the menu, reservations, and opening hours.",
    ["Can I see the menu?", "Can I make a reservation?", "What are your opening hours?"],
  ],
  ecommerce: [
    "Shop Assistant",
    "Hi! I can help with orders, shipping, and returns.",
    ["Where is my order?", "What are the shipping options?", "What is your returns policy?"],
  ],
  other: [
    "Assistant",
    "Hi! I can answer questions about your business and help visitors get started.",
    ["What do you offer?", "How can I get started?", "How can I contact you?"],
  ],
};
export const INITIAL = {
  step: 0,
  businessName: "",
  websiteUrl: "",
  industry: "dental",
  botId: "",
  botName: "",
  greeting: "",
  position: "right",
  primaryColor: "#2563eb",
  knowledgeMethod: "website",
  sources: [],
  snippetCopied: false,
};
