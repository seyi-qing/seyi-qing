import { useEffect, useState } from "react";
import { brand, nav } from "../data/content.js";

/**
 * Sticky top navigation. Collapses into a hamburger menu below 720px.
 * Closes the mobile menu automatically after a link is tapped so users
 * aren't left staring at an open menu after navigating.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} id="home">
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo">
          {brand.logoText}
        </a>

        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--small navbar__cta" onClick={() => setMenuOpen(false)}>
            Start a project
          </a>
        </nav>

        <button
          className="navbar__toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
