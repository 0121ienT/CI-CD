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
    ...(slide.commands ?? []).flatMap((command) => [command.label, command.code, command.resultLabel, command.result]),
    ...(slide.checklist ?? []),
    ...(slide.roadmap ?? []),
  ].join(" ");

const visibleProseOf = (slide) =>
  [
    slide.section,
    slide.kicker,
    slide.title,
    slide.body,
    slide.keyMessage,
    ...(slide.points ?? []),
    ...(slide.details ?? []).flatMap((detail) => [detail.label, detail.text]),
    ...(slide.commands ?? []).flatMap((command) => [command.label, command.resultLabel, command.result]),
    ...(slide.checklist ?? []),
    ...(slide.roadmap ?? []),
  ].join(" ");

test("deck is a Docker beginner lesson in Vietnamese", () => {
  assert.ok(slides.length >= 14);
  assert.equal(slides[0].title, "Docker cơ bản cho người mới");

  const combined = slides.map(textOf).join(" ");
  assert.match(combined, /Docker/);
  assert.match(combined, /beginner|người mới|bài học|buổi học/i);
  assert.match(combined, /Dockerfile/);
  assert.match(combined, /Image/);
  assert.match(combined, /Container/);
  assert.match(combined, /Docker Compose/);
  assert.match(combined, /docker run/);
  assert.match(combined, /docker build/);
  assert.match(combined, /docker compose up/);
});

test("deck includes Docker-specific visual slide types", () => {
  assert.ok(slides.some((slide) => slide.layout === "command" && slide.commands?.length >= 2));
  assert.ok(slides.some((slide) => slide.layout === "flow"));
  assert.ok(slides.some((slide) => slide.layout === "concept"));
});

test("deck does not include exercise slides yet", () => {
  assert.ok(slides.every((slide) => slide.section !== "Exercise"));
  assert.ok(slides.every((slide) => slide.layout !== "exercise"));
  assert.doesNotMatch(slides.map(textOf).join(" "), /Bài tập|Checklist:/i);
});

test("deck omits VM comparison, wrap-up, and visible main idea blocks", () => {
  const combined = slides.map(textOf).join(" ");
  const main = fs.readFileSync(path.resolve("src/main.jsx"), "utf8");

  assert.ok(slides.every((slide) => slide.section !== "Comparison"));
  assert.ok(slides.every((slide) => slide.layout !== "comparison"));
  assert.ok(slides.every((slide) => slide.section !== "Wrap-up"));
  assert.ok(slides.every((slide) => slide.layout !== "closing"));
  assert.doesNotMatch(combined, /Docker và VM|Docker.*VM|Virtual Machine|Wrap-up/i);
  assert.doesNotMatch(main, /Main idea|keyMessage/);
});

test("public Day2 text avoids old session wording", () => {
  const oldTerm = "work" + "shop";
  const oldTermPattern = new RegExp(`\\b${oldTerm}\\b`, "i");
  const files = [
    "package.json",
    "package-lock.json",
    "src/deck.js",
    "src/main.jsx",
    "example-app/README.md",
    "example-app/package.json",
    "example-app/package-lock.json",
    "example-app/public/index.html",
    "example-app/monitoring/grafana/provisioning/dashboards/dashboards.yml",
    "example-app/monitoring/grafana/dashboards/orders-app.json",
  ];

  for (const file of files) {
    const content = fs.readFileSync(path.resolve(file), "utf8");
    assert.doesNotMatch(content, oldTermPattern, `${file} should not use old session wording`);
  }
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

  assert.match(combined, /Cài Docker trên Windows/);
  assert.match(combined, /Docker Desktop/);
  assert.match(combined, /WSL 2/);
  assert.match(combined, /trước khi sử dụng/);
  assert.match(combined, /Docker Engine on Linux/);
  assert.match(combined, /phần lõi chạy container/);
  assert.match(combined, /Chọn đúng bản Linux/);
  assert.match(combined, /Ubuntu, Debian, Fedora/);
  assert.match(combined, /docs\.docker\.com\/desktop\/setup\/install\/windows-install/);
  assert.match(combined, /docs\.docker\.com\/engine\/install/);
  assert.match(combined, /docker run hello-world/);
});

