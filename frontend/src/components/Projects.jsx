import { useState, useEffect } from "react";
import { projects } from "../data/content.js";

/**
 * Project thumbnails with layered fallbacks:
 * 1. localThumb (static asset)
 * 2. WordPress mshots (live screenshot)
 * 3. thum.io fallback
 * 4. Elegant letter-plate with gradient
 */
function mshotUrl(url) {
  try {
    const encoded = encodeURIComponent(url);
    return `https://s0.wp.com/mshots/v1/${encoded}?w=800&h=500`;
  } catch {
    return null;
  }
}

function thumUrl(url) {
  return `https://image.thum.io/get/width/800/crop/500/noanimate/${url}`;
}

function ProjectThumb({ url, name, localThumb }) {
  const initial = name.charAt(0).toUpperCase();
  const [stage, setStage] = useState(localThumb ? "ready" : url ? "loading" : "failed");
  const [src, setSrc] = useState(localThumb || (url ? mshotUrl(url) : null));
  const [triedThum, setTriedThum] = useState(false);

  // Prefetch / timeout for slow screenshot services
  useEffect(() => {
    if (stage !== "loading" || !src) return;
    const timer = setTimeout(() => {
      if (stage === "loading") {
        handleError();
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [stage, src]);

  function handleError() {
    if (url && !triedThum) {
      setTriedThum(true);
      setSrc(thumUrl(url));
      setStage("loading");
      return;
    }
    setStage("failed");
  }

  if (stage === "failed" || !src) {
    return (
      <div className="project-card__thumb project-card__thumb--fallback" aria-hidden="true">
        <span className="project-card__thumb-letter">{initial}</span>
        <span className="project-card__thumb-name">{name.split(" ")[0]}</span>
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
                <ProjectThumb url={p.url} name={p.name} localThumb={p.localThumb} />
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
