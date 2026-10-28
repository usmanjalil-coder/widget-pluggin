const fs = require("node:fs");
const zlib = require("node:zlib");
const { parse } = require("next/dist/compiled/node-html-parser");

const manifest = JSON.parse(fs.readFileSync(".next/prerender-manifest.json", "utf8"));
const routes = Object.keys(manifest.routes).filter((route) =>
  ["/", "/pricing", "/solutions", "/contact", "/terms", "/privacy", "/refunds"].includes(route)
  || route.startsWith("/solutions/"));

const sizes = routes.map((route) => {
  const file = `.next/server/app/${route === "/" ? "index" : route.slice(1)}.html`;
  const document = parse(fs.readFileSync(file, "utf8"));
  const sources = new Set(document.querySelectorAll("script[src]").map((node) => node.getAttribute("src")));
  const chunks = [...sources].filter((source) => source.startsWith("/_next/")).map((source) => {
    const bytes = fs.readFileSync(`.next/${source.slice(7).split("?")[0]}`);
    return { bytes: bytes.length, gzip: zlib.gzipSync(bytes).length };
  });
  return {
    route,
    chunks: chunks.length,
    rawKiB: (chunks.reduce((total, chunk) => total + chunk.bytes, 0) / 1024).toFixed(1),
    gzipKiB: (chunks.reduce((total, chunk) => total + chunk.gzip, 0) / 1024).toFixed(1),
  };
});

console.log("Initial external JavaScript from the existing build; excludes deferred chunks and inline RSC data.");
console.table(sizes);
