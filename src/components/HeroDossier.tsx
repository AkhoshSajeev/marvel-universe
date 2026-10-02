import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Crosshair,
  ScanLine,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { heroes, type Hero } from "../data/universe";
import { AbilityConstellation } from "./AbilityConstellation";
import { Modal } from "./Modal";

const sections = ["Identity", "Abilities", "Equipment", "Story"] as const;

export function HeroDossier({
  hero,
  onClose,
  onSelect,
}: {
  hero: Hero;
  onClose: () => void;
  onSelect: (hero: Hero) => void;
}) {
  const index = heroes.findIndex((entry) => entry.id === hero.id);
  const reducedMotion = useReducedMotion();
  const content = useRef<HTMLDivElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const [timelineEnds, setTimelineEnds] = useState({ start: true, end: false });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        target?.closest(
          '.experience-abilities, .experience-story, .experience-tabs, input, textarea, select, [contenteditable="true"]',
        )
      )
        return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        onSelect(heroes[(index + direction + heroes.length) % heroes.length]);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, onSelect]);

  useEffect(() => {
    content.current?.scrollTo({ top: 0, behavior: "instant" });
    content.current
      ?.closest(".modal-panel")
      ?.scrollTo({ top: 0, behavior: "instant" });
    const track = timeline.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "instant" });
    const updateEnds = () =>
      setTimelineEnds({
        start: track.scrollLeft < 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      });
    updateEnds();
    const observer = new ResizeObserver(updateEnds);
    observer.observe(track);
    track.addEventListener("scroll", updateEnds, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateEnds);
    };
  }, [hero.id]);

  const goToSection = (section: string) => {
    const target = content.current?.querySelector<HTMLElement>(
      `#experience-${section.toLowerCase()}`,
    );
    if (!target || !content.current) return;
    const scroller = window.matchMedia("(min-width: 901px)").matches
      ? content.current
      : content.current.closest<HTMLElement>(".modal-panel");
    if (!scroller) return;
    const offset =
      target.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    scroller.scrollTo({
      top: scroller.scrollTop + offset - 92,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };
  const scrollStory = (direction: number) => {
    const track = timeline.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".experience-milestone");
    track.scrollBy({
      left: direction * ((card?.offsetWidth ?? 280) + 24),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <Modal
      onClose={onClose}
      labelId="dossier-title"
      className="dossier-modal full-screen-dossier"
    >
      <div
        className="experience-layout"
        style={{ "--hero-color": hero.color } as CSSProperties}
      >
        <div className="experience-portrait">
          <motion.img
            key={`${hero.id}-portrait`}
            className="experience-portrait-image"
            src={hero.image}
            alt={`${hero.name} cinematic portrait`}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
          />
          <div className="experience-portrait-shade" />
          <div className="experience-portrait-grid" aria-hidden="true" />
          <div className="experience-file-label">
            <Crosshair size={17} aria-hidden="true" />
            <span>AVENGERS INITIATIVE</span>
            <span>FILE / {String(index + 1).padStart(2, "0")}</span>
          </div>
          <motion.div
            key={hero.id}
            className="experience-portrait-caption"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.5,
              delay: reducedMotion ? 0 : 0.15,
            }}
          >
            <p className="experience-eyebrow">
              <span /> {hero.role}
            </p>
            <h2 id="dossier-title">{hero.name}</h2>
            <p className="experience-real-name">{hero.alias}</p>
            <blockquote>“{hero.quote}”</blockquote>
            <button
              className="experience-discover"
              onClick={() => goToSection("Identity")}
            >
              <span>DISCOVER THE STORY</span>
              <ArrowDown size={16} aria-hidden="true" />
            </button>
          </motion.div>
        </div>
        <div className="experience-content" ref={content}>
          <nav className="experience-tabs" aria-label="Character sections">
            {sections.map((section, i) => (
              <button key={section} onClick={() => goToSection(section)}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {section}
              </button>
            ))}
          </nav>
          <section
            id="experience-identity"
            className="experience-section experience-identity"
          >
            <div className="experience-section-heading">
              <p className="experience-eyebrow">
                <ScanLine size={14} aria-hidden="true" /> PERSONNEL ARCHIVE
              </p>
              <h3>BEHIND THE LEGEND.</h3>
            </div>
            <p className="experience-description">{hero.description}</p>
            <h4 className="experience-minor-heading">Identity</h4>
            <dl className="experience-identity-grid">
              <div>
                <dt>Real name</dt>
                <dd>{hero.alias}</dd>
              </div>
              <div>
                <dt>Alias</dt>
                <dd>{hero.name}</dd>
              </div>
              <div>
                <dt>Affiliation</dt>
                <dd>{hero.affiliation}</dd>
              </div>
              <div>
                <dt>MCU debut</dt>
                <dd>{hero.firstAppearance}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className="experience-status">
                  <span />
                  {hero.status}
                </dd>
              </div>
              <div>
                <dt>Portrayed by</dt>
                <dd>{hero.actor}</dd>
              </div>
            </dl>
            <p className="experience-snapshot">
              Story snapshot: {hero.statusAsOf}. <span>Spoilers ahead.</span>
            </p>
          </section>
          <section
            id="experience-abilities"
            className="experience-section experience-abilities"
          >
            <div className="experience-section-heading">
              <p className="experience-eyebrow">
                <span /> ABILITIES / 02
              </p>
              <h3>ABILITIES</h3>
              <p>Explore the abilities that define {hero.name}.</p>
            </div>
            <AbilityConstellation
              key={hero.id}
              abilities={hero.abilities}
              heroName={hero.name}
            />
          </section>
          <section
            id="experience-equipment"
            className="experience-section experience-equipment"
          >
            <div className="experience-section-heading">
              <p className="experience-eyebrow">
                <span /> FIELD EQUIPMENT / 03
              </p>
              <h3>ICONS OF THE LEGEND.</h3>
            </div>
            <div className="experience-equipment-list">
              {hero.equipment.map((item, i) => (
                <motion.article
                  className="experience-equipment-item"
                  key={`${hero.id}-${item.name}`}
                  initial={{
                    opacity: reducedMotion ? 1 : 0,
                    y: reducedMotion ? 0 : 12,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.35,
                    delay: reducedMotion ? 0 : i * 0.04,
                  }}
                >
                  <span className="experience-equipment-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </motion.article>
              ))}
            </div>
          </section>
          <section
            id="experience-story"
            className="experience-section experience-story"
          >
            <div className="experience-section-heading experience-story-heading">
              <div>
                <p className="experience-eyebrow">
                  <span /> THE JOURNEY / 04
                </p>
                <h3>EVERY HERO HAS A STORY.</h3>
              </div>
              <div className="experience-story-controls">
                <button
                  onClick={() => scrollStory(-1)}
                  disabled={timelineEnds.start}
                  aria-label="Previous story milestone"
                >
                  <ArrowLeft size={19} />
                </button>
                <button
                  onClick={() => scrollStory(1)}
                  disabled={timelineEnds.end}
                  aria-label="Next story milestone"
                >
                  <ArrowRight size={19} />
                </button>
              </div>
            </div>
            <p className="experience-story-instruction">
              Follow the journey. Scroll or use the arrows to explore.
            </p>
            <div
              className="experience-timeline"
              ref={timeline}
              tabIndex={0}
              aria-label={`${hero.name} MCU story timeline`}
            >
              {hero.story.map((milestone, i) => (
                <article
                  className="experience-milestone"
                  key={`${hero.id}-${milestone.title}`}
                >
                  <div className="experience-milestone-top">
                    <span>{milestone.year}</span>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="experience-milestone-line">
                    <i />
                  </div>
                  <h4>{milestone.title}</h4>
                  <p className="experience-milestone-film">{milestone.film}</p>
                  <p>{milestone.description}</p>
                </article>
              ))}
            </div>
            <p className="experience-story-caption">
              <Check size={13} aria-hidden="true" /> FILM / SERIES RELEASE
              CHRONOLOGY
            </p>
          </section>
          <footer className="experience-navigation">
            <button
              onClick={() =>
                onSelect(heroes[(index - 1 + heroes.length) % heroes.length])
              }
              aria-label="Previous Avenger"
            >
              <ArrowLeft size={20} aria-hidden="true" />
              <span>
                PREVIOUS
                <span>
                  {heroes[(index - 1 + heroes.length) % heroes.length].name}
                </span>
              </span>
            </button>
            <span className="experience-navigation-count">
              {String(index + 1).padStart(2, "0")}{" "}
              <span>/ {String(heroes.length).padStart(2, "0")}</span>
            </span>
            <button
              onClick={() => onSelect(heroes[(index + 1) % heroes.length])}
              aria-label="Next Avenger"
            >
              <span>
                NEXT AVENGER
                <span>{heroes[(index + 1) % heroes.length].name}</span>
              </span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </footer>
        </div>
      </div>
    </Modal>
  );
}
