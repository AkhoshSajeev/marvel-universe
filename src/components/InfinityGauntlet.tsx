import { useQuietMotion } from "../hooks/useExperience";
import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { stones } from "../data/stones";
import { ExplorerHeading } from "./ExplorerShared";
const sockets: Record<string, [number, number]> = {
  power: [111, 199],
  space: [172, 179],
  reality: [233, 172],
  soul: [294, 192],
  time: [337, 315],
  mind: [213, 324],
};
function GauntletArt() {
  return (
    <svg className="gauntlet-art" viewBox="0 0 420 650" aria-hidden="true">
      <defs>
        <linearGradient id="gauntlet-gold" x1="0" y1="0" x2="1" y2=".4">
          <stop stopColor="#35240f" />
          <stop offset=".2" stopColor="#9a7131" />
          <stop offset=".43" stopColor="#eed296" />
          <stop offset=".58" stopColor="#a77c39" />
          <stop offset=".8" stopColor="#64441e" />
          <stop offset="1" stopColor="#291c12" />
        </linearGradient>
        <linearGradient id="gauntlet-edge">
          <stop stopColor="#44331d" />
          <stop offset=".5" stopColor="#d8b877" />
          <stop offset="1" stopColor="#614624" />
        </linearGradient>
        <radialGradient id="gauntlet-palm">
          <stop stopColor="#d9b66b" />
          <stop offset=".6" stopColor="#987137" />
          <stop offset="1" stopColor="#3b2b18" />
        </radialGradient>
        <pattern
          id="gauntlet-engraving"
          width="13"
          height="13"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 13 13 0" stroke="#fff" strokeOpacity=".035" />
        </pattern>
      </defs>
      <ellipse cx="215" cy="601" rx="112" ry="16" fill="#000" opacity=".5" />
      <path
        d="M103 180Q81 197 86 267L105 383 124 431 111 563Q210 613 303 560L285 429 316 386 358 313Q379 272 353 249 336 234 320 262L310 232 305 174Z"
        fill="url(#gauntlet-gold)"
        stroke="#d6b67a"
        strokeWidth="1.3"
      />
      <path
        d="M131 420 285 420 300 559Q216 592 117 559Z"
        fill="url(#gauntlet-edge)"
        stroke="#382715"
        strokeWidth="4"
      />
      <path
        d="M145 438 270 438 281 540 226 563 153 542Z"
        fill="url(#gauntlet-gold)"
        stroke="#e3bf77"
        strokeWidth="1.2"
      />
      <path
        d="M159 451 256 451 263 528 222 545 164 525Z"
        fill="#4b351c"
        stroke="#ad8144"
        strokeWidth="2"
      />
      <path
        d="m180 455 4 61 36 18 23-16-3-63M201 453v62l18 9 9-10-1-61"
        fill="none"
        stroke="#c9a766"
        strokeWidth="3"
      />
      <path
        d="m132 432-14 120m162-119 16 116M139 410q64 30 142 0"
        fill="none"
        stroke="#eed298"
        strokeOpacity=".65"
        strokeWidth="3"
      />
      {[
        { x: 86, y: 100, h: 113 },
        { x: 146, y: 71, h: 131 },
        { x: 207, y: 59, h: 138 },
        { x: 268, y: 85, h: 127 },
      ].map(({ x, y, h }, i) => (
        <g key={x}>
          <rect
            x={x}
            y={y}
            width="52"
            height={h}
            rx="23"
            fill="url(#gauntlet-gold)"
            stroke="#dec18c"
            strokeWidth="1.3"
          />
          <path
            d={`M${x + 3} ${y + 34}q23 11 47 0M${x + 2} ${y + 64}q24 11 48 0M${x + 4} ${y + 91}q22 10 44 0`}
            fill="none"
            stroke="#372716"
            strokeWidth="5"
          />
          <path
            d={`m${x + 12} ${y + 12}q14-7 28 0l-1 20q-14 8-26 0Z`}
            fill="#efcf8a"
            opacity=".45"
          />
          <path
            d={`M${x + 10} ${y + 43}v15m30-15v15M${x + 10} ${y + 75}v10m30-10v10`}
            stroke="#d6b475"
            strokeWidth="2"
          />
          <path
            d={`M${x + 26} ${y + h - 25}v15`}
            stroke="#352413"
            strokeWidth="2"
          />
          <text x={x + 23} y={y + 27} fontSize="8" fill="#604721">
            {["IV", "III", "II", "I"][i]}
          </text>
        </g>
      ))}
      <path
        d="M108 215 147 207 173 218 204 204 232 211 262 209 298 216 305 354 275 409Q209 448 132 403L103 343Z"
        fill="url(#gauntlet-palm)"
        stroke="#dfc28c"
        strokeWidth="2"
      />
      <path
        d="m122 235 39 14 48-18 48 14 32-11-11 111-40 54-54 2-49-53Z"
        fill="url(#gauntlet-gold)"
        stroke="#4a331c"
        strokeWidth="3"
      />
      <path
        d="m132 247 35 18 43-17 45 16 23-17M144 358l34 38h59l32-41M127 282l12 42m144-42-11 42"
        fill="none"
        stroke="#e9ca87"
        strokeWidth="2"
      />
      <path
        d="m317 286 22-29q17-5 19 12l-3 38-18 43-22 26-24-22Z"
        fill="url(#gauntlet-gold)"
        stroke="#d7b777"
        strokeWidth="2"
      />
      <path d="m327 281 27 13m-38 48 20 14" stroke="#3b2917" strokeWidth="5" />
      <path
        d="M103 215 111 557Q210 600 300 557L292 216Z"
        fill="url(#gauntlet-engraving)"
      />
      {Object.entries(sockets).map(([id, [x, y]]) => (
        <g key={id}>
          <path
            d={`M${x} ${y - 28} ${x + 25} ${y - 13} ${x + 26} ${y + 15} ${x} ${y + 29} ${x - 26} ${y + 15} ${x - 25} ${y - 13}Z`}
            fill="#382b1b"
            stroke="#efd293"
            strokeWidth="3"
          />
          <path
            d={`M${x} ${y - 21} ${x + 19} ${y - 10} ${x + 20} ${y + 11} ${x} ${y + 22} ${x - 20} ${y + 11} ${x - 19} ${y - 10}Z`}
            fill="#101014"
            stroke="#836138"
            strokeWidth="2"
          />
        </g>
      ))}
    </svg>
  );
}
export function InfinityGauntlet() {
  const [selected, setSelected] = useState("mind");
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [burst, setBurst] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const reduce = useQuietMotion();
  const stone = stones.find((s) => s.id === selected)!;
  useEffect(() => {
    if (!celebrating) return;
    const timer = setTimeout(() => setCelebrating(false), 4200);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCelebrating(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [celebrating]);
  const select = (id: string) => {
    setSelected(id);
    setBurst((n) => n + 1);
    const next = new Set(visited).add(id);
    setVisited(next);
    if (next.size === 6 && visited.size < 6) setCelebrating(true);
  };
  return (
    <section
      id="gauntlet"
      className="gauntlet-section section-space"
      aria-labelledby="gauntlet-title"
      style={{ "--artifact-color": stone.color } as CSSProperties}
    >
      <ExplorerHeading
        number="07"
        kicker="ARTIFACT 001 / NIDAVELLIR"
        id="gauntlet-title"
        title="INFINITY, IN YOUR HAND."
        description="Six forces of existence. One vessel. Illuminate each stone to discover the power held inside the Infinity Gauntlet."
      />
      <div className="page-gutter">
        <div
          className={`gauntlet-lab ${celebrating ? "gauntlet-awakened" : ""}`}
        >
          <div className="gauntlet-display">
            <span className="artifact-coordinate">
              S.H.I.E.L.D. ARCHIVE
              <br />
              <b>CLASSIFIED / COSMIC ARTIFACT</b>
            </span>
            <div className="gauntlet-halo" />
            <div className="gauntlet-model">
              <GauntletArt />
              <svg
                className="gauntlet-circuits"
                viewBox="0 0 420 650"
                aria-hidden="true"
              >
                {stones.map((s) => {
                  const [x, y] = sockets[s.id];
                  return (
                    <motion.path
                      key={`${s.id}-${selected}-${burst}`}
                      d={`M${x} ${y} Q${x} 350 213 375 L213 515`}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={selected === s.id ? 2.5 : 1}
                      initial={{ pathLength: reduce ? 1 : 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: visited.has(s.id)
                          ? selected === s.id
                            ? 0.9
                            : 0.3
                          : 0.06,
                      }}
                      transition={{ duration: reduce ? 0 : 1.1 }}
                    />
                  );
                })}
              </svg>
              {stones.map((s) => {
                const [x, y] = sockets[s.id];
                return (
                  <button
                    key={s.id}
                    className="gauntlet-socket"
                    style={
                      {
                        left: `${(x / 420) * 100}%`,
                        top: `${(y / 650) * 100}%`,
                        "--socket-color": s.color,
                      } as CSSProperties
                    }
                    aria-label={`Activate ${s.name}`}
                    aria-pressed={selected === s.id}
                    title={s.name}
                    data-explored={visited.has(s.id)}
                    onClick={() => select(s.id)}
                  >
                    <span className="socket-crystal" />
                    <span className="socket-tooltip">
                      {s.name}
                      {visited.has(s.id) && <Check size={10} />}
                    </span>
                  </button>
                );
              })}
              {burst > 0 && !reduce && (
                <div
                  key={burst}
                  className="gauntlet-burst"
                  aria-hidden="true"
                  style={{
                    left: `${(sockets[selected][0] / 420) * 100}%`,
                    top: `${(sockets[selected][1] / 650) * 100}%`,
                  }}
                >
                  {Array.from({ length: 22 }, (_, i) => {
                    const a = (i / 22) * Math.PI * 2;
                    return (
                      <i
                        key={i}
                        style={
                          {
                            "--burst-x": `${Math.cos(a) * (65 + (i % 4) * 18)}px`,
                            "--burst-y": `${Math.sin(a) * (65 + (i % 4) * 18)}px`,
                            "--burst-delay": `${(i % 4) * 0.025}s`,
                          } as CSSProperties
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
            <span className="gauntlet-caption">
              INTERACTIVE ARTIFACT STUDY / SELECT A STONE
            </span>
          </div>
          <div className="gauntlet-info">
            <div className="artifact-progress" role="status">
              <span>
                {String(visited.size).padStart(2, "0")} / 06 STONES EXPLORED
              </span>
              <div>
                {stones.map((s) => (
                  <i
                    key={s.id}
                    style={{
                      background: visited.has(s.id) ? s.color : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
            <motion.div
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              aria-live="polite"
            >
              <span className="explorer-label">
                {stone.colorName.toUpperCase()} / {stone.vessel}
              </span>
              <h3>{stone.name}</h3>
              <p>{stone.power}</p>
              <div className="gauntlet-story">
                <span className="explorer-label">ENERGY SIGNATURE</span>
                <p>{stone.thanos}</p>
              </div>
            </motion.div>
            <div
              className="gauntlet-stone-list"
              aria-label="Gauntlet stone controls"
            >
              {stones.map((s) => (
                <button
                  key={s.id}
                  onClick={() => select(s.id)}
                  aria-pressed={selected === s.id}
                >
                  <i style={{ background: s.color }} />
                  {s.name}
                  {visited.has(s.id) ? <Check size={13} /> : <span>+</span>}
                </button>
              ))}
            </div>
            {visited.size === 6 ? (
              <div className="gauntlet-unlocked">
                <Sparkles size={15} />
                <span>ALL SIX SIGNATURES SYNCHRONIZED</span>
                <button
                  onClick={() => setCelebrating(true)}
                  aria-label="Replay gauntlet cinematic"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            ) : (
              <p className="gauntlet-hint">
                Explore all six stones to awaken the gauntlet.
              </p>
            )}
            <button
              className="text-action"
              onClick={() => {
                setVisited(new Set());
                setCelebrating(false);
                setBurst(0);
              }}
            >
              RESET EXPLORATION <RotateCcw size={12} />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {celebrating && (
          <motion.div
            className="gauntlet-cinematic"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.8 }}
          >
            <div className="gauntlet-shockwave" />
            <div className="cinematic-stones">
              {stones.map((s) => (
                <i
                  key={s.id}
                  style={{
                    background: s.color,
                    boxShadow: `0 0 35px ${s.color}`,
                  }}
                />
              ))}
            </div>
            <span>SIX STONES. ONE UNIVERSE.</span>
            <strong>INFINITE POSSIBILITIES.</strong>
            <small>THE GAUNTLET IS COMPLETE · ESC TO SKIP</small>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
