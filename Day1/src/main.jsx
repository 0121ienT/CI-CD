import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import { getSlideIndexForKey, slides } from "./deck.js";
import "./styles.css";

function Eyebrow({ slide }) {
  return (
    <div className="eyebrow">
      <span>{slide.section}</span>
      <span>{slide.kicker}</span>
    </div>
  );
}

function Details({ details }) {
  return (
    <div className="details">
      {details.map((detail) => (
        <article key={detail.label}>
          <span>{detail.label}</span>
          <p>{detail.text}</p>
        </article>
      ))}
    </div>
  );
}

function KeyMessage({ slide }) {
  if (slide.hideKeyMessage || !slide.keyMessage) return null;

  return (
    <aside className="keyMessage">
      <span>Ý chính</span>
      <p>{slide.keyMessage}</p>
    </aside>
  );
}

function ImagePanel({ slide, quiet = false }) {
  return (
    <figure className={quiet ? "imagePanel imagePanelQuiet" : "imagePanel"}>
      <img src={slide.image.src} alt={slide.image.alt} />
      <figcaption>{slide.image.source}</figcaption>
    </figure>
  );
}

function VisualImagePanel({ image, className = "visualImagePanel" }) {
  return (
    <figure className={className}>
      <img src={image.src} alt={image.alt} />
      {image.source ? <figcaption>{image.source}</figcaption> : null}
    </figure>
  );
}

function FlowDiagram({ points }) {
  return (
    <div className="flowDiagram" style={{ "--cols": points.length }}>
      {points.map((point, index) => (
        <div className="flowStep" key={point}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{point}</strong>
        </div>
      ))}
    </div>
  );
}

function Matrix({ slide }) {
  const items = slide.points.map((point, index) => ({
    title: point,
    text: slide.details[index % slide.details.length]?.text ?? slide.keyMessage,
  }));

  return (
    <div className="matrix">
      {items.map((item) => (
        <article key={item.title}>
          <span>{item.title}</span>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function ToolVisual({ slide }) {
  return (
    <div className="toolVisual">
      <img src={slide.image.src} alt={slide.image.alt} />
      <span>{slide.title}</span>
    </div>
  );
}

function CoverSlide({ slide }) {
  return (
    <section className="slide slideCover" data-tone={slide.tone}>
      <div className="coverContent">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        {slide.body ? <p className="body">{slide.body}</p> : null}
      </div>
      <ImagePanel slide={slide} quiet />
      <KeyMessage slide={slide} />
    </section>
  );
}

function ConceptSlide({ slide }) {
  const hasVisualImage = Boolean(slide.visualImage);

  return (
    <section
      className={hasVisualImage ? "slide slideConcept slideConceptVisual" : "slide slideConcept"}
      data-tone={slide.tone}
    >
      <div className="copy">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
      </div>
      {hasVisualImage ? <VisualImagePanel image={slide.visualImage} /> : null}
      <div className="support">
        <KeyMessage slide={slide} />
        <Details details={slide.details} />
      </div>
    </section>
  );
}

function FlowSlide({ slide }) {
  return (
    <section className="slide slideFlow" data-tone={slide.tone}>
      <div className="flowHeader">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
      </div>
      <FlowDiagram points={slide.points} />
      <div className="flowFooter">
        <KeyMessage slide={slide} />
        <Details details={slide.details} />
      </div>
    </section>
  );
}

function MatrixSlide({ slide }) {
  const hasVisualImage = Boolean(slide.visualImage);

  return (
    <section
      className={hasVisualImage ? "slide slideMatrix slideMatrixVisual" : "slide slideMatrix"}
      data-tone={slide.tone}
    >
      <div className="matrixIntro">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
        <KeyMessage slide={slide} />
      </div>
      {hasVisualImage ? (
        <VisualImagePanel image={slide.visualImage} className="comparisonPanel" />
      ) : null}
      <Matrix slide={slide} />
    </section>
  );
}

function ToolSlide({ slide }) {
  return (
    <section className="slide slideTool" data-tone={slide.tone}>
      <ToolVisual slide={slide} />
      <div className="toolCopy">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
        <KeyMessage slide={slide} />
        <Details details={slide.details} />
      </div>
    </section>
  );
}

function ClosingSlide({ slide }) {
  return (
    <section className="slide slideClosing" data-tone={slide.tone}>
      <Eyebrow slide={slide} />
      <h1>{slide.title}</h1>
      <p className="body">{slide.body}</p>
      <ImagePanel slide={slide} quiet />
      <KeyMessage slide={slide} />
      <FlowDiagram points={slide.points} />
      <Details details={slide.details} />
    </section>
  );
}

function Slide({ slide }) {
  if (slide.layout === "cover") return <CoverSlide slide={slide} />;
  if (slide.layout === "flow") return <FlowSlide slide={slide} />;
  if (slide.layout === "matrix") return <MatrixSlide slide={slide} />;
  if (slide.layout === "tool") return <ToolSlide slide={slide} />;
  if (slide.layout === "closing") return <ClosingSlide slide={slide} />;
  return <ConceptSlide slide={slide} />;
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];
  const progress = useMemo(() => ((activeIndex + 1) / slides.length) * 100, [activeIndex]);

  useEffect(() => {
    function handleKeyDown(event) {
      const nextIndex = getSlideIndexForKey(activeIndex, event);

      if (nextIndex !== activeIndex) {
        event.preventDefault();
        setActiveIndex(nextIndex);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <main className="deckShell">
      <div className="slideCanvas" key={activeIndex}>
        <div className="topBar">
          <span aria-hidden="true" />
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
        <Slide slide={slide} />
        <div className="progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
