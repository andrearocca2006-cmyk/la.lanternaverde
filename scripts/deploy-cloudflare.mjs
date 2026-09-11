import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const configPath = fileURLToPath(
  new URL("../dist/server/wrangler.cloudflare.json", import.meta.url),
);
const wranglerPath = fileURLToPath(
  new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url),
);

if (!existsSync(configPath)) {
  throw new Error(
    "Cloudflare configuration is missing. Run the cloudflare:build script first.",
  );
}

function runWrangler(args) {
  const result = spawnSync(process.execPath, [wranglerPath, ...args], {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

runWrangler([
  "d1",
  "migrations",
  "apply",
  "DB",
  "--remote",
  "--config",
  configPath,
]);
runWrangler(["deploy", "--config", configPath]);
