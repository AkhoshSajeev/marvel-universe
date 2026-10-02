import { useState } from "react";
import { ArrowUpRight, Play, Clock3 } from "lucide-react";
import type { Movie } from "../data/universe";
import { Modal } from "./Modal";

export function MovieDialog({
  movie,
  onClose,
}: {
  movie: Movie;
  onClose: () => void;
}) {
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
            <img src={movie.image} alt="" />
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
                WATCH ON MARVEL.COM
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
        <div className="movie-dialog-footer">
          <span>
            <Clock3 size={15} />
            {movie.runtime}
          </span>
          <a href={movie.trailerUrl} target="_blank" rel="noreferrer">
            {videoId ? "OPEN TRAILER ON YOUTUBE" : "OFFICIAL MARVEL TRAILER"}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </Modal>
  );
}
