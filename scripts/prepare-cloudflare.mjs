import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const inputPath = fileURLToPath(new URL("../dist/server/wrangler.json", import.meta.url));
const outputPath = fileURLToPath(
  new URL("../dist/server/wrangler.cloudflare.json", import.meta.url),
);

const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID?.trim();
if (!databaseId) {
  throw new Error(
    "CLOUDFLARE_D1_DATABASE_ID is required. Copy the database ID from Cloudflare D1 into the Workers build variables.",
  );
}

const databaseName =
  process.env.CLOUDFLARE_D1_DATABASE_NAME?.trim() ||
  "la-lanterna-verde-db";
const workerName =
  process.env.CLOUDFLARE_WORKER_NAME?.trim() || "la-lanterna-verde";

const config = JSON.parse(readFileSync(inputPath, "utf8"));
config.name = workerName;
config.topLevelName = workerName;
config.vars = { ...config.vars, AUTH_MODE: "password" };
config.d1_databases = [
  {
    binding: "DB",
    database_name: databaseName,
    database_id: databaseId,
    migrations_dir: "../../drizzle",
  },
];

writeFileSync(outputPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
console.log(`Prepared Cloudflare Worker configuration at ${outputPath.slice(projectRoot.length)}`);
