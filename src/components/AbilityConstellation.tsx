import { useState } from "react";
import {
  Brain,
  Cpu,
  Eye,
  Flame,
  Heart,
  Orbit,
  Shield,
  Sparkles,
  Swords,
  Target,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Ability, AbilityIcon } from "../data/universe";

const abilityIcons: Record<AbilityIcon, LucideIcon> = {
  cpu: Cpu,
  brain: Brain,
  wind: Wind,
  zap: Zap,
  shield: Shield,
  sparkles: Sparkles,
  target: Target,
  heart: Heart,
  swords: Swords,
  eye: Eye,
  orbit: Orbit,
  flame: Flame,
};

export function AbilityConstellation({
  abilities,
  heroName,
}: {
  abilities: Ability[];
  heroName: string;
}) {
  const [selectedId, setSelectedId] = useState(abilities[0]?.id);
  const reducedMotion = useReducedMotion();
  const selected =
    abilities.find((ability) => ability.id === selectedId) ?? abilities[0];
  if (!selected) return null;
  const SelectedIcon = abilityIcons[selected.icon];
  const nodes = abilities.map((ability, index) => {
    const angle = (index / abilities.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ability,
      x: 200 + Math.cos(angle) * 128,
      y: 200 + Math.sin(angle) * 128,
    };
  });
  return (
    <div className="experience-ability-console">
      <div
        className="experience-constellation"
        role="group"
        aria-label={`${heroName} abilities`}
      >
        <svg
          className="experience-constellation-lines"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <circle
            cx="200"
            cy="200"
            r="128"
            className="experience-orbit-outer"
          />
          <circle cx="200" cy="200" r="94" className="experience-orbit-inner" />
          {nodes.map(({ ability, x, y }) => (
            <line
              key={ability.id}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              className={selected.id === ability.id ? "is-selected" : ""}
            />
          ))}
        </svg>
        <div className="experience-orbit-particle" aria-hidden="true">
          <i />
        </div>
        <div className="experience-reactor" aria-hidden="true">
          <div className="experience-reactor-ring" />
          <SelectedIcon size={31} strokeWidth={1.25} />
          <span>
            ABILITY
            <br />
            MATRIX
          </span>
        </div>
        {nodes.map(({ ability, x, y }) => {
          const Icon = abilityIcons[ability.icon];
          return (
            <button
              key={ability.id}
              className={`experience-ability-node ${selected.id === ability.id ? "is-selected" : ""}`}
              style={{ left: `${x / 4}%`, top: `${y / 4}%` }}
              onMouseEnter={() => setSelectedId(ability.id)}
              onFocus={() => setSelectedId(ability.id)}
              onClick={() => setSelectedId(ability.id)}
              aria-pressed={selected.id === ability.id}
              aria-controls="experience-ability-description"
            >
              <span className="experience-ability-icon">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>{ability.label}</span>
            </button>
          );
        })}
      </div>
      <div
        className="experience-ability-detail"
        id="experience-ability-description"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="experience-ability-detail-icon">
          <SelectedIcon size={23} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <motion.div
          key={selected.id}
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <h4>{selected.label}</h4>
          <p>{selected.description}</p>
        </motion.div>
      </div>
      <p className="experience-ability-instruction">
        SELECT AN ABILITY TO EXPLORE
      </p>
    </div>
  );
}
