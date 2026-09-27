import { projects } from "../data/content.js";

/**
 * Latest Projects section (renamed from "What I've actually built" to
 * avoid reading as a near-duplicate of the Services heading "What I
 * actually build"). Each entry is tagged with an honest status — "Live"
 * only for things actually built and running, "In progress" / "Planned"
 * otherwise. Never mark something as shipped that isn't.
 *
 * Thumbnails: when a project has a `url` (its real live link), we render
 * a live screenshot via WordPress's free mshots service — no API key,
 * no manual screenshot-taking, and it refreshes automatically if the
 * site changes. Projects without a `url` (not deployed yet) just skip
 * the image rather than show a placeholder.
 */
export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section__inner">
        <div className="section__header">
          <h2>Latest Projects</h2>
          <p>
            Not mockups — systems you can try or see the plan for. Status is marked honestly on each.
          </p>
        </div>

        <ul className="projects-grid">
          {projects.map((p) => (
            <li key={p.name} className={`project-card project-card--${p.status.toLowerCase().replace(/\s+/g, "-")}`}>
              {p.url && (
                <div className="project-card__thumb">
                  <img
                    src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.url)}?w=600`}
                    alt={`Screenshot of ${p.name}`}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="project-card__body">
                <div className="project-card__top">
                  <h3>{p.name}</h3>
                  <span className="project-card__status">{p.status}</span>
                </div>
                <p className="project-card__description">{p.description}</p>
                <p className="project-card__stack">{p.stack}</p>
                {p.href && (
                  
                    href={p.href}
                    className="project-card__link"
                    {...(p.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {p.href.startsWith("http") ? "View live" : "Try it"} →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