test("deck uses plain Vietnamese instead of the runtime term", () => {
  const combined = slides.map(textOf).join(" ");

  assert.match(combined, /môi trường chạy/);
  assert.doesNotMatch(combined, /\bruntime\b/i);
});

test("container concept slide explains the idea in non-technical language", () => {
  const containerSlide = slides.find((slide) => slide.title === "Container là gì");
  const containerText = textOf(containerSlide);

  assert.match(containerText, /gói chạy app/);
  assert.match(containerText, /những thứ cần thiết để app chạy/);
  assert.match(containerText, /dễ mang sang máy khác/);
  assert.equal(containerSlide.hideKeyMessage, true);
  assert.equal(containerSlide.details.length, 1);
  assert.match(containerText, /Tóm tắt/);
  assert.doesNotMatch(containerText, /Ví dụ đời sống|hộp cơm|hộp đồ nghề|phép màu/i);
  assert.doesNotMatch(containerText, /kernel|process|filesystem|network/i);
});

test("early concept slides are rewritten for the requested presentation flow", () => {
  const combinedProse = slides.map(visibleProseOf).join(" ");
  const flowSlide = slides[5];

  assert.doesNotMatch(combinedProse, /;/);

  assert.equal(flowSlide.title, "Dockerfile, Image, Container");
  assert.equal(flowSlide.hideKeyMessage, true);
  assert.deepEqual(flowSlide.points, ["Dockerfile", "Image", "Container"]);
  assert.deepEqual(flowSlide.details.map((detail) => detail.label), ["Dockerfile", "Image", "Container"]);
  for (const detail of flowSlide.details) {
    assert.ok(detail.text.length >= 45, `${detail.label} should have a definition underneath`);
  }
});

test("Docker setup slides appear immediately after the cover slide", () => {
  assert.equal(slides[1].section, "Setup");
  assert.equal(slides[1].kicker, "Windows");
  assert.equal(slides[2].section, "Setup");
  assert.equal(slides[2].kicker, "Linux");
});

test("demo slides use runnable commands from the Day2 example app", () => {
  const demoSlides = slides.filter((slide) => slide.section === "Demo");
  const demoText = demoSlides.map(textOf).join(" ");

  assert.ok(demoSlides.length >= 3);

  for (const slide of demoSlides) {
    const commandText = (slide.commands ?? []).map((command) => command.code).join("\n");
    assert.match(commandText, /Day2\/example-app/, `${slide.title} should point at the example app folder`);
  }

  assert.match(demoText, /docker compose up --build -d/);
  assert.match(demoText, /http:\/\/localhost:3000\/health/);
  assert.match(demoText, /POST|api\/orders/);
  assert.match(demoText, /http:\/\/localhost:3000\/api\/stats/);
  assert.match(demoText, /http:\/\/localhost:3000\/metrics/);
  assert.match(demoText, /docker compose logs api/);
  assert.match(demoText, /docker compose down/);
  assert.doesNotMatch(demoText, /nginx:alpine|demo-api:v1/);
});

