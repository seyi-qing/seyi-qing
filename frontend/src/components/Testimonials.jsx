import { testimonials } from "../data/content.js";

/**
 * Social proof section. Deliberately renders nothing when `testimonials`
 * in content.js is empty — a site with zero real clients showing fake or
 * placeholder quotes would be misleading. Add real quotes to content.js
 * and this section appears automatically; no code changes needed.
 */
export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section section--muted">
      <div className="section__inner">
        <div className="section__header">
          <h2>What clients say</h2>
        </div>
        <ul className="testimonials-grid">
          {testimonials.map((t, i) => (
            <li key={i} className="testimonial-card">
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <p className="testimonial-card__attribution">
                {t.name}
                {t.business ? ` · ${t.business}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
