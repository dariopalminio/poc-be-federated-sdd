import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { buildApp } from "../dist/app.js";

test("GET /health returns the public success response", async (context) => {
  const app = await buildApp();
  context.after(() => app.close());

  const response = await app.inject({ method: "GET", url: "/health" });

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["content-type"], "application/json; charset=utf-8");
  assert.deepEqual(response.json(), { status: "ok" });
});

test("generated OpenAPI matches the versioned public health contract", async (context) => {
  const app = await buildApp();
  context.after(() => app.close());
  await app.ready();

  const generated = app.swagger();
  const versioned = JSON.parse(
    await readFile(
      new URL("../specs/001-health-endpoint/contracts/openapi.json", import.meta.url),
      "utf8",
    ),
  );
  const operation = generated.paths["/health"].get;
  const responseSchema = operation.responses["200"].content["application/json"].schema;

  assert.deepEqual(generated, versioned);
  assert.deepEqual(operation.security, []);
  assert.deepEqual(responseSchema.required, ["status"]);
  assert.deepEqual(responseSchema.properties.status.enum, ["ok"]);
  assert.equal(responseSchema.additionalProperties, false);
});