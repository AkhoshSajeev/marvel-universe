import { heroes, movies, type Movie } from "./universe";
import { timelineFilms } from "./timeline";
import { threats } from "./threats";
import { teams } from "./connections";

const slugs: Record<string, string> = {
  avengers: "the-avengers",
  "incredible-hulk": "the-incredible-hulk",
  "first-avenger": "captain-america-the-first-avenger",
  "dark-world": "thor-the-dark-world",
  "winter-soldier": "captain-america-the-winter-soldier",
  guardians: "guardians-of-the-galaxy",
  "age-of-ultron": "avengers-age-of-ultron",
  "civil-war": "captain-america-civil-war",
  "guardians-2": "guardians-of-the-galaxy-vol-2",
  homecoming: "spider-man-homecoming",
  ragnarok: "thor-ragnarok",
  "infinity-war": "avengers-infinity-war",
  "ant-man-wasp": "ant-man-and-the-wasp",
  endgame: "avengers-endgame",
  "far-from-home": "spider-man-far-from-home",
  "shang-chi": "shang-chi-and-the-legend-of-the-ten-rings",
  "no-way-home": "spider-man-no-way-home",
  "multiverse-madness": "doctor-strange-in-the-multiverse-of-madness",
  "love-thunder": "thor-love-and-thunder",
  "wakanda-forever": "black-panther-wakanda-forever",
  quantumania: "ant-man-and-the-wasp-quantumania",
  "guardians-3": "guardians-of-the-galaxy-volume-3",
  "deadpool-wolverine": "deadpool-and-wolverine",
  "brave-new-world": "captain-america-brave-new-world",
  "first-steps": "the-fantastic-four-first-steps",
};
export const catalogMovies: Movie[] = timelineFilms.map((f) => ({
  ...movies.find((m) => m.id === f.id),
  id: f.id,
  title: f.title,
  year: Number(f.date.slice(0, 4)),
  phase: `Phase ${f.phase}`,
  runtime: movies.find((m) => m.id === f.id)?.runtime ?? "",
  description: f.summary,
  image: f.image,
  trailerUrl:
    movies.find((m) => m.id === f.id)?.trailerUrl ??
    `https://www.marvel.com/movies/${slugs[f.id] ?? f.id}`,
}));
export type SearchCategory =
  | "Characters"
  | "Movies"
  | "Teams"
  | "Villains"
  | "Abilities"
  | "Events"
  | "Locations"
  | "Equipment";
