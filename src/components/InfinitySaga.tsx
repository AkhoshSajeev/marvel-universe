import { imageAsset } from "../assets/registry";
import { AssetImage } from "./AssetImage";
import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { stones } from "../data/stones";
import { ExplorerHeading } from "./ExplorerShared";
export function InfinitySaga() {
  const [id, setId] = useState("space");
  const stone = stones.find((s) => s.id === id)!;
  return (
    <section
      id="infinity"
      className="infinity-section section-space"
      aria-labelledby="infinity-title"
      style={{ "--stone-color": stone.color } as CSSProperties}
    >
      <ExplorerHeading
        number="06"
        kicker="SIX STONES. ONE IMPOSSIBLE CHOICE."
        id="infinity-title"
        title="THE INFINITY SAGA."
        description="Before creation itself, there were six singularities. Their power would shape a universe—and the heroes who fought to save it."
      />
      <div className="page-gutter">
        <div className="infinity-layout">
          <div className="stone-universe">
            <div className="stone-starfield" />
            <div className="infinity-ring" />
            <AssetImage
              className="stone-thanos"
              src={imageAsset("threat-thanos")}
              alt="Thanos, the seeker of all six Infinity Stones"
              loading="lazy"
            />
            <svg
              className="stone-rays"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {stones.map((s, i) => {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
                return (
                  <line
                    key={s.id}
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(a) * 36}
                    y2={50 + Math.sin(a) * 36}
                    stroke={s.color}
                    strokeWidth={id === s.id ? 0.7 : 0.2}
                    opacity={id === s.id ? 0.9 : 0.3}
                  />
                );
              })}
            </svg>
            <div className="infinity-center">
              <span>THE MAD TITAN</span>
              <strong>THANOS</strong>
              <small>
                ONE GAUNTLET.
                <br />
                INFINITE CONSEQUENCES.
              </small>
            </div>
            {stones.map((s, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              return (
                <button
                  key={s.id}
                  className={`stone-node stone-${s.id}`}
                  style={
                    {
                      left: `${50 + Math.cos(a) * 36}%`,
                      top: `${50 + Math.sin(a) * 36}%`,
                      "--gem-color": s.color,
                      "--float-delay": `${i * -0.6}s`,
                    } as CSSProperties
                  }
                  aria-label={`Reveal ${s.name}`}
                  aria-pressed={id === s.id}
                  onClick={() => setId(s.id)}
                >
                  <span className="gem-halo" />
                  <span className="stone-gem">
                    <svg viewBox="0 0 60 80" aria-hidden="true">
                      <path
                        d="M30 2 53 20 57 53 30 78 3 53 7 20Z"
                        fill="currentColor"
                      />
                      <path
                        d="m30 2 12 29-12 47-12-47Z"
                        fill="white"
                        opacity=".45"
                      />
                      <path
                        d="m7 20 35 11 15 22-39-22Z"
                        fill="white"
                        opacity=".3"
                      />
                      <path d="m3 53 27 25 12-47Z" fill="black" opacity=".27" />
                    </svg>
                  </span>
                  <strong>{s.name.replace(" Stone", "")}</strong>
                  <small>{s.colorName.toUpperCase()}</small>
                </button>
              );
            })}
          </div>
          <motion.div
            key={id}
            className="stone-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
          >
            <span className="explorer-label">
              <Sparkles size={14} /> {stone.colorName.toUpperCase()} ·{" "}
              {stone.vessel}
            </span>
            <h3>{stone.name}</h3>
            <p className="stone-power">{stone.power}</p>
            <span className="explorer-label">ECHOES THROUGH THE SAGA</span>
            <ol>
              {stone.events.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ol>
            <div className="stone-thanos-link">
              <span className="explorer-label">THE PATH TO THE GAUNTLET</span>
              <p>{stone.thanos}</p>
            </div>
            <span className="explorer-label">MAJOR APPEARANCES</span>
            <div className="stone-appearances">
              {stone.appearances.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="infinity-epilogue">
          <span>THE SNAP</span>
          <ArrowRight size={20} />
          <p>
            Six stones erase half of all life. A time heist brings hope. Bruce
            restores the lost. Tony ends the battle.
          </p>
          <span>WHATEVER IT TAKES.</span>
        </div>
      </div>
    </section>
  );
}
