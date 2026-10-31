export const homeFaq = [
  [
    "How long does setup take?",
    "Setup takes a few steps: import your docs, match the colors, and add your script snippet.",
  ],
  [
    "Which websites does it work on?",
    "It works on custom sites, landing pages, WordPress, Shopify, Wix, and other hosted pages that allow a script tag.",
  ],
  [
    "What happens if the bot does not know the answer?",
    "It answers from your imported content and politely says it does not know when it is outside the source material. You can review the conversation later and improve the knowledge base.",
  ],
  [
    "Can I change colors and messages?",
    "Yes. The dashboard includes a live preview so you can update brand colors, greeting text, launch label, and placement before saving.",
  ],
  [
    "What counts as a conversation?",
    "A conversation is one visitor chat session, however many messages it has.",
  ],
  [
    "What happens when I reach my plan limit?",
    "Visitors see a friendly unavailable message. You get an email at 80% and 100%, and can upgrade anytime.",
  ],
  [
    "Can I cancel anytime?",
    "Yes. Cancel anytime; paid access continues until the end of the current billing period.",
  ],
  [
    "How is my visitors' data handled?",
    "Visitor messages and your content are processed to provide the service, including by our AI provider. The bot owner can view conversations and any contact details visitors submit. See our Privacy Policy for details on data handling and retention.",
  ],
  [
    "Do you train AI on my data?",
    "No. Visitor messages and your content are sent to our AI providers (xAI and Google) only to generate answers and search your content. Under their API terms, this data is not used to train their models. Providers may keep API requests for a limited period for security and abuse monitoring.",
  ],
  [
    "Is Tellvira HIPAA compliant?",
    "No. Tellvira is not designed for protected health information, and we do not sign a HIPAA BAA. It is meant for general questions about hours, services, pricing and booking requests, so please do not ask visitors to share medical records or health details in chat.",
  ],
].map(([question, answer]) => ({ question, answer }));

export const billingFaq = [
  [
    "How does billing work?",
    "Paid plans are billed monthly. Paddle handles payments and taxes as Merchant of Record; applicable taxes may be added at checkout depending on your location.",
  ],
  [
    "Can I cancel anytime?",
    "Yes. Cancel anytime from the dashboard or Paddle portal. Your paid access continues until the end of the current billing period.",
  ],
  [
    "What happens when I change plans?",
    "Upgrades take effect immediately with a prorated charge. Downgrades are scheduled for the end of the current billing period.",
  ],
  [
    "Is there a money-back guarantee?",
    "Yes. Request a refund within 15 days of a paid subscription charge. See the Refund Policy for how to request it through Paddle or our support team.",
  ],
].map(([question, answer]) => ({ question, answer }));
