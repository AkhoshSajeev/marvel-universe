import { useQuietMotion } from "../hooks/useExperience";
import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { heroes, type Hero } from "../data/universe";
import { comparisonCategories, comparisonProfiles } from "../data/comparison";
import { ExplorerHeading } from "./ExplorerShared";
export function AbilityComparison({
  onSelect,
}: {
  onSelect: (hero: Hero) => void;
}) {
  const [left, setLeft] = useState("iron-man");
  const [right, setRight] = useState("thor");
  const [category, setCategory] = useState(0);
  const reduced = useQuietMotion();
  const a = heroes.find((h) => h.id === left)!;
  const b = heroes.find((h) => h.id === right)!;
  return (
    <section
      id="compare"
      className="comparison-section section-space"
      aria-labelledby="compare-title"
    >
      <ExplorerHeading
        number="08"
        kicker="DIFFERENT POWERS. SHARED PURPOSE."
        id="compare-title"
        title="ABILITIES, SIDE BY SIDE."
        description="Choose two characters. Explore what their abilities do, where they come from and how they differ."
      />
      <div className="page-gutter">
        <div className="comparison-selectors">
          <label>
            <span>CHARACTER ONE</span>
            <select
              aria-label="First comparison character"
              value={left}
              onChange={(e) => setLeft(e.target.value)}
            >
              {heroes.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </label>
          <button
            className="comparison-swap"
            aria-label="Swap comparison characters"
            onClick={() => {
              setLeft(right);
              setRight(left);
            }}
          >
            <ArrowLeftRight size={21} />
          </button>
          <label>
            <span>CHARACTER TWO</span>
            <select
              aria-label="Second comparison character"
              value={right}
              onChange={(e) => setRight(e.target.value)}
            >
              {heroes.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div
          className="comparison-arena"
          style={
            {
              "--left-color": a.color,
              "--right-color": b.color,
            } as CSSProperties
          }
        >
          {[a, b].map((h, i) => (
            <div className={`comparison-fighter fighter-${i}`} key={i}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={h.id}
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  initial={{ opacity: 0, x: reduced ? 0 : i ? 15 : -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                />
              </AnimatePresence>
              <div className="comparison-fighter-shade" />
              <div className="comparison-fighter-title">
                <span>{h.alias}</span>
                <strong>{h.name}</strong>
                <button
                  onClick={() => onSelect(h)}
                  aria-label={`Explore ${h.name} from comparison`}
                >
                  DOSSIER <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          ))}
          <div className="comparison-diagram">
            <svg viewBox="0 0 300 300" aria-hidden="true">
              <circle
                cx="150"
                cy="150"
                r="111"
                fill="none"
                stroke="#ffffff18"
              />
              {comparisonCategories.map((c, i) => {
                const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                const x = 150 + Math.cos(angle) * 110;
                const y = 150 + Math.sin(angle) * 110;
                return (
                  <g key={c}>
                    <motion.line
                      key={`${c}-${left}-${right}`}
                      x1="150"
                      y1="150"
                      x2={x}
                      y2={y}
                      stroke={category === i ? "#f3c878" : "#ffffff24"}
                      strokeWidth={category === i ? 2 : 1}
                      initial={{ pathLength: reduced ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: reduced ? 0 : i * 0.03,
                      }}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={category === i ? 6 : 3}
                      fill={category === i ? "#f3c878" : "#697181"}
                    />
                  </g>
                );
              })}
              <circle
                cx="150"
                cy="150"
                r="59"
                fill="#0b0e14"
                stroke="#ffffff20"
              />
            </svg>
            <div>
              <span>COMPARE</span>
              <strong>{comparisonCategories[category]}</strong>
              <small>CAPABILITIES, NOT SCORES</small>
            </div>
          </div>
        </div>
        <div
          className="comparison-categories"
          aria-label="Comparison categories"
        >
          {comparisonCategories.map((c, i) => (
            <button
              key={c}
              aria-pressed={category === i}
              onClick={() => setCategory(i)}
            >
              {c}
            </button>
          ))}
        </div>
        <motion.div
          key={`${left}-${right}-${category}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="comparison-reading"
          aria-live="polite"
        >
          {[a, b].map((h, i) => (
            <div key={i}>
              <span className="explorer-label">
                {h.name.toUpperCase()} /{" "}
                {comparisonCategories[category].toUpperCase()}
              </span>
              <p>{comparisonProfiles[h.id][category]}</p>
            </div>
          ))}
        </motion.div>
        <p className="comparison-note">
          Qualitative MCU comparison. The equal-length diagram spokes represent
          categories; they do not measure power. No numerical ratings, official
          statistics or winners are implied. Each dossier states its story
          scope.
        </p>
      </div>
    </section>
  );
}
