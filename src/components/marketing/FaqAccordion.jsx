"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  ["How long does setup take?", "Most businesses are live in under 15 minutes. Import your docs, match the colors, and add your script snippet."],
  ["Which websites does it work on?", "It works on custom sites, landing pages, WordPress, Shopify, Wix, and other hosted pages that allow a script tag."],
  ["What happens if the bot does not know the answer?", "It answers from your imported content and politely says it does not know when it is outside the source material. You can review the conversation later and improve the knowledge base."],
  ["Can I change colors and messages?", "Yes. The dashboard includes a live preview so you can update brand colors, greeting text, launch label, and placement before saving."],
  ["What counts as a conversation?", "A conversation is one visitor chat session, however many messages it has."],
  ["What happens when I reach my plan limit?", "Visitors see a friendly unavailable message. You get an email at 80% and 100%, and can upgrade anytime."],
  ["Can I cancel anytime?", "Yes. There is no long-term contract required. You can pause or cancel at the end of a billing cycle."],
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue="faq-0" className="rounded-xl border border-border bg-card px-5 shadow-sm">
      {faqItems.map(([question, answer], index) => (
        <AccordionItem key={question} value={`faq-${index}`}>
          <AccordionTrigger className="text-base">{question}</AccordionTrigger>
          <AccordionContent className="text-sm leading-6 text-muted-foreground">
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
