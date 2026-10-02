import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, Command, CornerDownLeft } from "lucide-react";
import {
  searchArchive,
  searchCategories,
  type ArchiveRecord,
  type SearchCategory,
  catalogMovies,
} from "../data/catalog";
import { type Hero, type Movie } from "../data/universe";
import { HeroLinks } from "./ExplorerShared";
import { Modal } from "./Modal";
export function GlobalSearch({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (record: ArchiveRecord) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory | "All">("All");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  const results = searchArchive(query, category);
  const shown = results.slice(0, 60);
  useEffect(() => {
    const frame = requestAnimationFrame(() => input.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);
  const update = (value: string) => {
    setQuery(value);
    setActive(0);
  };
  const move = (direction: number) => {
    if (!shown.length) return;
    const next = (active + direction + shown.length) % shown.length;
    setActive(next);
    document
      .getElementById(`search-result-${next}`)
      ?.scrollIntoView({ block: "nearest" });
  };
  return (
    <Modal
      onClose={onClose}
      labelId="global-search-title"
      className="global-search-modal"
    >
      <div className="search-heading">
        <span className="explorer-label">
          <i className="hud-live" /> S.H.I.E.L.D. ARCHIVE / SYSTEM ONLINE
        </span>
        <h2 id="global-search-title">SEARCH THE UNIVERSE.</h2>
      </div>
      <label className="global-search-input">
        <Search size={23} />
        <input
          ref={input}
          role="combobox"
          aria-label="Search the Marvel Universe"
          aria-controls="global-search-results"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-activedescendant={
            shown[active] ? `search-result-${active}` : undefined
          }
          placeholder="A hero. A world. A moment."
          value={query}
          onChange={(e) => update(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              move(e.key === "ArrowDown" ? 1 : -1);
            }
            if (e.key === "Enter" && shown[active]) {
              e.preventDefault();
              onSelect(shown[active]);
            }
          }}
        />
        <kbd>
          <Command size={12} /> K
        </kbd>
      </label>
      <div className="search-category-tabs" aria-label="Search categories">
        {(["All", ...searchCategories] as const).map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => {
              setCategory(c);
              setActive(0);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="search-summary" role="status">
        {query ? `${results.length} matches` : "Explore the archive"}
        <span>
          ↑ ↓ NAVIGATE <CornerDownLeft size={12} /> OPEN
        </span>
      </div>
      <div
        id="global-search-results"
        role="listbox"
        aria-label="Archive search results"
        className="global-results"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${query}-${category}`}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.12 }}
          >
            {shown.map((r, i) => (
              <button
                role="option"
                id={`search-result-${i}`}
                aria-selected={active === i}
                key={r.id}
                onFocus={() => setActive(i)}
                onClick={() => onSelect(r)}
                className="global-result"
              >
                {r.image ? (
                  <img src={r.image} alt="" loading="lazy" />
                ) : (
                  <span className="search-record-mark">
                    {r.category.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span>
                  <small>{r.category}</small>
                  <strong>{r.title}</strong>
                  <em>{r.subtitle}</em>
                </span>
                <ArrowUpRight size={17} />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
        {shown.length === 0 && (
          <div className="search-empty">
            <Search size={32} />
            <h3>No signal found.</h3>
            <p>Try a name, ability, film or location.</p>
            <button
              className="text-action"
              onClick={() => {
                update("");
                setCategory("All");
              }}
            >
              RESET SEARCH
            </button>
          </div>
        )}
        {results.length > 60 && (
          <p className="search-limit">
            Showing the first 60 matches. Add a word or choose a category to
            narrow the archive.
          </p>
        )}
      </div>
    </Modal>
  );
}
export function ArchiveDialog({
  record,
  onClose,
  onHero,
  onMovie,
  onSection,
}: {
  record: ArchiveRecord;
  onClose: () => void;
  onHero: (hero: Hero) => void;
  onMovie: (movie: Movie) => void;
  onSection: (id: string) => void;
}) {
  return (
    <Modal
      onClose={onClose}
      labelId="archive-record-title"
      className="archive-record-modal"
    >
      {record.image && (
        <div className="archive-record-art">
          <img src={record.image} alt={record.title} />
        </div>
      )}
      <div className="archive-record-copy">
        <span className="explorer-label">
          S.H.I.E.L.D. ARCHIVE / {record.category.toUpperCase()}
        </span>
        <h2 id="archive-record-title">{record.title}</h2>
        <span className="archive-record-subtitle">{record.subtitle}</span>
        <p>{record.description}</p>
        {record.relatedHeroes?.length ? (
          <HeroLinks ids={record.relatedHeroes} onSelect={onHero} />
        ) : null}
        {record.relatedFilms?.length ? (
          <div className="record-films">
            <span className="explorer-label">CONNECTED CHAPTERS</span>
            {record.relatedFilms.map((id) => {
              const film = catalogMovies.find((f) => f.id === id);
              return film ? (
                <button key={id} onClick={() => onMovie(film)}>
                  {film.title}
                  <ArrowUpRight size={14} />
                </button>
              ) : null;
            })}
          </div>
        ) : null}
        {record.section && (
          <button
            className="button button-red"
            onClick={() => onSection(record.section!)}
          >
            EXPLORE {record.category.toUpperCase()}
            <ArrowUpRight size={15} />
          </button>
        )}
      </div>
    </Modal>
  );
}
