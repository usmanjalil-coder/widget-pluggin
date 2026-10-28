export const niches = [
  {
    slug: "dental-practices",
    published: true,
    updatedAt: "2026-10-28",
    metaTitle: "AI Chatbot for Dental Practices",
    metaDescription:
      "Answer patient questions after hours, capture new patient inquiries and appointment requests, and send leads to your front desk. Install in minutes.",
    name: "Dental practices",
    h1: "AI chatbot for dental practices",
    intro:
      "Give prospective patients a useful first answer when your front desk is busy or the office is closed. Tellvira uses the office information you provide to answer common questions and collect requests for your team to follow up.",
    painPointsHeading: "Built around front desk questions",
    useCasesHeading: "What your assistant can handle",
    howItWorksHeading: "Set up and install",
    safetyNote:
      "This chatbot is not meant to collect patient health information or records. For clinical questions or emergencies, contact the practice directly.",
    painPoints: [
      {
        title: "Questions after the phones stop ringing",
        body: "Someone checking your site after hours may need office hours, directions, or a quick explanation of how to request an appointment.",
      },
      {
        title: "New patient inquiries in many places",
        body: "Visitors often ask about services, accepted insurance, and the first visit before they are ready to call.",
      },
      {
        title: "Follow-up depends on a clear handoff",
        body: "An appointment request is more useful when the practice receives the visitor's contact details by email and can respond directly.",
      },
    ],
    useCases: [
      {
        title: "Office essentials",
        body: "Answer questions about opening hours, location, parking, and directions from the information your practice publishes.",
      },
      {
        title: "Services and insurance FAQs",
        body: "Explain listed services and general insurance information while leaving coverage confirmation to your team.",
      },
      {
        title: "New patient and appointment requests",
        body: "Collect a name and contact details, then send the lead or appointment request to the practice by email for follow-up.",
      },
    ],
    howItWorks: [
      {
        title: "Add practice information",
        body: "Use your website, office FAQs, and approved documents as the source for answers.",
      },
      {
        title: "Set up the assistant",
        body: "Choose its greeting, colors, and the contact fields your front desk needs. Keep medical details out of forms.",
      },
      {
        title: "Install on your site",
        body: "Paste one script tag on your website. On WordPress, a footer-scripts plugin can add the snippet without editing code.",
      },
    ],
    faq: [
      {
        question: "Can it answer questions after office hours?",
        answer:
          "Yes. It can answer common questions from the practice information you provide and collect an inquiry for your team to handle when available.",
      },
      {
        question: "Can visitors request appointments?",
        answer:
          "They can submit an appointment request. Your team receives the details by email and confirms availability directly; the chatbot does not book a calendar slot.",
      },
      {
        question: "Should patients enter symptoms or records?",
        answer:
          "No. The chatbot is not meant to collect patient health information or records. Ask visitors to contact the practice directly about clinical concerns or emergencies.",
      },
      {
        question: "Do we need a developer to install it?",
        answer:
          "No. Paste the script tag into your site. A WordPress footer-scripts plugin can place it without changing theme code.",
      },
    ],
    relatedSlugs: [],
  },
];

export const publishedNiches = niches.filter((niche) => niche.published !== false);
