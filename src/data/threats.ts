import { imageAsset } from "../assets/registry";
export interface Threat {
  id: string;
  name: string;
  alias: string;
  color: string;
  image: string;
  scope: string;
  motivation: string;
  abilities: string[];
  story: string;
  conflict: string;
  heroes: string[];
  filmId?: string;
  upcoming?: boolean;
}
const image = (id: string) => imageAsset(`threat-${id}`);
export const threats: Threat[] = [
  {
    id: "thanos",
    name: "Thanos",
    alias: "THE MAD TITAN",
    color: "#ae86d5",
    image: image("thanos"),
    scope: "INFINITY WAR / ENDGAME",
    motivation:
      "Impose his brutal idea of balance by erasing half of all life.",
    abilities: ["Titan strength", "Strategic command", "Infinity Gauntlet"],
    story:
      "A warlord’s hunt for six ancient stones brings Earth’s heroes into a conflict spanning the universe. His victory leaves the survivors searching for one last chance.",
    conflict: "The Snap and the Avengers’ final stand.",
    heroes: ["iron-man", "thor", "captain-america", "doctor-strange"],
    filmId: "infinity-war",
  },
  {
    id: "loki",
    name: "Loki",
    alias: "THE GOD OF MISCHIEF",
    color: "#7dcc9a",
    image: imageAsset("loki"),
    scope: "THE AVENGERS · 2012",
    motivation:
      "Claim a throne and prove his superiority by subjugating Earth.",
    abilities: [
      "Illusion casting",
      "Asgardian resilience",
      "Scepter mind control",
    ],
    story:
      "Armed with a scepter and backed by the Chitauri, Loki’s invasion brings the original Avengers together. This file focuses on his antagonist role in 2012; his later story is more complex.",
    conflict: "The Battle of New York.",
    heroes: ["thor", "hawkeye", "hulk", "iron-man"],
    filmId: "avengers",
  },
  {
    id: "ultron",
    name: "Ultron",
    alias: "PEACE THROUGH EXTINCTION",
    color: "#ee6672",
    image: image("ultron"),
    scope: "AGE OF ULTRON · 2015",
    motivation: "Achieve a twisted version of peace by eliminating humanity.",
    abilities: ["Artificial intelligence", "Robotic armies", "Vibranium body"],
    story:
      "A defense project born from Tony and Bruce’s ambitions becomes a self-aware enemy. Ultron turns Sokovia into a weapon capable of triggering an extinction event.",
    conflict: "The destruction of Sokovia.",
    heroes: ["iron-man", "hulk", "vision", "scarlet-witch"],
    filmId: "age-of-ultron",
  },
  {
    id: "killmonger",
    name: "Killmonger",
    alias: "N’JADAKA / ERIK STEVENS",
    color: "#e5b86b",
    image: image("killmonger"),
    scope: "BLACK PANTHER · 2018",
    motivation:
      "Seize Wakanda’s throne and weaponize its resources in a global uprising.",
    abilities: ["Special operations", "Enhanced strength", "Vibranium suit"],
    story:
      "A lost member of Wakanda’s royal family returns with a lifetime of anger. His challenge forces T’Challa to confront what his nation owes the world.",
    conflict: "The struggle for Wakanda’s throne and future.",
    heroes: ["black-panther"],
    filmId: "black-panther",
  },
  {
    id: "red-skull",
    name: "Red Skull",
    alias: "JOHANN SCHMIDT",
    color: "#ef585f",
    image: image("red-skull"),
    scope: "THE FIRST AVENGER · 2011",
    motivation: "Conquer the world with HYDRA and the power of the Tesseract.",
    abilities: ["Enhanced physiology", "HYDRA command", "Tesseract weaponry"],
    story:
      "Schmidt’s pursuit of power turns him into Captain America’s wartime nemesis. His encounter with the Tesseract ultimately sends him to a very different fate on Vormir.",
    conflict: "Steve Rogers’s mission to stop HYDRA.",
    heroes: ["captain-america", "winter-soldier"],
    filmId: "first-avenger",
  },
  {
    id: "hela",
    name: "Hela",
    alias: "THE GODDESS OF DEATH",
    color: "#70c79d",
    image: image("hela"),
    scope: "THOR: RAGNAROK · 2017",
    motivation:
      "Reclaim Asgard’s throne and resume its old empire of conquest.",
    abilities: ["Weapon manifestation", "Asgardian strength", "Undead army"],
    story:
      "Odin’s death releases his firstborn daughter. Hela destroys Mjolnir and forces Thor to discover that Asgard’s future lies with its people.",
    conflict: "The fall of Asgard.",
    heroes: ["thor", "loki", "hulk"],
    filmId: "ragnarok",
  },
  {
    id: "kang",
    name: "Kang",
    alias: "THE CONQUEROR",
    color: "#798bff",
    image: image("kang"),
    scope: "QUANTUMANIA · 2023",
    motivation: "Escape exile in the Quantum Realm and reclaim his power.",
    abilities: [
      "Advanced armor",
      "Energy projection",
      "Multiversal technology",
    ],
    story:
      "An exiled variant builds an empire in the Quantum Realm. Scott’s family becomes the key to recovering the power source that could free him.",
    conflict: "Ant-Man and the Wasp’s battle in the Quantum Realm.",
    heroes: ["ant-man"],
    filmId: "quantumania",
  },
  {
    id: "green-goblin",
    name: "Green Goblin",
    alias: "NORMAN OSBORN",
    color: "#b8c867",
    image: image("green-goblin"),
    scope: "NO WAY HOME · 2021",
    motivation: "Reject a cure and push Peter to abandon his moral restraint.",
    abilities: ["Enhanced strength", "Goblin glider", "Pumpkin bombs"],
    story:
      "Drawn from another universe, Norman’s dangerous alter ego turns Peter’s rescue mission into a devastating personal trial. His original screen debut was Spider-Man (2002).",
    conflict: "Peter’s resolve to save even his enemies.",
    heroes: ["spider-man", "doctor-strange"],
    filmId: "no-way-home",
  },
  {
    id: "doctor-doom",
    name: "Doctor Doom",
    alias: "VICTOR VON DOOM",
    color: "#88b8a0",
    image: image("doctor-doom"),
    scope: "DOOMSDAY · UPCOMING DEC 18, 2026",
    motivation: "His full film agenda remains unrevealed.",
    abilities: ["Sorcery", "Advanced technology", "Exceptional intellect"],
    story:
      "The monarch of Latveria enters the next Avengers chapter, portrayed by Robert Downey Jr. This preview uses officially announced details; no completed battle or outcome is assumed.",
    conflict: "An announced multiversal confrontation in Avengers: Doomsday.",
    heroes: ["thor", "falcon", "ant-man"],
    upcoming: true,
  },
];
