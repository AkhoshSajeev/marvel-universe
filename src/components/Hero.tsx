import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Play, Crosshair } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onTrailer }: { onTrailer: () => void }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-reveal", {
          y: 34,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.12,
        });
        gsap.fromTo(
          ".hero-backdrop",
          { scale: 1.06 },
          { scale: 1, duration: 2.2, ease: "power2.out" },
        );
        gsap.to(".hero-art", {
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
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return (
    <section
      className="hero"
      id="overview"
      ref={root}
      aria-labelledby="hero-title"
    >
      <div className="hero-art" aria-hidden="true">
        <img
          className="hero-backdrop"
          src={`${import.meta.env.BASE_URL}images/hero.jpg`}
          alt=""
          fetchPriority="high"
        />
        <div className="hero-shade" />
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="embers" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${8 + i * 7.3}%`,
              animationDelay: `${i * -1.7}s`,
              animationDuration: `${9 + (i % 4) * 3}s`,
            }}
          />
        ))}
      </div>
      <div className="hero-content page-gutter">
        <div className="hero-eyebrow hero-reveal">
          <span className="live-dot" /> MARVEL UNIVERSE{" "}
          <span className="eyebrow-slash">/</span> THE AVENGERS
        </div>
        <h1 id="hero-title" className="hero-reveal">
          EARTH’S
          <br />
          MIGHTIEST
          <br />
          <span>HEROES.</span>
        </h1>
        <p className="hero-description hero-reveal">
          One universe. Infinite stories.
          <br />
          Some are born heroes. Others choose to become them.
        </p>
        <div className="hero-buttons hero-reveal">
          <a className="button button-red" href="#avengers">
            MEET THE AVENGERS <ArrowUpRight size={18} />
          </a>
          <button className="button button-ghost" onClick={onTrailer}>
            <span className="play-ring">
              <Play size={12} fill="currentColor" />
            </span>
            WATCH THE TRAILER
          </button>
        </div>
        <div className="hero-quote hero-reveal">
          <span />
          “If we can’t protect the Earth, you can be damn well sure we’ll avenge
          it.”<small>TONY STARK</small>
        </div>
      </div>
      <div className="hero-coordinate" aria-hidden="true">
        <Crosshair size={19} />
        <span>
          AVENGERS INITIATIVE
          <br />
          <b>STATUS: ASSEMBLED</b>
        </span>
      </div>
      <div className="hero-bottom page-gutter">
        <a href="#avengers" className="scroll-cue">
          <span className="scroll-icon">
            <ArrowDown size={15} />
          </span>
          SCROLL TO DISCOVER
        </a>
        <span className="hero-bottom-caption">
          SIX HEROES. <span>ONE EXTRAORDINARY LEGACY.</span>
        </span>
        <span className="hero-index">
          <b>01</b>
          <span>/</span>03
        </span>
      </div>
    </section>
  );
}
