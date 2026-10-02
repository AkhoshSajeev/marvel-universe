import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Heart, ArrowUp } from "lucide-react";
import { Navigation, Brand } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Avengers } from "./components/Avengers";
import { HeroDossier } from "./components/HeroDossier";
import { Saga } from "./components/Saga";
import { MovieDialog } from "./components/MovieDialog";
import { type Hero as HeroType, type Movie } from "./data/universe";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedHero, setSelectedHero] = useState<HeroType | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const closeHero = useCallback(() => setSelectedHero(null), []);
  const closeMovie = useCallback(() => setSelectedMovie(null), []);
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
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={root}
        className="app-shell"
        inert={selectedHero !== null || selectedMovie !== null}
      >
        <a className="skip-link" href="#avengers">
          Skip to the Avengers
        </a>
        <Navigation />
        <main>
          <Hero />
          <Avengers onSelect={setSelectedHero} />
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
        <AnimatePresence>
          {selectedHero && (
            <HeroDossier
              hero={selectedHero}
              onClose={closeHero}
              onSelect={setSelectedHero}
            />
          )}
          {selectedMovie && (
            <MovieDialog
              key={selectedMovie.id}
              movie={selectedMovie}
              onClose={closeMovie}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
