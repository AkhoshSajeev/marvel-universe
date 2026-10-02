import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Orbit, Crosshair } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePointerLight } from "../hooks/usePointerLight";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const lighting = usePointerLight<HTMLElement>(0);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo(
            ".cinema-backdrop",
            { scale: 1.12, filter: "brightness(.3) saturate(.6)" },
            { scale: 1, filter: "brightness(.8) saturate(.8)", duration: 2.8 },
            0,
          )
          .from(".cinema-overline", { opacity: 0, y: 15, duration: 0.8 }, 0.35)
          .from(
            ".cinema-title-letter",
            {
              yPercent: 120,
              opacity: 0,
              rotateX: -45,
              duration: 1.15,
              stagger: 0.065,
            },
            0.5,
          )
          .from(
            ".cinema-subtitle, .cinema-description, .cinema-buttons",
            { opacity: 0, y: 20, duration: 0.85, stagger: 0.13 },
            1.15,
          )
          .from(".cinema-bottom", { opacity: 0, duration: 1 }, 1.7);
        gsap.to(".cinema-art", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section
      id="overview"
      className="cinema-hero"
      ref={root}
      aria-labelledby="hero-title"
      {...lighting}
    >
      <div className="cinema-art" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet={`${import.meta.env.BASE_URL}images/hero-avengers-assemble.jpg`}
          />
          <img
            className="cinema-backdrop"
            src={`${import.meta.env.BASE_URL}images/hero-avengers-official.jpg`}
            alt=""
            fetchPriority="high"
            width={3200}
            height={1067}
          />
        </picture>
      </div>
      <div className="cinema-shade" aria-hidden="true" />
      <div className="cinema-light" aria-hidden="true" />
      <div className="cinema-rays" aria-hidden="true" />
      <div className="cinema-smoke cinema-smoke-one" aria-hidden="true" />
      <div className="cinema-smoke cinema-smoke-two" aria-hidden="true" />
      <div className="cinema-dust" aria-hidden="true">
        {Array.from({ length: 22 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 17 + 3) % 100}%`,
              animationDelay: `${i * -0.9}s`,
              animationDuration: `${10 + (i % 5) * 2}s`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
            }}
          />
        ))}
      </div>
      <div className="cinema-side-label" aria-hidden="true">
        <Crosshair size={16} />
        <span>
          INITIATIVE 001
          <br />
          EARTH’S LAST LINE OF DEFENSE
        </span>
      </div>
      <div className="cinema-content page-gutter">
        <div className="cinema-overline">
          <span className="live-dot" /> MARVEL UNIVERSE{" "}
          <span className="cinema-overline-rule" /> THE INFINITY SAGA
        </div>
        <h1 id="hero-title" className="cinema-title" aria-label="THE AVENGERS">
          <span className="cinema-title-the" aria-hidden="true">
            THE
          </span>
          <span className="cinema-title-word" aria-hidden="true">
            {"AVENGERS".split("").map((letter, index) => (
              <span className="cinema-title-letter" key={index}>
                {letter}
              </span>
            ))}
          </span>
        </h1>
        <p className="cinema-subtitle">Earth’s Mightiest Heroes</p>
        <p className="cinema-description">
          Extraordinary people. Impossible odds. One unbreakable alliance.
          <br /> Enter the universe of heroes who chose to stand together.
        </p>
        <div className="cinema-buttons">
          <a className="button button-red" href="#avengers">
            EXPLORE THE AVENGERS <ArrowUpRight size={18} />
          </a>
          <a className="button cinema-secondary" href="#saga">
            <Orbit size={16} />
            EXPLORE THE MCU <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="cinema-bottom page-gutter">
        <a href="#avengers" className="scroll-cue">
          <span className="scroll-icon">
            <ArrowDown size={14} />
          </span>
          ENTER THE UNIVERSE
        </a>
        <span>
          18 CHARACTERS <i /> INFINITE POSSIBILITIES
        </span>
        <span className="cinema-signal">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i /> ALL SYSTEMS ONLINE
        </span>
      </div>
    </section>
  );
}
