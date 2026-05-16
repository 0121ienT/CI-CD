import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const appRoot = path.resolve(path.dirname(__filename), "..");

test("compose file defines all demo services", () => {
  const compose = fs.readFileSync(path.join(appRoot, "docker-compose.yaml"), "utf8");

  assert.match(compose, /api:/);
  assert.match(compose, /postgres:/);
  assert.match(compose, /redis:/);
  assert.match(compose, /prometheus:/);
  assert.match(compose, /grafana:/);
});

test("api exposes health, orders, stats, and metrics routes", () => {
  const server = fs.readFileSync(path.join(appRoot, "src/server.js"), "utf8");

  assert.match(server, /"\/health"/);
  assert.match(server, /"\/api\/orders"/);
  assert.match(server, /"\/api\/stats"/);
  assert.match(server, /"\/metrics"/);
});
