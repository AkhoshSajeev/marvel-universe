import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { catalogMovies } from "../data/catalog";
import { timelineFilms } from "../data/timeline";
import { type Movie } from "../data/universe";
import { ExplorerHeading } from "./ExplorerShared";
export function MovieExplorer({
  onSelect,
}: {
  onSelect: (movie: Movie) => void;
}) {
  const [phase, setPhase] = useState(0);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(12);
  const reduced = useReducedMotion();
  const films = catalogMovies.filter(
    (m) =>
      (phase === 0 || m.phase === `Phase ${phase}`) &&
      `${m.title} ${m.year} ${timelineFilms.find((f) => f.id === m.id)!.characters.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section
      id="movies"
      className="movie-universe section-space"
      aria-labelledby="movies-title"
    >
      <ExplorerHeading
        number="09"
        kicker="37 FILMS. ONE SHARED UNIVERSE."
        id="movies-title"
        title="MOVIE UNIVERSE."
        description="From the first suit of armor to new worlds beyond our own. Enter a film, meet its characters and follow its connections."
      />
      <div className="page-gutter">
        <div className="movie-browser-controls">
          <div className="explorer-tabs" aria-label="Movie phase filter">
            {[0, 1, 2, 3, 4, 5, 6].map((p) => (
              <button
                key={p}
                aria-pressed={p === phase}
                onClick={() => {
                  setPhase(p);
                  setLimit(12);
                }}
              >
                {p === 0 ? "ALL FILMS" : `PHASE ${p}`}
              </button>
            ))}
          </div>
          <label className="movie-browser-search">
            <Search size={15} />
            <input
              type="search"
              aria-label="Search movies"
              placeholder="Film, year or character…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(12);
              }}
            />
          </label>
        </div>
        <div className="movie-browser-status" role="status">
          {films.length} FILMS FOUND <span>ARCHIVE THROUGH JULY 2025</span>
        </div>
        <div className="movie-universe-grid">
          <AnimatePresence>
            {films.slice(0, limit).map((movie) => {
              const f = timelineFilms.find((f) => f.id === movie.id)!;
              return (
                <motion.article
                  layout={!reduced}
                  key={movie.id}
                  initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                >
                  <button
                    className="universe-movie-card"
                    data-cursor="VIEW"
                    onClick={() => onSelect(movie)}
                    aria-label={`View ${movie.title} details`}
                  >
                    <span className="universe-movie-art">
                      <img
                        src={movie.image}
                        alt={`${movie.title} poster`}
                        width="600"
                        height="900"
                        loading="lazy"
                      />
                      <span className="movie-card-shade" />
                      <span className="universe-movie-overlay">
                        <small>{f.characters.slice(0, 3).join(" · ")}</small>
                        <span>{movie.description}</span>
                        <b>
                          ENTER THE FILM <ArrowUpRight size={15} />
                        </b>
                      </span>
                      <span className="movie-phase-badge">{movie.phase}</span>
                    </span>
                    <span className="universe-movie-caption">
                      <strong>{movie.title}</strong>
                      <ArrowUpRight size={16} />
                    </span>
                    <small className="universe-movie-year">
                      {movie.year} · MARVEL STUDIOS
                    </small>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
        {films.length === 0 && (
          <div className="search-empty">
            <h3>No films found.</h3>
            <button
              className="text-action"
              onClick={() => {
                setQuery("");
                setPhase(0);
              }}
            >
              RESET MOVIE FILTERS
            </button>
          </div>
        )}
        {limit < films.length && (
          <button
            className="load-movies"
            onClick={() => setLimit((l) => l + 12)}
          >
            <Plus size={16} /> REVEAL MORE CHAPTERS{" "}
            <span>
              {Math.min(limit, films.length)} / {films.length}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
