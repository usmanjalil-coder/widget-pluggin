"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { homeFaq } from "@/content/faqs";

export function FaqAccordion({ items = homeFaq }) {
  const [expanded, setExpanded] = useState("faq-0");
  return (
    <Accordion
      type="single"
      collapsible
      value={expanded}
      onValueChange={setExpanded}
      className="rounded-xl border border-border bg-card px-5 shadow-sm"
    >
      {items.map(({ question, answer }, index) => (
        <AccordionItem data-faq-item key={question} value={`faq-${index}`}>
          <AccordionTrigger data-faq-question className="text-base">
            {question}
          </AccordionTrigger>
          <AccordionContent
            forceMount
            hidden={expanded !== `faq-${index}`}
            data-faq-answer
            className="text-sm leading-6 text-muted-foreground"
          >
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
