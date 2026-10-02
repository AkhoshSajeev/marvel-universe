import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import { timelineFilms, phaseNames, timelineSource } from "../data/timeline";
import { heroes, movies, type Hero, type Movie } from "../data/universe";
import { ExplorerHeading } from "./ExplorerShared";
export function MCUTimeline({
  onHero,
  onMovie,
  selected,
  setSelected,
}: {
  onHero: (hero: Hero) => void;
  onMovie: (movie: Movie) => void;
  selected: string;
  setSelected: (id: string) => void;
}) {
  const film = timelineFilms.find((f) => f.id === selected)!;
  const phaseFilms = timelineFilms.filter((f) => f.phase === film.phase);
  const rail = useRef<HTMLDivElement>(null);
  const index = timelineFilms.indexOf(film);
  const trailer = movies.find((m) => m.id === film.id);
  useEffect(() => {
    const node = rail.current?.querySelector<HTMLElement>(
      '[aria-pressed="true"]',
    );
    if (node && rail.current)
      rail.current.scrollTo({
        left:
          node.offsetLeft - rail.current.clientWidth / 2 + node.clientWidth / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, [selected]);
  return (
    <section
      id="timeline"
      className="mcu-timeline section-space"
      aria-labelledby="timeline-title"
    >
      <ExplorerHeading
        number="02"
        kicker="EVERY STORY LEAVES A TRACE"
        id="timeline-title"
        title="MARVEL CINEMATIC"
        accent="TIMELINE."
        description="Follow the films that built a universe. Choose a phase. Open a chapter. Discover what connects them."
      />
      <div className="page-gutter">
        <div className="timeline-topline">
          <span>THEATRICAL RELEASE ORDER · US DATES</span>
          <span>37 FILMS · 2008–2025</span>
        </div>
        <div className="phase-switcher" aria-label="Timeline phases">
          {phaseNames.map((name, i) => (
            <button
              key={name}
              aria-pressed={film.phase === i + 1}
              onClick={() =>
                setSelected(timelineFilms.find((f) => f.phase === i + 1)!.id)
              }
            >
              <span>PHASE 0{i + 1}</span>
              <small>{name}</small>
            </button>
          ))}
        </div>
        <div
          className="film-rail"
          ref={rail}
          aria-label={`Phase ${film.phase} films`}
        >
          {phaseFilms.map((f) => (
            <button
              key={f.id}
              aria-pressed={selected === f.id}
              onClick={() => setSelected(f.id)}
            >
              <span>{f.date.slice(0, 4)}</span>
              <i />
              <strong>{f.title}</strong>
            </button>
          ))}
        </div>
        <motion.div
          key={film.id}
          className="timeline-feature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="timeline-art">
            <img
              src={film.image}
              alt={`${film.title} theatrical poster`}
              width="600"
              height="900"
              loading="lazy"
            />
            <span className="timeline-art-index">
              {String(index + 1).padStart(2, "0")}
              <small>/ 37</small>
            </span>
          </div>
          <div className="timeline-story" aria-live="polite" aria-atomic="true">
            <span className="explorer-label">
              <CalendarDays size={13} />{" "}
              {new Date(`${film.date}T12:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · PHASE {film.phase}
            </span>
            <h3>{film.title}</h3>
            <p>{film.summary}</p>
            <span className="explorer-label">MAJOR CHARACTERS</span>
            <div className="film-characters">
              {film.characters.map((name) => {
                const hero = heroes.find(
                  (h) =>
                    h.name === name ||
                    (name === "Captain America / Sam Wilson" &&
                      h.id === "falcon"),
                );
                return hero ? (
                  <button key={name} onClick={() => onHero(hero)}>
                    {name}
                    <ArrowUpRight size={12} />
                  </button>
                ) : (
                  <span key={name}>{name}</span>
                );
              })}
            </div>
            <div className="film-connections">
              <span className="explorer-label">FOLLOW THE THREAD</span>
              {film.connections.map((link) => (
                <button key={link.id} onClick={() => setSelected(link.id)}>
                  <span>
                    <strong>
                      {timelineFilms.find((f) => f.id === link.id)!.title}
                    </strong>
                    <small>{link.reason}</small>
                  </span>
                  <ArrowRight size={20} />
                </button>
              ))}
            </div>
            {trailer && (
              <button className="text-action" onClick={() => onMovie(trailer)}>
                WATCH OFFICIAL TRAILER <ArrowUpRight size={14} />
              </button>
            )}
          </div>
        </motion.div>
        <div className="timeline-bottom">
          <div>
            <button
              className="explorer-icon-button"
              aria-label="Previous film"
              disabled={index === 0}
              onClick={() => setSelected(timelineFilms[index - 1].id)}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="explorer-icon-button"
              aria-label="Next film"
              disabled={index === timelineFilms.length - 1}
              onClick={() => setSelected(timelineFilms[index + 1].id)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <p>
            Film archive through July 2025. Release order, not in-universe
            chronology.
          </p>
          <a href={timelineSource} target="_blank" rel="noreferrer">
            MARVEL FILM ARCHIVE <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
