import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  clampSlideIndex,
  getNextSlideIndex,
  getPreviousSlideIndex,
  getSlideIndexForKey,
  slides,
} from "./deck.js";

const textOf = (slide) =>
  [
    slide.section,
    slide.kicker,
    slide.title,
    slide.body,
    slide.keyMessage,
    ...(slide.points ?? []),
    ...(slide.details ?? []).flatMap((detail) => [detail.label, detail.text]),
    ...(slide.commands ?? []).flatMap((command) => [command.label, command.code, command.result]),
    ...(slide.checklist ?? []),
    ...(slide.roadmap ?? []),
  ].join(" ");

test("deck is a Docker beginner workshop in Vietnamese", () => {
  assert.ok(slides.length >= 14);
  assert.equal(slides[0].title, "Docker cơ bản cho người mới");

  const combined = slides.map(textOf).join(" ");
  assert.match(combined, /Docker/);
  assert.match(combined, /beginner|người mới|workshop/i);
  assert.match(combined, /Dockerfile/);
  assert.match(combined, /Image/);
  assert.match(combined, /Container/);
  assert.match(combined, /Docker Compose/);
  assert.match(combined, /docker run/);
  assert.match(combined, /docker build/);
  assert.match(combined, /docker compose up/);
});

test("deck includes workshop-specific visual slide types", () => {
  assert.ok(slides.some((slide) => slide.layout === "command" && slide.commands?.length >= 2));
  assert.ok(slides.some((slide) => slide.layout === "comparison" && /Docker.*VM|VM.*Docker/i.test(textOf(slide))));
  assert.ok(slides.some((slide) => slide.layout === "exercise" && slide.checklist?.length >= 3));
  assert.ok(slides.some((slide) => slide.layout === "closing" && slide.roadmap?.length >= 3));
});

test("deck links to the full stack Compose example app", () => {
  const combined = slides.map(textOf).join(" ");

  assert.match(combined, /example-app/);
  assert.match(combined, /Postgres/);
  assert.match(combined, /Redis/);
  assert.match(combined, /Prometheus/);
  assert.match(combined, /Grafana/);
});

test("deck includes Docker installation guidance for Windows and Linux", () => {
  const combined = slides.map(textOf).join(" ");

  assert.match(combined, /Docker Desktop on Windows/);
  assert.match(combined, /WSL 2/);
  assert.match(combined, /Docker Engine on Linux/);
  assert.match(combined, /docs\.docker\.com\/desktop\/setup\/install\/windows-install/);
  assert.match(combined, /docs\.docker\.com\/engine\/install/);
  assert.match(combined, /docker run hello-world/);
});

test("example app includes API, web, database, cache, and monitoring assets", () => {
  const root = path.resolve("example-app");
  const requiredFiles = [
    "docker-compose.yaml",
    "Dockerfile",
    "package.json",
    "README.md",
    "src/server.js",
    "src/db.js",
    "src/cache.js",
    "src/metrics.js",
    "public/index.html",
    "public/app.js",
    "public/styles.css",
    "sql/init.sql",
    "monitoring/prometheus.yml",
    "monitoring/grafana/provisioning/datasources/datasource.yml",
    "monitoring/grafana/provisioning/dashboards/dashboards.yml",
    "monitoring/grafana/dashboards/orders-app.json",
  ];

  for (const file of requiredFiles) {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist in Day2/example-app`);
  }

  const compose = fs.readFileSync(path.join(root, "docker-compose.yaml"), "utf8");
  assert.match(compose, /postgres/);
  assert.match(compose, /redis/);
  assert.match(compose, /prometheus/);
  assert.match(compose, /grafana/);
});

test("flow slides emphasize Docker diagrams with short labels", () => {
  const dockerfileFlow = slides.find((slide) => /Dockerfile/i.test(slide.title) && slide.layout === "flow");
  const runFlow = slides.find((slide) => /Build.*Run.*Access|Code.*Build.*Run/i.test(slide.title));

  assert.deepEqual(dockerfileFlow?.points, ["Dockerfile", "Image", "Container"]);
  assert.deepEqual(runFlow?.points, ["Code", "Build", "Run", "Access"]);

  for (const slide of slides) {
    assert.ok(slide.points.length <= 5, `${slide.title} should stay readable with 3-5 points`);
  }
});

test("each slide carries metadata for the modern workshop theme", () => {
  for (const slide of slides) {
    assert.ok(slide.section.length > 2, `${slide.title} should define a section`);
    assert.ok(slide.kicker.length > 2, `${slide.title} should define a kicker`);
    assert.ok(slide.layout.length > 2, `${slide.title} should define a layout`);
    assert.ok(slide.tone.length > 2, `${slide.title} should define a tone`);
    assert.ok(slide.keyMessage.length > 20, `${slide.title} should define a key message`);
    assert.ok(slide.points.length >= 3 && slide.points.length <= 5, `${slide.title} should define concise points`);
    assert.ok(slide.details.length >= 2, `${slide.title} should define supporting details`);
  }
});

test("navigation helpers keep the slide index inside deck bounds", () => {
  assert.equal(clampSlideIndex(-10), 0);
  assert.equal(clampSlideIndex(2), 2);
  assert.equal(clampSlideIndex(999), slides.length - 1);

  assert.equal(getPreviousSlideIndex(0), 0);
  assert.equal(getPreviousSlideIndex(3), 2);
  assert.equal(getNextSlideIndex(slides.length - 1), slides.length - 1);
  assert.equal(getNextSlideIndex(3), 4);
});

test("keyboard navigation advances with Space and common presentation keys", () => {
  assert.equal(getSlideIndexForKey(2, { key: " ", code: "Space" }), 3);
  assert.equal(getSlideIndexForKey(2, { key: "Spacebar", code: "Space" }), 3);
  assert.equal(getSlideIndexForKey(2, { key: "ArrowRight", code: "ArrowRight" }), 3);
  assert.equal(getSlideIndexForKey(2, { key: "PageDown", code: "PageDown" }), 3);
  assert.equal(getSlideIndexForKey(2, { key: "ArrowLeft", code: "ArrowLeft" }), 1);
  assert.equal(getSlideIndexForKey(2, { key: "Home", code: "Home" }), 0);
  assert.equal(getSlideIndexForKey(2, { key: "End", code: "End" }), slides.length - 1);
  assert.equal(getSlideIndexForKey(2, { key: "a", code: "KeyA" }), 2);
});
