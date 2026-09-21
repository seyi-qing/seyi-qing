import { useState } from "react";
import { contact } from "../data/content.js";
import { USE_BACKEND, BACKEND_URL } from "../utils/chatbotEngine.js";

const emptyForm = { name: "", email: "", message: "" };

/**
 * Contact section. Offers the same two direct channels as the source
 * site (WhatsApp + email) plus a proper form.
 *
 * If USE_BACKEND is on (see chatbotEngine.js), the form POSTs to
 * `${BACKEND_URL}/api/contact`. Otherwise it falls back to opening the
 * visitor's email client with a pre-filled message — so the form is
 * always functional, even with zero backend setup.
 */
export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    if (!USE_BACKEND) {
      const subject = encodeURIComponent(`New project inquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `${contact.email.href}?subject=${subject}&body=${body}`;
      setStatus("sent");
      setForm(emptyForm);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="section__inner section__inner--narrow">
        <h2>{contact.heading}</h2>
        <p className="contact__subhead">{contact.subhead}</p>

        <div className="contact__channels">
          <a href={contact.whatsapp.href} className="btn btn--primary" target="_blank" rel="noreferrer">
            WhatsApp {contact.whatsapp.value} →
          </a>
          <a href={contact.email.href} className="btn btn--ghost">
            Email {contact.email.value} →
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <label>
              Name
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@business.com"
              />
            </label>
          </div>
          <label>
            What's the repetitive task?
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="e.g. We manually confirm every appointment by phone…"
            />
          </label>

          <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && <p className="contact-form__status contact-form__status--ok">Thanks — got it.</p>}
          {status === "error" && (
            <p className="contact-form__status contact-form__status--error">
              Something went wrong. Try WhatsApp or email above instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
