const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());
const args = process.argv.slice(2);
const source = args.find((arg) => !arg.startsWith("--")) || process.env.TELLVIRA_PLANS_CONFIG;
const target = path.resolve("src/content/plan-fallback.json");

function sync() {
if (!source) {
  if (!fs.existsSync(target)) throw new Error("Generate the plan fallback from config/plans.php first.");
  console.log("[plans] Using committed fallback; set TELLVIRA_PLANS_CONFIG to sync from Laravel.");
} else {
  // Evaluate only the supplied local config, without booting Laravel or reading its .env.
  const php = 'function env($key, $default = null) { return $default; } echo json_encode(require $argv[1], JSON_THROW_ON_ERROR);';
  const config = JSON.parse(execFileSync("php", ["-r", php, path.resolve(source)], {
    encoding: "utf8",
    timeout: 10000,
  }));
  const plans = Object.entries(config)
    .filter(([, plan]) => plan.is_active !== false)
    .map(([key, plan]) => ({
      key,
      name: plan.name,
      description: null,
      priceCents: plan.price_cents,
      currency: plan.currency,
      billingInterval: "month",
      features: [
        { key: "conversations", name: "Monthly conversations", type: "number", value: plan.conversations_limit },
        { key: "bots", name: "Chatbots", type: "number", value: plan.bots_limit },
        { key: "remove_branding", name: "Remove branding", type: "boolean", value: !plan.powered_by_badge },
      ],
    }));
  if (!plans.length || plans.some((plan) => !Number.isSafeInteger(plan.priceCents) || plan.priceCents < 0 || plan.currency !== "USD")) {
    throw new Error("Invalid Laravel plan configuration; existing fallback was not changed.");
  }
  const output = JSON.stringify({ source: "config/plans.php", plans }, null, 2) + "\n";
  if (args.includes("--check")) {
    if (!fs.existsSync(target) || fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n") !== output) {
      throw new Error("Plan fallback is out of sync. Run npm run sync:plans with the config path.");
    }
    console.log("[plans] Fallback matches Laravel config.");
  } else {
    fs.writeFileSync(target, output);
    console.log("[plans] Fallback synchronized from Laravel config.");
  }
}

}

try {
  sync();
} catch (error) {
  if (!args.includes("--if-available") || !fs.existsSync(target)) throw error;
  console.warn("[plans] Config sync unavailable; retaining the committed fallback.");
}
