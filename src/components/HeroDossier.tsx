import { useEffect, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Crosshair, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { heroes, type Hero } from "../data/universe";
import { Modal } from "./Modal";

export function HeroDossier({
  hero,
  onClose,
  onSelect,
}: {
  hero: Hero;
  onClose: () => void;
  onSelect: (hero: Hero) => void;
}) {
  const index = heroes.findIndex((entry) => entry.id === hero.id);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onSelect(heroes[(index + 1) % heroes.length]);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onSelect(heroes[(index - 1 + heroes.length) % heroes.length]);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, onSelect]);
  return (
    <Modal onClose={onClose} labelId="dossier-title" className="dossier-modal">
      <div
        className="dossier-layout"
        style={{ "--hero-color": hero.color } as CSSProperties}
      >
        <motion.div
          className="dossier-art"
          key={`${hero.id}-image`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
        >
          <img src={hero.image} alt={hero.name} />
          <div className="dossier-art-shade" />
          <span className="dossier-art-label">
            <Crosshair size={18} /> AVENGERS PERSONNEL FILE
            <span>0{index + 1}</span>
          </span>
          <blockquote>“{hero.quote}”</blockquote>
        </motion.div>
        <div className="dossier-content">
          <div className="section-kicker">
            <span className="live-dot" /> ACTIVE AVENGER / 0{index + 1}
          </div>
          <motion.div
            key={hero.id}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
          >
            <p className="dossier-alias">{hero.alias}</p>
            <h2 id="dossier-title">{hero.name}</h2>
            <span className="dossier-role">{hero.role}</span>
            <p className="dossier-description">{hero.description}</p>
            <h3 className="micro-heading">
              <Sparkles size={13} /> SIGNATURE ABILITIES
            </h3>
            <div className="ability-list">
              {hero.abilities.map((ability) => (
                <span key={ability}>{ability}</span>
              ))}
            </div>
            <div className="power-heading">
              <h3 className="micro-heading">POWER PROFILE</h3>
              <span>FAN RATINGS / 100</span>
            </div>
            <div className="power-stats">
              {Object.entries(hero.stats).map(([stat, value], i) => (
                <div className="power-stat" key={stat}>
                  <span>{stat}</span>
                  <div className="power-track">
                    <motion.div
                      initial={{ width: reducedMotion ? `${value}%` : 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.7,
                        delay: reducedMotion ? 0 : i * 0.08,
                      }}
                    />
                  </div>
                  <b>{value}</b>
                </div>
              ))}
            </div>
            <dl className="dossier-meta">
              <div>
                <dt>MCU DEBUT</dt>
                <dd>{hero.firstAppearance}</dd>
              </div>
              <div>
                <dt>PORTRAYED BY</dt>
                <dd>{hero.actor}</dd>
              </div>
            </dl>
          </motion.div>
          <div className="dossier-navigation">
            <button
              onClick={() =>
                onSelect(heroes[(index - 1 + heroes.length) % heroes.length])
              }
              aria-label="Previous Avenger"
            >
              <ArrowLeft size={16} />
              <span>PREVIOUS</span>
            </button>
            <span>{String(index + 1).padStart(2, "0")} / 06</span>
            <button
              onClick={() => onSelect(heroes[(index + 1) % heroes.length])}
              aria-label="Next Avenger"
            >
              <span>NEXT AVENGER</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
