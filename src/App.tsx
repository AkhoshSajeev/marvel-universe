import { useExperience } from "./hooks/useExperience";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Avengers } from "./components/Avengers";

import { MCUTimeline } from "./components/MCUTimeline";
import { TeamFormation } from "./components/TeamFormation";
import { Connections } from "./components/Connections";
import { Threats } from "./components/Threats";
import { InfinitySaga } from "./components/InfinitySaga";
import { Saga } from "./components/Saga";

import { AbilityComparison } from "./components/AbilityComparison";
import { InfinityGauntlet } from "./components/InfinityGauntlet";
import { MovieExplorer } from "./components/MovieExplorer";
import { CinematicEffects } from "./components/CinematicEffects";
import { type ArchiveRecord, catalogMovies } from "./data/catalog";
import { heroes } from "./data/universe";

import { type Hero as HeroType, type Movie } from "./data/universe";

import { Footer } from "./components/Footer";
import { Modal } from "./components/Modal";
import { useEasterEgg } from "./hooks/useEasterEgg";
const HeroDossier = lazy(() =>
  import("./components/HeroDossier").then((module) => ({
    default: module.HeroDossier,
  })),
);
const GlobalSearch = lazy(() =>
  import("./components/GlobalSearch").then((module) => ({
    default: module.GlobalSearch,
  })),
);
const ArchiveDialog = lazy(() =>
  import("./components/GlobalSearch").then((module) => ({
    default: module.ArchiveDialog,
  })),
);
const MovieDialog = lazy(() =>
  import("./components/MovieDialog").then((module) => ({
    default: module.MovieDialog,
  })),
);
const ClassifiedArchive = lazy(() =>
  import("./components/ClassifiedArchive").then((module) => ({
    default: module.ClassifiedArchive,
  })),
);

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { reduced, economy } = useExperience();
  const [overlay, setOverlay] = useState<
    | { type: "hero"; hero: HeroType }
    | { type: "movie"; movie: Movie }
    | { type: "search" }
    | { type: "classified" }
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
  const unlockArchive = useCallback(
    () => setOverlay({ type: "classified" }),
    [],
  );
  useEasterEgg(unlockArchive, overlay !== null);
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
    if (reduced || economy) return;
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
  }, [reduced, economy]);
  return (
    <MotionConfig reducedMotion={reduced || economy ? "always" : "user"}>
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
                behavior: reduced || economy ? "instant" : "smooth",
              });
            }}
          />
          <InfinitySaga />
          <InfinityGauntlet />
          <AbilityComparison onSelect={setSelectedHero} />
          <MovieExplorer onSelect={setSelectedMovie} />
          <Saga onSelect={setSelectedMovie} />
        </main>
        <Footer onUnlock={unlockArchive} />
        <Suspense
          fallback={
            <Modal
              onClose={closeOverlay}
              labelId="loading-title"
              className="archive-loading"
            >
              <span className="explorer-label">S.H.I.E.L.D. ARCHIVE</span>
              <h2 id="loading-title">ACCESSING DATABASE...</h2>
            </Modal>
          }
        >
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
            {overlay?.type === "classified" && (
              <ClassifiedArchive
                key="classified"
                onClose={closeOverlay}
                onHero={setSelectedHero}
              />
            )}
          </AnimatePresence>
        </Suspense>
      </div>
      <CinematicEffects />
    </MotionConfig>
  );
}
