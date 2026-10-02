export interface InfinityStone {
  id: string;
  name: string;
  color: string;
  colorName: string;
  vessel: string;
  power: string;
  appearances: string[];
  events: string[];
  thanos: string;
}
export const stones: InfinityStone[] = [
  {
    id: "space",
    name: "Space Stone",
    color: "#429aff",
    colorName: "Blue",
    vessel: "THE TESSERACT",
    power:
      "Opens portals and transports people and objects across enormous distances.",
    appearances: [
      "Captain America: The First Avenger",
      "The Avengers",
      "Avengers: Infinity War",
    ],
    events: [
      "HYDRA weaponizes the Tesseract during World War II.",
      "Loki uses it to open the portal above New York.",
    ],
    thanos:
      "Thanos takes the Tesseract from Loki and crushes its casing to claim the stone.",
  },
  {
    id: "mind",
    name: "Mind Stone",
    color: "#ffda63",
    colorName: "Yellow",
    vessel: "LOKI’S SCEPTER · VISION",
    power:
      "Influences minds and helps give life to Vision’s synthetic consciousness.",
    appearances: [
      "The Avengers",
      "Avengers: Age of Ultron",
      "Avengers: Infinity War",
    ],
    events: [
      "Loki’s scepter controls Hawkeye and other agents.",
      "The stone becomes part of Vision’s creation.",
    ],
    thanos:
      "Thanos reverses Vision’s destruction with the Time Stone, then removes the Mind Stone to complete the gauntlet.",
  },
  {
    id: "reality",
    name: "Reality Stone",
    color: "#fa405b",
    colorName: "Red",
    vessel: "THE AETHER",
    power:
      "Reshapes matter and alters the reality perceived by those around it.",
    appearances: [
      "Thor: The Dark World",
      "Avengers: Infinity War",
      "Avengers: Endgame",
    ],
    events: [
      "The Aether bonds with Jane Foster.",
      "The Asgardians entrust it to the Collector on Knowhere.",
    ],
    thanos:
      "Thanos seizes the stone on Knowhere and uses it to conceal the destruction he has caused.",
  },
  {
    id: "power",
    name: "Power Stone",
    color: "#b177ff",
    colorName: "Purple",
    vessel: "THE ORB",
    power:
      "Releases immense destructive energy, overwhelming those unable to contain it.",
    appearances: [
      "Guardians of the Galaxy",
      "Avengers: Infinity War",
      "Avengers: Endgame",
    ],
    events: [
      "The Guardians share its power to defeat Ronan.",
      "The Nova Corps secures the stone on Xandar.",
    ],
    thanos:
      "Thanos attacks Xandar and claims the Power Stone before Infinity War’s opening scene.",
  },
  {
    id: "time",
    name: "Time Stone",
    color: "#66e2a4",
    colorName: "Green",
    vessel: "THE EYE OF AGAMOTTO",
    power: "Manipulates time, creating loops and reversing events.",
    appearances: [
      "Doctor Strange",
      "Avengers: Infinity War",
      "Avengers: Endgame",
    ],
    events: [
      "Strange traps Dormammu in a repeating moment.",
      "On Titan, Strange examines possible outcomes of the battle.",
    ],
    thanos:
      "Doctor Strange surrenders the stone to spare Tony Stark, setting the final path in motion.",
  },
  {
    id: "soul",
    name: "Soul Stone",
    color: "#ff9c4e",
    colorName: "Orange",
    vessel: "VORMIR",
    power:
      "Connected to souls, with a terrible price: a life must be sacrificed to obtain it.",
    appearances: ["Avengers: Infinity War", "Avengers: Endgame"],
    events: [
      "Red Skull serves as the stone’s guide on Vormir.",
      "Natasha sacrifices herself so Clint can recover it during the time heist.",
    ],
    thanos: "Thanos sacrifices Gamora on Vormir to obtain the Soul Stone.",
  },
];
