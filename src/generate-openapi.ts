import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildApp } from "./app.js";

const app = await buildApp();

try {
  await app.ready();
  const document = app.swagger();
  const outputPath = resolve(
    process.cwd(),
    "specs/001-health-endpoint/contracts/openapi.json",
  );

  await writeFile(outputPath, `${JSON.stringify(document, null, 2)}\n`, "utf8");
} finally {
  await app.close();
}