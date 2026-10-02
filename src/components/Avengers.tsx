import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus, Shield } from "lucide-react";
import { heroes, universeFacts, type Hero } from "../data/universe";

const filters = [
  { id: "all", label: "THE ORIGINAL SIX" },
  { id: "tactical", label: "TECH & TACTICS" },
  { id: "enhanced", label: "SUPERHUMAN" },
] as const;

export function Avengers({ onSelect }: { onSelect: (hero: Hero) => void }) {
  const [filter, setFilter] = useState<string>("all");
  const reducedMotion = useReducedMotion();
  const shown = heroes.filter(
    (hero) =>
      filter === "all" ||
      (filter === "tactical"
        ? ["iron-man", "black-widow", "hawkeye"].includes(hero.id)
        : ["captain-america", "thor", "hulk"].includes(hero.id)),
  );
  return (
    <section
      id="avengers"
      className="avengers-section section-space"
      aria-labelledby="avengers-title"
    >
      <div className="section-heading page-gutter" data-reveal>
        <div>
          <div className="section-kicker">
            <span>01</span> THE AVENGERS INITIATIVE
          </div>
          <h2 id="avengers-title">
            EXTRAORDINARY ALONE.
            <br />
            <span className="muted-heading">UNSTOPPABLE TOGETHER.</span>
          </h2>
        </div>
        <p className="section-intro">
          Different origins. Different powers.
          <br />
          One reason to stand together.
          <br />
          <span>Meet the people behind the legends.</span>
        </p>
      </div>
      <div className="roster-toolbar page-gutter">
        <div className="roster-filters" aria-label="Filter Avengers">
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={filter === item.id ? "selected" : ""}
            >
              {item.label}
              <span>{item.id === "all" ? "06" : "03"}</span>
            </button>
          ))}
        </div>
        <span className="roster-hint">
          <Plus size={13} /> SELECT A HERO TO EXPLORE
        </span>
      </div>
      <div className="hero-roster page-gutter" aria-live="polite">
        {shown.map((hero) => (
          <motion.button
            layout={!reducedMotion}
            key={hero.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="hero-card"
            onClick={() => onSelect(hero)}
            style={{ "--hero-color": hero.color } as CSSProperties}
            aria-label={`Explore ${hero.name}, ${hero.alias}`}
          >
            <img
              src={hero.image}
              alt={hero.name}
              loading="lazy"
              width={540}
              height={700}
            />
            <div className="hero-card-shade" />
            <span className="hero-card-index">
              {String(heroes.indexOf(hero) + 1).padStart(2, "0")}{" "}
              <span>/ AVENGER</span>
            </span>
            <span className="hero-card-plus">
              <Plus size={17} />
            </span>
            <span className="hero-card-copy">
              <span className="hero-card-alias">{hero.alias}</span>
              <strong>{hero.name}</strong>
              <span className="hero-card-role">
                {hero.role}
                <ArrowUpRight size={16} />
              </span>
            </span>
          </motion.button>
        ))}
      </div>
      <div className="initiative-stats page-gutter" data-reveal>
        <div className="initiative-symbol">
          <Shield size={27} strokeWidth={1} />
          <span>
            THERE WAS AN IDEA.
            <br />
            <b>TO BRING TOGETHER A GROUP OF REMARKABLE PEOPLE.</b>
          </span>
        </div>
        <div className="stats-list">
          {universeFacts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