export interface ArchiveRecord {
  id: string;
  title: string;
  category: SearchCategory;
  subtitle: string;
  description: string;
  keywords: string;
  image?: string;
  heroId?: string;
  movieId?: string;
  threatId?: string;
  section?: string;
  relatedHeroes?: string[];
  relatedFilms?: string[];
}
export const wolverine: ArchiveRecord = {
  id: "guest-wolverine",
  title: "Wolverine",
  category: "Characters",
  subtitle: "Logan · Multiversal mutant",
  description:
    "An alternate Wolverine joins Deadpool in Deadpool & Wolverine (2024). His regenerative healing, heightened senses and adamantium claws make him a formidable close-quarters fighter. This guest file covers the 2024 film variant; it does not treat him as a member of the original Avengers.",
  keywords:
    "Logan James Howlett mutant X-Men regeneration healing adamantium claws Hugh Jackman",
  image: `${import.meta.env.BASE_URL}images/wolverine.jpg`,
  relatedFilms: ["deadpool-wolverine"],
};
const locations: ArchiveRecord[] = [
  [
    "asgard",
    "Asgard",
    "The realm of Thor",
    "Thor’s home and the seat of Asgardian power. Its people survive the destruction of their world in Ragnarok.",
    "Thor Loki Odin Hela Mjolnir Bifrost",
    ["thor", "loki"],
    ["thor", "dark-world", "ragnarok"],
  ],
  [
    "wakanda",
    "Wakanda",
    "A kingdom shaped by vibranium",
    "T’Challa’s technologically advanced homeland becomes a frontline against Thanos and his army.",
    "Black Panther Shuri vibranium Infinity War",
    ["black-panther"],
    ["black-panther", "infinity-war", "wakanda-forever"],
  ],
  [
    "new-york",
    "New York",
    "Where the Avengers assembled",
    "Loki’s invasion turns Manhattan into the battlefield that brings the original six together.",
    "Avengers Iron Man Captain America Thor Hulk Black Widow Hawkeye Spider-Man",
    ["iron-man", "captain-america", "spider-man"],
    ["avengers", "homecoming"],
  ],
  [
    "sokovia",
    "Sokovia",
    "The price of a defense gone wrong",
    "Ultron turns a Sokovian city into a weapon. The aftermath reshapes public trust in the Avengers.",
    "Ultron Wanda Scarlet Witch Vision Iron Man",
    ["scarlet-witch", "vision", "iron-man"],
    ["age-of-ultron", "civil-war"],
  ],
  [
    "titan",
    "Titan",
    "The Mad Titan’s ruined home",
    "Iron Man, Doctor Strange, Spider-Man and several Guardians face Thanos on Titan.",
    "Thanos Guardians Star-Lord Gamora Infinity War",
    ["iron-man", "doctor-strange", "spider-man"],
    ["infinity-war"],
  ],
  [
    "vormir",
    "Vormir",
    "A soul for a soul",
    "A remote world where the Soul Stone demands the sacrifice of someone its seeker loves.",
    "Thanos Gamora Black Widow Hawkeye Red Skull Soul Stone",
    ["black-widow", "hawkeye"],
    ["infinity-war", "endgame"],
  ],
  [
    "quantum-realm",
    "Quantum Realm",
    "Beyond familiar scale",
    "A strange microscopic realm reached with Pym technology. It becomes central to the time heist and Kang’s exile.",
    "Ant-Man Wasp Kang Janet Scott Lang Endgame",
    ["ant-man"],
    ["ant-man", "ant-man-wasp", "quantumania", "endgame"],
  ],
  [
    "kamar-taj",
    "Kamar-Taj",
    "A sanctuary of the mystic arts",
    "Stephen Strange begins his training among sorcerers who protect Earth from other-dimensional threats.",
    "Doctor Strange Wong Ancient One magic",
    ["doctor-strange"],
    ["doctor-strange", "multiverse-madness"],
  ],
  [
    "knowhere",
    "Knowhere",
    "A city inside a celestial skull",
    "A remote outpost associated with the Collector, the Reality Stone and the Guardians.",
    "Guardians Star-Lord Rocket Gamora Thanos Reality Stone",
    [],
    ["guardians", "infinity-war", "guardians-3"],
  ],
  [
    "sakaar",
    "Sakaar",
    "The Grandmaster’s arena",
    "Thor finds Hulk on a world of scavengers and gladiatorial spectacle.",
    "Thor Hulk Valkyrie Ragnarok",
    ["thor", "hulk"],
    ["ragnarok"],
  ],
].map(
  ([id, title, subtitle, description, keywords, relatedHeroes, relatedFilms]) =>
    ({
      id: `location-${id}`,
      title,
      category: "Locations",
      subtitle,
      description,
      keywords,
      relatedHeroes,
      relatedFilms,
    }) as ArchiveRecord,
);
export const archiveRecords: ArchiveRecord[] = [
  {
    id: "artifact-gauntlet",
    title: "Infinity Gauntlet",
    category: "Equipment",
    subtitle: "Interactive cosmic artifact",
    description:
      "A vessel forged on Nidavellir to channel the six Infinity Stones. Explore each stone in the interactive artifact study to reveal its energy signature and complete the gauntlet.",
    keywords:
      "Thanos Space Mind Reality Power Time Soul Stones Infinity War Endgame",
    section: "gauntlet",
    relatedFilms: ["infinity-war", "endgame"],
  },
  {
    id: "ability-comparison",
    title: "Ability comparison",
    category: "Abilities",
    subtitle: "Two characters. Eight perspectives.",
    description:
      "Compare the capabilities of two characters across Strength, Speed, Durability, Intelligence, Technology, Energy, Combat and Experience. The comparison is qualitative and does not assign numerical power ratings.",
    keywords: "compare versus vs powers strengths radar",
    section: "compare",
  },

  ...heroes.map((h) => ({
    id: `hero-${h.id}`,
    title: h.name,
    category: "Characters" as const,
    subtitle: h.alias,
    description: h.description,
    keywords: [h.alias, h.affiliation, ...h.abilities.map((a) => a.label)].join(
      " ",
    ),
    image: h.image,
    heroId: h.id,
  })),
  wolverine,
  ...timelineFilms.map((f) => ({
    id: `film-${f.id}`,
    title: f.title,
    category: "Movies" as const,
    subtitle: `${f.date.slice(0, 4)} · Phase ${f.phase}`,
    description: f.summary,
    keywords: [...f.characters, f.summary].join(" "),
    image: f.image,
    movieId: f.id,
  })),
  ...teams.map((t) => ({
    id: `team-${t.id}`,
    title: t.name,
    category: "Teams" as const,
    subtitle: t.era,
    description: t.description,
    keywords: t.members
      .map((id) => heroes.find((h) => h.id === id)?.name)
      .join(" "),
    section: "teams",
    relatedHeroes: t.members,
  })),
  ...threats.map((t) => ({
    id: `threat-${t.id}`,
    title: t.name,
    category: "Villains" as const,
    subtitle: t.scope,
    description: `${t.motivation} ${t.story}`,
    keywords: [t.alias, ...t.abilities, ...t.heroes, t.conflict].join(" "),
    image: t.image,
    threatId: t.id,
    relatedHeroes: t.heroes,
    relatedFilms: t.filmId ? [t.filmId] : [],
  })),
  ...heroes.flatMap((h) =>
    h.abilities.map((a) => ({
      id: `ability-${h.id}-${a.id}`,
      title: a.label,
      category: "Abilities" as const,
      subtitle: h.name,
      description: a.description,
      keywords: `${h.name} ${h.alias} ${a.description}`,
      relatedHeroes: [h.id],
    })),
  ),
  ...heroes.flatMap((h) =>
    h.equipment.map((e, i) => ({
      id: `equipment-${h.id}-${i}`,
      title: e.name,
      category: "Equipment" as const,
      subtitle: h.name,
      description: e.description,
      keywords: `${h.name} ${h.alias} ${e.description}`,
      relatedHeroes: [h.id],
    })),
  ),
  ...heroes.flatMap((h) =>
    h.story.map((e, i) => ({
      id: `event-${h.id}-${i}`,
      title: e.title,
      category: "Events" as const,
      subtitle: `${e.film} · ${e.year}`,
      description: e.description,
      keywords: `${h.name} ${h.alias} ${e.film}`,
      relatedHeroes: [h.id],
      relatedFilms: timelineFilms
        .filter((f) => e.film.includes(f.title))
        .map((f) => f.id),
    })),
  ),
  ...locations,
];
export const searchCategories: SearchCategory[] = [
  "Characters",
  "Movies",
  "Teams",
  "Villains",
  "Abilities",
  "Events",
  "Locations",
  "Equipment",
];
export function searchArchive(
  query: string,
  category: SearchCategory | "All" = "All",
) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return archiveRecords
    .filter((r) => category === "All" || r.category === category)
    .map((record) => {
      const title = record.title.toLowerCase();
      const content =
        `${title} ${record.subtitle} ${record.keywords}`.toLowerCase();
      const score =
        terms.length === 0
          ? 1
          : terms.every((t) => content.includes(t))
            ? terms.reduce(
                (sum, t) =>
                  sum +
                  (title === t
                    ? 100
                    : title.startsWith(t)
                      ? 40
                      : title.includes(t)
                        ? 20
                        : 4),
                0,
              )
            : 0;
      return { record, score };
    })
    .filter((r) => r.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.record.title.localeCompare(b.record.title),
    )
    .map((r) => r.record);
}
export const characterFilters = [
  "ALL",
  "AVENGERS",
  "HEROES",
  "VILLAINS",
  "COSMIC",
  "MAGIC",
  "TECH",
  "SUPER SOLDIERS",
  "GODS",
  "MUTANTS",
  "ORIGINAL SIX",
] as const;
export type CharacterFilter = (typeof characterFilters)[number];
const heroTags: Record<string, CharacterFilter[]> = {
  "iron-man": ["AVENGERS", "HEROES", "TECH"],
  "captain-america": ["AVENGERS", "HEROES", "SUPER SOLDIERS"],
  thor: ["AVENGERS", "HEROES", "COSMIC", "GODS"],
  hulk: ["AVENGERS", "HEROES"],
  "black-widow": ["AVENGERS", "HEROES"],
  hawkeye: ["AVENGERS", "HEROES"],
  "spider-man": ["AVENGERS", "HEROES", "TECH"],
  "doctor-strange": ["HEROES", "MAGIC"],
  "black-panther": ["HEROES", "TECH"],
  "scarlet-witch": ["AVENGERS", "HEROES", "MAGIC"],
  vision: ["AVENGERS", "HEROES", "TECH"],
  "ant-man": ["AVENGERS", "HEROES", "TECH"],
  "captain-marvel": ["AVENGERS", "HEROES", "COSMIC"],
  falcon: ["AVENGERS", "HEROES", "TECH"],
  "winter-soldier": ["HEROES", "SUPER SOLDIERS"],
  "war-machine": ["AVENGERS", "HEROES", "TECH"],
  loki: ["VILLAINS", "MAGIC", "COSMIC", "GODS"],
  "nick-fury": ["HEROES"],
};
export interface RosterEntry {
  id: string;
  record: ArchiveRecord;
  tags: CharacterFilter[];
}
export const rosterEntries: RosterEntry[] = [
  ...heroes.map((h, i) => ({
    id: h.id,
    record: archiveRecords.find((r) => r.id === `hero-${h.id}`)!,
    tags: [...heroTags[h.id], ...(i < 6 ? ["ORIGINAL SIX" as const] : [])],
  })),
  ...threats
    .filter((t) => t.id !== "loki")
    .map((t) => ({
      id: t.id,
      record: archiveRecords.find((r) => r.id === `threat-${t.id}`)!,
      tags: [
        "VILLAINS" as const,
        ...(["thanos", "hela"].includes(t.id) ? ["COSMIC" as const] : []),
        ...(t.id === "hela" ? ["GODS" as const] : []),
        ...(["ultron", "kang", "green-goblin", "doctor-doom"].includes(t.id)
          ? ["TECH" as const]
          : []),
        ...(t.id === "doctor-doom" ? ["MAGIC" as const] : []),
        ...(t.id === "red-skull" ? ["SUPER SOLDIERS" as const] : []),
      ],
    })),
  { id: "wolverine", record: wolverine, tags: ["HEROES", "MUTANTS"] },
];
