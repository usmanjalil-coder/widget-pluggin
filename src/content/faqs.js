export const homeFaq = [
  [
    "How long does setup take?",
    "Setup takes a few steps: import your docs, match the colors, and add your script snippet.",
  ],
  [
    "What happens if the bot does not know the answer?",
    "It answers from your imported content and politely says it does not know when it is outside the source material. You can review the conversation later and improve the knowledge base.",
  ],
  [
    "What counts as a conversation?",
    "A conversation is one visitor chat session, however many messages it has.",
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
    "Yes. Request a refund within 30 days of a paid subscription charge. See the Refund Policy for how to request it through Paddle or our support team.",
  ],
].map(([question, answer]) => ({ question, answer }));
