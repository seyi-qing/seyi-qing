import { valueProps, services } from "../data/content.js";

/**
 * Combines the "what I do" value props with the services list. Kept in
 * one component/section because they read as one continuous idea on the
 * page ("here's the problem" → "here's what I build to solve it").
 */
export default function Services() {
  return (
    <section id="services" className="section">
      <div className="section__inner">
        <div className="section__header">
          <h2>I help businesses reduce repetitive work with AI</h2>
          <p>
            Most businesses don't need a complex "AI transformation." They need the boring stuff
            handled automatically — the FAQs, the follow-ups, the intake forms, the scheduling,
            the messages at 11pm.
          </p>
        </div>

        <ul className="value-props">
          {valueProps.map((v) => (
            <li key={v.title} className="value-props__item">
              <h3>{v.title}</h3>
              <p>{v.detail}</p>
            </li>
          ))}
        </ul>

        <div className="section__header section__header--tight">
          <h2>What I actually build</h2>
          <p>
            Each system is built around a real workflow in your business — not a generic demo.
            Pick one, or combine them into one end-to-end automation.
          </p>
        </div>

        <ul className="services-list">
          {services.map((service) => (
            <li key={service.id} className="services-list__item">
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
