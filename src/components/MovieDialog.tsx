import { AssetImage } from "./AssetImage";
import { useState } from "react";
import { ArrowUpRight, Play, Clock3 } from "lucide-react";
import { catalogMovies } from "../data/catalog";
import { timelineFilms } from "../data/timeline";
import { heroes, type Hero } from "../data/universe";
import type { Movie } from "../data/universe";
import { Modal } from "./Modal";

export function MovieDialog({
  movie,
  onClose,
  onMovie,
  onHero,
}: {
  movie: Movie;
  onClose: () => void;
  onMovie: (movie: Movie) => void;
  onHero: (hero: Hero) => void;
}) {
  const chapter = timelineFilms.find((f) => f.id === movie.id);
  const [playing, setPlaying] = useState(false);
  const url = new URL(movie.trailerUrl);
  const videoId = url.hostname.includes("youtube.com")
    ? url.searchParams.get("v")
    : null;
  return (
    <Modal
      onClose={onClose}
      labelId="movie-dialog-title"
      className="movie-modal"
    >
      <div className="movie-screen">
        {playing && videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`${movie.title} official trailer`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <AssetImage src={movie.image} alt="" />
            <div className="movie-screen-shade" />
            {videoId ? (
              <button
                className="trailer-play"
                onClick={(event) => {
                  event.currentTarget
                    .closest('[role="dialog"]')
                    ?.querySelector<HTMLButtonElement>(".modal-close")
                    ?.focus();
                  setPlaying(true);
                }}
              >
                <span>
                  <Play size={28} fill="currentColor" />
                </span>
                PLAY OFFICIAL TRAILER
              </button>
            ) : (
              <a
                className="trailer-play"
                href={movie.trailerUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <Play size={28} fill="currentColor" />
                </span>
                EXPLORE ON MARVEL.COM
              </a>
            )}
          </>
        )}
      </div>
      <div className="movie-dialog-content">
        <div className="section-kicker">
          {movie.phase} <span>/</span> {movie.year}
        </div>
        <h2 id="movie-dialog-title">{movie.title}</h2>
        <p>{movie.description}</p>
        {chapter && (
          <div className="movie-detail-expansion">
            <span className="explorer-label">MAIN CHARACTERS</span>
            <div className="film-characters">
              {chapter.characters.map((name) => {
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
              <span className="explorer-label">CONNECTED FILMS</span>
              {chapter.connections.map((c) => (
                <button
                  key={c.id}
                  onClick={() =>
                    onMovie(catalogMovies.find((m) => m.id === c.id)!)
                  }
                >
                  <span>
                    <strong>
                      {catalogMovies.find((m) => m.id === c.id)!.title}
                    </strong>
                    <small>{c.reason}</small>
                  </span>
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
            {!videoId && (
              <p className="trailer-note">
                Explore videos on the official film page. In-page trailers are
                available for the four Avengers films.
              </p>
            )}
          </div>
        )}
        <div className="movie-dialog-footer">
          <span>
            <Clock3 size={15} />
            {movie.runtime || `Released ${chapter?.date ?? movie.year}`}
          </span>
          <a href={movie.trailerUrl} target="_blank" rel="noreferrer">
            {videoId ? "OPEN TRAILER ON YOUTUBE" : "OFFICIAL FILM & VIDEOS"}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </Modal>
  );
}
