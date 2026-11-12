import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { buildApp } from "../dist/app.js";

const schemaPath = fileURLToPath(
  new URL("../specs/contracts/openapi/health-api.yaml", import.meta.url),
);
const app = await buildApp();

try {
  const baseUrl = await app.listen({ host: "127.0.0.1", port: 0 });
  const exitCode = await new Promise((resolve) => {
    const schemathesis = spawn(
      "uvx",
      [
        "--from",
        "schemathesis==4.33.4",
        "schemathesis",
        "run",
        schemaPath,
        "--url",
        baseUrl,
      ],
      { stdio: "inherit" },
    );

    schemathesis.once("error", (error) => {
      console.error(`No se pudo iniciar Schemathesis mediante uvx: ${error.message}`);
      resolve(1);
    });
    schemathesis.once("close", (code) => resolve(code ?? 1));
  });

  process.exitCode = exitCode;
} finally {
  await app.close();
}