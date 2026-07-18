import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the original cinematic system and resilient first scene", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /From intelligence/);
  assert.match(html, /tower-fallback/);
  assert.match(html, /INTELLIGENCE/);
  assert.match(html, /STUDIO/);
  assert.match(html, /Matter holds/);
  assert.match(html, /Arcadian/);
  assert.match(html, /204 Rue du St-Sacrement/);
  assert.doesNotMatch(html, /Skyline Sovereignty|House of the Architect|practice-statement/);
});

test("renders key navigation destinations", async () => {
  for (const path of ["/about", "/studio", "/studio/portfolio", "/studio/portfolio/arcadian-courtyard", "/contact", "/partnerships", "/investors", "/intelligence", "/enterprise"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});

test("keeps cleanup, mobile fallback and configurable product links", async () => {
  const [home, css, env] = await Promise.all([
    readFile(new URL("../components/CinematicHome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
  ]);
  assert.match(home, /ctx\.revert\(\)/);
  assert.match(home, /ScrollTrigger/);
  assert.match(home, /SceneBoundary/);
  assert.match(home, /case-map[\s\S]*opacity:0/);
  assert.match(home, /NEXT_PUBLIC_INTELLIGENCE_URL/);
  assert.match(home, /NEXT_PUBLIC_ENTERPRISE_SUITE_URL/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /max-width:900px/);
  assert.match(css, /overflow:clip/);
  assert.match(env, /NEXT_PUBLIC_INTELLIGENCE_URL/);
  assert.match(env, /NEXT_PUBLIC_ENTERPRISE_SUITE_URL/);
});
