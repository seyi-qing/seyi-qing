import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Pricing from "./components/Pricing.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

/**
 * App
 * ----------------------------------------------------------------------
 * Composes the single-page site. Section order matches the nav links in
 * `data/content.js` (Home → Services → Chatbot → Pricing → About → Contact).
 * Each section is its own component so you can reorder, remove, or reuse
 * them independently.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Chatbot />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
