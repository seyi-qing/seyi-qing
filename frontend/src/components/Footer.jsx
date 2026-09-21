import { brand, footer, contact } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          © {new Date().getFullYear()} {brand.name} — {footer.note}
        </p>
        <div className="footer__links">
          <a href={contact.whatsapp.href} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={contact.email.href}>Email</a>
        </div>
        <p className="footer__tagline">{footer.tagline}</p>
      </div>
    </footer>
  );
}
