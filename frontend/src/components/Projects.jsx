import { useState } from "react";
import { projects } from "../data/content.js";

/**
 * Build a screenshot URL. Primary: thum.io (reliable, no API key).
 * Fallback chain handled in the component if the image errors.
 */
function screenshotUrl(url) {
  // thum.io free public endpoint — returns a real PNG/JPEG of the live page
  return `https://image.thum.io/get/width/720/crop/450/noanimate/${url}`;
}

function ProjectThumb({ url, name, localImage }) {
  // stage: "loading" | "ready" | "failed"
  const [stage, setStage] = useState(localImage || url ? "loading" : "failed");
  const [src, setSrc] = useState(localImage || (url ? screenshotUrl(url) : null));
  const initial = name.charAt(0).toUpperCase();

  function handleError() {
    // If a local image failed, try the remote screenshot once
    if (localImage && src === localImage && url) {
      setSrc(screenshotUrl(url));
      setStage("loading");
      return;
    }
    setStage("failed");
  }

  if (stage === "failed" || !src) {
    return (
      <div className="project-card__thumb project-card__thumb--fallback" aria-hidden="true">
        <span className="project-card__thumb-letter">{initial}</span>
      </div>
    );
  }

  return (
    <div
      className={`project-card__thumb${stage === "loading" ? " project-card__thumb--loading" : ""}`}
    >
      <img
        src={src}
        alt={`Screenshot of ${name}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setStage("ready")}
        onError={handleError}
      />
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section__inner">
        <div className="section__header">
          <p className="section__eyebrow">Portfolio</p>
          <h2>Latest Projects</h2>
          <p>
            Not mockups — systems you can try or see the plan for. Status is
            marked honestly on each.
          </p>
        </div>

        <ul className="projects-grid">
          {projects.map((p) => {
            const statusClass = p.status.toLowerCase().replace(/\s+/g, "-");
            return (
              <li
                key={p.name}
                className={`project-card project-card--${statusClass}`}
              >
                <ProjectThumb url={p.url} name={p.name} localImage={p.image} />
                <div className="project-card__body">
                  <div className="project-card__top">
                    <h3>{p.name}</h3>
                    <span className="project-card__status">{p.status}</span>
                  </div>
                  <p className="project-card__description">{p.description}</p>
                  <p className="project-card__stack">{p.stack}</p>
                  {p.href && (
                    <a
                      href={p.href}
                      className="project-card__link"
                      {...(p.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {p.href.startsWith("http") ? "View live" : "Try it"} →
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
