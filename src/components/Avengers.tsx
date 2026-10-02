import { useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Shield, X, SlidersHorizontal } from "lucide-react";
import { heroes, universeFacts, type Hero } from "../data/universe";
import { CharacterCard } from "./CharacterCard";

const filters = [
  { id: "all", label: "ALL CHARACTERS" },
  { id: "original", label: "ORIGINAL SIX" },
  { id: "tech", label: "TECH & TACTICS" },
  { id: "enhanced", label: "ENHANCED" },
  { id: "mystic", label: "MYSTIC" },
  { id: "cosmic", label: "COSMIC" },
] as const;
function matchesFilter(hero: Hero, filter: string) {
  if (filter === "all") return true;
  if (filter === "original")
    return heroes.slice(0, 6).some((original) => original.id === hero.id);
  if (filter === "tech")
    return hero.category === "tech" || hero.category === "tactical";
  return hero.category === filter;
}
export function Avengers({ onSelect }: { onSelect: (hero: Hero) => void }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [filter, query]);
  const shown = heroes.filter(
    (hero) =>
      matchesFilter(hero, filter) &&
      (!search ||
        [
          hero.name,
          hero.alias,
          hero.affiliation,
          ...hero.abilities.map((ability) => ability.label),
        ]
          .join(" ")
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
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={filter === item.id ? "selected" : ""}
            >
              {item.label}
              <span>
                {String(
                  heroes.filter((hero) => matchesFilter(hero, item.id)).length,
                ).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        <label className="character-search">
          <Search size={15} />
          <input
            type="search"
            placeholder="Find your hero…"
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
      <div className="character-results page-gutter">
        <span role="status" aria-live="polite">
          {String(shown.length).padStart(2, "0")} CHARACTERS DISCOVERED
        </span>
        <span>
          <SlidersHorizontal size={12} /> SELECT A CHARACTER. ENTER THEIR WORLD.
        </span>
      </div>
      <div className="character-grid page-gutter">
        {shown.map((hero) => (
          <CharacterCard
            key={hero.id}
            hero={hero}
            index={heroes.indexOf(hero)}
            onSelect={onSelect}
          />
        ))}
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
              setFilter("all");
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
