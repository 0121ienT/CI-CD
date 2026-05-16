import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Code2,
  Container,
  FileCode2,
  Globe2,
  Layers,
  ListChecks,
  Package,
  Play,
  Server,
  Terminal,
} from "lucide-react";

import { getSlideIndexForKey, slides } from "./deck.js";
import "./styles.css";

const iconMap = {
  Access: Globe2,
  App: Code2,
  Build: Package,
  Cleanup: CheckCircle2,
  Code: Code2,
  Command: Terminal,
  Container,
  Dependency: Layers,
  Docker: Container,
  Dockerfile: FileCode2,
  Image: Package,
  Isolated: Box,
  Logs: Terminal,
  Open: Globe2,
  Pull: Package,
  Read: FileCode2,
  Run: Play,
  Runtime: Server,
  Tag: Package,
  Verify: CheckCircle2,
};

function iconFor(label, fallback = Box) {
  const key = Object.keys(iconMap).find((item) => label.toLowerCase().includes(item.toLowerCase()));
  return iconMap[key] ?? fallback;
}

function Eyebrow({ slide }) {
  return (
    <div className="eyebrow">
      <span>{slide.section}</span>
      <span>{slide.kicker}</span>
    </div>
  );
}

function KeyMessage({ slide, label = "Main idea" }) {
  if (slide.hideKeyMessage || !slide.keyMessage) return null;

  return (
    <aside className="keyMessage">
      <span>{label}</span>
      <p>{slide.keyMessage}</p>
    </aside>
  );
}

