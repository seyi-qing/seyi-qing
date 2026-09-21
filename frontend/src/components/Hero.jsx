import { hero } from "../data/content.js";

/**
 * Hero section. The visual centerpiece is a small animated SVG of
 * connected nodes with a pulse traveling along the lines — a literal
 * picture of "a system quietly running in the background," which is the
 * core idea of the whole page, instead of a generic gradient blob.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__headline">{hero.headline}</h1>
          <p className="hero__subhead">{hero.subhead}</p>

          <div className="hero__ctas">
            <a href={hero.primaryCta.href} className="btn btn--primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn btn--ghost">
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className="hero__badges">
            {hero.badges.map((badge) => (
              <div className="hero__badge" key={badge.label}>
                <span className="hero__badge-label">{badge.label}</span>
                <span className="hero__badge-detail">{badge.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <SignalDiagram />
        </div>
      </div>
    </section>
  );
}

/** Abstract diagram: a central node feeding four business "channels." */
function SignalDiagram() {
  const nodes = [
    { x: 60, y: 40, label: "Website" },
    { x: 60, y: 130, label: "WhatsApp" },
    { x: 60, y: 220, label: "Calls" },
    { x: 60, y: 310, label: "Calendar" },
  ];
  const hub = { x: 220, y: 175 };

  return (
    <svg viewBox="0 0 320 360" className="signal-diagram" role="img" aria-label="Diagram of channels feeding one automation hub">
      {nodes.map((n, i) => (
        <path
          key={n.label}
          d={`M ${n.x + 34} ${n.y} C ${(n.x + hub.x) / 2} ${n.y}, ${(n.x + hub.x) / 2} ${hub.y}, ${hub.x - 30} ${hub.y}`}
          className="signal-diagram__line"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
      {nodes.map((n) => (
        <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
          <circle r="26" className="signal-diagram__node" />
          <text textAnchor="middle" dy="4" className="signal-diagram__node-label">
            {n.label}
          </text>
        </g>
      ))}
      <g transform={`translate(${hub.x}, ${hub.y})`}>
        <circle r="38" className="signal-diagram__hub" />
        <text textAnchor="middle" dy="5" className="signal-diagram__hub-label">
          Your system
        </text>
      </g>
    </svg>
  );
}
