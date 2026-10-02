import { useEffect, useRef, useState } from "react";
import {
  AudioLines,
  Search,
  Menu,
  VolumeX,
  X,
  ArrowUpRight,
  Accessibility,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAmbientAudio } from "../hooks/useAmbientAudio";
import { useExperience } from "../hooks/useExperience";
import { primaryNavigation, extraNavigation } from "../data/navigation";
export function Brand() {
  return (
    <span className="brand">
      <span className="marvel-wordmark">MARVEL</span>
      <span className="brand-divider" />
      <span className="brand-universe">UNIVERSE</span>
    </span>
  );
}
export function Navigation({ onSearch }: { onSearch: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("overview");
  const menuToggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const { enabled, available, toggle } = useAmbientAudio();
  const { reduced, manualReduced, toggleMotion } = useExperience();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((s) => observer.observe(s));
    const onScroll = () =>
      setCompact((old) => {
        const next = scrollY > 70;
        return old === next ? old : next;
      });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const surfaces = Array.from(
      document.querySelectorAll<HTMLElement>("main,footer"),
    );
    const previous = surfaces.map((e) => e.inert);
    surfaces.forEach((e) => (e.inert = true));
    const frame = requestAnimationFrame(() =>
      header.current
        ?.querySelector<HTMLAnchorElement>(".mobile-nav a")
        ?.focus(),
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
      if (e.key === "Tab") {
        const items = Array.from(
          header.current?.querySelectorAll<HTMLElement>(
            "a,button:not([disabled])",
          ) ?? [],
        ).filter((el) => el.getClientRects().length);
        const first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = oldOverflow;
      surfaces.forEach((e, i) => (e.inert = previous[i]));
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 1200px)");
    const resize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);
  return (
    <header
      ref={header}
      className={`site-header floating-nav ${compact ? "nav-compact" : ""} ${menuOpen ? "nav-open" : ""}`}
    >
      <a
        className="brand-link"
        href="#overview"
        aria-label="Marvel Universe home"
        onClick={() => setMenuOpen(false)}
      >
        <Brand />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {primaryNavigation.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? "active" : ""}
            aria-current={active === link.id ? "location" : undefined}
          >
            {link.title}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="global-search-toggle"
          onClick={() => {
            setMenuOpen(false);
            onSearch();
          }}
          aria-label="Search the universe"
          title="Search the universe (⌘/Ctrl K)"
        >
          <Search size={17} />
        </button>
        <button
          className="motion-toggle"
          onClick={toggleMotion}
          aria-pressed={manualReduced}
          aria-label={
            manualReduced ? "Use device motion preference" : "Reduce motion"
          }
          title={
            manualReduced
              ? "Reduced motion is on. Use device preference."
              : "Reduce motion"
          }
        >
          <Accessibility size={17} />
        </button>
        <button
          className={`sound-toggle ${enabled ? "is-playing" : ""}`}
          onClick={() => void toggle()}
          aria-label={
            enabled ? "Turn ambient sound off" : "Turn ambient sound on"
          }
          aria-pressed={enabled}
          disabled={!available}
          title={
            enabled
              ? "Sound on · mute"
              : "Sound off · enable original ambient audio"
          }
        >
          {enabled ? <AudioLines size={17} /> : <VolumeX size={17} />}
          <span>{enabled ? "ON" : "OFF"}</span>
        </button>
        <button
          ref={menuToggle}
          className="menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{
              opacity: 0,
              clipPath: reduced ? "none" : "inset(0 0 100% 0)",
            }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <div className="nav-database">
              <i className="hud-live" /> AVENGERS DATABASE{" "}
              <span>SYSTEM ONLINE</span>
            </div>
            {[...primaryNavigation, ...extraNavigation].map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.25,
                  delay: reduced ? 0 : i * 0.025,
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {link.title}
                <ArrowUpRight size={18} />
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