test("Docker command reference slides appear before the demo and list many commands with functions", () => {
  const firstDemoIndex = slides.findIndex((slide) => slide.section === "Demo");
  const commandSlides = slides.filter((slide) => slide.commandReference);
  const commandSlideIndexes = commandSlides.map((commandSlide) => slides.indexOf(commandSlide));
  const commandText = commandSlides.map(textOf).join(" ");

  assert.equal(commandSlides.length, 3);
  assert.ok(commandSlideIndexes.every((index) => index < firstDemoIndex), "basic Docker command slides should appear before demo slides");
  assert.deepEqual(commandSlideIndexes, commandSlideIndexes.toSorted((a, b) => a - b));

  for (const slide of commandSlides) {
    assert.equal(slide.layout, "command");
    assert.ok(slide.commands.length >= 6, `${slide.title} should list many commands`);
    assert.equal(slide.body, "");
    assert.ok(slide.title.length <= 28, `${slide.title} should fit on one line`);
    for (const command of slide.commands) {
      assert.equal(command.resultLabel, "Chức năng");
      assert.ok(command.result.length > 20, `${command.code} should explain its function`);
    }
  }

  assert.match(commandText, /docker --version/);
  assert.match(commandText, /docker compose version/);
  assert.match(commandText, /docker pull/);
  assert.match(commandText, /docker build/);
  assert.match(commandText, /docker run/);
  assert.match(commandText, /docker ps/);
  assert.match(commandText, /docker ps -a/);
  assert.match(commandText, /docker images/);
  assert.match(commandText, /docker stop/);
  assert.match(commandText, /docker rm/);
  assert.match(commandText, /docker rmi/);
  assert.match(commandText, /docker logs/);
  assert.match(commandText, /docker exec/);
  assert.match(commandText, /docker inspect/);
  assert.match(commandText, /docker stats/);
  assert.match(commandText, /docker volume ls/);
  assert.match(commandText, /docker network ls/);
  assert.match(commandText, /docker compose up -d/);
  assert.match(commandText, /docker compose ps/);
  assert.match(commandText, /docker compose logs/);
  assert.match(commandText, /docker compose exec/);
  assert.match(commandText, /docker compose restart/);
  assert.match(commandText, /docker compose down/);
});

test("demo slides are grouped at the end of the deck", () => {
  const firstDemoIndex = slides.findIndex((slide) => slide.section === "Demo");

  assert.ok(firstDemoIndex > -1, "deck should include demo slides");
  assert.ok(slides.slice(firstDemoIndex).every((slide) => slide.section === "Demo"));
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

test("flow slide footer keeps definition cards on one row", () => {
  const styles = fs.readFileSync(path.resolve("src/styles.css"), "utf8");
  const main = fs.readFileSync(path.resolve("src/main.jsx"), "utf8");

  assert.match(styles, /\.flowFooter \.details\s*{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(styles, /\.flowFooter \.details article\s*{[^}]*min-height:\s*auto/s);
  assert.match(main, /flowFooterWide/);
  assert.match(styles, /\.flowFooterWide\s*{[^}]*grid-template-columns:\s*1fr/s);
});

test("command reference layout is full width and compact", () => {
  const main = fs.readFileSync(path.resolve("src/main.jsx"), "utf8");
  const styles = fs.readFileSync(path.resolve("src/styles.css"), "utf8");

  assert.match(main, /slideCommandReference/);
  assert.match(styles, /\.slideCommandReference\s*{[^}]*grid-template-rows:\s*auto 1fr/s);
  assert.match(styles, /\.slideCommandReference \.commandStack\s*{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s);
});

test("each slide carries metadata for the modern Docker theme", () => {
  for (const slide of slides) {
    assert.ok(slide.section.length > 2, `${slide.title} should define a section`);
    assert.ok(slide.kicker.length > 2, `${slide.title} should define a kicker`);
    assert.ok(slide.layout.length > 2, `${slide.title} should define a layout`);
    assert.ok(slide.tone.length > 2, `${slide.title} should define a tone`);
    assert.ok(slide.keyMessage.length > 20, `${slide.title} should define a key message`);
    assert.ok(slide.points.length >= 3 && slide.points.length <= 5, `${slide.title} should define concise points`);
    const minimumDetails = slide.title === "Container là gì" ? 1 : 2;
    assert.ok(slide.details.length >= minimumDetails, `${slide.title} should define supporting details`);
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
