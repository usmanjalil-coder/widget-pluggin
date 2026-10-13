"use client";

import { memo, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UseCaseContent = memo(function UseCaseContent({ item }) {
  return (
    <TabsContent
      value={item.label}
      className="mt-4 rounded-xl border border-border bg-card p-6 shadow-sm data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-150"
    >
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div>
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {item.icon}
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-primary">
            Example workflow
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">{item.label}</h3>
          <p className="mt-2 text-base text-muted-foreground">{item.description}</p>
        </div>
        <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-4">
          {item.visibleQuestions.map((question, index) => (
            <div
              key={question}
              className={`max-w-[85%] rounded-xl p-3 text-sm ${index === 1 ? "ml-auto bg-primary text-primary-foreground" : "bg-card text-foreground shadow-sm"}`}
            >
              {question}
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
});

export const UseCaseTabs = memo(function UseCaseTabs({ items }) {
  const visibleItems = useMemo(
    () => items.map((item) => ({ ...item, visibleQuestions: item.questions.slice(0, 3) })),
    [items],
  );

  return (
    <Tabs defaultValue={visibleItems[0].label} className="mt-10">
      <TabsList className="h-auto w-full flex-wrap justify-start gap-1 p-1">
        {visibleItems.map((item) => (
          <TabsTrigger key={item.label} value={item.label} className="min-h-10 flex-1 px-3 text-sm">
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {visibleItems.map((item) => (
        <UseCaseContent key={item.label} item={item} />
      ))}
    </Tabs>
  );
});
