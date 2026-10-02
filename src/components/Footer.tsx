import { useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Heart } from "lucide-react";
import { Brand } from "./Navigation";
export function Footer({ onUnlock }: { onUnlock: () => void }) {
  const taps = useRef({ count: 0, last: 0 });
  const [signal, setSignal] = useState(0);
  const activate = () => {
    const now = Date.now();
    const count = now - taps.current.last < 5000 ? taps.current.count + 1 : 1;
    taps.current = { count, last: now };
    setSignal(count);
    if (count === 5) {
      onUnlock();
      taps.current.count = 0;
      setSignal(0);
    }
  };
  return (
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
      <div className="archive-seal-row">
        <button
          className="archive-seal"
          aria-label="Avengers archive seal"
          title="Some files open after five taps."
          onClick={activate}
        >
          <span aria-hidden="true">A</span>
        </button>
        <div>
          <span className="explorer-label">
            S.H.I.E.L.D. ARCHIVE / CLASSIFIED
          </span>
          <p role="status">
            {signal >= 3
              ? `Access sequence: ${signal} / 5`
              : "Not every file appears in the index."}
          </p>
        </div>
        <span className="archive-seal-hint">FIVE TAPS. ONE HIDDEN FILE.</span>
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
  );
}
