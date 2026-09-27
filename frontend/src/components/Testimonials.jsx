import { testimonials, projects } from "../data/content.js";

/**
 * Social proof. Real client quotes when available; otherwise an honest
 * "who this is built for" strip derived from shipped projects — never fake quotes.
 */
const proofFromWork = [
  { label: "Churches", detail: "Membership, giving, livestream" },
  { label: "Schools", detail: "ERP, portals, results" },
  { label: "Nonprofits", detail: "Dues, elections, members" },
  { label: "Service businesses", detail: "Chatbots & automation" },
];

export default function Testimonials() {
  const hasQuotes = testimonials && testimonials.length > 0;
  const liveCount = projects.filter(
    (p) => p.status === "Live" && p.url
  ).length;

  return (
    <section id="testimonials" className="section section--muted">
      <div className="section__inner">
        <div className="section__header">
          <p className="section__eyebrow">Proof</p>
          <h2>{hasQuotes ? "What clients say" : "Built for real operations"}</h2>
          {!hasQuotes && (
            <p>
              Live systems across churches, schools, nonprofits, and service
              businesses — not demos. {liveCount > 0 ? `${liveCount} public builds you can open.` : ""}
            </p>
          )}
        </div>

        {hasQuotes ? (
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
        ) : (
          <ul className="proof-grid">
            {proofFromWork.map((item) => (
              <li key={item.label} className="proof-card">
                <span className="proof-card__label">{item.label}</span>
                <span className="proof-card__detail">{item.detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
