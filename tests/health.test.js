import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { parse } from "yaml";
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

  const generatedYaml = app.swagger({ yaml: true });
  assert.equal(typeof generatedYaml, "string");
  const generated = parse(generatedYaml);
  const versioned = parse(
    await readFile(
      new URL("../specs/contracts/openapi/health-api.yaml", import.meta.url),
      "utf8",
    ),
  );
  const operation = generated.paths["/health"].get;
  const responseSchema = operation.responses["200"].content["application/json"].schema;

  assert.deepEqual(generated, versioned);
  assert.equal(versioned.openapi, "3.0.3");
  assert.equal(versioned.info.version, "0.1.0");
  assert.deepEqual(operation.security, []);
  assert.deepEqual(responseSchema.required, ["status"]);
  assert.deepEqual(responseSchema.properties.status.enum, ["ok"]);
  assert.equal(responseSchema.additionalProperties, false);
});