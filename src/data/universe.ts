import { imageAsset } from "../assets/registry";
export type AbilityIcon =
  | "cpu"
  | "brain"
  | "wind"
  | "zap"
  | "shield"
  | "sparkles"
  | "target"
  | "heart"
  | "swords"
  | "eye"
  | "orbit"
  | "flame";

export interface Ability {
  id: string;
  label: string;
  description: string;
  icon: AbilityIcon;
}

export interface Hero {
  id: string;
  name: string;
  alias: string;
  role: string;
  quote: string;
  description: string;
  color: string;
  image: string;
  abilities: Ability[];
  affiliation: string;
  status: string;
  statusAsOf: string;
  category: "tech" | "enhanced" | "cosmic" | "mystic" | "tactical";
  equipment: { name: string; description: string }[];
  story: { year: string; title: string; film: string; description: string }[];
  firstAppearance: string;
  firstMajorAppearance?: string;
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

const image = imageAsset;

const ability = (
  label: string,
  description: string,
  icon: AbilityIcon,
): Ability => ({
  id: label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  label,
  description,
  icon,
});

const endgame = "Avengers: Endgame (2019)";

// MCU screen continuity only. Every dossier declares its narrative boundary;
// most stop at Endgame, while Wanda includes the powers revealed in WandaVision.
// Timeline years are screen-release years, not in-universe calendar dates.
// First appearance means film debut; credit-scene debuts are explicitly identified.
// Abilities describe capabilities, never numerical rankings or comparative scores.
// Official reference material (Marvel search extracts were available where full
// character pages rejected automated access):
// https://www.marvel.com/characters/war-machine-james-rhodes/on-screen/
// https://www.marvel.com/characters/doctor-strange-stephen-strange/on-screen?mobile-app=true&theme=dark%2F1000
// https://www.marvel.com/articles/tv-shows/wandavision-primer-where-we-last-left-off-with-wanda-maximoff
// https://www.marvel.com/articles/tv-shows/wandavision-wanda-agatha-runes
// https://www.marvel.com/articles/movies/captain-marvel-vfx-supervisor-EMS
// https://www.marvel.com/articles/movies/10-best-standout-moments-captain-marvel-trailer
// https://www.marvel.com/articles/movies/marvel-studios-ant-man-and-the-wasp-begins-production
// https://www.marvel.com/articles/movies/love-relationships-mcu
// https://d23.com/a-to-z/avengers-endgame-film/
// https://movies.disney.com/avengers-endgame
export const heroes: Hero[] = [
  {
    id: "iron-man",
    name: "Iron Man",
    alias: "Tony Stark",
    role: "The visionary",
    quote: "I am Iron Man.",
    description:
      "An inventor who builds a way out, then a better future. Tony Stark turns his genius into a suit of armor—and learns what it means to put the world before himself.",
    color: "#ec343c",
    image: image("iron-man"),
    category: "tech",
    affiliation: "Avengers · Stark Industries",
    status: "Fell saving the universe",
    statusAsOf: endgame,
    firstAppearance: "Iron Man · 2008",
    actor: "Robert Downey Jr.",
    abilities: [
      ability(
        "Genius-level intellect",
        "Models impossible problems and finds a solution under pressure.",
        "brain",
      ),
      ability(
        "Engineering",
        "Designs and refines every generation of the Iron Man armor.",
        "cpu",
      ),
      ability(
        "Powered armor",
        "A wearable defense system provides protection and enhanced strength.",
        "shield",
      ),
      ability(
        "Flight",
        "Boot thrusters and stabilizers turn the armor into an aerial platform.",
        "wind",
      ),
      ability(
        "Energy projection",
        "Palm repulsors and the chest unibeam focus the suit’s energy.",
        "zap",
      ),
      ability(
        "Advanced weapons",
        "Integrated precision systems adapt to threats on the battlefield.",
        "target",
      ),
      ability(
        "AI technology",
        "JARVIS and later FRIDAY assist with analysis, targeting, and suit control.",
        "orbit",
      ),
    ],
    equipment: [
      {
        name: "Mark armor",
        description:
          "From the improvised Mark I to the nanotech Mark LXXXV: an evolving answer to every new threat.",
      },
      {
        name: "Arc Reactor",
        description:
          "The compact power source at the heart of Stark’s armor technology.",
      },
      {
        name: "Repulsors",
        description:
          "Palm-mounted emitters serve as both weapons and flight stabilizers.",
      },
      {
        name: "JARVIS / FRIDAY",
        description:
          "AI partners that make Tony’s immense network of systems work together.",
      },
    ],
    story: [
      {
        year: "2008",
        title: "Tony Stark",
        film: "Iron Man",
        description:
          "Captivity forces the weapons designer to confront the human cost of his work.",
      },
      {
        year: "2008",
        title: "Iron Man",
        film: "Iron Man",
        description:
          "A cave-built armor becomes a new purpose—and a very public identity.",
      },
      {
        year: "2012",
        title: "Avengers assemble",
        film: "The Avengers",
        description:
          "Fury’s initiative brings a fiercely independent inventor into a team.",
      },
      {
        year: "2012",
        title: "New York",
        film: "The Avengers",
        description:
          "Tony carries a nuclear missile through the portal to stop the invasion.",
      },
      {
        year: "2016",
        title: "A divided team",
        film: "Captain America: Civil War",
        description:
          "The Sokovia Accords and a personal revelation fracture his bond with Steve.",
      },
      {
        year: "2018",
        title: "Titan",
        film: "Avengers: Infinity War",
        description:
          "Far from home, his most advanced armor cannot prevent Thanos’ victory.",
      },
      {
        year: "2019",
        title: "The final choice",
        film: "Avengers: Endgame",
        description:
          "Tony helps unlock time travel, then gives his life to end Thanos’ assault.",
      },
    ],
  },
  {
    id: "captain-america",
    name: "Captain America",
    alias: "Steve Rogers",
    role: "The first Avenger",
    quote: "I can do this all day.",
    description:
      "A soldier out of time with an unbreakable sense of purpose. Steve Rogers stands his ground because someone has to—and inspires extraordinary people to do the same.",
    color: "#5c9ee9",
    image: image("captain-america"),
    category: "enhanced",
    affiliation: "Avengers · Howling Commandos",
    status: "Retired · Passed the shield to Sam",
    statusAsOf: endgame,
    firstAppearance: "Captain America: The First Avenger · 2011",
    actor: "Chris Evans",
    abilities: [
      ability(
        "Super-soldier physiology",
        "Erskine’s serum enhances Steve’s strength, stamina, and recovery.",
        "heart",
      ),
      ability(
        "Shield mastery",
        "Deflects attacks and calculates returning shield throws in close combat.",
        "shield",
      ),
      ability(
        "Tactical leadership",
        "Reads a changing battle and brings a team’s strengths together.",
        "brain",
      ),
      ability(
        "Expert combatant",
        "Combines military training with exceptional coordination and reflexes.",
        "swords",
      ),
      ability(
        "Worthiness",
        "Wields Mjolnir and its lightning during the final stand against Thanos.",
        "zap",
      ),
    ],
    equipment: [
      {
        name: "Vibranium shield",
        description:
          "A defensive tool, precision weapon, and enduring promise to stand for others.",
      },
      {
        name: "Combat uniform",
        description:
          "Mission-ready protection built for movement rather than powered assistance.",
      },
      {
        name: "Mjolnir",
        description:
          "Temporarily wielded in Endgame; returned to its original timeline afterward.",
      },
    ],
    story: [
      {
        year: "2011",
        title: "A good man",
        film: "Captain America: The First Avenger",
        description:
          "Steve volunteers for Project Rebirth and becomes a hero of World War II.",
      },
      {
        year: "2012",
        title: "Out of time",
        film: "The Avengers",
        description:
          "Awakening in a changed world, he finds a new team to lead.",
      },
      {
        year: "2014",
        title: "Trust no one",
        film: "Captain America: The Winter Soldier",
        description:
          "Steve exposes HYDRA inside S.H.I.E.L.D. and discovers Bucky is alive.",
      },
      {
        year: "2016",
        title: "A line in the sand",
        film: "Captain America: Civil War",
        description:
          "His loyalty to Bucky and opposition to the Accords divide the Avengers.",
      },
      {
        year: "2018",
        title: "The last defense",
        film: "Avengers: Infinity War",
        description:
          "A fugitive returns to defend Vision and Wakanda from Thanos’ forces.",
      },
      {
        year: "2019",
        title: "A life of his own",
        film: "Avengers: Endgame",
        description:
          "After the final battle, Steve returns the Stones, reunites with Peggy, and passes on his shield.",
      },
    ],
  },
  {
    id: "thor",
    name: "Thor",
    alias: "Thor Odinson",
    role: "The god of thunder",
    quote: "Bring me Thanos!",
    description:
      "A prince who learns that worthiness is earned. Through exile, loss, and impossible battles, Thor discovers that his greatest strength has never lived inside a weapon.",
    color: "#84d5f7",
    image: image("thor"),
    category: "cosmic",
    affiliation: "Avengers · Asgard",
    status: "Alive · Traveling with the Guardians",
    statusAsOf: endgame,
    firstAppearance: "Thor · 2011",
    actor: "Chris Hemsworth",
    abilities: [
      ability(
        "Asgardian physiology",
        "An extraordinary constitution withstands impacts and hostile conditions.",
        "shield",
      ),
      ability(
        "Superhuman strength",
        "Brings immense physical force to battles against cosmic threats.",
        "swords",
      ),
      ability(
        "Lightning",
        "Channels storms directly through his body and into his weapons.",
        "zap",
      ),
      ability(
        "Weapon mastery",
        "Commands Mjolnir and Stormbreaker with centuries of combat experience.",
        "target",
      ),
      ability(
        "Longevity",
        "An Asgardian lifespan gives Thor experience across many human generations.",
        "heart",
      ),
      ability(
        "Flight",
        "Enchanted weapons and storm power carry him through the air.",
        "wind",
      ),
    ],
    equipment: [
      {
        name: "Mjolnir",
        description:
          "The enchanted hammer tests worthiness; a past version joins the Endgame battle.",
      },
      {
        name: "Stormbreaker",
        description:
          "Eitri’s axe channels Thor’s lightning and can summon the Bifrost.",
      },
      {
        name: "Asgardian armor",
        description:
          "Battle armor suited to the wars of the Nine Realms and beyond.",
      },
    ],
    story: [
      {
        year: "2011",
        title: "Worthy",
        film: "Thor",
        description:
          "Exile on Earth teaches the proud prince sacrifice and restores his power.",
      },
      {
        year: "2012",
        title: "Two worlds",
        film: "The Avengers",
        description:
          "Thor joins Earth’s defenders to stop his brother’s invasion.",
      },
      {
        year: "2017",
        title: "The storm within",
        film: "Thor: Ragnarok",
        description:
          "Without Mjolnir, he discovers his own power and saves Asgard’s people.",
      },
      {
        year: "2018",
        title: "Stormbreaker",
        film: "Avengers: Infinity War",
        description:
          "Grief sends Thor to Nidavellir to forge a weapon capable of confronting Thanos.",
      },
      {
        year: "2019",
        title: "Still worthy",
        film: "Avengers: Endgame",
        description:
          "He reconnects with his mother, fights beside the Avengers, and chooses a new path.",
      },
    ],
  },
  {
    id: "black-widow",
    name: "Black Widow",
    alias: "Natasha Romanoff",
    role: "The master spy",
    quote: "I’ve got red in my ledger.",
    description:
      "A Red Room operative who chooses her own future. Natasha Romanoff makes trust out of secrets and turns a group of extraordinary strangers into her family.",
    color: "#de5656",
    image: image("black-widow"),
    category: "tactical",
    affiliation: "Avengers · Former S.H.I.E.L.D.",
    status: "Fell on Vormir to secure the Soul Stone",
    statusAsOf: endgame,
    firstAppearance: "Iron Man 2 · 2010",
    actor: "Scarlett Johansson",
    abilities: [
      ability(
        "Espionage",
        "Builds convincing covers and extracts intelligence in hostile situations.",
        "eye",
      ),
      ability(
        "Martial arts",
        "Uses leverage, speed, and precise strikes against larger opponents.",
        "swords",
      ),
      ability(
        "Infiltration",
        "Navigates guarded facilities and uncovers secrets from within.",
        "target",
      ),
      ability(
        "Tactical analysis",
        "Turns observation and psychology into a strategic advantage.",
        "brain",
      ),
      ability(
        "Acrobatics",
        "Combines agility with close combat and evasive movement.",
        "wind",
      ),
    ],
    equipment: [
      {
        name: "Widow’s Bite",
        description:
          "Wrist-mounted electrical devices deliver a close-range shock.",
      },
      {
        name: "Electrified batons",
        description:
          "Compact weapons that extend her hand-to-hand fighting style.",
      },
      {
        name: "Tactical gear",
        description:
          "Sidearms, communications, and infiltration tools selected for the mission.",
      },
    ],
    story: [
      {
        year: "2010",
        title: "Undercover",
        film: "Iron Man 2",
        description:
          "A covert S.H.I.E.L.D. assignment places Natasha inside Stark’s world.",
      },
      {
        year: "2012",
        title: "A new family",
        film: "The Avengers",
        description:
          "She helps assemble the team and closes the portal above New York.",
      },
      {
        year: "2014",
        title: "Secrets exposed",
        film: "Captain America: The Winter Soldier",
        description:
          "Natasha releases S.H.I.E.L.D.’s records to help dismantle HYDRA’s conspiracy.",
      },
      {
        year: "2016",
        title: "Choosing trust",
        film: "Captain America: Civil War",
        description:
          "She lets Steve and Bucky escape when conscience outweighs orders.",
      },
      {
        year: "2019",
        title: "Whatever it takes",
        film: "Avengers: Endgame",
        description:
          "Natasha holds the survivors together and sacrifices herself so Clint can return with the Soul Stone.",
      },
    ],
  },
  {
    id: "hulk",
    name: "Hulk",
    alias: "Bruce Banner",
    role: "The strongest Avenger",
    quote: "I’m always angry.",
    description:
      "A brilliant scientist and a force of nature share one life. Bruce Banner’s struggle with the Hulk becomes a search for balance—and a chance to bring back a lost universe.",
    color: "#89bf5c",
    image: image("hulk"),
    category: "enhanced",
    affiliation: "Avengers",
    status: "Alive · Unified Banner/Hulk · Arm injured",
    statusAsOf: endgame,
    firstAppearance: "The Incredible Hulk · 2008",
    actor: "Mark Ruffalo · Edward Norton in 2008",
    abilities: [
      ability(
        "Superhuman strength",
        "Gamma-altered muscles deliver the tremendous force behind the Hulk.",
        "swords",
      ),
      ability(
        "Durability",
        "His physiology endures impacts and damage far beyond ordinary human limits.",
        "shield",
      ),
      ability(
        "Regeneration",
        "Accelerated recovery helps him survive severe injury; it is not invulnerability.",
        "heart",
      ),
      ability(
        "Gamma transformation",
        "Banner’s gamma exposure creates the Hulk; by Endgame he unites body and mind.",
        "flame",
      ),
      ability(
        "Scientific genius",
        "Banner’s expertise in radiation and physics supports the team’s toughest problems.",
        "brain",
      ),
      ability(
        "Powerful leaps",
        "Explosive leg strength carries the Hulk across great distances.",
        "wind",
      ),
    ],
    equipment: [
      {
        name: "Hulkbuster armor",
        description:
          "Banner pilots Stark’s armor in Wakanda when the Hulk refuses to emerge.",
      },
      {
        name: "Quantum suit",
        description:
          "Protective time-heist equipment; his gamma strength is innate, not suit-powered.",
      },
      {
        name: "Nano Gauntlet",
        description:
          "A temporary Infinity Stone interface that severely injures his arm when he restores the vanished.",
      },
    ],
    story: [
      {
        year: "2008",
        title: "The other guy",
        film: "The Incredible Hulk",
        description:
          "Banner searches for a cure while the military hunts his gamma-altered alter ego.",
      },
      {
        year: "2012",
        title: "Hulk, smash",
        film: "The Avengers",
        description:
          "He brings both scientific expertise and incredible force to New York’s defense.",
      },
      {
        year: "2015",
        title: "Into the unknown",
        film: "Avengers: Age of Ultron",
        description: "After Sokovia, the Hulk leaves Earth aboard a Quinjet.",
      },
      {
        year: "2017",
        title: "Sakaar’s champion",
        film: "Thor: Ragnarok",
        description: "Thor finds the Hulk fighting in the Grandmaster’s arena.",
      },
      {
        year: "2019",
        title: "The best of both",
        film: "Avengers: Endgame",
        description:
          "Banner achieves a new balance and uses the Stones to restore those lost to the Snap.",
      },
    ],
  },
  {
    id: "hawkeye",
    name: "Hawkeye",
    alias: "Clint Barton",
    role: "The master marksman",
    quote: "You are an Avenger.",
    description:
      "An ordinary man with extraordinary aim and a life worth returning to. Clint Barton holds the line among gods and monsters through precision, ingenuity, and loyalty.",
    color: "#b98bdf",
    image: image("hawkeye"),
    category: "tactical",
    affiliation: "Avengers · Former S.H.I.E.L.D.",
    status: "Alive · Reunited with his family",
    statusAsOf: endgame,
    firstMajorAppearance: "The Avengers · 2012",
    firstAppearance: "Thor · 2011",
    actor: "Jeremy Renner",
    abilities: [
      ability(
        "Precision archery",
        "Places shots accurately while moving through chaotic battlefields.",
        "target",
      ),
      ability(
        "Situational awareness",
        "Tracks threats and directs allies from an elevated vantage point.",
        "eye",
      ),
      ability(
        "Close combat",
        "Uses blades and hand-to-hand training when the battle closes in.",
        "swords",
      ),
      ability(
        "Field improvisation",
        "Turns specialized arrowheads and surroundings into tactical solutions.",
        "brain",
      ),
    ],
    equipment: [
      {
        name: "Tactical bow",
        description:
          "His signature weapon, designed for fast, accurate deployment.",
      },
      {
        name: "Trick arrows",
        description:
          "A modular quiver adds explosive, tethering, and other mission-specific options.",
      },
      {
        name: "Ronin sword",
        description:
          "The blade he carries during the years following his family’s disappearance.",
      },
    ],
    story: [
      {
        year: "2011",
        title: "Eyes on target",
        film: "Thor",
        description:
          "S.H.I.E.L.D.’s archer watches the hammer site as Thor attempts to reclaim Mjolnir.",
      },
      {
        year: "2012",
        title: "Breaking free",
        film: "The Avengers",
        description:
          "Freed from Loki’s control, Clint rejoins the fight to save New York.",
      },
      {
        year: "2015",
        title: "Something to protect",
        film: "Avengers: Age of Ultron",
        description:
          "His family gives the team refuge; his encouragement brings Wanda into the battle.",
      },
      {
        year: "2016",
        title: "Answering the call",
        film: "Captain America: Civil War",
        description:
          "He leaves retirement to help Steve and bring Wanda back into action.",
      },
      {
        year: "2019",
        title: "A way home",
        film: "Avengers: Endgame",
        description:
          "Natasha brings Clint back from Ronin’s path, and the final victory restores his family.",
      },
    ],
  },
  {
    id: "spider-man",
    name: "Spider-Man",
    alias: "Peter Parker",
    role: "The friendly neighborhood hero",
    quote: "Just your friendly neighborhood Spider-Man.",
    description:
      "A Queens teenager whose instinct is always to help. Peter Parker balances remarkable gifts, homemade ingenuity, and the enormous responsibility of becoming an Avenger.",
    color: "#ff5966",
    image: image("spider-man"),
    category: "enhanced",
    affiliation: "Avengers · Queens",
    status: "Alive · Restored after the Snap",
    statusAsOf: endgame,
    firstAppearance: "Captain America: Civil War · 2016",
    actor: "Tom Holland",
    abilities: [
      ability(
        "Spider physiology",
        "Enhanced strength, balance, and reflexes make Peter an exceptional acrobat.",
        "heart",
      ),
      ability(
        "Wall crawling",
        "Adheres to surfaces to reach places most heroes cannot.",
        "target",
      ),
      ability(
        "Spider-sense",
        "An instinctive awareness warns him of approaching danger.",
        "eye",
      ),
      ability(
        "Web engineering",
        "Designs web fluid and shooters for movement, rescue, and restraint.",
        "cpu",
      ),
      ability(
        "Aerial agility",
        "Combines web lines and fast reactions to navigate New York’s skyline.",
        "wind",
      ),
    ],
    equipment: [
      {
        name: "Web-shooters",
        description: "Wrist devices fire Peter’s own synthetic web fluid.",
      },
      {
        name: "Stark suit",
        description:
          "Upgraded lenses, web modes, and onboard assistance support his neighborhood work.",
      },
      {
        name: "Iron Spider",
        description:
          "Nanotech armor with mechanical legs and protection for battles beyond Earth.",
      },
    ],
    story: [
      {
        year: "2016",
        title: "A call from Stark",
        film: "Captain America: Civil War",
        description:
          "Tony recruits the young Queens hero for the confrontation in Germany.",
      },
      {
        year: "2017",
        title: "The neighborhood",
        film: "Spider-Man: Homecoming",
        description:
          "Peter stops the Vulture and chooses to keep helping people close to home.",
      },
      {
        year: "2018",
        title: "An Avenger",
        film: "Avengers: Infinity War",
        description:
          "Following the fight into space, he helps confront Thanos on Titan before the Snap.",
      },
      {
        year: "2019",
        title: "Back in the fight",
        film: "Avengers: Endgame",
        description:
          "Restored by Banner, Peter returns through a portal and helps protect the Gauntlet.",
      },
    ],
  },
  {
    id: "doctor-strange",
    name: "Doctor Strange",
    alias: "Stephen Strange",
    role: "Master of the mystic arts",
    quote: "Dormammu, I’ve come to bargain.",
    description:
      "A surgeon whose search for healing opens the doors of reality. Stephen Strange exchanges certainty for possibility and becomes a guardian against threats beyond ordinary understanding.",
    color: "#e9a05b",
    image: image("doctor-strange"),
    category: "mystic",
    affiliation: "Masters of the Mystic Arts · Avengers ally",
    status: "Alive · Restored after the Snap",
    statusAsOf: endgame,
    firstAppearance: "Doctor Strange · 2016",
    actor: "Benedict Cumberbatch",
    abilities: [
      ability(
        "Mystic spellcraft",
        "Conjures intricate bindings, shields, and energy constructs.",
        "sparkles",
      ),
      ability(
        "Portal creation",
        "Uses a Sling Ring to connect distant places with precision.",
        "orbit",
      ),
      ability(
        "Astral projection",
        "Separates his astral form from his physical body.",
        "eye",
      ),
      ability(
        "Dimensional knowledge",
        "Studies other realms and the barriers that protect Earth.",
        "brain",
      ),
      ability(
        "Time manipulation",
        "Previously used the Time Stone for loops and possible futures; no longer possesses it after Endgame.",
        "zap",
      ),
    ],
    equipment: [
      {
        name: "Cloak of Levitation",
        description:
          "A sentient relic that grants flight, defends Strange, and has opinions of its own.",
      },
      {
        name: "Sling Ring",
        description:
          "Focuses the portal magic used to travel between locations.",
      },
      {
        name: "Eye of Agamotto",
        description:
          "Former housing of the Time Stone, surrendered to Thanos on Titan.",
      },
    ],
    story: [
      {
        year: "2016",
        title: "A different kind of cure",
        film: "Doctor Strange",
        description:
          "A devastating accident sends Stephen to Kamar-Taj and the Ancient One.",
      },
      {
        year: "2016",
        title: "The bargain",
        film: "Doctor Strange",
        description:
          "He traps Dormammu in a time loop until the Dark Dimension withdraws.",
      },
      {
        year: "2017",
        title: "Sanctum guardian",
        film: "Thor: Ragnarok",
        description:
          "Strange guides Thor and Loki to Odin while keeping watch over mystical threats.",
      },
      {
        year: "2018",
        title: "One possibility",
        film: "Avengers: Infinity War",
        description:
          "On Titan he examines possible futures and ultimately gives Thanos the Time Stone.",
      },
      {
        year: "2019",
        title: "Open the portals",
        film: "Avengers: Endgame",
        description:
          "The restored sorcerer helps bring the universe’s defenders into the final battle.",
      },
    ],
  },
  {
    id: "black-panther",
    name: "Black Panther",
    alias: "T’Challa",
    role: "The king of Wakanda",
    quote: "Wakanda forever!",
    description:
      "A protector carrying the hopes of a nation. T’Challa combines ancient tradition with Wakanda’s extraordinary technology to define the kind of king—and hero—he will become.",
    color: "#ac83f3",
    image: image("black-panther"),
    category: "enhanced",
    affiliation: "Wakanda · Avengers ally",
    status: "Alive · King of Wakanda",
    statusAsOf: endgame,
    firstAppearance: "Captain America: Civil War · 2016",
    actor: "Chadwick Boseman",
    abilities: [
      ability(
        "Enhanced physiology",
        "The Heart-Shaped Herb grants strength, stamina, reflexes, and heightened senses.",
        "heart",
      ),
      ability(
        "Warrior training",
        "A lifetime of disciplined combat prepares him to defend Wakanda.",
        "swords",
      ),
      ability(
        "Kinetic redirection",
        "His nanotech suit stores incoming impacts and releases their energy.",
        "zap",
      ),
      ability(
        "Heightened senses",
        "Perceives danger and tracks opponents with sharpened awareness.",
        "eye",
      ),
      ability(
        "Leadership",
        "Balances a king’s responsibility with a protector’s direct action.",
        "brain",
      ),
    ],
    equipment: [
      {
        name: "Vibranium habit",
        description:
          "Shuri’s nanotech armor absorbs impacts and deploys from a compact necklace.",
      },
      {
        name: "Vibranium claws",
        description:
          "Retractable claws provide precision striking and climbing capability.",
      },
      {
        name: "Kimoyo beads",
        description:
          "Wakandan tools for communication, information access, and specialized assistance.",
      },
    ],
    story: [
      {
        year: "2016",
        title: "A prince’s grief",
        film: "Captain America: Civil War",
        description:
          "T’Challa pursues his father’s killer, then chooses justice over vengeance.",
      },
      {
        year: "2018",
        title: "A king’s responsibility",
        film: "Black Panther",
        description:
          "He confronts Killmonger and opens Wakanda’s knowledge to the wider world.",
      },
      {
        year: "2018",
        title: "Wakanda stands",
        film: "Avengers: Infinity War",
        description:
          "He offers Vision sanctuary and leads his people against the invading army.",
      },
      {
        year: "2019",
        title: "The king returns",
        film: "Avengers: Endgame",
        description:
          "Restored after the Snap, T’Challa leads Wakandan forces into the final battle.",
      },
    ],
  },
  {
    id: "scarlet-witch",
    name: "Scarlet Witch",
    alias: "Wanda Maximoff",
    role: "The chaos within",
    quote: "You took everything from me.",
    description:
      "Grief and extraordinary power reshape Wanda Maximoff’s world. From Sokovia to Westview, her journey reveals a force she must learn to understand: the Scarlet Witch.",
    color: "#f3426c",
    image: image("scarlet-witch"),
    category: "mystic",
    affiliation: "Avengers",
    status: "Alive · In isolation after Westview",
    statusAsOf: "WandaVision (2021)",
    firstMajorAppearance: "Avengers: Age of Ultron · 2015",
    firstAppearance: "Captain America: The Winter Soldier · 2014 credit scene",
    actor: "Elizabeth Olsen",
    abilities: [
      ability(
        "Chaos magic",
        "An innate magical force revealed in WandaVision as the source of her extraordinary creation abilities.",
        "sparkles",
      ),
      ability(
        "Telekinesis",
        "Moves, restrains, and dismantles objects and opponents without physical contact.",
        "orbit",
      ),
      ability(
        "Reality manipulation",
        "The Westview Hex rewrites matter and its surroundings to fit an imagined world.",
        "flame",
      ),
      ability(
        "Mind influence",
        "Projects visions and affects perception, memory, and behavior.",
        "brain",
      ),
      ability(
        "Energy projection",
        "Channels scarlet energy into powerful attacks and protective barriers.",
        "zap",
      ),
      ability(
        "Levitation",
        "Uses her power to lift herself and move above the battlefield.",
        "wind",
      ),
    ],
    equipment: [
      {
        name: "Scarlet Witch regalia",
        description:
          "A crown and costume manifested as Wanda embraces her identity; her power is innate.",
      },
      {
        name: "The Darkhold",
        description:
          "A dangerous spellbook taken from Agatha, which Wanda studies after leaving Westview.",
      },
    ],
    story: [
      {
        year: "2014",
        title: "The experiment",
        film: "Captain America: The Winter Soldier",
        description:
          "A credit scene reveals Wanda and Pietro in HYDRA’s custody.",
      },
      {
        year: "2015",
        title: "Choosing the Avengers",
        film: "Avengers: Age of Ultron",
        description:
          "After discovering Ultron’s plan, Wanda changes sides to protect Sokovia.",
      },
      {
        year: "2016",
        title: "Power and consequence",
        film: "Captain America: Civil War",
        description:
          "A rescue in Lagos ends in tragedy and places her at the center of the Accords debate.",
      },
      {
        year: "2018",
        title: "An impossible sacrifice",
        film: "Avengers: Infinity War",
        description:
          "She destroys the Mind Stone to stop Thanos, only for him to reverse the moment.",
      },
      {
        year: "2019",
        title: "Facing Thanos",
        film: "Avengers: Endgame",
        description:
          "Returning from the Snap, Wanda confronts the enemy who took Vision from her.",
      },
      {
        year: "2021",
        title: "The Westview Hex",
        film: "WandaVision",
        description:
          "Grief creates a changing sitcom reality, trapping a town inside Wanda’s imagined family life.",
      },
      {
        year: "2021",
        title: "The Scarlet Witch",
        film: "WandaVision",
        description:
          "Wanda defeats Agatha, releases Westview, and begins studying her magic in isolation.",
      },
    ],
  },
  {
    id: "vision",
    name: "Vision",
    alias: "Vision",
    role: "A mind beyond the machine",
    quote: "I am on the side of life.",
    description:
      "Born from conflicting visions of the future, he chooses his own purpose. Vision brings a synthetic body, an extraordinary mind, and a quiet faith in humanity to the Avengers.",
    color: "#e6bf6d",
    image: image("vision"),
    category: "tech",
    affiliation: "Avengers",
    status: "Destroyed by Thanos in Infinity War",
    statusAsOf: endgame,
    firstAppearance: "Avengers: Age of Ultron · 2015",
    actor: "Paul Bettany",
    abilities: [
      ability(
        "Density control",
        "Alters his density to pass through solid matter or become more resistant.",
        "orbit",
      ),
      ability(
        "Energy beam",
        "Channels energy from the Mind Stone embedded in his forehead.",
        "zap",
      ),
      ability(
        "Flight",
        "Moves freely through the air without mechanical propulsion.",
        "wind",
      ),
      ability(
        "Synthetic intellect",
        "Processes information rapidly while developing his own judgment and empathy.",
        "brain",
      ),
      ability(
        "Enhanced strength",
        "A vibranium-infused synthetic body provides formidable physical capability.",
        "shield",
      ),
    ],
    equipment: [
      {
        name: "Vibranium synthezoid body",
        description:
          "Living tissue and vibranium form the body originally prepared by Ultron.",
      },
      {
        name: "Mind Stone",
        description:
          "An Infinity Stone integral to his creation; removed by Thanos in Wakanda.",
      },
      {
        name: "JARVIS-derived systems",
        description:
          "Stark’s AI contributes to Vision’s origins, though Vision is a distinct being.",
      },
    ],
    story: [
      {
        year: "2015",
        title: "A new consciousness",
        film: "Avengers: Age of Ultron",
        description:
          "JARVIS, the Mind Stone, and a synthetic body combine to create Vision.",
      },
      {
        year: "2015",
        title: "The side of life",
        film: "Avengers: Age of Ultron",
        description:
          "He helps defend Sokovia and confronts the final remnant of Ultron.",
      },
      {
        year: "2016",
        title: "Beyond calculation",
        film: "Captain America: Civil War",
        description:
          "Supporting the Accords tests his judgment and growing relationship with Wanda.",
      },
      {
        year: "2018",
        title: "The price of a Stone",
        film: "Avengers: Infinity War",
        description:
          "Vision seeks to prevent Thanos’ victory, but the removal of the Mind Stone destroys him.",
      },
    ],
  },
  {
    id: "ant-man",
    name: "Ant-Man",
    alias: "Scott Lang",
    role: "Small hero. Giant heart.",
    quote: "Does anybody have any orange slices?",
    description:
      "A second-chance dad with a talent for getting into impossible places. Scott Lang discovers that the smallest perspective can reveal a way to change everything.",
    color: "#e97062",
    image: image("ant-man"),
    category: "tech",
    affiliation: "Avengers · Team Pym",
    status: "Alive · Reunited with Cassie and Hope",
    statusAsOf: endgame,
    firstAppearance: "Ant-Man · 2015",
    actor: "Paul Rudd",
    abilities: [
      ability(
        "Size manipulation",
        "Pym Particle technology lets Scott shrink to tiny scale or grow into Giant-Man.",
        "orbit",
      ),
      ability(
        "Ant communication",
        "A specialized helmet coordinates ant colonies for transport and teamwork.",
        "cpu",
      ),
      ability(
        "Infiltration",
        "A tiny profile and a thief’s ingenuity open otherwise unreachable spaces.",
        "eye",
      ),
      ability(
        "Quantum experience",
        "Surviving the Quantum Realm gives Scott the idea that makes the time heist possible.",
        "sparkles",
      ),
      ability(
        "Improvised combat",
        "Changes scale mid-fight to surprise opponents and protect his allies.",
        "swords",
      ),
    ],
    equipment: [
      {
        name: "Ant-Man suit",
        description:
          "Hank Pym’s technology safely manages Scott’s size-changing missions.",
      },
      {
        name: "Pym Particles",
        description:
          "A limited resource behind shrinking, growth, and the Avengers’ time-heist journeys.",
      },
      {
        name: "Control helmet",
        description:
          "Provides life support, communication, and the link to Scott’s ant allies.",
      },
    ],
    story: [
      {
        year: "2015",
        title: "A second chance",
        film: "Ant-Man",
        description:
          "Hank and Hope train Scott to stop the Yellowjacket technology from being sold.",
      },
      {
        year: "2016",
        title: "Think big",
        film: "Captain America: Civil War",
        description:
          "An invitation from Falcon leads to a Giant-Man debut at the airport battle.",
      },
      {
        year: "2018",
        title: "Lost in the Quantum Realm",
        film: "Ant-Man and the Wasp",
        description:
          "After helping rescue Janet, Scott becomes trapped when the Snap takes his team.",
      },
      {
        year: "2019",
        title: "The smallest chance",
        film: "Avengers: Endgame",
        description:
          "Scott returns with an idea for time travel and helps turn it into the Avengers’ last hope.",
      },
    ],
  },
  {
    id: "captain-marvel",
    name: "Captain Marvel",
    alias: "Carol Danvers",
    role: "Higher. Further. Faster.",
    quote: "I have nothing to prove to you.",
    description:
      "A pilot who refuses the limits imposed on her. Carol Danvers reclaims her identity and takes her luminous power across the stars, answering calls that reach far beyond Earth.",
    color: "#ffc16b",
    image: image("captain-marvel"),
    category: "cosmic",
    affiliation: "Avengers ally · Former Starforce",
    status: "Alive · Protecting worlds beyond Earth",
    statusAsOf: endgame,
    firstAppearance: "Captain Marvel · 2019",
    actor: "Brie Larson",
    abilities: [
      ability(
        "Photon blasts",
        "Projects concentrated energy through her hands in powerful ranged attacks.",
        "zap",
      ),
      ability(
        "Cosmic flight",
        "Flies through atmosphere and across space under her own power.",
        "wind",
      ),
      ability(
        "Binary state",
        "Unleashes her energy in a luminous form after overcoming the Kree’s restraint.",
        "flame",
      ),
      ability(
        "Enhanced strength",
        "Her altered physiology allows her to confront ships and formidable opponents.",
        "swords",
      ),
      ability(
        "Durability",
        "Survives extreme impacts and the harsh conditions of space.",
        "shield",
      ),
      ability(
        "Expert pilot",
        "Air Force training gives Carol practiced instincts in the cockpit and in the air.",
        "target",
      ),
    ],
    equipment: [
      {
        name: "Captain Marvel suit",
        description:
          "An adaptable Kree uniform recolored into Carol’s own red, blue, and gold.",
      },
      {
        name: "Flight helmet",
        description:
          "A retractable part of her suit used on missions through hostile environments.",
      },
      {
        name: "Emergency pager",
        description:
          "The upgraded communicator she leaves with Fury to reach her across the stars.",
      },
    ],
    story: [
      {
        year: "2019",
        title: "The pilot",
        film: "Captain Marvel",
        description:
          "Carol’s recovered memories reveal an Air Force life stolen by the Kree.",
      },
      {
        year: "2019",
        title: "Breaking the limit",
        film: "Captain Marvel",
        description:
          "She rejects the Supreme Intelligence’s control and releases her full power.",
      },
      {
        year: "2019",
        title: "A promise beyond Earth",
        film: "Captain Marvel",
        description:
          "Carol helps the Skrull refugees and leaves Fury a way to call for help.",
      },
      {
        year: "2019",
        title: "Answering the signal",
        film: "Avengers: Endgame",
        description:
          "She rescues Tony and Nebula, then helps the remaining Avengers confront Thanos.",
      },
      {
        year: "2019",
        title: "Through the fire",
        film: "Avengers: Endgame",
        description:
          "Carol returns for the final battle and tears through Thanos’ warship.",
      },
    ],
  },
  {
    id: "falcon",
    name: "Falcon",
    alias: "Sam Wilson",
    role: "A hero without hesitation",
    quote: "On your left.",
    description:
      "A veteran who understands what it means to come home. Sam Wilson brings rescue instincts, a trusted wingpack, and unwavering compassion to every mission beside Steve Rogers.",
    color: "#bf6d64",
    image: image("falcon"),
    category: "tactical",
    affiliation: "Avengers · Former U.S. Air Force",
    status: "Alive · Entrusted with Steve’s shield",
    statusAsOf: endgame,
    firstAppearance: "Captain America: The Winter Soldier · 2014",
    actor: "Anthony Mackie",
    abilities: [
      ability(
        "Wingpack flight",
        "Pilots the EXO-7 system with tight turns, fast climbs, and controlled dives.",
        "wind",
      ),
      ability(
        "Aerial rescue",
        "Pararescue experience makes getting people out as important as entering the fight.",
        "heart",
      ),
      ability(
        "Reconnaissance",
        "Uses an aerial perspective and Redwing to identify threats and routes.",
        "eye",
      ),
      ability(
        "Tactical combat",
        "Combines military training, mobility, and coordinated teamwork.",
        "target",
      ),
      ability(
        "Protective maneuvering",
        "Uses reinforced wings as mobile cover during close encounters.",
        "shield",
      ),
    ],
    equipment: [
      {
        name: "EXO-7 Falcon",
        description:
          "A powered wingpack that puts a human rescue specialist into superhuman battles.",
      },
      {
        name: "Redwing",
        description:
          "A compact reconnaissance drone that provides support and an extra viewpoint.",
      },
      {
        name: "Captain America’s shield",
        description:
          "Steve entrusts the shield to Sam at Endgame’s close; his next chapter is still ahead.",
      },
    ],
    story: [
      {
        year: "2014",
        title: "A running partner",
        film: "Captain America: The Winter Soldier",
        description:
          "A chance meeting with Steve becomes a partnership against HYDRA.",
      },
      {
        year: "2015",
        title: "An Avenger",
        film: "Avengers: Age of Ultron",
        description:
          "Sam joins the new Avengers roster assembled after Sokovia.",
      },
      {
        year: "2016",
        title: "A loyal wingman",
        film: "Captain America: Civil War",
        description:
          "He stands beside Steve, recruits Scott, and pays for that choice with imprisonment.",
      },
      {
        year: "2018",
        title: "The Wakandan front",
        film: "Avengers: Infinity War",
        description:
          "Sam defends Wakanda from the air before disappearing in the Snap.",
      },
      {
        year: "2019",
        title: "The shield",
        film: "Avengers: Endgame",
        description:
          "He returns for the final battle, then receives Steve’s trust and shield.",
      },
    ],
  },
  {
    id: "winter-soldier",
    name: "Winter Soldier",
    alias: "James “Bucky” Barnes",
    role: "A soldier reclaiming himself",
    quote: "I’m with you to the end of the line.",
    description:
      "A friend lost to war and turned into a weapon. Bucky Barnes fights to reclaim his memories, his choices, and a future beyond the Winter Soldier.",
    color: "#91afba",
    image: image("winter-soldier"),
    category: "enhanced",
    affiliation: "Howling Commandos · Wakanda / Avengers ally",
    status: "Alive · Freed from HYDRA conditioning",
    statusAsOf: endgame,
    firstMajorAppearance: "Captain America: The Winter Soldier · 2014",
    firstAppearance: "Captain America: The First Avenger · 2011",
    actor: "Sebastian Stan",
    abilities: [
      ability(
        "Enhanced strength",
        "HYDRA’s experiments leave Bucky with super-soldier physical capabilities.",
        "heart",
      ),
      ability(
        "Cybernetic combat",
        "An advanced prosthetic arm adds powerful strikes and defensive options.",
        "cpu",
      ),
      ability(
        "Marksmanship",
        "Decades of soldiering produce precise handling of a wide range of weapons.",
        "target",
      ),
      ability(
        "Close-quarters combat",
        "Combines knife work, grappling, and rapid reactions in tight spaces.",
        "swords",
      ),
      ability(
        "Covert fieldcraft",
        "Extensive training gives him stealth, observation, and infiltration skills.",
        "eye",
      ),
    ],
    equipment: [
      {
        name: "Vibranium arm",
        description:
          "Wakandan engineering replaces the original HYDRA prosthesis before Infinity War.",
      },
      {
        name: "Combat rifle",
        description:
          "A field weapon used in Wakanda and during the final battle against Thanos.",
      },
      {
        name: "Tactical equipment",
        description:
          "Protective gear and mission tools informed by a long military history.",
      },
    ],
    story: [
      {
        year: "2011",
        title: "Bucky Barnes",
        film: "Captain America: The First Avenger",
        description:
          "Steve’s childhood friend joins the Howling Commandos and is presumed lost in action.",
      },
      {
        year: "2014",
        title: "The Winter Soldier",
        film: "Captain America: The Winter Soldier",
        description:
          "A masked HYDRA assassin confronts Steve—and begins remembering his former life.",
      },
      {
        year: "2016",
        title: "A choice to heal",
        film: "Captain America: Civil War",
        description:
          "After being framed and reactivated, Bucky seeks refuge and recovery in Wakanda.",
      },
      {
        year: "2018",
        title: "Fighting freely",
        film: "Avengers: Infinity War",
        description:
          "Free from HYDRA’s conditioning, he takes up a new arm to defend his sanctuary.",
      },
      {
        year: "2019",
        title: "A future returned",
        film: "Avengers: Endgame",
        description:
          "Restored from the Snap, Bucky rejoins his friends for the final stand.",
      },
    ],
  },
  {
    id: "war-machine",
    name: "War Machine",
    alias: "James “Rhodey” Rhodes",
    role: "Heavy armor. Steady hands.",
    quote: "Boom! You looking for this?",
    description:
      "A career officer and Tony Stark’s trusted friend. James Rhodes combines advanced armor with a pilot’s discipline, carrying the fight through both duty and personal sacrifice.",
    color: "#adb9cd",
    image: image("war-machine"),
    category: "tech",
    affiliation: "Avengers · U.S. Air Force",
    status: "Alive · Uses assisted mobility after injury",
    statusAsOf: endgame,
    firstMajorAppearance: "Iron Man 2 · 2010",
    firstAppearance: "Iron Man · 2008; War Machine armor · 2010",
    actor: "Don Cheadle · Terrence Howard in 2008",
    abilities: [
      ability(
        "Armored combat",
        "A reinforced powered suit provides strength and battlefield protection.",
        "shield",
      ),
      ability(
        "Heavy weapons",
        "Suit-mounted systems deliver sustained support against large threats.",
        "target",
      ),
      ability(
        "Flight",
        "Military piloting experience informs controlled, tactical aerial movement.",
        "wind",
      ),
      ability(
        "Mission command",
        "Balances rules of engagement with the judgment a crisis demands.",
        "brain",
      ),
      ability(
        "Repulsor systems",
        "Uses directed energy for propulsion and close-range engagement.",
        "zap",
      ),
    ],
    equipment: [
      {
        name: "War Machine armor",
        description:
          "A Stark-derived platform adapted for Rhodes’ combat and support roles.",
      },
      {
        name: "Shoulder cannon",
        description:
          "A signature mounted weapon that tracks targets independently of his hands.",
      },
      {
        name: "Leg supports",
        description:
          "Stark technology assists Rhodey’s mobility after the injury sustained in Civil War.",
      },
    ],
    story: [
      {
        year: "2008",
        title: "The friend on the ground",
        film: "Iron Man",
        description:
          "Rhodey searches for Tony and becomes one of the first to learn about his armor.",
      },
      {
        year: "2010",
        title: "War Machine",
        film: "Iron Man 2",
        description:
          "He takes the Mark II and fights beside Tony against Vanko’s drones.",
      },
      {
        year: "2013",
        title: "Iron Patriot",
        film: "Iron Man 3",
        description:
          "A rebranded suit draws him into the conspiracy surrounding the Mandarin.",
      },
      {
        year: "2016",
        title: "The fall",
        film: "Captain America: Civil War",
        description:
          "An accidental hit during the airport battle leaves him with a spinal injury.",
      },
      {
        year: "2018",
        title: "Duty to the world",
        film: "Avengers: Infinity War",
        description:
          "Rhodey reunites with the fugitive Avengers and helps defend Wakanda.",
      },
      {
        year: "2019",
        title: "One last mission",
        film: "Avengers: Endgame",
        description:
          "He joins the time heist and final battle before saying goodbye to his oldest friend.",
      },
    ],
  },
  {
    id: "loki",
    name: "Loki",
    alias: "Loki Laufeyson",
    role: "The god of mischief",
    quote: "Your savior is here!",
    description:
      "A prince of Asgard, born of Jotunheim, and rarely what he seems. Loki’s ambition brings the Avengers together; his bond with Thor keeps pulling him toward a different destiny.",
    color: "#93c77a",
    image: image("loki"),
    category: "mystic",
    affiliation: "Asgard · Occasional ally; former adversary",
    status: "Mainline Loki deceased · 2012 variant escaped",
    statusAsOf: endgame,
    firstAppearance: "Thor · 2011",
    actor: "Tom Hiddleston",
    abilities: [
      ability(
        "Illusion casting",
        "Projects convincing images and duplicates to confuse or conceal.",
        "sparkles",
      ),
      ability(
        "Magical disguise",
        "Changes his appearance to impersonate others and hide in plain sight.",
        "eye",
      ),
      ability(
        "Sorcery",
        "Uses magic learned in Asgard for deception and unexpected tactical advantages.",
        "orbit",
      ),
      ability(
        "Enhanced physiology",
        "His Jotun heritage provides strength and resilience beyond an ordinary human.",
        "shield",
      ),
      ability(
        "Blade combat",
        "Conceals and deploys daggers with speed and practiced precision.",
        "swords",
      ),
      ability(
        "Strategic deception",
        "Reads loyalties and exploits assumptions to stay several moves ahead.",
        "brain",
      ),
    ],
    equipment: [
      {
        name: "Daggers",
        description:
          "Compact blades complement his misdirection and close-combat style.",
      },
      {
        name: "Chitauri scepter",
        description:
          "Formerly carried in The Avengers; its hidden Mind Stone enabled control over others.",
      },
      {
        name: "Tesseract",
        description:
          "The Space Stone’s housing; used by the displaced 2012 Loki to escape during the time heist.",
      },
    ],
    story: [
      {
        year: "2011",
        title: "A fractured identity",
        film: "Thor",
        description:
          "Learning his Jotun origins deepens Loki’s rivalry with Thor and hunger for recognition.",
      },
      {
        year: "2012",
        title: "An army from the stars",
        film: "The Avengers",
        description:
          "His invasion of New York unites the original Avengers against him.",
      },
      {
        year: "2013",
        title: "The false king",
        film: "Thor: The Dark World",
        description:
          "After helping Thor, Loki secretly replaces Odin on Asgard’s throne.",
      },
      {
        year: "2017",
        title: "Brother and ally",
        film: "Thor: Ragnarok",
        description:
          "Loki returns to help evacuate Asgard’s people during Hela’s attack.",
      },
      {
        year: "2018",
        title: "A final deception",
        film: "Avengers: Infinity War",
        description:
          "He attempts to kill Thanos and dies aboard the Asgardian refugee ship.",
      },
      {
        year: "2019",
        title: "A branching escape",
        film: "Avengers: Endgame",
        description:
          "During the time heist, a 2012 version takes the Tesseract and escapes; this does not undo the mainline death.",
      },
    ],
  },
  {
    id: "nick-fury",
    name: "Nick Fury",
    alias: "Nicholas Joseph Fury",
    role: "The architect of the initiative",
    quote: "There was an idea.",
    description:
      "The man who saw a larger world before the world was ready. Nick Fury brings remarkable people together and bets on their ability to become something greater than themselves.",
    color: "#739fb9",
    image: image("nick-fury"),
    category: "tactical",
    affiliation: "Former S.H.I.E.L.D. director · Avengers Initiative",
    status: "Alive · Restored after the Snap",
    statusAsOf: endgame,
    firstMajorAppearance: "Iron Man 2 · 2010",
    firstAppearance: "Iron Man · 2008 post-credit scene",
    actor: "Samuel L. Jackson",
    abilities: [
      ability(
        "Strategic leadership",
        "Builds teams and long-term plans around threats others cannot yet see.",
        "brain",
      ),
      ability(
        "Intelligence gathering",
        "Connects agents, hidden information, and global events into an actionable picture.",
        "eye",
      ),
      ability(
        "Covert operations",
        "Uses misdirection and compartmentalization to protect sensitive missions.",
        "shield",
      ),
      ability(
        "Field experience",
        "Combines years of operational judgment with weapons and survival training.",
        "target",
      ),
      ability(
        "Alliance building",
        "Recognizes potential in unlikely people and gives them a common cause.",
        "heart",
      ),
    ],
    equipment: [
      {
        name: "S.H.I.E.L.D. network",
        description:
          "Agents, intelligence systems, and safe houses built through a lifetime of service.",
      },
      {
        name: "Helicarrier",
        description:
          "A mobile command and rescue platform, notably used during New York and Sokovia.",
      },
      {
        name: "Modified pager",
        description:
          "Carol Danvers’ emergency link, activated moments before Fury vanishes in the Snap.",
      },
    ],
    story: [
      {
        year: "2008",
        title: "A larger universe",
        film: "Iron Man",
        description:
          "Fury approaches Tony with the Avengers Initiative after his public revelation.",
      },
      {
        year: "2012",
        title: "The initiative",
        film: "The Avengers",
        description:
          "He brings six very different heroes together to oppose Loki’s invasion.",
      },
      {
        year: "2014",
        title: "Trust under fire",
        film: "Captain America: The Winter Soldier",
        description:
          "Surviving an assassination attempt, he helps expose HYDRA inside S.H.I.E.L.D.",
      },
      {
        year: "2015",
        title: "A familiar rescue",
        film: "Avengers: Age of Ultron",
        description:
          "Fury arrives with a Helicarrier to evacuate civilians from Sokovia.",
      },
      {
        year: "2018",
        title: "The emergency signal",
        film: "Avengers: Infinity War",
        description:
          "As people vanish around him, Fury sends one last message to Captain Marvel.",
      },
      {
        year: "2019",
        title: "The first inspiration",
        film: "Captain Marvel",
        description:
          "A story set in 1995 reveals Carol’s role in inspiring the Avengers Initiative.",
      },
      {
        year: "2019",
        title: "Remembering Stark",
        film: "Avengers: Endgame",
        description:
          "Restored after the Snap, Fury joins the gathering at Tony’s funeral.",
      },
    ],
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
  { value: "18", label: "Heroes & allies" },
  { value: "04", label: "Avengers films" },
  { value: "01", label: "Shared universe" },
];
