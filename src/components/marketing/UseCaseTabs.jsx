"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const answers = {
  Clinics: ["Yes, we are open until 7 PM on Tuesdays and Thursdays.", "Sure. What day works for you? Our team will confirm a time."],
  Salons: ["Yes. What date is your event?", "Which day would you prefer? A stylist can confirm."],
  "Real estate": ["What area and price range are you considering?", "Which listing would you like to visit?"],
  Restaurants: ["Yes, the menu marks our vegetarian dishes.", "How many guests? Our team can check availability."],
  "Online stores": ["You can find the return window on our returns page.", "What is your postal code? I can check delivery options."],
};

export function UseCaseTabs({ items }) {
  return (
    <Tabs defaultValue="Clinics" className="mt-10">
      <TabsList aria-label="Business type" className="w-full flex-wrap gap-1 group-data-[orientation=horizontal]/tabs:h-auto">
        {items.map(({ label }) => (
          <TabsTrigger key={label} value={label} className="min-h-10 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground motion-reduce:transition-none">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grid min-h-52">
        {items.map((item) => (
          <TabsContent key={item.label} value={item.label} forceMount
            className="col-start-1 row-start-1 grid content-start items-start gap-3 rounded-xl border border-border bg-card p-3 shadow-sm data-[state=inactive]:invisible md:grid-cols-[1fr_2fr]">
            <div>
              <span className="text-primary">{item.icon}</span>
              <h3 className="mt-2 text-lg font-semibold">{item.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="space-y-2 rounded-xl bg-muted/30 p-3">
              {item.questions.map((question, index) => (
                <div key={question} className="space-y-1.5 text-sm">
                  <p className="ml-auto w-fit max-w-[90%] rounded-xl bg-primary px-3 py-2 text-primary-foreground">{question}</p>
                  <p className="w-fit max-w-[90%] rounded-xl bg-muted px-3 py-2">{answers[item.label][index]}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
