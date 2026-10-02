import { useEffect, useRef, useState } from "react";
import { AudioLines, Menu, VolumeX, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAmbientAudio } from "../hooks/useAmbientAudio";

export function Brand() {
  return (
    <span className="brand">
      <span className="marvel-wordmark">MARVEL</span>
      <span className="brand-divider" />
      <span className="brand-universe">UNIVERSE</span>
    </span>
  );
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState("overview");
  const { enabled, available, toggle } = useAmbientAudio();
  const links = [
    { id: "overview", title: "Overview" },
    { id: "avengers", title: "The Avengers" },
    { id: "saga", title: "The Saga" },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 641px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);
  return (
    <header className="site-header">
      <a
        className="brand-link"
        href="#overview"
        aria-label="Marvel Universe home"
        onClick={() => setMenuOpen(false)}
      >
        <Brand />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
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
          className={`sound-toggle ${enabled ? "is-playing" : ""}`}
          onClick={() => void toggle()}
          aria-label={
            enabled ? "Turn ambient sound off" : "Turn ambient sound on"
          }
          aria-pressed={enabled}
          disabled={!available}
          title={
            available
              ? "Toggle ambient sound"
              : "Audio is unavailable in this browser"
          }
        >
          {enabled ? <AudioLines size={17} /> : <VolumeX size={17} />}
          <span>
            {available ? (enabled ? "SOUND ON" : "SOUND OFF") : "NO AUDIO"}
          </span>
        </button>
        <a className="header-assemble" href="#avengers">
          ASSEMBLE <ArrowUpRight size={14} />
        </a>
        <button
          ref={menuToggle}
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {links.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {link.title}
                <ArrowUpRight size={22} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
