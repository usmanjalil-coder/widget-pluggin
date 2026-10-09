export const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    conversations: 50,
    bots: 1,
    badge: "Powered by",
    highlight: false,
    cta: "Get started free",
    description: "A simple way to test the assistant on your site.",
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 24,
    conversations: 500,
    bots: 1,
    badge: "Most popular",
    highlight: true,
    cta: "Start with Starter",
    description: "For small businesses that want more traffic and more coverage.",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 65,
    conversations: 2000,
    bots: 3,
    badge: "Advanced",
    highlight: false,
    cta: "Go Pro",
    description: "More automation, more bots, and no badge on the widget.",
  },
];

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const YEARLY_DISCOUNT_LABEL = "2 months free";
