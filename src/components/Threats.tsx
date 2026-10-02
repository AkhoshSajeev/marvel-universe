import { AssetImage } from "./AssetImage";
import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Crosshair } from "lucide-react";
import { threats } from "../data/threats";
import { type Hero } from "../data/universe";
import { ExplorerHeading, HeroLinks } from "./ExplorerShared";
export function Threats({
  onHero,
  onFilm,
}: {
  onHero: (hero: Hero) => void;
  onFilm: (id: string) => void;
}) {
  const [id, setId] = useState("thanos");
  const threat = threats.find((t) => t.id === id)!;
  return (
    <section
      id="threats"
      className="threats-section section-space"
      aria-labelledby="threats-title"
      style={{ "--threat-color": threat.color } as CSSProperties}
    >
      <ExplorerHeading
        number="05"
        kicker="SOME SHADOWS REACH ACROSS WORLDS"
        id="threats-title"
        title="THE THREATS."
        description="Ambition. Vengeance. Control. Meet the forces that pushed Earth’s protectors to their limits."
      />
      <div className="page-gutter">
        <div className="threat-selector" aria-label="Choose a villain">
          {threats.map((t, i) => (
            <button
              key={t.id}
              aria-pressed={id === t.id}
              onClick={() => setId(t.id)}
            >
              <AssetImage
                src={t.image}
                alt=""
                loading="lazy"
                width="100"
                height="100"
              />
              <span>
                <small>
                  FILE / 0{i + 1}
                  {t.upcoming ? " · UPCOMING" : ""}
                </small>
                {t.name}
              </span>
            </button>
          ))}
        </div>
        <motion.div
          className="threat-feature"
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="threat-portrait">
            <AssetImage src={threat.image} alt={threat.name} loading="lazy" />
            <div className="threat-image-shade" />
            <span className="threat-crosshair">
              <Crosshair size={24} /> THREAT ARCHIVE /{" "}
              {String(threats.indexOf(threat) + 1).padStart(2, "0")}
            </span>
            <div>
              <span>{threat.alias}</span>
              <h3>{threat.name}</h3>
            </div>
          </div>
          <div className="threat-intel" aria-live="polite">
            <span className="explorer-label">{threat.scope}</span>
            <h4>{threat.motivation}</h4>
            <p>{threat.story}</p>
            <span className="explorer-label">CAPABILITIES</span>
            <ul className="threat-abilities">
              {threat.abilities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="threat-conflict">
              <span className="explorer-label">
                {threat.upcoming ? "ANNOUNCED CONFLICT" : "MAJOR CONFLICT"}
              </span>
              <p>{threat.conflict}</p>
            </div>
            <HeroLinks
              ids={threat.heroes}
              onSelect={onHero}
              label={
                threat.upcoming ? "ANNOUNCED AVENGERS CAST" : "CONNECTED HEROES"
              }
            />
            {threat.filmId ? (
              <button
                className="text-action"
                onClick={() => onFilm(threat.filmId!)}
              >
                EXPLORE THE CONFLICT <ArrowUpRight size={14} />
              </button>
            ) : (
              <a
                className="text-action"
                href="https://www.disneyplus.com/explore/articles/avengers-doomsday"
                target="_blank"
                rel="noreferrer"
              >
                OFFICIAL DOOMSDAY PREVIEW <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </motion.div>
        <p className="explorer-footnote">
          MCU screen incarnations. Files reflect the named films. Doctor Doom is
          an upcoming-film preview; release information checked October 2, 2026.
        </p>
      </div>
    </section>
  );
}
