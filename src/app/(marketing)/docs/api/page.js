import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { PostToc } from "@/components/marketing/PostToc";
import { ApiCodeBlock } from "@/components/marketing/ApiCodeBlock";
import { Badge } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiDocs, apiDocsBaseUrl } from "@/content/apiDocs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "API Reference",
  description:
    "Server-to-server Chat API reference for Tellvira: authentication, POST /api/v1/public/chat parameters, SSE events, errors, rate limits, and examples.",
  path: "/docs/api",
});

const wideColumns = new Set([
  "Description",
  "What to do",
  "When sent",
  "Notes",
]);

function DocTable({ columns, rows }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground${
                  wideColumns.has(column) ? " w-[40%]" : ""
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((cells, rowIndex) => (
            <tr key={rowIndex} className="align-top transition-colors hover:bg-muted/30">
              {cells.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ApiDocsPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "API Reference", path: "/docs/api" },
        ]}
      />
      <article className="[--toc-offset:96px] [&_h1]:scroll-mt-[var(--toc-offset)] [&_h2]:scroll-mt-[var(--toc-offset)] [&_h3]:scroll-mt-[var(--toc-offset)]">
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="info">Server-to-Server API</Badge>
            <span className="text-sm font-medium text-muted-foreground">
              {apiDocs.planNote}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {apiDocs.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {apiDocs.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/account#api-keys"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Manage API keys
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View plans
            </Link>
          </div>
        </header>

        <div className="mt-10">
          <div className="xl:hidden">
            <PostToc items={apiDocs.sections} />
          </div>
          <div className="mt-6 grid gap-8 xl:mt-0 xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-10">
          <div className="min-w-0 space-y-12">
            <section aria-labelledby="overview">
              <h2 id="overview" className="text-2xl font-semibold text-foreground">
                Overview
              </h2>
              <div className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                {apiDocs.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="before-you-start">
              <h2 id="before-you-start" className="text-2xl font-semibold text-foreground">
                Before you start
              </h2>
              <ul className="mt-4 space-y-3 rounded-xl border border-border bg-card p-5 text-sm leading-6 text-muted-foreground">
                {apiDocs.beforeYouStart.map((item) => (
                  <li key={item.label} className="flex flex-wrap items-baseline justify-between gap-2">
                    <span>
                      <strong className="font-semibold text-foreground">{item.label}:</strong>{" "}
                      {item.text}
                    </span>
                    <Link
                      href={item.href}
                      className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.linkLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="authentication">
              <h2 id="authentication" className="text-2xl font-semibold text-foreground">
                Authentication
              </h2>
              <div className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                {apiDocs.authentication.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-4">
                <ApiCodeBlock
                  label="Authorization header"
                  code="Authorization: Bearer tv_live_your_api_key_here"
                />
              </div>
            </section>

            <section aria-labelledby="base-url">
              <h2 id="base-url" className="text-2xl font-semibold text-foreground">
                Base URL
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Send all Chat API requests over HTTPS to your Tellvira API origin:
              </p>
              <div className="mt-4">
                <ApiCodeBlock label="Base URL" code={apiDocsBaseUrl} />
              </div>
            </section>

            <section aria-labelledby="endpoint">
              <h2 id="endpoint" className="text-2xl font-semibold text-foreground">
                Endpoint
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {apiDocs.endpoint.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Badge tone="info">{apiDocs.endpoint.method}</Badge>
                <code className="break-all text-sm font-medium text-foreground">
                  {apiDocs.endpoint.path}
                </code>
              </div>
            </section>

            <section aria-labelledby="headers">
              <h2 id="headers" className="text-2xl font-semibold text-foreground">
                Headers
              </h2>
              <DocTable
                columns={["Name", "Required", "Value", "Description"]}
                rows={apiDocs.headers.map((header) => [
                  <code key="name" className="font-medium text-foreground">
                    {header.name}
                  </code>,
                  header.required,
                  <code key="value" className="text-xs text-foreground">
                    {header.value}
                  </code>,
                  header.description,
                ])}
              />
            </section>

            <section aria-labelledby="body-parameters">
              <h2 id="body-parameters" className="text-2xl font-semibold text-foreground">
                Body parameters
              </h2>
              <DocTable
                columns={["Name", "Type", "Required", "Description"]}
                rows={apiDocs.bodyParams.map((param) => [
                  <code key="name" className="font-medium text-foreground">
                    {param.name}
                  </code>,
                  <code key="type" className="text-xs text-foreground">
                    {param.type}
                  </code>,
                  param.required,
                  param.description,
                ])}
              />
            </section>

            <section aria-labelledby="response">
              <h2 id="response" className="text-2xl font-semibold text-foreground">
                Response
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Successful requests return HTTP <code>200</code> with{" "}
                <code>Content-Type: text/event-stream</code>. Each event includes an{" "}
                <code>event:</code> name and a JSON-encoded <code>data:</code> line.
              </p>
              <DocTable
                columns={["Event", "Payload fields", "When sent"]}
                rows={apiDocs.sseEvents.map((item) => [
                  <code key="event" className="font-medium text-foreground">
                    {item.event}
                  </code>,
                  <code key="payload" className="text-xs text-foreground">
                    {item.payload}
                  </code>,
                  item.whenSent,
                ])}
              />
            </section>

            <section aria-labelledby="errors">
              <h2 id="errors" className="text-2xl font-semibold text-foreground">
                Errors
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Failures before streaming begins return standard JSON error envelopes with{" "}
                <code>success: false</code>, <code>responseCode</code>, <code>message</code>,{" "}
                <code>errors</code>, and an optional machine-readable <code>code</code>.
              </p>
              <DocTable
                columns={["HTTP status", "code", "Meaning", "What to do"]}
                rows={apiDocs.errors.map((err) => [
                  <code key="status" className="font-medium text-foreground">
                    {err.status}
                  </code>,
                  err.code === "—" ? (
                    <span key="code" className="text-muted-foreground">
                      —
                    </span>
                  ) : (
                    <code key="code" className="text-xs text-foreground">
                      {err.code}
                    </code>
                  ),
                  err.meaning,
                  err.action,
                ])}
              />
            </section>

            <section aria-labelledby="rate-limits">
              <h2 id="rate-limits" className="text-2xl font-semibold text-foreground">
                Rate limits
              </h2>
              <DocTable
                columns={["Scope", "Limit", "Notes"]}
                rows={apiDocs.rateLimits.map((item) => [
                  <span key="scope" className="font-medium text-foreground">
                    {item.scope}
                  </span>,
                  item.limit,
                  item.notes,
                ])}
              />
            </section>

            <section aria-labelledby="examples">
              <h2 id="examples" className="text-2xl font-semibold text-foreground">
                Examples
              </h2>
              <Tabs defaultValue={apiDocs.examples[0].id} className="mt-4 min-w-0">
                <TabsList
                  aria-label="Code example language"
                  className="mb-4 w-full flex-wrap justify-start gap-1 group-data-[orientation=horizontal]/tabs:h-auto sm:w-fit"
                >
                  {apiDocs.examples.map((example) => (
                    <TabsTrigger
                      key={example.id}
                      value={example.id}
                      className="h-auto flex-none px-3 py-2 text-foreground"
                    >
                      {example.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {apiDocs.examples.map((example) => (
                  <TabsContent key={example.id} value={example.id} className="mt-0">
                    <ApiCodeBlock label={`${example.label} example`} code={example.code} />
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            <section aria-labelledby="best-practices">
              <h2 id="best-practices" className="text-2xl font-semibold text-foreground">
                Best practices
              </h2>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-base leading-7 text-muted-foreground">
                {apiDocs.bestPractices.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className="hidden xl:block">
            <PostToc items={apiDocs.sections} />
          </div>
          </div>
        </div>
      </article>
    </div>
  );
}
