import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Heart, ArrowUp } from "lucide-react";
import { Navigation, Brand } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Avengers } from "./components/Avengers";
import { HeroDossier } from "./components/HeroDossier";
import { MCUTimeline } from "./components/MCUTimeline";
import { TeamFormation } from "./components/TeamFormation";
import { Connections } from "./components/Connections";
import { Threats } from "./components/Threats";
import { InfinitySaga } from "./components/InfinitySaga";
import { Saga } from "./components/Saga";
import { GlobalSearch, ArchiveDialog } from "./components/GlobalSearch";
import { AbilityComparison } from "./components/AbilityComparison";
import { InfinityGauntlet } from "./components/InfinityGauntlet";
import { MovieExplorer } from "./components/MovieExplorer";
import { CinematicEffects } from "./components/CinematicEffects";
import { type ArchiveRecord, catalogMovies } from "./data/catalog";
import { heroes } from "./data/universe";
import { MovieDialog } from "./components/MovieDialog";
import { type Hero as HeroType, type Movie } from "./data/universe";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [overlay, setOverlay] = useState<
    | { type: "hero"; hero: HeroType }
    | { type: "movie"; movie: Movie }
    | { type: "search" }
    | { type: "record"; record: ArchiveRecord }
    | null
  >(null);
  const [timelineFilm, setTimelineFilm] = useState("avengers");
  const root = useRef<HTMLDivElement>(null);
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const setSelectedHero = useCallback(
    (hero: HeroType) => setOverlay({ type: "hero", hero }),
    [],
  );
  const setSelectedMovie = useCallback(
    (movie: Movie) => setOverlay({ type: "movie", movie }),
    [],
  );
  const openSearch = useCallback(() => setOverlay({ type: "search" }), []);
  const openRecord = (record: ArchiveRecord) => {
    if (record.heroId)
      setSelectedHero(heroes.find((h) => h.id === record.heroId)!);
    else if (record.movieId)
      setSelectedMovie(catalogMovies.find((m) => m.id === record.movieId)!);
    else setOverlay({ type: "record", record });
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!overlay) openSearch();
        else if (overlay.type === "search") closeOverlay();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlay, openSearch, closeOverlay]);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      }, root);
      // Film, team and threat selections can change section heights on mobile.
      let frame = 0;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      root.current
        ?.querySelectorAll("main > section")
        .forEach((section) => observer.observe(section));
      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        ctx.revert();
      };
    });
    return () => media.revert();
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <div ref={root} className="app-shell" inert={overlay !== null}>
        <a className="skip-link" href="#avengers">
          Skip to the Avengers
        </a>
        <Navigation onSearch={openSearch} />
        <main>
          <Hero />
          <Avengers onSelect={setSelectedHero} onRecord={openRecord} />
          <nav
            className="universe-chapters page-gutter"
            aria-label="Explore the universe"
          >
            <span>EXPLORE THE UNIVERSE</span>
            {[
              ["timeline", "Timeline"],
              ["teams", "Team lineups"],
              ["connections", "Connections"],
              ["threats", "The threats"],
              ["infinity", "Infinity Stones"],
              ["gauntlet", "Gauntlet"],
              ["compare", "Compare"],
              ["movies", "Movies"],
            ].map(([id, label], i) => (
              <a key={id} href={`#${id}`}>
                <small>0{i + 1}</small>
                {label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </nav>
          <MCUTimeline
            onHero={setSelectedHero}
            onMovie={setSelectedMovie}
            selected={timelineFilm}
            setSelected={setTimelineFilm}
          />
          <TeamFormation onSelect={setSelectedHero} />
          <Connections onSelect={setSelectedHero} />
          <Threats
            onHero={setSelectedHero}
            onFilm={(id) => {
              setTimelineFilm(id);
              window.location.hash = "timeline";
              document.getElementById("timeline")?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              });
            }}
          />
          <InfinitySaga />
          <InfinityGauntlet />
          <AbilityComparison onSelect={setSelectedHero} />
          <MovieExplorer onSelect={setSelectedMovie} />
          <Saga onSelect={setSelectedMovie} />
        </main>
        <footer className="site-footer page-gutter">
          <div className="footer-top">
            <a href="#overview" aria-label="Return to Marvel Universe home">
              <Brand />
            </a>
            <p>
              For the heroes.
              <br />
              <span>For the stories that stay with us.</span>
            </p>
            <a className="back-to-top" href="#overview">
              BACK TO TOP <ArrowUp size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              An independent fan experience. Characters and artwork © Marvel.
            </span>
            <span>
              BUILT WITH <Heart size={11} /> FOR THE UNIVERSE
            </span>
            <a href="https://www.marvel.com/" target="_blank" rel="noreferrer">
              OFFICIAL MARVEL <ArrowUpRight size={12} />
            </a>
          </div>
        </footer>
        <AnimatePresence mode="wait">
          {overlay?.type === "hero" && (
            <HeroDossier
              key="hero-dossier"
              hero={overlay.hero}
              onClose={closeOverlay}
              onSelect={setSelectedHero}
            />
          )}
          {overlay?.type === "movie" && (
            <MovieDialog
              key={`movie-${overlay.movie.id}`}
              movie={overlay.movie}
              onClose={closeOverlay}
              onMovie={setSelectedMovie}
              onHero={setSelectedHero}
            />
          )}
          {overlay?.type === "search" && (
            <GlobalSearch
              key="global-search"
              onClose={closeOverlay}
              onSelect={openRecord}
            />
          )}
          {overlay?.type === "record" && (
            <ArchiveDialog
              key={`record-${overlay.record.id}`}
              record={overlay.record}
              onClose={closeOverlay}
              onHero={setSelectedHero}
              onMovie={setSelectedMovie}
              onSection={(id) => {
                closeOverlay();
                requestAnimationFrame(() => {
                  window.location.hash = id;
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "instant" });
                });
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <CinematicEffects />
    </MotionConfig>
  );
}
