import { faq } from "../data/content.js";

/**
 * FAQ section. Uses native <details>/<summary> rather than custom JS
 * accordion state — keyboard accessible and screen-reader friendly for
 * free, no extra code needed.
 */
export default function FAQ() {
  return (
    <section id="faq" className="section section--muted">
      <div className="section__inner section__inner--narrow">
        <div className="section__header">
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
