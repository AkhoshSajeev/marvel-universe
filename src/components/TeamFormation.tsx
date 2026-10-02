import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { heroes, type Hero } from "../data/universe";
import { teams } from "../data/connections";
import { ExplorerHeading } from "./ExplorerShared";
export function TeamFormation({
  onSelect,
}: {
  onSelect: (hero: Hero) => void;
}) {
  const [teamId, setTeamId] = useState("original");
  const [replay, setReplay] = useState(0);
  const reduce = useReducedMotion();
  const team = teams.find((t) => t.id === teamId)!;
  return (
    <section
      id="teams"
      className="team-section section-space"
      aria-labelledby="teams-title"
    >
      <ExplorerHeading
        number="03"
        kicker="STRONGER TOGETHER"
        id="teams-title"
        title="THE AVENGERS."
        description="The faces change. The promise remains. Meet the formations that stood between the world and the impossible."
      />
      <div className="page-gutter">
        <div className="explorer-tabs" aria-label="Avengers lineups">
          {teams.map((t) => (
            <button
              key={t.id}
              aria-pressed={teamId === t.id}
              onClick={() => setTeamId(t.id)}
            >
              {t.name}
            </button>
          ))}
          <button
            className="formation-replay"
            onClick={() => setReplay((r) => r + 1)}
            aria-label="Replay team formation"
          >
            <RotateCcw size={14} /> REPLAY
          </button>
        </div>
        <div className="formation-copy" aria-live="polite">
          <div>
            <span className="explorer-label">{team.era}</span>
            <h3>{team.title}</h3>
          </div>
          <p>{team.description}</p>
        </div>
        <div className="team-formation" key={`${teamId}-${replay}`}>
          {team.members.map((id, i) => {
            const hero = heroes.find((h) => h.id === id)!;
            return (
              <motion.button
                key={id}
                initial={reduce ? false : { opacity: 0, y: 65 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.12 }}
                onClick={() => onSelect(hero)}
                aria-label={`Open ${hero.name} from ${team.name}`}
                style={{ "--member-color": hero.color } as React.CSSProperties}
              >
                <img
                  src={hero.image}
                  alt={hero.name}
                  loading="lazy"
                  width="500"
                  height="700"
                />
                <span className="formation-shade" />
                <span className="member-number">0{i + 1}</span>
                <span className="member-caption">
                  <small>{hero.alias}</small>
                  <strong>{hero.name}</strong>
                  <ArrowUpRight size={20} />
                </span>
              </motion.button>
            );
          })}
        </div>
        <div className="formation-baseline">
          <span>ONE TEAM. A THOUSAND REASONS TO FIGHT.</span>
          <span>SELECT A HERO TO ENTER THEIR STORY</span>
        </div>
      </div>
    </section>
  );
}
