import { ArrowUpRight, Fingerprint, Plus, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Hero } from "../data/universe";
import { usePointerLight } from "../hooks/usePointerLight";

export function CharacterCard({
  hero,
  index,
  onSelect,
}: {
  hero: Hero;
  index: number;
  onSelect: (hero: Hero) => void;
}) {
  const pointer = usePointerLight<HTMLButtonElement>(6);
  const reduced = useReducedMotion();
  return (
    <motion.article
      className="character-entry"
      layout={!reduced}
      initial={{ opacity: 0, y: reduced ? 0 : 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
      transition={{ duration: reduced ? 0 : 0.4 }}
      style={{ "--character-color": hero.color } as CSSProperties}
    >
      <button
        className="character-portal"
        data-cursor="EXPLORE"
        {...pointer}
        onClick={() => onSelect(hero)}
        aria-label={`Explore ${hero.name}, ${hero.alias}`}
      >
        <span className="character-frame">
          <span className="character-body">
            <img
              className="character-image"
              src={hero.image}
              alt={hero.name}
              width={1080}
              height={1104}
              loading="lazy"
            />
            <span className="character-shade" />
            <span className="character-light" />
            <span className="character-energy" />
            <span className="character-topline">
              <span className="character-index">
                {String(index + 1).padStart(2, "0")} <span>/ PERSONNEL</span>
              </span>
              <span className="character-plus">
                <Plus size={18} />
              </span>
            </span>
            <span className="character-affiliation">
              <Fingerprint size={11} />
              {hero.affiliation}
            </span>
            <span className="character-copy">
              <span className="character-alias">{hero.alias}</span>
              <strong className="character-name">{hero.name}</strong>
              <span className="character-ability">
                <Zap size={11} />
                {hero.abilities[0].label}
              </span>
              <span className="character-more">
                <span className="character-debut">
                  <span>FIRST MAJOR APPEARANCE</span>
                  {hero.firstMajorAppearance ?? hero.firstAppearance}
                </span>
                <span className="character-description">
                  {hero.description}
                </span>
              </span>
              <span className="character-open">
                OPEN CHARACTER EXPERIENCE <ArrowUpRight size={16} />
              </span>
            </span>
          </span>
        </span>
      </button>
    </motion.article>
  );
}
