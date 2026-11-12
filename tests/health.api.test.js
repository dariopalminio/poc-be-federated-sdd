import assert from "node:assert/strict";
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

test("unsupported methods on an existing route return 405", async (context) => {
  const app = await buildApp();
  context.after(() => app.close());

  const response = await app.inject({ method: "QUERY", url: "/health" });

  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.allow, "GET, HEAD");
});