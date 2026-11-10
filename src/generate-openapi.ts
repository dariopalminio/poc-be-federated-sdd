import { mkdir } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { buildApp } from "./app.js";

const app = await buildApp();

try {
  await app.ready();
  const document = app.swagger({ yaml: true });
  if (typeof document !== "string") {
    throw new TypeError("Fastify Swagger did not return a YAML document.");
  }
  const outputPath = resolve(
    process.cwd(),
    "specs/contracts/openapi/health-api.yaml",
  );

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, document.endsWith("\n") ? document : `${document}\n`, "utf8");
} finally {
  await app.close();
}