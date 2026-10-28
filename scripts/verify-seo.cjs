const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
// Use the HTML parser already bundled with the installed Next.js version.
const { parse } = require("next/dist/compiled/node-html-parser");

const args = process.argv.slice(2);
const base = args.find((arg) => /^https?:\/\//.test(arg)) || "http://localhost:3000";
const production = args.includes("--production");
const expectedOrigin =
  args.find((arg) => arg.startsWith("--site-url="))?.split("=")[1] ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";
const text = (element) => element?.textContent.replace(/\s+/g, " ").trim();
const canonical = (route) => new URL(route, expectedOrigin).href.replace(/\/$/, "");

async function request(route, options = {}) {
  return fetch(new URL(route, base), {
    redirect: "manual",
    signal: AbortSignal.timeout(30000),
    ...options,
  });
}

function requestWithHost(route, headers) {
  const url = new URL(route, base);
  const transport = url.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = transport.get(url, { headers, timeout: 30000 }, (response) => {
      response.resume();
      resolve({ status: response.statusCode, location: response.headers.location });
    });
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("Redirect check timed out")));
  });
}

async function main() {
  const { publishedNiches } = await import(pathToFileURL(path.resolve("src/content/niches.js")));
  const routes = [
    "/",
    "/pricing",
    "/solutions",
    "/terms",
    "/privacy",
    "/refunds",
    "/contact",
    ...publishedNiches.map(({ slug }) => `/solutions/${slug}`),
  ];
  const titles = new Set();
  const descriptions = new Set();
  const prerender = JSON.parse(fs.readFileSync(".next/prerender-manifest.json", "utf8"));

  for (const route of routes) {
    assert(prerender.routes[route], `${route}: missing from static prerender manifest`);
    const response = await request(route);
    assert.equal(response.status, 200, `${route}: public page must return 200 without login`);
    const document = parse(await response.text());
    assert.equal(document.querySelectorAll("main").length, 1, `${route}: one main landmark`);
    assert.equal(document.querySelectorAll("h1").length, 1, `${route}: one h1`);
    let headingLevel = 0;
    for (const heading of document.querySelector("main").querySelectorAll("h1,h2,h3,h4,h5,h6")) {
      const level = Number(heading.tagName.slice(1));
      assert(level <= headingLevel + 1, `${route}: skipped heading level at ${text(heading)}`);
      headingLevel = level;
    }
    assert.equal(document.querySelectorAll("title").length, 1, `${route}: one title`);
    const title = text(document.querySelector("title"));
    assert(title.length > 0 && title.length <= 60, `${route}: title length ${title.length}`);
    assert(!titles.has(title), `${route}: duplicate title`);
    titles.add(title);
    const metas = document.querySelectorAll('meta[name="description"]');
    assert.equal(metas.length, 1, `${route}: one description`);
    const description = metas[0].getAttribute("content");
    assert(
      description.length >= 120 && description.length <= 155,
      `${route}: description length ${description.length}`,
    );
    assert(!descriptions.has(description), `${route}: duplicate description`);
    descriptions.add(description);
    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    assert.equal(canonicals.length, 1, `${route}: one canonical`);
    assert.equal(
      canonicals[0].getAttribute("href"),
      canonical(route),
      `${route}: absolute canonical`,
    );
    const meta = (selector) => document.querySelector(selector)?.getAttribute("content");
    assert.equal(meta('meta[property="og:title"]'), title, `${route}: OG title`);
    assert.equal(meta('meta[property="og:description"]'), description, `${route}: OG description`);
    assert.equal(meta('meta[property="og:url"]'), canonical(route), `${route}: OG URL`);
    assert.equal(meta('meta[property="og:locale"]'), "en_US");
    assert.equal(meta('meta[name="twitter:card"]'), "summary_large_image");
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      assert.equal(new URL(meta(selector)).origin, new URL(expectedOrigin).origin);
    }
    const robots = meta('meta[name="robots"]');
    assert(
      production ? !robots.includes("noindex") : robots.includes("noindex"),
      `${route}: robots gate`,
    );
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert(response.headers.has("permissions-policy"));
    assert.equal(response.headers.has("x-robots-tag"), !production, `${route}: header gate`);
    assert(!document.querySelector('meta[name="keywords"]'));
    for (const img of document.querySelectorAll("img")) {
      assert(img.hasAttribute("alt"), `${route}: missing image alt`);
      assert(
        Number(img.getAttribute("width")) > 0 && Number(img.getAttribute("height")) > 0,
        `${route}: missing image dimensions`,
      );
    }
    for (const anchor of document.querySelectorAll("a")) {
      assert(!/^click here$/i.test(text(anchor)), `${route}: generic anchor text`);
    }
    const schemas = document
      .querySelectorAll('script[type="application/ld+json"]')
      .flatMap((script) => JSON.parse(script.textContent));
    assert(
      schemas.every((schema) => schema["@context"] === "https://schema.org" && schema["@type"]),
    );
    assert(!JSON.stringify(schemas).match(/AggregateRating|SearchAction|"@type":"Review"/));
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
    const visibleFaq = document.querySelectorAll("[data-faq-item]").map((item) => ({
      question: text(item.querySelector("[data-faq-question]")),
      answer: text(item.querySelector("[data-faq-answer]")),
    }));
    if (faq || visibleFaq.length) {
      assert.deepEqual(
        faq?.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })),
        visibleFaq,
        `${route}: FAQ markup must match rendered answers exactly`,
      );
    }
    if (["/", "/pricing"].includes(route)) {
      const software = schemas.find((schema) => schema["@type"] === "SoftwareApplication");
      assert(
        software?.offers.length,
        `${route}: missing real plan offers; check Laravel connectivity`,
      );
      const cards = document.querySelectorAll("[data-plan-price]");
      assert.equal(software.offers.length, cards.length);
      for (const [index, offer] of software.offers.entries()) {
        assert.equal(
          Number(offer.price),
          Number(cards[index].getAttribute("data-plan-price")) / 100,
        );
        assert.equal(offer.priceCurrency, cards[index].getAttribute("data-plan-currency"));
        assert.equal(offer.priceSpecification.billingDuration, "P1M");
      }
    }
    if (route === "/") {
      assert(schemas.some((schema) => schema["@type"] === "WebSite"));
      const organization = schemas.find((schema) => schema["@type"] === "Organization");
      assert.equal(organization.email, "support@tellvira.com");
      assert.match(organization.logo, /^https?:\/\/.+\.png$/);
      const logo = Buffer.from(
        await (await request(new URL(organization.logo).pathname)).arrayBuffer(),
      );
      assert(logo.readUInt32BE(16) >= 112 && logo.readUInt32BE(20) >= 112);
    }
    if (route === "/pricing" || route.startsWith("/solutions")) {
      assert(schemas.some((schema) => schema["@type"] === "BreadcrumbList"));
      assert(document.querySelector('nav[aria-label="Breadcrumb"]'));
    }
    if (route === "/contact") {
      assert.equal(schemas.length, 0, "Contact should not add structured data");
      for (const mailbox of ["support", "billing", "legal"]) {
        assert(text(document.querySelector("main")).includes(`${mailbox}@tellvira.com`));
      }
    }
    console.log(`PASS ${route} (${title.length} title / ${description.length} description)`);
  }

  const robots = await (await request("/robots.txt")).text();
  const sitemap = parse(await (await request("/sitemap.xml")).text());
  const urls = sitemap.querySelectorAll("loc").map(text);
  if (production) {
    assert.match(robots, /Disallow: \/dashboard/);
    assert.match(robots, /Disallow: \/api\//);
    assert(!/Disallow: \/(?:login|signup|reset-password|pay)/.test(robots));
    assert.deepEqual(urls.sort(), routes.map(canonical).sort());
    assert.equal(sitemap.querySelectorAll("lastmod").length, routes.length);
    assert.equal(sitemap.querySelectorAll("priority,changefreq").length, 0);
  } else {
    assert.match(robots, /^Disallow: \/$/m);
    assert.equal(urls.length, 0);
  }
  for (const route of [
    "/login",
    "/signup",
    "/reset-password",
    "/pay",
    "/onboarding",
    "/dashboard",
    "/dashboard/bots",
  ]) {
    const response = await request(route);
    assert.equal(response.status, 200, `${route}: existing route response`);
    const document = parse(await response.text());
    assert.match(
      document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      /noindex, nofollow/,
    );
    if (route.startsWith("/dashboard"))
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
  }
  for (const route of ["/seo-check-missing-page", "/solutions/seo-check-missing-niche"]) {
    assert.equal((await request(route)).status, 404, `${route}: real 404 required`);
  }
  const queryPage = parse(await (await request("/contact?topic=billing")).text());
  assert.equal(
    queryPage.querySelector('link[rel="canonical"]').getAttribute("href"),
    canonical("/contact"),
  );
  const slash = await request("/pricing/");
  assert.equal(slash.status, 308);
  assert.equal(new URL(slash.headers.get("location"), base).pathname, "/pricing");
  for (const route of ["/opengraph-image", "/twitter-image"]) {
    const response = await request(route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
  if (production) {
    const host = new URL(expectedOrigin).host;
    for (const headers of [{ host: `www.${host}` }, { host, "x-forwarded-proto": "http" }]) {
      const response = await requestWithHost("/pricing?source=check", headers);
      assert.equal(response.status, 308);
      assert.equal(response.location, `${canonical("/pricing")}?source=check`);
    }
  }
  console.log(
    `SEO verification passed: ${routes.length} static marketing routes; ${production ? "production" : "non-production"} indexing.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
