import { projects } from "../data/content.js";

/**
 * Projects / case-studies section. Each entry is tagged with an honest
 * status — "Live" only for things actually built and running, "In
 * progress" or "Planned" for anything not yet real. Never mark something
 * as shipped that isn't; a portfolio that overclaims undermines the one
 * real, working thing (the chatbot) sitting right above it.
 */
export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section__inner">
        <div className="section__header">
          <h2>What I've actually built</h2>
          <p>
            Not mockups — systems you can try or see the plan for. Status is marked honestly on each.
          </p>
        </div>

        <ul className="projects-grid">
          {projects.map((p) => (
            <li key={p.name} className={`project-card project-card--${p.status.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="project-card__top">
                <h3>{p.name}</h3>
                <span className="project-card__status">{p.status}</span>
              </div>
              <p className="project-card__description">{p.description}</p>
              <p className="project-card__stack">{p.stack}</p>
              {p.href && (
                <a href={p.href} className="project-card__link">
                  Try it →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
          }
