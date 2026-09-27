import { useEffect, useState } from "react";
import { brand, nav } from "../data/content.js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open so the page behind
  // cannot scroll and collide with the overlay menu.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function goHome(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} id="home">
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={goHome}>
          {brand.logoText}
        </a>

        <nav
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          aria-label="Primary"
        >
          {nav.map((item) =>
            item.href === "#home" ? (
              <a key={item.href} href={item.href} onClick={goHome}>
                {item.label}
              </a>
            ) : (
              <a key={item.href} href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            )
          )}
          <a
            href="#contact"
            className="btn btn--small navbar__cta"
            onClick={handleNavClick}
          >
            Start a project
          </a>
        </nav>

        <button
          className={`navbar__toggle ${menuOpen ? "navbar__toggle--open" : ""}`}
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
