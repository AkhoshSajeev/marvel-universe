export interface Hero {
  id: string;
  name: string;
  alias: string;
  role: string;
  quote: string;
  description: string;
  color: string;
  image: string;
  abilities: string[];
  stats: {
    strength: number;
    intelligence: number;
    speed: number;
    durability: number;
  };
  firstAppearance: string;
  actor: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  phase: string;
  runtime: string;
  description: string;
  image: string;
  trailerUrl: string;
}

const image = (filename: string) =>
  `${import.meta.env.BASE_URL}images/${filename}.jpg`;

// Profiles describe the MCU's original six. Scores are editorial fan ratings
// on a 100-point scale, not official Marvel power rankings.
// First appearances refer to the characters' MCU film debuts.
export const heroes: Hero[] = [
  {
    id: "iron-man",
    name: "Iron Man",
    alias: "Tony Stark",
    role: "The visionary",
    quote: "I am Iron Man.",
    description:
      "A brilliant inventor with a second chance. Tony Stark turns his greatest creation into a promise to protect the world—one impossible upgrade at a time.",
    color: "#ec343c",
    image: image("iron-man"),
    abilities: [
      "Powered armor",
      "Repulsor technology",
      "Genius intellect",
      "Supersonic flight",
    ],
    stats: { strength: 85, intelligence: 100, speed: 88, durability: 90 },
    firstAppearance: "Iron Man · 2008",
    actor: "Robert Downey Jr.",
  },
  {
    id: "captain-america",
    name: "Captain America",
    alias: "Steve Rogers",
    role: "The first Avenger",
    quote: "I can do this all day.",
    description:
      "A soldier out of time with an unbreakable sense of purpose. Armed with a vibranium shield, Steve Rogers leads by example and stands his ground when the odds turn impossible.",
    color: "#5c9ee9",
    image: image("captain-america"),
    abilities: [
      "Super-soldier physiology",
      "Vibranium shield",
      "Tactical leadership",
      "Expert combatant",
    ],
    stats: { strength: 75, intelligence: 82, speed: 73, durability: 80 },
    firstAppearance: "Captain America: The First Avenger · 2011",
    actor: "Chris Evans",
  },
  {
    id: "thor",
    name: "Thor",
    alias: "Thor Odinson",
    role: "The god of thunder",
    quote: "Bring me Thanos!",
    description:
      "An Asgardian warrior who learns that worthiness is earned. Thor brings the fury of the storm to Earth’s defense, carrying the strength of a god and the heart of a hero.",
    color: "#84d5f7",
    image: image("thor"),
    abilities: [
      "Lightning manipulation",
      "Asgardian strength",
      "Mjolnir & Stormbreaker",
      "Flight",
    ],
    stats: { strength: 98, intelligence: 74, speed: 92, durability: 98 },
    firstAppearance: "Thor · 2011",
    actor: "Chris Hemsworth",
  },
  {
    id: "black-widow",
    name: "Black Widow",
    alias: "Natasha Romanoff",
    role: "The master spy",
    quote: "I’ve got red in my ledger.",
    description:
      "A former Red Room operative who chooses her own future. Natasha Romanoff turns unmatched espionage skills and fierce loyalty into the Avengers’ most human kind of strength.",
    color: "#de5656",
    image: image("black-widow"),
    abilities: [
      "Master espionage",
      "Martial arts",
      "Widow’s Bite",
      "Expert infiltration",
    ],
    stats: { strength: 45, intelligence: 92, speed: 65, durability: 50 },
    firstAppearance: "Iron Man 2 · 2010",
    actor: "Scarlett Johansson",
  },
  {
    id: "hulk",
    name: "Hulk",
    alias: "Bruce Banner",
    role: "The strongest Avenger",
    quote: "I’m always angry.",
    description:
      "A remarkable scientist and an unstoppable force share one life. Bruce Banner’s gamma-powered alter ego brings overwhelming strength to battles no ordinary hero could survive.",
    color: "#89bf5c",
    image: image("hulk"),
    abilities: [
      "Immense strength",
      "Gamma physiology",
      "Accelerated healing",
      "Scientific genius",
    ],
    stats: { strength: 100, intelligence: 98, speed: 70, durability: 100 },
    firstAppearance: "The Incredible Hulk · 2008",
    actor: "Mark Ruffalo · Avengers films",
  },
  {
    id: "hawkeye",
    name: "Hawkeye",
    alias: "Clint Barton",
    role: "The master marksman",
    quote: "You step out that door, you are an Avenger.",
    description:
      "A S.H.I.E.L.D. veteran with extraordinary aim and something worth fighting for. Clint Barton holds his own among gods and monsters with precision, ingenuity, and unwavering resolve.",
    color: "#b98bdf",
    image: image("hawkeye"),
    abilities: [
      "Precision archery",
      "Specialized arrows",
      "Tactical awareness",
      "Close-quarters combat",
    ],
    stats: { strength: 43, intelligence: 83, speed: 61, durability: 48 },
    firstAppearance: "Thor · 2011",
    actor: "Jeremy Renner",
  },
];

// Movie metadata verified against Marvel and Disney's official movie pages.
// Runtimes describe the original theatrical films, not later rereleases.
// https://www.marvel.com/movies/the-avengers
// https://www.marvel.com/Ultron/
// https://movies.disney.com/avengers-infinity-war
// https://www.marvel.com/avengers_movie/
export const movies: Movie[] = [
  {
    id: "avengers",
    title: "The Avengers",
    year: 2012,
    phase: "Phase One",
    runtime: "2h 23m",
    description:
      "Six extraordinary people. One impossible mission. Nick Fury brings Earth’s mightiest heroes together as Loki opens the door to an invasion of New York.",
    image: image("movie-avengers"),
    trailerUrl: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
  },
  {
    id: "age-of-ultron",
    title: "Avengers: Age of Ultron",
    year: 2015,
    phase: "Phase Two",
    runtime: "2h 21m",
    description:
      "A dream of global protection becomes a threat to humanity. The Avengers face Ultron, confront their deepest fears, and discover what it means to fight as a team.",
    image: image("movie-age-of-ultron"),
    trailerUrl: "https://www.youtube.com/watch?v=kQVEC1YGLK4",
  },
  {
    id: "infinity-war",
    title: "Avengers: Infinity War",
    year: 2018,
    phase: "Phase Three",
    runtime: "2h 29m",
    description:
      "The battle reaches beyond Earth. As Thanos hunts the six Infinity Stones, the Avengers and their allies risk everything to keep half the universe from disappearing.",
    image: image("movie-infinity-war"),
    trailerUrl: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
  },
  {
    id: "endgame",
    title: "Avengers: Endgame",
    year: 2019,
    phase: "Phase Three",
    runtime: "3h 01m",
    description:
      "After the unimaginable, a final chance. The surviving Avengers journey through their shared past and unite for a last stand that will define their legacy.",
    image: image("movie-endgame"),
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
  },
];

export const universeFacts: { value: string; label: string }[] = [
  { value: "06", label: "Original Avengers" },
  { value: "04", label: "Avengers films" },
  { value: "01", label: "Shared universe" },
];
