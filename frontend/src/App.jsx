import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Pricing from "./components/Pricing.jsx";
import FAQ from "./components/FAQ.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Chatbot />
        <Testimonials />
        <Pricing />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
