import { useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Shield, X, SlidersHorizontal } from "lucide-react";
import { heroes, universeFacts, type Hero } from "../data/universe";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  rosterEntries,
  characterFilters,
  type CharacterFilter,
  type ArchiveRecord,
} from "../data/catalog";
import { CharacterCard } from "./CharacterCard";

export function Avengers({
  onSelect,
  onRecord,
}: {
  onSelect: (hero: Hero) => void;
  onRecord: (record: ArchiveRecord) => void;
}) {
  const [filter, setFilter] = useState<CharacterFilter>("ALL");
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [filter, query]);
  const matches = (
    entry: (typeof rosterEntries)[number],
    selected: CharacterFilter,
  ) => selected === "ALL" || entry.tags.includes(selected);
  const shown = rosterEntries.filter(
    (entry) =>
      matches(entry, filter) &&
      (!search ||
        `${entry.record.title} ${entry.record.subtitle} ${entry.record.keywords}`
          .toLowerCase()
          .includes(search)),
  );
  return (
    <section
      id="avengers"
      className="avengers-section expanded-roster section-space"
      aria-labelledby="avengers-title"
    >
      <div className="section-heading page-gutter" data-reveal>
        <div>
          <div className="section-kicker">
            <span>01</span> THE AVENGERS & THEIR ALLIES
          </div>
          <h2 id="avengers-title">
            EARTH’S MIGHTIEST
            <br />
            <span className="roster-heading-accent">HEROES.</span>
          </h2>
        </div>
        <p className="section-intro">
          Behind every power, a person.
          <br />
          Behind every legend, a story.
          <span>
            Explore the heroes, allies, and unlikely saviors
            <br />
            who shaped the Marvel Cinematic Universe.
          </span>
        </p>
      </div>
      <div className="character-controls page-gutter">
        <div className="character-filters" aria-label="Filter characters">
          {characterFilters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={filter === item ? "selected" : ""}
            >
              {item}
              <span>
                {String(
                  rosterEntries.filter((entry) => matches(entry, item)).length,
                ).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        <label className="character-search">
          <Search size={15} />
          <input
            type="search"
            placeholder="Find a character…"
            aria-label="Search characters"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear character search"
            >
              <X size={15} />
            </button>
          )}
        </label>
      </div>
      <p className="roster-scope page-gutter">
        Categories reflect these MCU snapshots. Loki spans ally and antagonist
        roles; Wolverine is a multiversal guest. Open a file for its story
        scope.
      </p>
      <div className="character-results page-gutter">
        <span role="status" aria-live="polite">
          {String(shown.length).padStart(2, "0")} CHARACTERS DISCOVERED
        </span>
        <span>
          <SlidersHorizontal size={12} /> SELECT A CHARACTER. ENTER THEIR WORLD.
        </span>
      </div>
      <div className="character-grid page-gutter">
        <AnimatePresence>
          {shown.map((entry) => {
            const hero = heroes.find((h) => h.id === entry.id);
            return hero ? (
              <CharacterCard
                key={entry.id}
                hero={hero}
                index={heroes.indexOf(hero)}
                onSelect={onSelect}
              />
            ) : (
              <motion.article
                className="character-entry archive-entry"
                key={entry.id}
                layout={!reduced}
                initial={{ opacity: 0, y: reduced ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
              >
                <button
                  className="archive-portal"
                  data-cursor="EXPLORE"
                  onClick={() => onRecord(entry.record)}
                  aria-label={`Explore ${entry.record.title} archive file`}
                >
                  <img
                    src={entry.record.image}
                    alt={entry.record.title}
                    loading="lazy"
                    width="600"
                    height="900"
                  />
                  <span className="archive-card-shade" />
                  <span className="archive-card-type">
                    {entry.record.category === "Villains"
                      ? "THREAT FILE"
                      : "MULTIVERSAL GUEST"}
                  </span>
                  <span className="archive-card-caption">
                    <small>{entry.record.subtitle}</small>
                    <strong>{entry.record.title}</strong>
                    <span>OPEN ARCHIVE FILE ↗</span>
                  </span>
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
      {shown.length === 0 && (
        <div className="character-empty page-gutter">
          <Search size={30} />
          <h3>No heroes found.</h3>
          <p>Try a character’s name, identity, or ability.</p>
          <button
            className="button button-red"
            onClick={() => {
              setQuery("");
              setFilter("ALL");
            }}
          >
            RESET FILTERS
          </button>
        </div>
      )}
      <div className="initiative-stats page-gutter">
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
