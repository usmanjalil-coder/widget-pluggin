const section = (heading, first, second, extras = []) => [
  { type: "h2", text: heading },
  { type: "p", content: first },
  { type: "p", content: second },
  ...extras,
];
const subsection = (heading, first, second) => [
  { type: "h3", text: heading },
  { type: "p", content: first },
  { type: "p", content: second },
];
const link = (href, text) => ({ href, text });
const list = (items, type = "ul") => ({ type, items });
const note = (text) => ({ type: "callout", text });
const dated = { publishedAt: "2026-10-31", updatedAt: "2026-10-31", published: true };

export const posts = [
  {
    ...dated,
    slug: "how-to-answer-patient-questions-after-hours",
    title: "How to answer patient questions after hours",
    metaTitle: "Answer Dental Patient Questions After Hours | Tellvira",
    metaDescription:
      "A practical guide to answering dental office questions after hours, collecting appointment requests, and keeping clinical decisions with your front desk team.",
    excerpt:
      "Build a useful after-hours front desk for office questions while keeping health details and appointment confirmation with your team.",
    category: "Dental practices",
    relatedNicheSlugs: ["dental-practices", "salons"],
    relatedPostSlugs: [
      "chatbot-faq-template-for-small-business",
      "capture-leads-from-your-website-without-a-contact-form",
    ],
    faq: [
      {
        question: "Can a dental chatbot confirm an appointment?",
        answer:
          "No. It can collect a request and email your practice. Staff must check availability and confirm a time directly.",
      },
      {
        question: "Should patients share symptoms in chat?",
        answer:
          "No. Direct symptoms, records, emergencies, and other clinical details to the practice through its approved channels.",
      },
      {
        question: "What can the assistant answer after hours?",
        answer:
          "It can explain office hours, directions, general service information, and administrative steps from content the practice provides.",
      },
      {
        question: "Does Tellvira provide a HIPAA business associate agreement?",
        answer: "No. Do not use Tellvira to collect or process protected health information.",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "A patient may visit your website at 9 p.m. to find parking instructions, ask whether the office accepts new patients, or learn how to request a visit. Those questions can wait for a staff reply, but an accurate answer now helps the person decide on a next step. An after-hours assistant should stay within the information your practice has approved for public use.",
      },
      ...section(
        "Start with administrative questions",
        "Collect the questions your front desk answers repeatedly without opening a patient record. Examples include office hours, location, parking, new-patient steps, general service descriptions, and how appointment requests work. Write each answer as a short statement with one clear next action. A vague answer such as 'call us for more information' wastes an opportunity to explain what is already on your website.",
        [
          "A practical starting point is the ",
          link("/solutions/dental-practices", "dental practice solution"),
          ". It describes how approved pages and FAQs become the source for answers. Give each office location separate hours and directions. If a public insurance page lists plans, the assistant may explain that list while reminding the visitor that staff confirm individual coverage.",
        ],
        [
          list([
            "Regular and holiday hours",
            "Parking, entrance, and accessibility information",
            "General new-patient steps",
            "Appointment request instructions",
            "Public insurance and payment FAQs",
          ]),
        ],
      ),
      ...section(
        "Write answers that stand alone",
        "An answer must make sense when a visitor reads it outside its original page. Replace 'see above' with the actual location, policy, or next step. Give dated information a date. If office hours change for a holiday, update the source rather than expecting the assistant to know which schedule applies. Keep staff responsible for reviewing public information when a policy changes.",
        "Use the exact terms patients see elsewhere on the site. If your services page calls a visit an 'initial consultation,' use that phrase in your FAQ. Avoid promising a particular treatment, price, or insurance outcome. These depend on an individual discussion with the practice. A good answer can explain the administrative process while clearly saying what staff must confirm.",
      ),
      ...section(
        "Collect requests without pretending to schedule",
        "The assistant can ask for a name, a contact method, and a preferred time for the practice to reply. It sends the visitor's request by email to the business. It does not see a calendar, reserve a slot, or confirm a visit. Write the handoff in ordinary words: 'Your request has been sent. The front desk will contact you to confirm next steps.'",
        "Design the form around what a receptionist needs to return a call, not around clinical intake. An appointment request can identify a general service category without collecting symptoms, treatment histories, or records. If the visitor has a clinical concern, direct them to the office's approved contact channel. For emergencies, follow the practice's public emergency instructions rather than offering a chat diagnosis.",
        [
          note(
            "Sample handoff: 'I can email your appointment request to the office. Please leave your name and contact details. Staff will confirm availability directly; do not include health information here.'",
          ),
        ],
      ),
      ...section(
        "Decide what must stay with a human",
        "A chatbot is not a clinician. It should not assess pain, recommend a treatment, interpret X-rays, or reassure someone about an urgent symptom. Tellvira is not intended for protected health information and does not offer a HIPAA business associate agreement. If the conversation starts moving toward personal health details, the answer should redirect the visitor to the practice.",
        "Insurance eligibility, final estimates, and cancellations also need care. The assistant may state a published cancellation policy, but staff must handle a specific patient's request. Do not ask for account credentials, insurance cards, or payment details. Check every form field and starter question for accidental invitations to disclose sensitive information.",
      ),
      ...section(
        "Test the experience before publishing",
        "Ask someone who does not work at the practice to try the site on a phone. Have them find evening hours, ask about parking, submit a visit request, and ask an out-of-scope health question. Review both the on-screen reply and the email that arrives at the front desk. The office should know who responds and how requests are tracked.",
        [
          "Compare the responses against a small ",
          link("/blog/chatbot-faq-template-for-small-business", "FAQ writing template"),
          ". Questions the assistant cannot answer reveal missing public content or a necessary handoff. Record those cases and update approved sources as needed. Avoid adding a speculative answer simply to fill the gap; uncertainty is useful when it sends a visitor to the right person.",
        ],
      ),
      ...section(
        "Keep your content current",
        "Assign ownership for hours, insurance lists, and new-patient instructions. A quarterly review may catch ordinary drift, while holiday closures and fee changes need updates as soon as they are published. A dated notice is especially helpful when an old webpage remains indexed. Remove superseded files from the assistant's sources when possible.",
        "Explain to staff what the assistant says about requests. If the front desk expects visitors to have an appointment already, the handoff has failed. A short internal checklist can cover the email inbox, response owner, and language staff use to confirm the actual time. Those small details matter more than a longer automated conversation.",
      ),
      ...section(
        "Choose a modest first launch",
        "Start with a few reliable questions and a contact handoff. Watch for repeated questions that your site already answers poorly, then improve the underlying pages. This gives both the visitor and the assistant a clearer source. A useful after-hours experience is one that states what the office knows, admits what it cannot verify, and points to the next person when needed.",
        [
          "If your practice wants to try that approach, ",
          link("/pricing", "see Tellvira pricing"),
          " or ",
          link("/contact", "contact the Tellvira team"),
          ". You can also read about ",
          link(
            "/blog/capture-leads-from-your-website-without-a-contact-form",
            "collecting website inquiries conversationally",
          ),
          " while keeping the request small and clear.",
        ],
      ),
      ...section(
        "Design for a worried late-night visitor",
        "A person reading an office website after hours may be anxious even when the question appears administrative. Use calm, direct wording. Put the emergency contact path in a visible location on the site, and make the assistant repeat only the practice-approved instruction when a visitor mentions urgency. Do not let a friendly tone become reassurance about symptoms or a claim that waiting is safe.",
        "Consider the difference between “What time do you open?” and “Should I wait until you open?” The first is an office fact; the second is a health decision. Staff should review these test conversations before launch. If the published source is unclear, improve the website text first so every visitor sees the same instruction.",
      ),
      ...subsection(
        "Review the request email with staff",
        "The message that reaches the front desk should identify a contact method and the visitor’s administrative request. Staff should not need to read a long chat transcript to understand what to do. Test how an inquiry appears when someone leaves only an email address, when they prefer a phone call, and when they do not choose a service.",
        "Agree on a way to mark a request as answered using the practice’s existing workflow. The assistant sends a request; it does not close the loop. If staff cannot reach a visitor, use the practice’s ordinary follow-up process. Keep the website wording aligned with the real process so patients are not left expecting an appointment that has not been confirmed.",
      ),
    ],
  },
  {
    ...dated,
    slug: "chatbot-faq-template-for-small-business",
    title: "A chatbot FAQ template for small businesses",
    metaTitle: "Small Business Chatbot FAQ Template and Guide | Tellvira",
    metaDescription:
      "Use this practical FAQ template to organize 25 common small business questions, write usable answers, and decide which requests should go to your team.",
    excerpt:
      "Use a 25-question checklist and a simple answer format to give your website assistant a reliable source.",
    category: "Guides",
    relatedNicheSlugs: ["salons", "restaurants", "online-stores"],
    relatedPostSlugs: [
      "chatbot-vs-live-chat-for-small-business",
      "how-to-add-an-ai-chatbot-to-wordpress-or-shopify",
    ],
    faq: [
      {
        question: "How many FAQs should a small business start with?",
        answer:
          "Start with the questions your team answers most often. A focused set of accurate answers is more useful than a long outdated list.",
      },
      {
        question: "Should an FAQ include private customer details?",
        answer:
          "No. Keep the knowledge base to approved public information and route individual account or order issues to staff.",
      },
      {
        question: "How often should answers be updated?",
        answer:
          "Review them when hours, prices, menus, policies, or services change, and check dated information before it expires.",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "A website assistant needs source material that answers the questions visitors actually ask. Many small business sites have a polished homepage but leave practical details spread across menus, policy pages, and social posts. Use the questions below to find gaps. You do not need to publish every answer at once; begin with the ones your team already knows are common.",
      },
      ...section(
        "Start with the essentials",
        "The first group covers whether a visitor can reach you and what happens next. These answers should be correct for each location, including exceptions. If your regular hours and holiday hours conflict, label the date on the exception. Put contact options in plain language and explain when a human needs to confirm a request.",
        "Draft an answer in one or two sentences for each question. Include a link or named page only when it helps someone complete the task. Avoid 'contact us' as the whole answer when you can share the published address, available services, or next step first.",
        [
          list([
            "1. Where are you located?",
            "2. What are your regular hours?",
            "3. Are holiday hours different?",
            "4. How can I contact your team?",
            "5. Is parking available?",
            "6. Is the entrance accessible?",
          ]),
        ],
      ),
      ...section(
        "Explain what you offer",
        "A service or product list is rarely enough for a new visitor. Explain the difference between common options, who should discuss a special request with staff, and where prices are fixed or only starting points. Keep the answer tied to the current public page rather than an internal price sheet that may change without notice.",
        [
          "A salon might explain service duration and staff specialties; see the ",
          link("/solutions/salons", "salon example"),
          ". A restaurant can explain menu categories without claiming that a dish is safe for someone with an allergy; see the ",
          link("/solutions/restaurants", "restaurant example"),
          ". Different industries need different limits, even when they use the same FAQ format.",
        ],
        [
          list([
            "7. What services or products do you offer?",
            "8. What is included in the most common option?",
            "9. What does it cost or what does 'starting at' mean?",
            "10. How long does a service usually take?",
            "11. Are there location or staff differences?",
            "12. Where can I find current menus or product details?",
          ]),
        ],
      ),
      ...section(
        "Describe requests and follow-up",
        "Visitors need to know whether a chat message submits a request or confirms an arrangement. State the difference explicitly. Tellvira can collect a name, contact details, and the visitor's request, then email that information to the business. The business must respond to confirm an appointment, viewing, or event. It cannot inspect a calendar or reservation system.",
        "Make the reply path concrete: which team receives the email, what details they need, and how the visitor should handle urgent matters. Do not publish a response-time promise you cannot meet. An after-hours request may be valuable even when the office cannot answer until the next working period.",
        [
          list([
            "13. How do I request an appointment or visit?",
            "14. Does submitting a request confirm a time?",
            "15. What details should I include?",
            "16. How will the team reply?",
            "17. What should I do if the matter is urgent?",
          ]),
        ],
      ),
      ...section(
        "Put policies in simple language",
        "Policy questions often reveal the most expensive gaps. A customer may want the cancellation deadline, exchange conditions, delivery range, or gift card terms before deciding to proceed. Publish the exact rule and the channel for a specific exception. Keep business policies separate from a third-party provider's rules.",
        [
          "An ",
          link("/solutions/online-stores", "online store"),
          " needs public shipping and return content, but order-specific problems must go to staff. Restaurants need dated holiday hours and allergy handoffs. Every business should make privacy information easy to find without putting private account records into the assistant's knowledge source.",
        ],
        [
          list([
            "18. What is the cancellation policy?",
            "19. Can I change a request?",
            "20. What are the return or exchange rules?",
            "21. What payment methods are listed?",
            "22. Are gift cards or vouchers available?",
            "23. What shipping or delivery areas apply?",
          ]),
        ],
      ),
      ...section(
        "Add the two questions that expose limits",
        "Every FAQ set should include a clear route for questions the assistant cannot answer. One question can ask how to reach a person; another can explain what information should not be shared in chat. For a clinic, that includes symptoms and medical records. For a store, it includes card numbers and passwords. For a restaurant, allergy safety belongs with staff.",
        "Do not train the assistant with hypothetical answers to specific customers. A public FAQ is a reference for general policy, not a way to infer a person's order, coverage, or eligibility. When information is missing, it is better to collect a request or direct the visitor to the right person than to guess.",
        [
          list([
            "24. How can I speak to a person about my situation?",
            "25. What should I avoid sharing in chat?",
          ]),
          note(
            "Answer pattern: state the public fact, name any condition, and give one next step. Example: 'Our published hours are 9 a.m. to 5 p.m. Monday through Friday. Holiday hours may differ; contact the team to confirm a specific date.'",
          ),
        ],
      ),
      ...section(
        "Write and review each answer",
        "Use one clear heading per question and one self-contained answer. If a rule depends on a product, location, or date, say so. Avoid 'always,' 'guaranteed,' and unexplained internal terms. Read each response aloud: could a first-time visitor follow it without knowing your business? If the answer is too long, split it into two questions.",
        [
          "For a worked example of after-hours boundaries, read ",
          link("/blog/how-to-answer-patient-questions-after-hours", "the dental front desk guide"),
          ". For the choice between automation and human operators, compare ",
          link("/blog/chatbot-vs-live-chat-for-small-business", "chatbots and live chat"),
          ". Both start from the same requirement: visitors should know when a human will take over.",
        ],
      ),
      ...section(
        "Turn the list into a maintenance habit",
        "Assign an owner to each group of answers. Hours may belong to operations, prices to a manager, and policy language to support. Review the list after a seasonal change, a new service, or a repeated unanswered question. Remove old copies so a visitor does not receive conflicting instructions from two pages.",
        [
          "Once your answers are ready, ",
          link("/pricing", "review pricing"),
          " or ",
          "ask Tellvira a setup question",
          ". Start with a small set of dependable answers, verify them on mobile, and expand only where real visitor questions show a need.",
        ],
      ),
      ...section(
        "Use examples instead of internal shorthand",
        "Suppose a shop says “standard dispatch applies.” A first-time buyer cannot tell what standard means. A clearer answer names the published dispatch range, explains when that clock starts, and sends unusual cases to support. The same method works for a salon’s late policy or an agency’s viewing process: state the rule as a visitor would need it.",
        "Check every answer for hidden assumptions. Does “we” refer to one location or all locations? Is a price current for every service? Does an estimated duration include consultation time? Add those details when you know them. When you do not, direct the visitor to someone who can verify instead of inventing an exception.",
      ),
      ...subsection(
        "Test with words customers actually use",
        "Staff may call a service by its official name while visitors ask for a plain-language version. Ask several people outside the business to search for the answer using their own terms. If they cannot find it, add a useful synonym to the source page or write a separate FAQ. Do not fill the site with repeated keyword variants.",
        "Read the assistant’s replies after each content change. Check whether it uses the current policy, whether its links point to a live page, and whether an unanswered question leads to a person. A small, reviewed set of FAQs can serve as a dependable base for future updates.",
      ),
    ],
  },
  {
    ...dated,
    slug: "capture-leads-from-your-website-without-a-contact-form",
    title: "Capture website leads without a contact form",
    metaTitle: "Capture Website Leads Without a Contact Form | Tellvira",
    metaDescription:
      "Learn when conversational lead capture helps, which details to request, and how to hand inquiries to your team without promising an automated booking.",
    excerpt:
      "Ask for contact details at the moment a visitor needs follow-up, and make the next step clear.",
    category: "Lead capture",
    relatedNicheSlugs: ["real-estate", "dental-practices"],
    relatedPostSlugs: [
      "how-to-answer-patient-questions-after-hours",
      "chatbot-vs-live-chat-for-small-business",
    ],
    faq: [
      {
        question: "Can a chatbot replace every contact form?",
        answer:
          "No. Keep a clear contact option. A conversation can help when visitors need answers before deciding to leave their details.",
      },
      {
        question: "What information should a lead form request?",
        answer:
          "Usually a name, one contact method, and a brief request are enough. Ask for other context only when it helps staff respond.",
      },
      {
        question: "Does sending a request confirm an appointment?",
        answer:
          "No. The business receives the request by email and must follow up to confirm any arrangement.",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "A contact form asks a visitor to explain their problem before receiving any help. That can work when the next step is obvious. It feels harder when someone is still comparing options, looking for a policy, or unsure which department to contact. A conversation can answer a routine question first, then invite an inquiry when a person needs a reply from your team.",
      },
      ...section(
        "Understand why a form gets skipped",
        "Some forms ask for too much too early: full address, phone number, company size, and a detailed message before the business has explained anything useful. Others hide behind a generic 'Submit' button with no explanation of what happens next. Visitors may simply return to search results to find the missing answer elsewhere.",
        "Look at the questions on the pages where people hesitate. A product page may need a sizing explanation. A dental practice page may need office hours and the new-patient process. A real estate listing may need published features and a clear way to ask for a viewing. A chat assistant can surface those facts from the content you provide.",
      ),
      ...section(
        "Ask for details at the point of need",
        "Begin with a useful answer, then offer a handoff when a visitor asks for a human response. A person who only wants your opening hours should not need to provide an email address. Someone requesting a viewing may choose to share a preferred area or time, but the first required details can remain a name and a contact method.",
        "Use the visitor's own wording for the request. If the person is asking about a specific product or service, include its name in the email to your team. Do not turn the conversation into an interrogation. Every additional field should have a practical reason tied to a staff follow-up.",
        [
          list([
            "Name, so the reply is personal",
            "Email or phone, chosen by the visitor",
            "A short request in the visitor's words",
            "Optional context such as a property reference or preferred contact time",
          ]),
        ],
      ),
      ...section(
        "Set an honest expectation",
        "Tellvira collects lead and request details and emails them to the business. It does not reserve a time, charge a customer, see a calendar, or check an order. A confirmation message should say the request was sent and that staff will reply. It should never imply a viewing, appointment, or table is confirmed.",
        [
          "For a property-specific example, see the ",
          link("/solutions/real-estate", "real estate solution"),
          ". It shows how published listing information can support a conversation while an agent handles a viewing request. For a front desk example, the ",
          link(
            "/blog/how-to-answer-patient-questions-after-hours",
            "after-hours patient questions guide",
          ),
          " explains why health information should stay outside chat.",
        ],
        [
          note(
            "A useful confirmation says what happened: 'Your request was emailed to our team. Someone will contact you to discuss next steps.'",
          ),
        ],
      ),
      ...section(
        "Keep consent and privacy understandable",
        "Ask for the data needed to answer the request and explain that it goes to the business for follow-up. Link to your business's privacy information where visitors can find it. If you send marketing messages later, handle the required consent through your normal process; a support request alone should not be treated as permission for unrelated outreach.",
        "Avoid collecting payment card details, account passwords, medical records, or other sensitive information in chat. Review the fields your assistant uses and the wording of its starter questions. A prompt like 'tell us everything about your condition' creates unnecessary risk and gives staff information they should receive through a suitable channel.",
      ),
      ...section(
        "Make follow-up operational",
        "Decide which inbox receives requests, who owns the first reply, and what happens when that person is away. The lead email is useful only if it enters a real workflow. Check whether the message includes enough context to continue the conversation without making the visitor repeat themselves.",
        "Response speed matters as an operational habit, but do not promise a specific number of minutes unless your team can meet it. A short, useful reply can acknowledge the request, answer the remaining question, and explain the next action. For anything that needs confirmation, give the visitor a person and a clear channel.",
      ),
      ...section(
        "Test with realistic conversations",
        "Try three paths: a visitor who just wants an answer, one who wants staff follow-up, and one who asks for something the assistant cannot verify. The first should end without demanding contact details. The second should result in a readable email. The third should state the limit and route the person to staff.",
        [
          "Compare this approach with ",
          link("/blog/chatbot-vs-live-chat-for-small-business", "live chat and hybrid support"),
          ". If your team already staffs a real-time chat during business hours, you may use it for complex questions while an assistant handles routine published information after hours. The handoff must remain clear in either setup.",
        ],
      ),
      ...section(
        "Improve the page behind the conversation",
        "A chat assistant cannot repair an unclear policy by guessing. Repeated questions show where the website itself needs a better answer. Add that answer to the relevant page or FAQ, update the assistant's source, and test again. This helps visitors who never open the chat as well.",
        [
          "You can ",
          link("/pricing", "review Tellvira pricing"),
          " or ",
          link("/contact", "contact the team"),
          " if you want to plan a small first launch. Keep your existing contact page visible so visitors can choose the route that works for them.",
        ],
      ),
      ...section(
        "Offer a clear choice of contact method",
        "Some visitors prefer email because they are comparing options at night; others want a phone conversation during business hours. Give the person a choice when your team supports both. Avoid asking for both fields without a reason. If you need a callback window, make it optional and explain that it is a preference, not a confirmed appointment.",
        "Show a visible contact page alongside the conversation. Someone who does not want to use chat should still be able to find the business’s ordinary contact details. The assistant’s role is to make a relevant request easier to send, not to become the only door to your team.",
      ),
      ...subsection(
        "Measure the quality of the handoff",
        "A large count of names does not mean the process is working. Review a sample of incoming requests: did staff know what the visitor wanted, could they reply using the supplied contact method, and did the initial answer set the right expectation? Remove fields that do not help that first response.",
        "If many people ask the same question before leaving a request, improve the page that led them into chat. If inquiries arrive without enough context, adjust the wording of the request prompt. Make one change at a time and ask the staff receiving email whether it helped. Their feedback is more useful than an invented benchmark. Check what visitors expected to happen after submitting and whether your team could answer from the information supplied. Ask whether the reply reached the right person.",
      ),
    ],
  },
  {
    ...dated,
    slug: "chatbot-vs-live-chat-for-small-business",
    title: "Chatbot vs live chat for a small business",
    metaTitle: "Chatbot vs Live Chat for Small Business | Tellvira",
    metaDescription:
      "Compare chatbots and staffed live chat on coverage, answer quality, cost, and handoff so you can choose a practical mix for your small business website.",
    excerpt:
      "Compare coverage, staff effort, response quality, and handoff before choosing a website chat setup.",
    category: "Comparisons",
    relatedNicheSlugs: ["restaurants", "online-stores"],
    relatedPostSlugs: [
      "capture-leads-from-your-website-without-a-contact-form",
      "chatbot-faq-template-for-small-business",
    ],
    faq: [
      {
        question: "Is a chatbot the same as live chat?",
        answer:
          "No. A chatbot answers from supplied content; live chat connects a visitor with a person who can investigate or make decisions.",
      },
      {
        question: "Can a small business use both?",
        answer:
          "Yes. A business can use an assistant for published FAQs and send requests or complex questions to staff through its own process.",
      },
      {
        question: "Which is better for order-specific problems?",
        answer:
          "A staff member who can access the store's order system should handle them. Tellvira cannot inspect orders or inventory.",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "A chat bubble can mean several different things. One website connects visitors to a staffed support desk; another answers from published information; a third asks for contact details. The label matters because it changes what a visitor expects. Compare the actual work each approach can do before choosing one for your small business.",
      },
      ...section(
        "What each option does well",
        "Live chat gives a visitor access to a person who can ask follow-up questions, use internal tools, and make a decision within the business's authority. It is strongest for unusual cases, account-specific issues, and conversations where judgment matters. Its quality depends on staff availability and training.",
        "A content-based assistant can answer the same public question repeatedly from approved pages, FAQs, and documents. It can be available when your staff are not online, but it cannot verify something missing from that content. Tellvira can collect a name, contact details, and a request for staff by email. It cannot act as a substitute for internal systems.",
      ),
      ...section(
        "Compare hours and staffing",
        "A live chat promise requires a real person at the stated times. If no one is assigned, a visitor may wait in a queue or receive no useful answer. Small teams should publish the hours when a person is available and offer another contact route outside those hours.",
        "An assistant can give routine answers at any hour, provided the source information is correct. It should say when staff will need to follow up rather than implying a person is currently reading the conversation. If your website receives many late-night questions about directions or policies, this distinction can make the experience clearer.",
      ),
      ...section(
        "Look beyond the subscription price",
        "Live chat has staffing and training costs as well as software costs. Someone must monitor the inbox, maintain coverage, and handle peaks. An assistant has setup and content maintenance work: policies must be written, reviewed, and updated. A cheaper tool is not useful if visitors get outdated answers or requests go unanswered.",
        [
          "Build a small inventory of frequent questions first. The ",
          link("/blog/chatbot-faq-template-for-small-business", "small business FAQ template"),
          " gives a practical starting list. Compare the time your team spends on those questions with the time needed to keep the answers current. Include follow-up ownership when evaluating either option.",
        ],
        [
          list([
            "Who writes and reviews public answers?",
            "Who covers the live chat queue?",
            "Who receives emailed requests?",
            "How are policies updated when they change?",
          ]),
        ],
      ),
      ...section(
        "Judge response quality by the task",
        "A correct public answer is useful even when it comes from an assistant. A fluent answer that guesses an unavailable fact is not. Test each approach against the actual questions your visitors ask. For a restaurant, a menu description may be straightforward, while allergy safety needs a staff conversation. For a store, shipping policy is public, while order status is private.",
        [
          "The ",
          link("/solutions/restaurants", "restaurant solution"),
          " and ",
          link("/solutions/online-stores", "online store solution"),
          " show those boundaries in context. Neither option should create a false expectation of reservation confirmation or order access. Staff remain responsible for decisions that require current operational data.",
        ],
        [
          note(
            "When the source does not answer a question, an honest handoff is a better response than a confident guess.",
          ),
        ],
      ),
      ...section(
        "Plan the handoff deliberately",
        "In live chat, a handoff may mean moving a conversation to a specialist or asking the visitor to wait. In an assistant workflow, it may mean collecting a short request and emailing it to the business. The visitor should know which happened and whether a person will respond later. The team should know where the request arrived.",
        "Test the handoff from both desktop and mobile. Submit a request outside business hours and verify the email is readable, assigned, and answered. If a visitor's question contains sensitive details, guide them to an appropriate channel rather than collecting more information in chat.",
      ),
      ...section(
        "Consider a hybrid workflow",
        "A small business may let an assistant answer published questions while a staffed channel handles exceptions. That arrangement can work if the site clearly identifies the two routes. Do not imply that the assistant can transfer a conversation directly into a live system unless you have built and tested that workflow.",
        [
          "For inquiries that need a later reply, read about ",
          link(
            "/blog/capture-leads-from-your-website-without-a-contact-form",
            "conversational lead capture",
          ),
          ". Use the visitor's request to give staff context, but keep fields short. A human can clarify the rest when they respond.",
        ],
      ),
      ...section(
        "Pick based on your visitors",
        "If most questions need account access or judgment, staffed chat may deserve priority. If many are repeated public FAQs, an assistant can help visitors find answers while staff focus on exceptions. Some sites need both; others should begin by improving their existing contact page and FAQ.",
        [
          "Explore ",
          link("/pricing", "Tellvira pricing"),
          " or ",
          link("/contact", "contact our team"),
          " for a content-based approach. Choose a setup your staff can maintain and describe its limits plainly to visitors.",
        ],
      ),
      ...section(
        "Map your busiest questions first",
        "Look at recent email, phone, and website questions and group them by the work required. Public hours, prices, and written policies are candidates for a content-based answer. A billing dispute, a specific delivery problem, or a complex event request needs someone with authority and access to the relevant records. This inventory helps you compare the two approaches using your own business, rather than a generic feature checklist.",
        "Notice the timing as well as the subject. A visitor asking a routine question late at night may benefit from an immediate published answer. A visitor negotiating a service package during office hours may prefer a person. If you promise staffed live chat, make the staffing schedule visible so the visitor knows when it is actually staffed.",
      ),
      ...subsection(
        "Keep the visitor informed during exceptions",
        "An assistant should say when it cannot verify a fact and offer a useful next step. Staffed chat should say when an operator needs more time or must consult someone else. Both experiences fail when they imply a decision has been made but no one has checked the underlying information.",
        "Write the handoff sentence before launching the tool. It should tell the visitor whether a request was emailed, whether someone is available now, and whether any appointment or reservation needs confirmation. Have staff read it aloud and compare it with how they actually work. A small wording change can prevent repeated follow-up questions.",
      ),
      ...subsection(
        "Review results without invented benchmarks",
        "Choose measures you can verify: unanswered routine questions, requests that lacked contact details, and cases where visitors thought a request was confirmed. Discuss these with the people who answer the inbox. Avoid assuming a chatbot always reduces costs or that live chat always improves sales; those outcomes depend on content quality, staffing, and the kind of visitor question.",
        "Review a few real scenarios on mobile and desktop each time a policy changes. If the assistant is weak on a frequently asked topic, improve the source page. If the same exception keeps reaching staff, consider whether a new public FAQ would help. Keep a person available for decisions that cannot be reduced to a stable answer.",
      ),
    ],
  },
  {
    ...dated,
    slug: "how-to-add-an-ai-chatbot-to-wordpress-or-shopify",
    title: "How to add an AI chatbot to WordPress or Shopify",
    metaTitle: "Add an AI Chatbot to WordPress or Shopify | Tellvira",
    metaDescription:
      "Learn where to place a chatbot script on WordPress, Shopify, Wix, Squarespace, or Webflow, then test the published site and common installation issues.",
    excerpt:
      "Place your dashboard script in a supported site code area and test it on real pages before launch.",
    category: "Installation",
    relatedNicheSlugs: ["online-stores", "salons"],
    relatedPostSlugs: [
      "chatbot-faq-template-for-small-business",
      "how-to-answer-patient-questions-after-hours",
    ],
    faq: [
      {
        question: "Where do I find the Tellvira snippet?",
        answer:
          "Copy the complete script shown in your Tellvira dashboard's Install section for the bot you want to publish.",
      },
      {
        question: "Does the script give Tellvira access to Shopify orders?",
        answer:
          "No. It places the assistant on your website; Tellvira answers from supplied content and cannot read orders or inventory.",
      },
      {
        question: "Why might the assistant not appear in an editor preview?",
        answer:
          "Some platforms limit custom scripts in previews. Check the published page and your platform's code placement settings.",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "A website chatbot is commonly added with a short script supplied by the service. Tellvira gives you a bot-specific snippet in the dashboard. Copy the whole snippet, including its attributes, and place it in a website area intended for custom code. You do not need to invent a URL or a bot identifier.",
      },
      ...section(
        "Understand what the script does",
        "The script loads the website assistant for your configured bot. It does not copy your store database into Tellvira, connect to a booking calendar, or grant access to private orders. The assistant's answers come from the website pages, FAQs, and uploaded documents you provide in the dashboard. Treat the snippet as website code and install it only where you are allowed to edit the site.",
        "The dashboard instruction is: 'Paste this snippet before the closing body tag.' On hosted platforms, the equivalent is often a footer or body-end custom code area. Keep the complete generated snippet intact. Avoid adding unknown script attributes or copying a sample identifier from another website.",
      ),
      ...section(
        "Add it to WordPress or WooCommerce",
        "A footer-scripts plugin can place the snippet without changing the theme's files. In the plugin's settings, choose the site-wide footer or body-end area, paste the full dashboard snippet, save, and view a published page. Plugin labels vary, so follow the documentation for the one your site already uses. Check that the snippet is added once, rather than once by the plugin and again by the theme.",
        "If your team edits theme code instead, use a child theme or another maintainable method. Changes made directly to a theme may be lost during updates. WooCommerce uses the same WordPress website placement for the assistant; installing the script does not give it access to WooCommerce orders. Order-specific problems should be emailed to your support team.",
        [
          list(
            [
              "Copy the exact snippet from your bot's Install page",
              "Choose a supported site-wide footer location",
              "Save, publish, and inspect a public page",
              "Test a routine answer and an emailed inquiry",
            ],
            "ol",
          ),
        ],
      ),
      ...section(
        "Add it to a Shopify storefront",
        "Shopify provides a theme code editor for stores that need code changes. In the active theme, use the supported code location near the closing body tag and paste the complete snippet once. Work in a duplicate theme first if your store uses a customized theme, then preview and publish according to your normal process. A theme change may need the snippet added again.",
        [
          "Test on a product page, a collection page, and a policy page. The assistant on your storefront does not automatically run inside hosted checkout. The ",
          link("/solutions/online-stores", "online store solution"),
          " explains the useful boundary: it can answer published shipping, returns, sizing, and care questions, then collect order-specific requests for staff. It cannot see an order's status or live inventory.",
        ],
        [
          note(
            "Do not paste a made-up sample script. Use the full snippet your dashboard generates for the specific bot and site.",
          ),
        ],
      ),
      ...section(
        "Use the code areas on other platforms",
        "Webflow has a Footer code area for custom code. Wix offers custom code placement at the end of the body on eligible sites. Squarespace offers code injection for supported plans and site configurations. Names and availability can vary by plan and editor version, so use the current help for your own account before making changes.",
        "Place the snippet in a site-wide area if you want the assistant on every page. A page-specific area is useful only when you deliberately want narrower coverage. After saving, publish the site and check a real URL. Some editors suppress third-party scripts in preview, so the public page is the better installation test.",
      ),
      ...section(
        "Check performance and page behavior",
        "A new script should not cover a checkout button, mobile navigation, or accessibility controls. Open the site at phone width, use the keyboard to reach the launcher, and confirm the page remains readable. Check several templates rather than only the homepage. Look for duplicate launchers, which usually mean the snippet was inserted in two places.",
        "If your site uses a content security policy, ask the person who manages it to review the script source. If the assistant appears only on some pages, compare their shared theme and footer settings. Keep a record of where you installed the snippet so the next theme or platform update does not silently remove it.",
      ),
      ...section(
        "Test answers and requests separately",
        "An installation can be technically successful while the content is incomplete. Ask a question that is answered in an approved FAQ, then ask one whose answer is missing. The first should reflect the supplied source; the second should state the limit or offer staff follow-up. Finally, submit a request and verify the business receives the email.",
        [
          "Use the ",
          link("/blog/chatbot-faq-template-for-small-business", "FAQ template"),
          " to prepare those first answers. If your site serves a dental practice, read the ",
          link("/blog/how-to-answer-patient-questions-after-hours", "after-hours front desk guide"),
          " before adding starter questions so you do not invite health details into chat.",
        ],
      ),
      ...section(
        "Keep the setup maintainable",
        "Document who owns the site code, who updates assistant content, and who checks inquiry emails. When a theme is replaced or a site is redesigned, recheck the launcher. When policy text changes, update the knowledge source and test the affected answer. A useful assistant depends as much on current content and staff follow-up as on the script itself.",
        [
          "If you are choosing a plan, ",
          link("/pricing", "see pricing"),
          ". For a placement or setup question, ",
          link("/contact", "contact Tellvira"),
          ". Starting with a few verified FAQs and one reliable handoff is easier to maintain than publishing every possible answer at once.",
        ],
      ),
      ...section(
        "Avoid common placement mistakes",
        "A script copied from the wrong bot can load a different greeting and source content than expected. Confirm the bot name in the dashboard before copying. A snippet pasted into a visible text block may display code to visitors instead of running it. Use a code injection or footer script field designed for scripts, then inspect the public page.",
        "Watch for duplicate installation after a redesign. A developer may add the script to the theme while a marketing plugin also inserts it. If two launchers appear, find both placements and keep one. Do not “fix” duplication by editing the generated bot identifier or adding unrecognized attributes.",
      ),
      ...subsection(
        "Keep content and installation separate",
        "A correctly placed script only makes the assistant available. It does not supply accurate answers by itself. Add your own website pages, FAQs, and approved documents in Tellvira, then test the questions visitors are likely to ask. For a store, include shipping and returns policies. For a practice, include public office details but keep health information out of chat.",
        "When a website platform changes its editor or theme, review the code placement again. When your business changes a price or policy, update the supplied source content. Assign these tasks to named people; otherwise a launcher may keep working while its answers quietly become stale.",
      ),
    ],
  },
];

function plainText(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(plainText).join("");
  if (value && typeof value === "object") return value.text || "";
  return "";
}

export function postWordCount(post) {
  const text = [
    post.title,
    ...post.body.map((block) =>
      block.items ? block.items.join(" ") : plainText(block.content || block.text || ""),
    ),
  ].join(" ");
  return (text.match(/\b[\w'-]+\b/g) || []).length;
}

export function readingMinutes(post) {
  return Math.max(1, Math.ceil(postWordCount(post) / 220));
}

posts.forEach((post) => {
  post.readingMinutes = readingMinutes(post);
});

export const publishedPosts = posts
  .filter((post) => post.published === true)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
