import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Network } from "lucide-react";
import { heroes, type Hero } from "../data/universe";
import {
  connections,
  connectionColors,
  type ConnectionKind,
} from "../data/connections";
import { ExplorerHeading } from "./ExplorerShared";
export function Connections({ onSelect }: { onSelect: (hero: Hero) => void }) {
  const [selected, setSelected] = useState("iron-man");
  const [kind, setKind] = useState<ConnectionKind | "All">("All");
  const hero = heroes.find((h) => h.id === selected)!;
  const links = connections.filter(
    (c) =>
      (c.a === selected || c.b === selected) &&
      (kind === "All" || kind === c.kind),
  );
  const neighbors = links.map((c, i) => {
    const other = heroes.find((h) => h.id === (c.a === selected ? c.b : c.a))!;
    const angle = (i / links.length) * Math.PI * 2 - Math.PI / 2;
    return {
      hero: other,
      link: c,
      x: 50 + Math.cos(angle) * 36,
      y: 50 + Math.sin(angle) * 35,
    };
  });
  return (
    <section
      id="connections"
      className="connections-section section-space"
      aria-labelledby="connections-title"
    >
      <ExplorerHeading
        number="04"
        kicker="NO HERO STANDS ALONE"
        id="connections-title"
        title="MARVEL"
        accent="CONNECTIONS."
        description="Every alliance has a story. Every conflict leaves a mark. Select a portrait to follow the threads between heroes."
      />
      <div className="page-gutter">
        <div className="connection-filters" aria-label="Relationship types">
          {(
            ["All", ...Object.keys(connectionColors)] as (
              ConnectionKind | "All"
            )[]
          ).map((type) => (
            <button
              key={type}
              onClick={() => setKind(type)}
              aria-pressed={kind === type}
              style={
                {
                  "--connection-color":
                    type === "All" ? "#fff" : connectionColors[type],
                } as CSSProperties
              }
            >
              <i />
              {type}
            </button>
          ))}
        </div>
        <div className="network-layout">
          <div
            className="network-stage"
            aria-label={`Relationship network centered on ${hero.name}`}
          >
            <div className="network-orbit orbit-one" />
            <div className="network-orbit orbit-two" />
            <span className="network-coordinate">
              S.H.I.E.L.D. / CONNECTION ARCHIVE
            </span>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {neighbors.map((n) => (
                <motion.line
                  key={`${selected}-${n.hero.id}-${n.link.kind}`}
                  x1="50"
                  y1="50"
                  x2={n.x}
                  y2={n.y}
                  stroke={connectionColors[n.link.kind]}
                  strokeWidth=".2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </svg>
            <button
              className="network-node network-center"
              style={
                {
                  left: "50%",
                  top: "50%",
                  "--node-color": hero.color,
                } as CSSProperties
              }
              onClick={() => onSelect(hero)}
              aria-label={`Open ${hero.name} dossier`}
            >
              <img src={hero.image} alt="" loading="lazy" />
              <strong>{hero.name}</strong>
              <small>
                OPEN DOSSIER <ArrowUpRight size={10} />
              </small>
            </button>
            {neighbors.map((n) => (
              <motion.button
                className="network-node"
                key={n.hero.id}
                style={
                  {
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    "--node-color": connectionColors[n.link.kind],
                  } as CSSProperties
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelected(n.hero.id)}
                aria-label={`Focus network on ${n.hero.name}: ${n.link.kind}`}
              >
                <img src={n.hero.image} alt="" loading="lazy" />
                <strong>{n.hero.name}</strong>
                <small>{n.link.kind}</small>
              </motion.button>
            ))}
            <span className="network-instruction">
              <Network size={13} /> SELECT A NODE TO REFRAME THE NETWORK
            </span>
          </div>
          <div className="network-details" aria-live="polite">
            <span className="explorer-label">
              {links.length} CONNECTION{links.length !== 1 ? "S" : ""} IN VIEW
            </span>
            <h3>{hero.alias}</h3>
            <p>
              Selected stories through Endgame, with Wanda and Vision’s family
              explored through WandaVision.
            </p>
            <div className="network-relationship-list">
              {neighbors.map((n) => (
                <button
                  key={`${n.hero.id}-${n.link.kind}`}
                  onClick={() => setSelected(n.hero.id)}
                >
                  <span
                    className="relationship-tag"
                    style={{ color: connectionColors[n.link.kind] }}
                  >
                    {n.link.kind}
                  </span>
                  <strong>
                    {n.hero.name}
                    <ArrowUpRight size={13} />
                  </strong>
                  <span>{n.link.story}</span>
                </button>
              ))}
              {links.length === 0 && (
                <div className="network-empty">
                  <p>
                    No {kind.toLowerCase()} connection is included for this
                    character in this curated archive.
                  </p>
                  <button
                    className="text-action"
                    onClick={() => setKind("All")}
                  >
                    SHOW ALL CONNECTIONS <ArrowUpRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="network-roster" aria-label="Choose network character">
          {heroes.map((h) => (
            <button
              key={h.id}
              aria-pressed={selected === h.id}
              aria-label={`Show ${h.name} connections`}
              onClick={() => setSelected(h.id)}
            >
              <img src={h.image} alt="" loading="lazy" width="64" height="64" />
              <span>{h.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
