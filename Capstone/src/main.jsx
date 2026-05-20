import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  Award,
  Box,
  CheckCircle2,
  Cloud,
  Compass,
  ExternalLink,
  FileCode2,
  Flag,
  Gauge,
  Layers,
  ListChecks,
  Lock,
  PackageOpen,
  Rocket,
  Server,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

import {
  bonusItems,
  cloudNote,
  cloudResources,
  deliverables,
  folderStructure,
  generalNotes,
  grading,
  groups,
  meta,
  pipelineStages,
  sections,
  timeline,
} from "./content.js";
import "./styles.css";

const sectionIcons = {
  overview: Compass,
  cicd: Workflow,
  cloud: Cloud,
  group: Users,
  submission: Flag,
};

function Eyebrow({ kicker, title, icon: Icon }) {
  return (
    <header className="eyebrow">
      <div className="eyebrowKicker">
        {Icon ? <Icon aria-hidden="true" /> : null}
        <span>{kicker}</span>
      </div>
      <h2>{title}</h2>
    </header>
  );
}

function Overview() {
  return (
    <section className="block" id="tong-quan">
      <Eyebrow kicker="Bối cảnh" title={meta.title} icon={Compass} />
      <p className="lead">{meta.intro}</p>
      <aside className="callout">
        <Sparkles aria-hidden="true" />
        <p>{meta.emphasis}</p>
      </aside>
      <div className="overviewGrid">
        <article>
          <Target aria-hidden="true" />
          <h3>Đích đến</h3>
          <p>Mỗi nhóm xuất xưởng được 3 tính năng mới hoạt động trên cloud được cấp, mọi commit đi qua CI/CD đúng quy trình.</p>
        </article>
        <article>
          <Layers aria-hidden="true" />
          <h3>4 đề tài</h3>
          <p>Phân loại cảm xúc, biển số xe / parking, hand gesture (chưa có repo) và fashion visual search.</p>
        </article>
        <article>
          <Gauge aria-hidden="true" />
          <h3>Khắt khe về thiết kế</h3>
          <p>Ràng buộc latency, privacy, throughput và threat model bắt buộc nằm ngay trong đề bài — phải bảo vệ được.</p>
        </article>
      </div>
    </section>
  );
}

