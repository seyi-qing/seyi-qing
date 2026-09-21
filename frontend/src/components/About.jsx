import { about } from "../data/content.js";

export default function About() {
  return (
    <section id="about" className="section section--muted">
      <div className="section__inner section__inner--narrow">
        <h2>{about.heading}</h2>
        {about.paragraphs.map((p, i) => (
          <p key={i} className="about__paragraph">
            {p}
          </p>
        ))}

        <div className="about__stats">
          {about.stats.map((stat) => (
            <div key={stat.label} className="about__stat">
              <p className="about__stat-value">{stat.value}</p>
              <p className="about__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
