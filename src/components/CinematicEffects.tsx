import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useExperience } from "../hooks/useExperience";
/** A single lightweight canvas; animation pauses when hidden or reduced motion is requested. */
export function CinematicEffects() {
  const { reduced: limitedMotion, economy } = useExperience();
  const canvas = useRef<HTMLCanvasElement>(null);
  const wipe = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (limitedMotion || economy) return;
    const surface = canvas.current;
    const ctx = surface?.getContext("2d");
    if (!surface || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 640px)");
    let frame = 0;
    let width = innerWidth,
      height = innerHeight,
      last = 0;
    let hue = 5;
    const particles = Array.from({ length: 32 }, (_, i) => ({
      x: ((i * 139.7) % 1000) / 1000,
      y: ((i * 253.9) % 1000) / 1000,
      r: 0.5 + (i % 3) * 0.4,
      speed: 0.006 + (i % 5) * 0.002,
    }));
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const dpr = Math.min(devicePixelRatio, 1.5);
      surface.width = width * dpr;
      surface.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      if (document.hidden || reduced.matches) {
        frame = 0;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      particles.slice(0, narrow.matches ? 14 : 32).forEach((p) => {
        p.y = (p.y - dt * p.speed + 1) % 1;
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},45%,80%,.22)`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      if (!document.hidden && !reduced.matches) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            hue =
              (
                {
                  avengers: 5,
                  timeline: 215,
                  teams: 210,
                  connections: 190,
                  threats: 275,
                  infinity: 250,
                  gauntlet: 40,
                  compare: 210,
                  movies: 270,
                } as Record<string, number>
              )[e.target.id] ?? 5;
        });
      },
      { rootMargin: "-25% 0px -50% 0px" },
    );
    document
      .querySelectorAll("main>section")
      .forEach((s) => observer.observe(s));
    resize();
    sync();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [limitedMotion, economy]);
  useEffect(() => {
    if (limitedMotion || economy) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tween: gsap.core.Timeline | undefined;
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        reduced.matches
      )
        return;
      const a = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!a || a.classList.contains("skip-link")) return;
      const target = document.getElementById(a.hash.slice(1));
      if (!target?.matches("main > section") || !wipe.current) return;
      event.preventDefault();
      tween?.kill();
      tween = gsap
        .timeline()
        .set(wipe.current, {
          opacity: 1,
          scaleX: 0,
          transformOrigin: "left center",
        })
        .to(wipe.current, { scaleX: 1, duration: 0.22, ease: "power2.in" })
        .call(() => {
          history.pushState(null, "", a.hash);
          target.scrollIntoView({ behavior: "instant", block: "start" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        })
        .to(wipe.current, { opacity: 0, duration: 0.38, ease: "power2.out" });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      tween?.kill();
    };
  }, [limitedMotion, economy]);
  return createPortal(
    <>
      <canvas ref={canvas} className="ambient-canvas" aria-hidden="true" />
      <div ref={wipe} className="scene-wipe" aria-hidden="true">
        <span>MARVEL UNIVERSE</span>
      </div>
    </>,
    document.body,
  );
}
export function DossierAtmosphere({
  id,
  category,
}: {
  id: string;
  category: string;
}) {
  const mode =
    id === "thor"
      ? "lightning"
      : id === "hulk"
        ? "gamma"
        : category === "mystic"
          ? "mystic"
          : category === "tech"
            ? "technology"
            : category === "cosmic"
              ? "cosmic"
              : "embers";
  return (
    <div className={`dossier-atmosphere atmosphere-${mode}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