function CiCd() {
  return (
    <section className="block" id="ci-cd">
      <Eyebrow kicker="Yêu cầu chung" title="CI/CD pipeline cho cả 4 nhóm" icon={Workflow} />
      <p className="lead">
        Pipeline được trigger trên mỗi <code>push</code> vào branch <code>main</code> của repo nhóm. Chọn GitHub Actions hoặc Jenkins
        — chọn 1 và bảo vệ được lựa chọn.
      </p>
      <div className="tableWrap">
        <table className="pipelineTable">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Yêu cầu</th>
              <th>Fail-fast khi</th>
            </tr>
          </thead>
          <tbody>
            {pipelineStages.map((row) => (
              <tr key={row.stage}>
                <td>{row.stage}</td>
                <td>{row.requirement}</td>
                <td>{row.failFast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="subHeading">
        <PackageOpen aria-hidden="true" />
        Bắt buộc nộp kèm code
      </h3>
      <ul className="checkList">
        {deliverables.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CloudSection() {
  return (
    <section className="block" id="cloud">
      <Eyebrow kicker="Tài nguyên" title="Cloud được cung cấp" icon={Cloud} />
      <div className="resourceGrid">
        {cloudResources.map((item) => (
          <article key={item}>
            <Server aria-hidden="true" />
            <p>{item}</p>
          </article>
        ))}
      </div>
      <aside className="callout subtle">
        <ShieldAlert aria-hidden="true" />
        <p>{cloudNote}</p>
      </aside>
    </section>
  );
}

function GroupBlock({ group }) {
  return (
    <section className="block groupBlock" id={group.id} data-tone={group.tone}>
      <Eyebrow
        kicker={`Nhóm ${group.number} · ${group.codename}`}
        title={group.name}
        icon={Users}
      />
      {group.repo ? (
        <a className="repoLink" href={group.repo} target="_blank" rel="noreferrer">
          <FileCode2 aria-hidden="true" />
          <span>{group.repo.replace("https://", "")}</span>
          <ExternalLink aria-hidden="true" />
        </a>
      ) : (
        <div className="repoLink missing">
          <AlertTriangle aria-hidden="true" />
          <span>Chưa có repo — bắt đầu từ Day 0, chấm khắt khe hơn về design doc.</span>
        </div>
      )}
      <p className="lead">
        <strong>Hiện trạng:</strong> {group.summary}
      </p>
      {group.note ? (
        <aside className="callout warn">
          <AlertTriangle aria-hidden="true" />
          <p>{group.note}</p>
        </aside>
      ) : null}
      <div className="featureStack">
        {group.features.map((feature, index) => (
          <article className="featureCard" key={feature.title}>
            <div className="featureHeader">
              <span className="featureIndex">Tính năng {index + 1}</span>
              {feature.hardLabel ? <span className="hardBadge">{feature.hardLabel}</span> : null}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="constraintHeading">
              <Lock aria-hidden="true" />
              <span>Ràng buộc bắt buộc thiết kế</span>
            </div>
            <ul className="constraintList">
              {feature.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Submission() {
  return (
    <section className="block" id="nop-bai">
      <Eyebrow kicker="Vận hành" title="Quy trình làm việc, nộp bài & chấm" icon={Flag} />
      <h3 className="subHeading">
        <Rocket aria-hidden="true" />
        Mốc thời gian (6 tuần)
      </h3>
      <div className="tableWrap">
        <table className="pipelineTable">
          <thead>
            <tr>
              <th>Tuần</th>
              <th>Mục tiêu</th>
              <th>Sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((row) => (
              <tr key={row.week}>
                <td>{row.week}</td>
                <td>{row.goal}</td>
                <td>{row.deliverable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="subHeading">
        <Box aria-hidden="true" />
        Cấu trúc nộp
      </h3>
      <pre className="folderTree">
        <code>{folderStructure}</code>
      </pre>
      <p className="footnote">
        PR cuối cùng mở từ <code>release/v1</code> → <code>main</code>, gắn label <code>[final-submission]</code>.
      </p>

      <h3 className="subHeading">
        <Award aria-hidden="true" />
        Tiêu chí chấm
      </h3>
      <div className="tableWrap">
        <table className="pipelineTable">
          <thead>
            <tr>
              <th>Hạng mục</th>
              <th>Trọng số</th>
              <th>Đạt khi</th>
            </tr>
          </thead>
          <tbody>
            {grading.map((row) => (
              <tr key={row.item}>
                <td>{row.item}</td>
                <td className="weightCell">{row.weight}</td>
                <td>{row.criteria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <aside className="bonusBlock">
        <h4>
          <Sparkles aria-hidden="true" />
          Bonus tối đa 10%
        </h4>
        <ul>
          {bonusItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>

      <h3 className="subHeading">
        <ListChecks aria-hidden="true" />
        Lưu ý chung
      </h3>
      <div className="noteStack">
        {generalNotes.map((note) => (
          <article key={note.label}>
            <span>{note.label}</span>
            <p>{note.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderSection(section) {
  if (section.kind === "overview") return <Overview key={section.id} />;
  if (section.kind === "cicd") return <CiCd key={section.id} />;
  if (section.kind === "cloud") return <CloudSection key={section.id} />;
  if (section.kind === "submission") return <Submission key={section.id} />;
  if (section.kind === "group") {
    const group = groups.find((item) => item.id === section.groupId);
    return group ? <GroupBlock key={group.id} group={group} /> : null;
  }
  return null;
}

function Sidebar({ activeId, onSelect }) {
  return (
    <nav className="sidebar" aria-label="Mục lục bài tập">
      <div className="brand">
        <Sparkles aria-hidden="true" />
        <div>
          <strong>HIT-PYTHON-2026</strong>
          <span>Bài tập lớn</span>
        </div>
      </div>
      <ul>
        {sections.map((section) => {
          const Icon = sectionIcons[section.kind] ?? Compass;
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={isActive ? "active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(section.id);
                }}
              >
                <Icon aria-hidden="true" />
                <span>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <footer className="sidebarFooter">
        <a href="https://github.com/0121ienT/ml-data-engineering" target="_blank" rel="noreferrer">
          <FileCode2 aria-hidden="true" />
          <span>Repo khóa học</span>
          <ExternalLink aria-hidden="true" />
        </a>
      </footer>
    </nav>
  );
}

function App() {
  const initial = useMemo(() => {
    if (typeof window === "undefined") return sections[0].id;
    const hash = window.location.hash.replace("#", "");
    return sections.some((section) => section.id === hash) ? hash : sections[0].id;
  }, []);
  const [activeId, setActiveId] = useState(initial);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelect = (id) => {
    setActiveId(id);
    if (typeof window === "undefined") return;
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="appShell">
      <Sidebar activeId={activeId} onSelect={handleSelect} />
      <main className="content">
        <header className="pageHeader">
          <span className="pageEyebrow">Khóa học · CI/CD + Docker cho ML/Data</span>
          <h1>{meta.title}</h1>
          <p>
            Trang dành cho 4 nhóm đề tài HIT-PYTHON-2026. Mỗi nhóm thực hiện 3 tính năng mới trên repo hiện tại và thiết kế
            CI/CD pipeline tự động deploy lên cloud được cung cấp.
          </p>
        </header>
        {sections.map((section) => renderSection(section))}
        <footer className="pageFooter">
          <span>HIT-PYTHON-2026 · ml-data-engineering · Bài tập lớn cuối kỳ</span>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
