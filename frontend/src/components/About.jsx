import { about } from "../data/content.js";

/**
 * About section. Renders a headshot only when about.photoUrl is set in
 * content.js — improvement #5 (trust signals). To add your photo: drop
 * an image file into frontend/public/ (e.g. public/headshot.jpg) and
 * set photoUrl: "/headshot.jpg" in content.js.
 */
export default function About() {
  return (
    <section id="about" className="section">
      <div className="section__inner section__inner--narrow">
        {about.photoUrl && (
          <img
            src={about.photoUrl}
            alt={`Photo of ${about.heading}`}
            className="about__photo"
            width="96"
            height="96"
          />
        )}
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
