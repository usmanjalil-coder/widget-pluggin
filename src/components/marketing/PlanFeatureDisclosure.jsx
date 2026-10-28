"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function PlanFeatureDisclosure({ count, children }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="more">
        <AccordionTrigger className="py-2 text-primary hover:no-underline">
          View more ({count})
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
