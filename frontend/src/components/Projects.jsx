import { useState } from "react";
import { projects } from "../data/content.js";

/**
 * Latest Projects section.
 * Thumbnails use WordPress mshots for live screenshots when a project has
 * a public URL. On load failure we fall back to a branded gradient plate
 * so the card never looks broken.
 */
function ProjectThumb({ url, name }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  if (failed || !url) {
    return (
      <div className="project-card__thumb project-card__thumb--fallback" aria-hidden="true">
        <span className="project-card__thumb-letter">{initial}</span>
      </div>
    );
  }

  return (
    <div className="project-card__thumb">
      <img
        src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=640&h=400`}
        alt={`Screenshot of ${name}`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
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
                <ProjectThumb url={p.url} name={p.name} />
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
