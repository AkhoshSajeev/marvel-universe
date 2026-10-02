import { ArrowUpRight, Play, MoveRight } from "lucide-react";
import { movies, type Movie } from "../data/universe";

export function Saga({ onSelect }: { onSelect: (movie: Movie) => void }) {
  return (
    <section
      id="saga"
      className="saga-section section-space"
      aria-labelledby="saga-title"
    >
      <div className="section-heading page-gutter" data-reveal>
        <div>
          <div className="section-kicker">
            <span>07</span> A LEGACY IN THE MAKING
          </div>
          <h2 id="saga-title">
            EVERY CHAPTER.
            <br />
            <span className="muted-heading">EVERYTHING AT STAKE.</span>
          </h2>
        </div>
        <p className="section-intro">
          From the streets of New York
          <br />
          to the edge of the universe.
          <br />
          <span>Relive the saga that changed everything.</span>
        </p>
      </div>
      <div className="saga-grid page-gutter">
        {movies.map((movie, index) => (
          <button
            className="movie-card"
            key={movie.id}
            onClick={() => onSelect(movie)}
            aria-label={`Explore ${movie.title} and watch trailer`}
          >
            <span className="movie-timeline">
              <span className="timeline-dot" />
              <span>{movie.year}</span>
              <span className="movie-phase">{movie.phase}</span>
            </span>
            <span className="movie-poster">
              <img
                src={movie.image}
                alt={`${movie.title} poster`}
                width={500}
                height={750}
                loading="lazy"
              />
              <span className="movie-image-shade" />
              <span className="movie-number">0{index + 1}</span>
              <span className="movie-play">
                <Play size={20} fill="currentColor" />
              </span>
              <span className="movie-poster-label">
                EXPLORE THE CHAPTER <ArrowUpRight size={16} />
              </span>
            </span>
            <span className="movie-title">
              {movie.title.replace("Avengers: ", "")}
              <ArrowUpRight size={17} />
            </span>
            <span className="movie-meta">
              {movie.runtime}
              <span />
              MARVEL STUDIOS
            </span>
          </button>
        ))}
      </div>
      <div className="saga-note page-gutter">
        <span className="live-dot" />
        <span>THE INFINITY SAGA</span>
        <span className="saga-note-line" />
        <span>2008 — 2019</span>
      </div>
      <div className="assemble-banner page-gutter" data-reveal>
        <div className="assemble-mark" aria-hidden="true">
          A
        </div>
        <div className="assemble-text">
          <div className="section-kicker">
            EARTH’S MIGHTIEST HEROES. ONE UNIVERSE. INFINITE STORIES.
          </div>
          <h2>WHATEVER IT TAKES.</h2>
          <p>The world will always need heroes.</p>
        </div>
        <a href="#avengers" className="button button-red">
          FIND YOUR HERO <MoveRight size={18} />
        </a>
      </div>
    </section>
  );
}
