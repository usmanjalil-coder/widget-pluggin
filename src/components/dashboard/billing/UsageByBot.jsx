"use client";

import { Badge, Card, EmptyState } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const number = new Intl.NumberFormat("en-US");

function usageShare(conversations, total) {
  if (!Number.isFinite(conversations) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.min(100, Math.max(0, (conversations / total) * 100));
}

function ShareBar({ conversations, total, botName }) {
  const percent = usageShare(conversations, total);

  return (
    <div className="flex min-w-32 items-center gap-3">
      <div
        role="progressbar"
        aria-label={`${botName} share of conversations`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        className="h-2 flex-1 overflow-hidden rounded-full bg-primary/15"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 text-right text-[13px] text-muted-foreground">
        {Math.round(percent)}%
      </span>
    </div>
  );
}

function BotName({ item }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="truncate font-medium">{item.botName}</span>
      {item.deleted && <Badge tone="default">Deleted</Badge>}
    </div>
  );
}

export default function UsageByBot({ items, conversationTotal }) {
  if (!Array.isArray(items)) return null;

  const total = Number.isFinite(conversationTotal)
    ? conversationTotal
    : items.reduce((sum, item) => sum + item.conversations, 0);
  const leadsTotal = items.reduce((sum, item) => sum + item.leads, 0);

  return (
    <section aria-labelledby="usage-by-bot-heading" className="space-y-4">
      <div>
        <h2 id="usage-by-bot-heading" className="text-base font-semibold">
          Usage by bot
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Conversations and leads captured during the current billing cycle.
        </p>
      </div>

      {!items.length ? (
        <EmptyState
          title="No bot usage yet"
          body="Per-bot activity will appear here after your bots receive conversations."
        />
      ) : (
        <Card className="min-w-0 p-0">
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Bot</TableHead>
                  <TableHead className="text-right">Conversations</TableHead>
                  <TableHead className="text-right">Leads captured</TableHead>
                  <TableHead className="px-6">Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.botId}>
                    <TableCell className="max-w-64 px-6">
                      <BotName item={item} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {number.format(item.conversations)}
                    </TableCell>
                    <TableCell className="text-right">{number.format(item.leads)}</TableCell>
                    <TableCell className="px-6">
                      <ShareBar
                        conversations={item.conversations}
                        total={total}
                        botName={item.botName}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="px-6 font-semibold">Total</TableCell>
                  <TableCell className="text-right font-semibold">{number.format(total)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {number.format(leadsTotal)}
                  </TableCell>
                  <TableCell className="px-6 text-[13px] text-muted-foreground">
                    {total > 0 ? "100%" : "0%"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <div className="divide-y md:hidden">
            {items.map((item) => (
              <article key={item.botId} className="space-y-4 p-5">
                <BotName item={item} />
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-[13px] text-muted-foreground">Conversations</dt>
                    <dd className="mt-1 font-semibold">{number.format(item.conversations)}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-muted-foreground">Leads captured</dt>
                    <dd className="mt-1 font-semibold">{number.format(item.leads)}</dd>
                  </div>
                </dl>
                <ShareBar
                  conversations={item.conversations}
                  total={total}
                  botName={item.botName}
                />
              </article>
            ))}
            <div className="grid grid-cols-2 gap-4 bg-muted/50 p-5 text-sm">
              <div>
                <p className="text-[13px] text-muted-foreground">Total conversations</p>
                <p className="mt-1 font-semibold">{number.format(total)}</p>
              </div>
              <div>
                <p className="text-[13px] text-muted-foreground">Total leads</p>
                <p className="mt-1 font-semibold">{number.format(leadsTotal)}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </section>
  );
}
