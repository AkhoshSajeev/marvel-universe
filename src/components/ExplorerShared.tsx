import { ArrowUpRight } from "lucide-react";
import { heroes, type Hero } from "../data/universe";
export function ExplorerHeading({
  number,
  kicker,
  id,
  title,
  accent,
  description,
}: {
  number: string;
  kicker: string;
  id: string;
  title: string;
  accent?: string;
  description: string;
}) {
  return (
    <div className="section-heading page-gutter" data-reveal>
      <div>
        <div className="section-kicker">
          <span>{number}</span>
          {kicker}
        </div>
        <h2 id={id}>
          {title}
          {accent && (
            <>
              <br />
              <span className="muted-heading">{accent}</span>
            </>
          )}
        </h2>
      </div>
      <p className="section-intro">{description}</p>
    </div>
  );
}
export function HeroLinks({
  ids,
  onSelect,
  label = "CONNECTED HEROES",
}: {
  ids: string[];
  onSelect: (hero: Hero) => void;
  label?: string;
}) {
  return (
    <div className="explorer-hero-links">
      <span className="explorer-label">{label}</span>
      <div>
        {ids.map((id) => {
          const hero = heroes.find((h) => h.id === id);
          return hero ? (
            <button key={id} onClick={() => onSelect(hero)}>
              <img src={hero.image} alt="" loading="lazy" />
              {hero.name}
              <ArrowUpRight size={12} />
            </button>
          ) : null;
        })}
      </div>
    </div>
  );
}
