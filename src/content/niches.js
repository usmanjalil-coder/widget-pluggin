export const niches = [
  {
    slug: "dental-practices",
    published: true,
    updatedAt: "2026-10-31",
    metaTitle: "Dental Practice Chatbot for Office FAQs | Tellvira",
    metaDescription:
      "Use an AI chatbot for dental practices to answer office FAQs, capture new patient inquiries and collect appointment requests for your front desk to follow up.",
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
    "summary": "Answer office questions and send appointment requests to your front desk.",
    "sampleConversation": [{"from": "visitor", "text": "I am new to the practice. How do I ask for an evening visit?"}, {"from": "bot", "text": "I can explain the appointment request process from the office information provided. The front desk will confirm a time directly with you."}, {"from": "visitor", "text": "Can someone email me about the next steps?"}, {"from": "bot", "text": "You can leave your name, email, and preferred contact time for the office. Please do not include symptoms, treatment records, or other health details."}],
    "sections": [{"heading": "Build a useful front desk knowledge base", "paragraphs": ["Start with the questions a receptionist can answer without opening a patient record. Include a clear address, entrance directions, parking instructions, opening hours, and the process for becoming a new patient. If different locations have different hours, give each location its own labeled entry so visitors can identify the correct office.", "Use approved, public explanations of services rather than clinical notes or patient documents. For insurance, distinguish the plans your office lists from a promise that a particular treatment is covered. Keep the person responsible for reviewing these answers involved when office policies change. Outdated instructions can create extra work for the front desk."], "bullets": ["Separate routine hours from holiday closures.", "Describe how staff confirm appointment requests."]}, {"heading": "Keep personal care with the practice team", "paragraphs": ["Tellvira answers only from website pages, FAQs, and documents your practice supplies. It cannot inspect a calendar or confirm a slot. A useful handoff tells the visitor that their request goes to the office by email and that a staff member must follow up. Avoid promising a reply time unless the practice can consistently meet it.", "The assistant is not for protected health information, and Tellvira does not offer a HIPAA business associate agreement. Keep intake forms and medical conversations in the channels your practice already approves. Test questions about symptoms and treatment suitability before launch: the response should direct the visitor to the practice, not attempt a diagnosis or a recommendation."], "bullets": []}],
    "knowledgeChecklist": ["Office address, entrance details, and parking directions", "Regular opening hours and dated holiday notices", "Public service descriptions approved by the practice", "General insurance information with staff confirmation instructions", "New patient administrative steps without medical intake fields", "Appointment request and cancellation contact instructions"],
    relatedSlugs: ["salons", "real-estate"],
  },
{
  "slug": "real-estate",
  "published": true,
  "updatedAt": "2026-10-31",
  "metaTitle": "Real Estate Chatbot for Agent Inquiries | Tellvira",
  "metaDescription": "Answer questions from your published property pages, explain your agency process, and email buyer, seller, or renter inquiries to your team for follow-up.",
  "name": "Real estate",
  "h1": "AI chatbot for real estate agents and agencies",
  "intro": "Property research often happens after your office closes. Tellvira helps visitors understand the listing and neighborhood information your agency provides, then collects inquiries for an agent to follow up. It answers from your website pages, FAQs, and uploaded documents; it does not read live listing feeds.",
  "summary": "Share published property information and pass viewing inquiries to agents.",
  "painPointsHeading": "Keep property inquiries moving",
  "useCasesHeading": "Help visitors prepare for a conversation",
  "howItWorksHeading": "Prepare your content and install",
  "safetyNote": "Informational only, not legal or financial advice. The assistant shares the information your agency publishes and must remain fair-housing neutral: it must not steer or screen visitors.",
  "painPoints": [
    {
      "title": "Late-night listing questions",
      "body": "A visitor may want parking details, a published floor plan explanation, or your open-house instructions while agents are away. Make that information easier to find without suggesting that a property is still available."
    },
    {
      "title": "Different reasons for reaching out",
      "body": "Buyers, sellers, and renters need different next steps. Explain the process your agency publishes, then ask what kind of help the visitor wants before collecting a contact detail."
    },
    {
      "title": "Incomplete viewing requests",
      "body": "An email with a property reference and a preferred contact time gives your agent a clearer starting point. A viewing request still needs the agent to check availability and confirm arrangements."
    }
  ],
  "useCases": [
    {
      "title": "Published listing details",
      "body": "Answer factual questions about features described in the content you supply. Ask the agent to verify any detail missing from that content."
    },
    {
      "title": "Buyer and renter inquiries",
      "body": "Invite optional context such as an area of interest, budget range, and timeline in the inquiry. Use this to prepare a response, never to screen or exclude visitors."
    },
    {
      "title": "Seller process questions",
      "body": "Explain the agency’s published valuation request process, service outline, and fee FAQs. Specific pricing, contractual terms, and advice belong with your team."
    },
    {
      "title": "Open houses and viewing requests",
      "body": "Share dated open-house information from your pages and email viewing requests to the agency. The assistant cannot reserve a visit or check an agent’s calendar."
    }
  ],
  "howItWorks": [
    {
      "title": "Review your property sources",
      "body": "Add current listing pages and agency FAQs. Remove withdrawn property information from the supplied knowledge and label date-sensitive notices clearly."
    },
    {
      "title": "Prepare an inclusive handoff",
      "body": "Choose basic contact fields. Invite optional property context in the visitor’s request and explain that an agent will respond directly."
    },
    {
      "title": "Place the website snippet",
      "body": "Copy the script from your dashboard into your website’s supported footer code area. Test it on a listing page as well as your main agency page."
    }
  ],
  "faq": [
    {
      "question": "Does Tellvira connect to MLS or live listings?",
      "answer": "No. It answers only from content your agency provides. Your team must update supplied listing information and confirm current property availability."
    },
    {
      "question": "Can it arrange a viewing?",
      "answer": "It can collect a viewing request and email the details to your agency. An agent must confirm the property, time, and access arrangements."
    },
    {
      "question": "Can buyers share their budget and timeline?",
      "answer": "Yes, as optional context in their inquiry. These details help an agent prepare for follow-up; they must not be used by the assistant to screen visitors."
    },
    {
      "question": "Can sellers ask about your fees?",
      "answer": "The assistant can explain fee information you publish. It cannot negotiate terms, value a property, or give financial advice."
    },
    {
      "question": "What about neighborhood recommendations?",
      "answer": "It should share neutral facts from your agency’s published pages, not recommend where someone should live based on personal characteristics."
    },
    {
      "question": "How does an agent receive the inquiry?",
      "answer": "Tellvira collects the visitor’s name, contact details, and request and emails them to the business for follow-up."
    }
  ],
  "sampleConversation": [
    {
      "from": "visitor",
      "text": "I saw the Oak Street page. Can I view the property this weekend?"
    },
    {
      "from": "bot",
      "text": "I can pass a viewing request to the agency. An agent needs to confirm availability and a time; I cannot check a live schedule."
    },
    {
      "from": "visitor",
      "text": "What should I include?"
    },
    {
      "from": "bot",
      "text": "Leave your name, contact details, and the property reference. You may also include your preferred time and optional area, budget range, or moving timeline."
    }
  ],
  "sections": [
    {
      "heading": "Keep property content current",
      "paragraphs": [
        "A property page can remain online after its details change. Assign someone to review the information supplied to the assistant whenever a listing changes. Keep property references consistent across pages and documents so similar addresses are not confused.",
        "For neighborhood pages, use factual descriptions that the agency has approved. Explain where published information ends and where an agent needs to verify a detail. A missing answer is a reason for a handoff, not an invitation to infer amenities or availability."
      ],
      "bullets": []
    },
    {
      "heading": "Make the next step clear for each inquiry",
      "paragraphs": [
        "A seller asking how to start a conversation does not need the same questions as a renter asking about a published application process. Let the visitor explain their purpose first. Ask only for enough contact information and context for a useful reply.",
        "Keep identification documents, financial paperwork, and detailed applications out of chat. Your agent can explain the appropriate channel later. Before publishing, test a withdrawn listing, an unanswered fee question, and a viewing request to check that each ends with an honest next step."
      ],
      "bullets": []
    }
  ],
  "knowledgeChecklist": [
    "Published listing descriptions with property references",
    "Agency contact details and office hours",
    "Dated open-house notices and viewing request instructions",
    "Buyer, seller, and renter process FAQs",
    "Approved fee explanations and service descriptions",
    "Neutral neighborhood information published by the agency",
    "Instructions for correcting stale property information"
  ],
  "relatedSlugs": [
    "online-stores",
    "salons"
  ]
},
{
  "slug": "salons",
  "published": true,
  "updatedAt": "2026-10-31",
  "metaTitle": "Salon Chatbot for Services and Appointments | Tellvira",
  "metaDescription": "Explain salon services, prices, visit preparation, and policies from your own content. Send appointment and bridal inquiries to staff to confirm directly.",
  "name": "Salons, spas and barbershops",
  "h1": "AI chatbot for salons, spas and barbershops",
  "intro": "A guest choosing a haircut, spa service, or bridal consultation often has questions before contacting your team. Tellvira answers from your service pages, FAQs, and uploaded documents, then emails appointment requests for staff to follow up. Your team remains responsible for confirming every appointment.",
  "summary": "Explain services and policies, then hand appointment requests to staff.",
  "painPointsHeading": "Answer the details guests ask before visiting",
  "useCasesHeading": "Useful answers before the first visit",
  "howItWorksHeading": "Prepare your content and install",
  "safetyNote": "The assistant provides general business information, not medical advice or treatment recommendations. Guests should discuss personal care concerns directly with your qualified staff.",
  "painPoints": [
    {
      "title": "Service names need context",
      "body": "A first-time guest may not know the difference between two services on your menu. Share the descriptions you publish so they can ask your staff a more specific question."
    },
    {
      "title": "Staff cannot always answer the phone",
      "body": "When your team is with clients, visitors still need hours, parking information, and cancellation rules. Make those routine answers available from approved content."
    },
    {
      "title": "Special events need a conversation",
      "body": "Bridal groups and event clients may ask about several people, services, and dates. Collect a clear inquiry for your coordinator instead of implying a package is confirmed."
    }
  ],
  "useCases": [
    {
      "title": "Service prices and duration",
      "body": "Explain listed prices, starting prices, and estimated service durations. Flag where the team needs to assess the request before quoting a final price."
    },
    {
      "title": "Staff specialties",
      "body": "Describe the specialties included in your published staff profiles. The assistant cannot see a stylist’s schedule or decide which treatment suits a guest."
    },
    {
      "title": "Preparation and policies",
      "body": "Share general first-visit instructions, late-arrival rules, and cancellation policies. Direct questions requiring individual care advice to staff."
    },
    {
      "title": "Gift cards and event inquiries",
      "body": "Explain published gift card terms and gather bridal or special-event requests. Staff handle purchases, group arrangements, and final details."
    }
  ],
  "howItWorks": [
    {
      "title": "Organize the service menu",
      "body": "Add your latest service list, prices, durations, and staff profiles. Identify location-specific information if you have more than one salon."
    },
    {
      "title": "Choose a welcoming greeting",
      "body": "Invite questions about services and the visit. Ask for a name, contact detail, and service request only when a guest wants staff follow-up."
    },
    {
      "title": "Add the assistant to your site",
      "body": "Use the dashboard snippet in the site’s footer or supported custom code area. Check the launcher beside mobile appointment buttons so both remain accessible."
    }
  ],
  "faq": [
    {
      "question": "Does it confirm appointments?",
      "answer": "No. It emails appointment requests to your business. Staff check their schedule and contact the guest to confirm a time."
    },
    {
      "question": "Can it explain starting prices?",
      "answer": "Yes, when your supplied menu explains them. Final quotes and any adjustments must be confirmed by your staff."
    },
    {
      "question": "Can guests ask for a particular stylist?",
      "answer": "They can include a preferred stylist in their request. The assistant cannot check that person’s availability."
    },
    {
      "question": "How are bridal inquiries handled?",
      "answer": "Guests can leave contact details and general event requirements for your team. Your coordinator follows up about dates, group size, services, and pricing."
    },
    {
      "question": "Can it recommend a treatment for a skin condition?",
      "answer": "No. It should direct personal health or treatment questions to staff rather than collect medical details or recommend care."
    },
    {
      "question": "Can it answer gift card questions?",
      "answer": "It can explain the gift card information and purchase instructions you provide. It does not sell or redeem gift cards."
    }
  ],
  "sampleConversation": [
    {
      "from": "visitor",
      "text": "Can I ask about hair styling for a wedding party?"
    },
    {
      "from": "bot",
      "text": "Yes. I can share the bridal service information the salon provides and send your inquiry to the team. Staff need to confirm dates and arrangements."
    },
    {
      "from": "visitor",
      "text": "We have four people and are still choosing a date."
    },
    {
      "from": "bot",
      "text": "Include that in your request with your name and contact details. A coordinator can follow up; this does not hold a date or appointment."
    }
  ],
  "sections": [
    {
      "heading": "Write a menu that explains the differences",
      "paragraphs": [
        "Use plain descriptions beside service names. Explain whether a listed duration is an estimate and what a starting price includes. If a consultation is required before quoting a service, state that directly instead of leaving a visitor to infer the final cost.",
        "Add practical details that help people plan: the entrance, parking options, accessibility information, and your late-arrival policy. Keep first-visit preparation general and approved by your team. The assistant should not improvise instructions about products, skin conditions, or treatment suitability."
      ],
      "bullets": []
    },
    {
      "heading": "Prepare staff for appointment follow-up",
      "paragraphs": [
        "Give the person checking inquiry emails a simple process for replying. A guest may request a service and a day without knowing which staff member to choose. Staff can clarify the request and offer suitable options through the business’s normal process.",
        "Update the assistant’s source content when prices, gift card rules, or holiday hours change. Test a request outside opening hours and one for a fully unspecified date. Both should make clear that a team member must respond before plans are settled."
      ],
      "bullets": []
    }
  ],
  "knowledgeChecklist": [
    "Current service menu with starting and fixed prices labeled",
    "Estimated durations and consultation requirements",
    "Public staff profiles and specialties",
    "Cancellation, deposit, and late-arrival policies",
    "First-visit preparation approved by staff",
    "Gift card terms and purchase instructions",
    "Bridal and special-event inquiry contact details",
    "Hours, address, parking, and accessibility notes"
  ],
  "relatedSlugs": [
    "dental-practices",
    "restaurants"
  ]
},
{
  "slug": "restaurants",
  "published": true,
  "updatedAt": "2026-10-31",
  "metaTitle": "Restaurant Chatbot for Menu and Guest FAQs | Tellvira",
  "metaDescription": "Help guests find menu details, hours, catering information, and restaurant policies. Email reservation and event requests to your team for confirmation.",
  "name": "Restaurants and cafes",
  "h1": "AI chatbot for restaurants and cafes",
  "intro": "Guests checking your restaurant website want practical answers: what you serve, when the kitchen is open, and how to ask about a group visit. Tellvira uses your menu pages, FAQs, and uploaded documents to answer those questions and send requests to your team by email.",
  "summary": "Share menu and visit information and collect group or catering requests.",
  "painPointsHeading": "Give guests useful information before they call",
  "useCasesHeading": "Handle routine hospitality questions",
  "howItWorksHeading": "Prepare your content and install",
  "safetyNote": "Menu information is not allergy advice. The assistant must not guarantee allergen safety; guests with allergies should contact restaurant staff directly before making food choices.",
  "painPoints": [
    {
      "title": "Menu questions during service",
      "body": "Your team may be busy when someone asks about a published vegetarian option or takeaway instructions. An assistant can explain the content you supply while staff focus on service."
    },
    {
      "title": "Hours vary across the week",
      "body": "Kitchen hours, dining hours, and holiday closures can differ. Clearly labeled source information helps guests plan without assuming a regular schedule applies to every date."
    },
    {
      "title": "Large parties need details",
      "body": "A private event or catering inquiry needs more context than a quick question. Collect the request and contact details so the right person can follow up."
    }
  ],
  "useCases": [
    {
      "title": "Menu and dietary descriptions",
      "body": "Explain dishes and dietary labels exactly as published. Allergy questions go to staff; menu labels cannot establish allergen safety or prevent cross-contact."
    },
    {
      "title": "Reservation requests",
      "body": "Collect a requested date, party details in the message, and contact information for the team. Staff must confirm seating; the assistant does not access a reservation system."
    },
    {
      "title": "Catering and private events",
      "body": "Share published packages, inquiry instructions, and venue information. Email requests for a human discussion about menu options, capacity, and arrangements."
    },
    {
      "title": "Getting food and getting here",
      "body": "Answer from your published delivery, takeaway, parking, and accessibility details. The assistant cannot take an order, track a delivery, or check the kitchen’s live availability."
    }
  ],
  "howItWorks": [
    {
      "title": "Gather your guest information",
      "body": "Add readable menu text and separate dining, kitchen, and holiday hours. Avoid relying on an old menu image as the only source of current details."
    },
    {
      "title": "Assign request follow-up",
      "body": "Choose who checks emailed inquiries and what contact details they need. Make the distinction between a submitted request and a confirmed table explicit."
    },
    {
      "title": "Install and check the mobile menu page",
      "body": "Paste the dashboard snippet into the supported website code area. Test it alongside your menu and existing call button on a small screen."
    }
  ],
  "faq": [
    {
      "question": "Can it confirm a table reservation?",
      "answer": "No. It collects a reservation request and emails your team. Staff must confirm the date, seating, and any other arrangements directly."
    },
    {
      "question": "Can it identify safe dishes for an allergy?",
      "answer": "No. It can repeat published menu descriptions, but allergy and cross-contact questions must go to staff. It cannot guarantee a dish is safe."
    },
    {
      "question": "Can it answer holiday-hours questions?",
      "answer": "Yes, if you supply dated holiday information. If a date is not covered, guests should confirm with the restaurant."
    },
    {
      "question": "Does it connect to our POS?",
      "answer": "No. Tellvira answers from your supplied content. It does not access the POS, take payments, or check live orders."
    },
    {
      "question": "Can guests ask about catering?",
      "answer": "Yes. It can explain published catering information and collect contact details and a request for your events team to follow up."
    },
    {
      "question": "What happens when a menu changes?",
      "answer": "Update the content provided to the assistant. Staff should confirm any item availability or details not covered by the current published menu."
    }
  ],
  "sampleConversation": [
    {
      "from": "visitor",
      "text": "Can our group ask about a private dinner next month?"
    },
    {
      "from": "bot",
      "text": "I can share the restaurant’s published event information and email a request to the team. They need to confirm space and arrangements."
    },
    {
      "from": "visitor",
      "text": "One guest has a serious allergy. Can you choose a safe menu?"
    },
    {
      "from": "bot",
      "text": "Please discuss the allergy directly with restaurant staff. I cannot assess allergen safety. For the event inquiry, leave your name, contact details, and general party requirements."
    }
  ],
  "sections": [
    {
      "heading": "Separate menu facts from kitchen decisions",
      "paragraphs": [
        "Write dish descriptions in text and keep dietary labels consistent with the menu your staff approves. Do not turn a vegetarian label into an assurance about ingredients, preparation, or cross-contact. Those questions need a staff conversation about the specific guest’s needs.",
        "Include how takeaway and delivery work according to your published policy. Distinguish opening hours from the times those services operate. If your website links to another ordering service, describe the published instructions without implying that Tellvira can read or control that service."
      ],
      "bullets": []
    },
    {
      "heading": "Set expectations for group inquiries",
      "paragraphs": [
        "A useful inquiry gives your events coordinator a starting point: a proposed date, approximate party size, type of gathering, and a way to reach the organizer. Guests can include those details in their request without treating the conversation as a confirmed reservation.",
        "Review seasonal menus and event information together. An old package can create expectations your team cannot meet. Test a question about a sold-out item, a holiday without published hours, and an allergy; the assistant should ask guests to confirm these matters with staff."
      ],
      "bullets": []
    }
  ],
  "knowledgeChecklist": [
    "Current menu descriptions and approved dietary labels",
    "Separate kitchen, dining, and holiday hours",
    "Reservation request instructions and confirmation policy",
    "Large-party and private-event inquiry information",
    "Published catering menus and contact process",
    "Delivery areas and takeaway instructions as published",
    "Parking, entrance, and accessibility information"
  ],
  "relatedSlugs": [
    "salons",
    "online-stores"
  ]
},
{
  "slug": "online-stores",
  "published": true,
  "updatedAt": "2026-10-31",
  "metaTitle": "Online Store Chatbot for Shopper Questions | Tellvira",
  "metaDescription": "Answer shipping, returns, sizing, and product care questions from your store content. Send order-specific requests to your team without accessing orders.",
  "name": "Online stores",
  "h1": "AI chatbot for online stores and Shopify shops",
  "intro": "Shoppers often need one policy detail before deciding what to do next. Tellvira answers from your store pages, FAQs, and uploaded documents, covering shipping, sizing, returns, and care instructions. When a question concerns a particular order, it collects a request for your team to handle by email.",
  "summary": "Answer store policy questions and hand order-specific issues to support.",
  "painPointsHeading": "Make shopping policies easier to understand",
  "useCasesHeading": "Support the questions your content can answer",
  "howItWorksHeading": "Prepare your content and install",
  "safetyNote": "Tellvira cannot see orders, inventory, or payment records and does not connect to your store systems. Order-specific decisions and support remain with your team.",
  "painPoints": [
    {
      "title": "Shipping details are scattered",
      "body": "Visitors may find a delivery estimate on one page and destination rules elsewhere. Put clear, consistent policy text into the assistant’s knowledge so it can explain what your store publishes."
    },
    {
      "title": "Fit and care questions interrupt shopping",
      "body": "A size chart or washing instruction can be difficult to locate on mobile. Help shoppers find the relevant published explanation without promising an item will fit."
    },
    {
      "title": "Order questions need your team",
      "body": "A customer with a delayed parcel needs someone who can inspect the order. A clear email handoff avoids pretending the assistant has access to private purchase records."
    }
  ],
  "useCases": [
    {
      "title": "Shipping times and costs",
      "body": "Explain published dispatch estimates, delivery ranges, destinations, and charges. Distinguish estimates from promises and direct unusual cases to your support team."
    },
    {
      "title": "Returns and exchanges",
      "body": "Describe your store’s own return window, conditions, and request process. The assistant cannot approve a return or issue a refund."
    },
    {
      "title": "Sizing and product care",
      "body": "Share measurements and care guidance from supplied product content. Ask shoppers to identify the product rather than generalizing across different materials or collections."
    },
    {
      "title": "Payment and order handoff",
      "body": "Explain listed payment methods. For an order-specific problem, ask for an order number, contact details, and a brief request so staff can follow up; never request payment card details."
    }
  ],
  "howItWorks": [
    {
      "title": "Prepare store policy sources",
      "body": "Add current shipping, returns, size guides, and care pages. Keep your own customer policies clearly separate from Tellvira’s subscription policies."
    },
    {
      "title": "Copy your dashboard snippet",
      "body": "Use the full script provided for your bot. Follow the dashboard instruction exactly: Paste this snippet before the closing body tag."
    },
    {
      "title": "Use a supported code location",
      "body": "For Shopify, use theme code or an appropriate custom code area. WordPress/WooCommerce can use a footer-scripts plugin; Webflow provides Footer code. Check your platform permissions before publishing."
    }
  ],
  "faq": [
    {
      "question": "Does it connect to Shopify orders?",
      "answer": "No. Installing the website script does not grant access to Shopify orders. The assistant answers from content you provide and emails requests to your team."
    },
    {
      "question": "Can it check whether a product is in stock?",
      "answer": "No. It cannot read live inventory. Shoppers should check your storefront or ask the store team to confirm availability."
    },
    {
      "question": "How does it handle an order problem?",
      "answer": "It can collect an order number, name, contact details, and a short description for your team to follow up. It cannot look up order status."
    },
    {
      "question": "Can it explain our return policy?",
      "answer": "Yes, from the policy content you provide. Your team still decides whether a specific purchase qualifies and handles any return or refund."
    },
    {
      "question": "Does it work on WooCommerce or Webflow sites?",
      "answer": "You can add the dashboard script through a supported footer or custom code area. It does not need access to WooCommerce orders to answer supplied store FAQs."
    },
    {
      "question": "Should customers enter payment details?",
      "answer": "No. Keep card numbers, passwords, and financial documents out of the conversation. Staff should use the store’s established support process when more information is needed."
    }
  ],
  "sampleConversation": [
    {
      "from": "visitor",
      "text": "Where is my order? I have the confirmation number."
    },
    {
      "from": "bot",
      "text": "I cannot see your order or shipping status. I can send an inquiry to the store team so they can check."
    },
    {
      "from": "visitor",
      "text": "What information do they need?"
    },
    {
      "from": "bot",
      "text": "Please include your order number, name, contact email, and a short description of the problem. Do not share card details or passwords."
    }
  ],
  "sections": [
    {
      "heading": "Write policies around real shopping questions",
      "paragraphs": [
        "Separate dispatch time from carrier delivery estimates, and explain whether days mean business days. If shipping charges depend on destination or cart contents, publish the rule and direct shoppers to checkout for the final amount. The assistant cannot calculate from a live cart.",
        "For sizing, label units and distinguish body measurements from garment measurements. Add care instructions for each relevant product type. Avoid replacing product-specific guidance with a broad answer that could damage a different material. Missing instructions should lead to a support inquiry."
      ],
      "bullets": []
    },
    {
      "heading": "Test across your storefront",
      "paragraphs": [
        "Install once in a shared website location, then check a product page, a collection page, and your policy pages. A storefront script does not automatically appear in a hosted checkout. Test the published website rather than assuming an editor preview represents what shoppers see.",
        "Run one routine policy question and one order-specific inquiry. The first should use your supplied content; the second should make the email handoff clear. Confirm your team receives the request and knows who will respond before directing customers to the assistant."
      ],
      "bullets": []
    }
  ],
  "knowledgeChecklist": [
    "Shipping destinations, charges, and delivery estimates",
    "Return and exchange conditions with request instructions",
    "Product-specific size charts with measurement units",
    "Care instructions grouped by material or product",
    "Published payment methods and checkout guidance",
    "Order support contact and handoff instructions",
    "Dated exceptions for seasonal delivery schedules"
  ],
  "relatedSlugs": [
    "restaurants",
    "real-estate"
  ]
},
];

export const publishedNiches = niches.filter((niche) => niche.published === true);
