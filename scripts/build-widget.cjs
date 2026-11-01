const path = require("node:path");
const esbuild = require("esbuild");
const { loadEnvConfig } = require("@next/env");

const watch = process.argv.includes("--watch");
const projectDir = path.resolve(__dirname, "..");
loadEnvConfig(projectDir, watch);

async function main() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!apiBase) throw new Error("NEXT_PUBLIC_API_BASE_URL is required to build the widget.");
  const url = new URL(apiBase);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("NEXT_PUBLIC_API_BASE_URL must be an HTTP or HTTPS URL.");

  const options = {
    absWorkingDir: projectDir,
    entryPoints: ["widget/src/index.js"],
    bundle: true,
    minify: !watch,
    format: "iife",
    globalName: "ChatbotWidgetBundle",
    outfile: "public/widget.js",
    define: { "process.env.NEXT_PUBLIC_API_BASE_URL": JSON.stringify(apiBase) },
    logLevel: "info",
  };
  if (watch) {
    const context = await esbuild.context(options);
    await context.watch();
  } else {
    await esbuild.build(options);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
