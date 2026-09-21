import { pricing } from "../data/content.js";

/**
 * Three pricing tiers. The "highlight" flag on the Medium tier in
 * content.js drives the visual emphasis — change the data, not this
 * component, to move the highlight to a different tier.
 */
export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="section__inner">
        <div className="section__header">
          <h2>Three packages. One-time setup + monthly maintenance.</h2>
          <p>
            Pick the package that fits your business today. Every plan includes the setup,
            training, and a clear monthly maintenance fee — no hidden costs, no long-term lock-in.
          </p>
        </div>

        <div className="pricing-grid">
          {pricing.map((plan) => (
            <article key={plan.id} className={`pricing-card ${plan.highlight ? "pricing-card--highlight" : ""}`}>
              <p className="pricing-card__tier">{plan.tier}</p>
              <h3>{plan.name}</h3>
              <p className="pricing-card__setup">
                <span className="pricing-card__amount">{plan.setupFee}</span> setup fee
              </p>
              <p className="pricing-card__description">{plan.description}</p>

              <ul className="pricing-card__features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <p className="pricing-card__monthly">
                <span className="pricing-card__amount">{plan.monthly}</span> / month maintenance
              </p>

              <a href="#contact" className="btn btn--primary pricing-card__cta">
                Get started
              </a>
              <p className="pricing-card__footnote">{plan.footnote}</p>
            </article>
          ))}
        </div>

        <p className="pricing-note">
          Need something custom — multiple systems, deeper integrations, a multi-step workflow?
          Same packages as a starting basis; message me what you need and I'll confirm the exact
          scope with you directly.
        </p>
      </div>
    </section>
  );
}