function Details({ details }) {
  return (
    <div className="details">
      {details.map((detail, index) => {
        const Icon = iconFor(detail.label, index % 2 === 0 ? Box : Layers);

        return (
          <article key={`${detail.label}-${index}`}>
            <Icon aria-hidden="true" />
            <div>
              <span>{detail.label}</span>
              <p>{detail.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CoverVisual() {
  return (
    <div className="coverVisual" aria-hidden="true">
      <div className="dockWindow">
        <div className="dockHeader">
          <span />
          <span />
          <span />
        </div>
        <div className="dockGrid">
          <div className="miniCard">
            <FileCode2 />
            <strong>Dockerfile</strong>
          </div>
          <ArrowRight className="arrowIcon" />
          <div className="miniCard accent">
            <Package />
            <strong>Image</strong>
          </div>
          <ArrowRight className="arrowIcon" />
          <div className="miniCard">
            <Container />
            <strong>Container</strong>
          </div>
        </div>
      </div>
      <div className="terminalStrip">
        <Terminal />
        <code>docker run hello-world</code>
      </div>
    </div>
  );
}

function AnalogyVisual({ type }) {
  const labels =
    type === "analogy"
      ? ["App", "Runtime", "Dependency"]
      : type === "laptop-container"
        ? ["Code", "Image", "Same runtime"]
        : ["Build", "Run", "Learn"];

  return (
    <div className="analogyVisual" aria-hidden="true">
      <div className="visualHost">
        <Server />
        <span>Host machine</span>
      </div>
      <div className="containerBox">
        {labels.map((label) => {
          const Icon = iconFor(label);
          return (
            <div className="visualChip" key={label}>
              <Icon />
              <strong>{label}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlowDiagram({ points }) {
  return (
    <div className="flowDiagram" style={{ "--cols": points.length }}>
      {points.map((point, index) => {
        const Icon = iconFor(point);
        return (
          <React.Fragment key={point}>
            <div className="flowStep">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon aria-hidden="true" />
              <strong>{point}</strong>
            </div>
            {index < points.length - 1 ? <ArrowRight className="flowArrow" aria-hidden="true" /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function CommandBlocks({ commands }) {
  return (
    <div className="commandStack">
      {commands.map((command) => (
        <article className="commandBlock" key={`${command.label}-${command.code}`}>
          <div className="commandLabel">
            <Terminal aria-hidden="true" />
            <span>{command.label}</span>
          </div>
          <pre>
            <code>{command.code}</code>
          </pre>
          <div className="expected">
            <span>Expected result</span>
            <strong>{command.result}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

function Checklist({ items }) {
  return (
    <div className="checklist">
      {items.map((item) => (
        <div className="checkItem" key={item}>
          <CheckCircle2 aria-hidden="true" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function Roadmap({ items }) {
  return (
    <div className="roadmap">
      {items.map((item, index) => (
        <div className="roadmapItem" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

function CoverSlide({ slide }) {
  return (
    <section className="slide slideCover" data-tone={slide.tone}>
      <div className="coverContent">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
      </div>
      <CoverVisual />
      <KeyMessage slide={slide} />
    </section>
  );
}

function ConceptSlide({ slide }) {
  return (
    <section className="slide slideConcept" data-tone={slide.tone}>
      <div className="copy">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
        <KeyMessage slide={slide} />
      </div>
      <div className="support">
        <AnalogyVisual type={slide.visual} />
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

function ComparisonSlide({ slide }) {
  const columns = slide.details.slice(0, 2);
  const useCases = slide.details.slice(2);

  return (
    <section className="slide slideComparison" data-tone={slide.tone}>
      <div className="comparisonIntro">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
      </div>
      <div className="comparisonGrid">
        {columns.map((item) => {
          const Icon = item.label === "Docker" ? Container : Server;
          return (
            <article key={item.label}>
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
      <div className="comparisonBottom">
        <KeyMessage slide={slide} />
        <Details details={useCases} />
      </div>
    </section>
  );
}

function CommandSlide({ slide }) {
  return (
    <section className="slide slideCommand" data-tone={slide.tone}>
      <div className="commandIntro">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
        <KeyMessage slide={slide} />
      </div>
      <CommandBlocks commands={slide.commands} />
      <Details details={slide.details} />
    </section>
  );
}

function ExerciseSlide({ slide }) {
  return (
    <section className="slide slideExercise" data-tone={slide.tone}>
      <div className="exerciseIntro">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
        <KeyMessage slide={slide} label="Tiêu chí hoàn thành" />
      </div>
      <div className="labCard">
        <div className="labHeader">
          <ListChecks aria-hidden="true" />
          <span>Lab checklist</span>
        </div>
        <Checklist items={slide.checklist} />
      </div>
      <CommandBlocks commands={slide.commands} />
    </section>
  );
}

function ClosingSlide({ slide }) {
  return (
    <section className="slide slideClosing" data-tone={slide.tone}>
      <div className="closingIntro">
        <Eyebrow slide={slide} />
        <h1>{slide.title}</h1>
        <p className="body">{slide.body}</p>
        <KeyMessage slide={slide} />
      </div>
      <div className="closingPanels">
        <div className="labCard">
          <div className="labHeader">
            <CheckCircle2 aria-hidden="true" />
            <span>Sau buổi này bạn đã biết</span>
          </div>
          <Checklist items={slide.checklist} />
        </div>
        <div className="roadmapPanel">
          <span>Roadmap học tiếp</span>
          <Roadmap items={slide.roadmap} />
        </div>
      </div>
    </section>
  );
}

function Slide({ slide }) {
  if (slide.layout === "cover") return <CoverSlide slide={slide} />;
  if (slide.layout === "flow") return <FlowSlide slide={slide} />;
  if (slide.layout === "comparison") return <ComparisonSlide slide={slide} />;
  if (slide.layout === "command") return <CommandSlide slide={slide} />;
  if (slide.layout === "exercise") return <ExerciseSlide slide={slide} />;
  if (slide.layout === "closing") return <ClosingSlide slide={slide} />;
  return <ConceptSlide slide={slide} />;
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];
  const progress = useMemo(() => ((activeIndex + 1) / slides.length) * 100, [activeIndex]);
  const isPrintMode = useMemo(() => new URLSearchParams(window.location.search).has("print"), []);

  useEffect(() => {
    document.body.classList.toggle("printMode", isPrintMode);
    return () => document.body.classList.remove("printMode");
  }, [isPrintMode]);

  useEffect(() => {
    if (isPrintMode) return undefined;

    function handleKeyDown(event) {
      const nextIndex = getSlideIndexForKey(activeIndex, event);

      if (nextIndex !== activeIndex) {
        event.preventDefault();
        setActiveIndex(nextIndex);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isPrintMode]);

  if (isPrintMode) {
    return (
      <main className="printDeck">
        {slides.map((printSlide, index) => (
          <div className="slideCanvas printCanvas" key={`${printSlide.title}-${index}`}>
            <Slide slide={printSlide} />
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="deckShell">
      <div className="slideCanvas" key={activeIndex}>
        <div className="topBar">
          <span>Docker beginner workshop</span>
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
