import { useState } from "react";
import { LockKeyhole, ArrowRight } from "lucide-react";
import { Modal } from "./Modal";
import { classifiedEntries } from "../data/navigation";
import { heroes, type Hero } from "../data/universe";
import { AssetImage } from "./AssetImage";
export function ClassifiedArchive({
  onClose,
  onHero,
}: {
  onClose: () => void;
  onHero: (hero: Hero) => void;
}) {
  const [index, setIndex] = useState(0);
  const entry = classifiedEntries[index];
  const hero = heroes.find((h) => h.id === entry.hero)!;
  return (
    <Modal
      onClose={onClose}
      labelId="classified-title"
      className="classified-modal"
    >
      <div className="classified-art">
        <AssetImage src={hero.image} alt={hero.name} />
        <span>ACCESS LEVEL 07</span>
      </div>
      <div className="classified-copy">
        <span className="explorer-label">
          <LockKeyhole size={13} /> HIDDEN S.H.I.E.L.D. DATABASE
        </span>
        <h2 id="classified-title">THERE WAS AN IDEA.</h2>
        <p className="classified-intro">
          Archive access granted. The file behind the files.
        </p>
        <div aria-live="polite">
          <span className="explorer-label">
            ARCHIVE NOTE / {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{entry.title}</h3>
          <p>{entry.text}</p>
        </div>
        <button
          className="text-action"
          onClick={() => setIndex((i) => (i + 1) % classifiedEntries.length)}
        >
          NEXT ARCHIVE NOTE <ArrowRight size={15} />
        </button>
        <button className="button button-red" onClick={() => onHero(hero)}>
          ENTER {hero.name.toUpperCase()}’S STORY <ArrowRight size={15} />
        </button>
        <small>
          Original notes written for this fan archive; not dialogue from the
          films.
        </small>
      </div>
    </Modal>
  );
}
