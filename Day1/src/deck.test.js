import test from "node:test";
import assert from "node:assert/strict";

import {
  clampSlideIndex,
  getNextSlideIndex,
  getPreviousSlideIndex,
  getSlideIndexForKey,
  slides,
} from "./deck.js";

test("slide deck covers the CI/CD course and ML/Data design target", () => {
  assert.ok(slides.length >= 16);

  const combined = slides
    .flatMap((slide) => [
      slide.kicker,
      slide.title,
      slide.body,
      slide.keyMessage,
      ...(slide.points ?? []),
      ...(slide.details ?? []).flatMap((detail) => [detail.label, detail.text]),
    ])
    .join(" ");

  assert.match(combined, /ML\/Data architecture|ML & Data Systems/i);
  assert.match(combined, /CI\/CD/);
  assert.match(combined, /Jenkins/);
  assert.match(combined, /GitHub Actions/);
  assert.match(combined, /GitLab CI\/CD/);
  assert.match(combined, /Excalidraw/);
  assert.match(combined, /Glossary/);
});

test("non-technical prose is localized to Vietnamese", () => {
  const combined = slides
    .flatMap((slide) => [
      slide.section,
      slide.kicker,
      slide.title,
      slide.body,
      slide.keyMessage,
      ...(slide.details ?? []).flatMap((detail) => [detail.label, detail.text]),
    ])
    .join(" ");

  assert.match(combined, /Mục tiêu|Giáo trình|khái niệm|hệ thống|tự động/);
  assert.doesNotMatch(combined, /What Learners Should Be Able To Do|Keep Pipelines Small/);
});

test("slide deck incorporates concepts from the full CI/CD curriculum document", () => {
  const combined = slides
    .flatMap((slide) => [
      slide.title,
      slide.body,
      slide.keyMessage,
      ...(slide.points ?? []),
      ...(slide.details ?? []).flatMap((detail) => [detail.label, detail.text]),
    ])
    .join(" ");

  assert.match(combined, /Continuous Delivery/);
  assert.match(combined, /Continuous Deployment/);
  assert.match(combined, /CALMS/);
  assert.match(combined, /Pipeline as Code/);
  assert.match(combined, /Trunk-Based/);
  assert.match(combined, /Testing Pyramid/);
  assert.match(combined, /Artifact Repository/);
  assert.match(combined, /Capstone|bài tập/i);
});

test("glossary explains common English terms used in the deck", () => {
  const glossarySlides = slides.filter((slide) => slide.section === "Glossary");
  const glossaryText = glossarySlides
    .flatMap((slide) => [
      slide.title,
      slide.body,
      slide.keyMessage,
      ...(slide.points ?? []),
      ...(slide.details ?? []).flatMap((detail) => [detail.label, detail.text]),
    ])
    .join(" ");

  assert.ok(glossarySlides.length >= 3);
  assert.match(glossaryText, /Pipeline/);
  assert.match(glossaryText, /Artifact/);
  assert.match(glossaryText, /Runner \/ Agent/);
  assert.match(glossaryText, /Workflow YAML/);
  assert.match(glossaryText, /Jenkinsfile/);
  assert.match(glossaryText, /Model registry/);
  assert.match(glossaryText, /High-level design/);
});

test("glossary matrix cards define every visible term without recycling text", () => {
  const glossarySlides = slides.filter((slide) => slide.section === "Glossary");

  for (const slide of glossarySlides) {
    assert.equal(
      slide.details.length,
      slide.points.length,
      `${slide.title} should have one definition per glossary term`,
    );

    slide.points.forEach((point, index) => {
      assert.equal(slide.details[index].label, point, `${point} should map to its own definition`);
    });
  }
});

test("each slide has minimalist presentation metadata and attributed visual source", () => {
  for (const slide of slides) {
    assert.ok(slide.section.length > 2, `${slide.title} should define a section`);
    assert.ok(slide.layout.length > 2, `${slide.title} should define a layout`);
    assert.ok(slide.tone.length > 2, `${slide.title} should define a tone`);
    assert.ok(slide.keyMessage.length > 20, `${slide.title} should define a key message`);
    assert.ok(slide.points.length >= 3, `${slide.title} should define concise points`);
    assert.ok(slide.details.length >= 2, `${slide.title} should define supporting details`);
    assert.match(slide.image.src, /^https:\/\/.+/);
    assert.ok(slide.image.source.length > 2);
  }
});

test("slide deck uses a small cohesive set of minimalist layouts", () => {
  const layouts = new Set(slides.map((slide) => slide.layout));

  assert.deepEqual([...layouts].sort(), ["closing", "concept", "cover", "flow", "matrix", "tool"].sort());
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
