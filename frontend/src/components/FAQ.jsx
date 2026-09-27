import { faq } from "../data/content.js";

export default function FAQ() {
  return (
    <section id="faq" className="section section--muted">
      <div className="section__inner section__inner--narrow">
        <div className="section__header">
          <p className="section__eyebrow">FAQ</p>
          <h2>Common questions</h2>
        </div>
        <div className="faq-list">
          {faq.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary className="faq-item__question">{item.question}</summary>
              <p className="faq-item__answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
