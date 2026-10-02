export const teams = [
  {
    id: "original",
    name: "Original Avengers",
    era: "BATTLE OF NEW YORK · 2012",
    title: "THE FIRST SIX.",
    description:
      "A billionaire. A soldier. A god. A scientist. Two master assassins. An unlikely alliance becomes Earth’s first line of defense.",
    members: [
      "iron-man",
      "captain-america",
      "thor",
      "hulk",
      "black-widow",
      "hawkeye",
    ],
  },
  {
    id: "new",
    name: "New Avengers",
    era: "AFTER SOKOVIA · 2015",
    title: "A NEW FORMATION.",
    description:
      "Steve and Natasha train a new team at the Avengers compound: Sam, Rhodey, Wanda and Vision. This is the lineup at the close of Age of Ultron.",
    members: [
      "captain-america",
      "black-widow",
      "falcon",
      "war-machine",
      "scarlet-witch",
      "vision",
    ],
  },
  {
    id: "endgame",
    name: "Endgame Allies",
    era: "THE FINAL STAND · 2019",
    title: "EVERYONE. TOGETHER.",
    description:
      "Heroes from across Earth and beyond stand beside the Avengers. A selection of their allies in the final battle—not a formal team roster.",
    members: [
      "spider-man",
      "doctor-strange",
      "black-panther",
      "ant-man",
      "captain-marvel",
      "winter-soldier",
    ],
  },
];
export type ConnectionKind =
  "Team" | "Mentor" | "Family" | "Friendship" | "Conflict" | "Alliance";
export const connectionColors: Record<ConnectionKind, string> = {
  Team: "#779dcb",
  Mentor: "#f6c86c",
  Family: "#b292ff",
  Friendship: "#60d4c1",
  Conflict: "#f46374",
  Alliance: "#d7dbe6",
};
export interface Connection {
  a: string;
  b: string;
  kind: ConnectionKind;
  story: string;
}
export const connections: Connection[] = [
  {
    a: "iron-man",
    b: "captain-america",
    kind: "Conflict",
    story:
      "The Sokovia Accords divide them in Civil War; Endgame brings a hard-won reconciliation.",
  },
  {
    a: "iron-man",
    b: "hulk",
    kind: "Friendship",
    story:
      "Tony and Bruce share a scientific curiosity, working together on Ultron and the time heist.",
  },
  {
    a: "iron-man",
    b: "spider-man",
    kind: "Mentor",
    story:
      "Tony recruits Peter, builds his suits and challenges him to become a responsible hero.",
  },
  {
    a: "iron-man",
    b: "war-machine",
    kind: "Friendship",
    story:
      "Rhodey is Tony’s longtime friend and a trusted partner inside and outside the armor.",
  },
  {
    a: "iron-man",
    b: "vision",
    kind: "Alliance",
    story:
      "Tony helps give Vision life by integrating J.A.R.V.I.S. with the synthetic body.",
  },
  {
    a: "iron-man",
    b: "thor",
    kind: "Team",
    story:
      "Founding Avengers who unite in New York and fight together against Thanos.",
  },
  {
    a: "captain-america",
    b: "winter-soldier",
    kind: "Friendship",
    story:
      "A friendship from Brooklyn survives war, brainwashing and decades apart.",
  },
  {
    a: "captain-america",
    b: "falcon",
    kind: "Mentor",
    story:
      "Sam becomes Steve’s trusted partner and ultimately receives his shield.",
  },
  {
    a: "captain-america",
    b: "black-widow",
    kind: "Friendship",
    story:
      "Natasha and Steve learn to trust one another while exposing HYDRA inside S.H.I.E.L.D.",
  },
  {
    a: "captain-america",
    b: "thor",
    kind: "Team",
    story:
      "They defend Earth together; Steve proves worthy of Mjolnir in Endgame.",
  },
  {
    a: "black-widow",
    b: "hawkeye",
    kind: "Friendship",
    story:
      "Clint gives Natasha a second chance. Their loyalty leads them together to Vormir.",
  },
  {
    a: "black-widow",
    b: "hulk",
    kind: "Alliance",
    story:
      "Natasha helps Bruce regain control during the Avengers’ missions in Age of Ultron.",
  },
  {
    a: "thor",
    b: "loki",
    kind: "Family",
    story: "Adoptive brothers whose rivalry repeatedly gives way to loyalty.",
  },
  {
    a: "thor",
    b: "hulk",
    kind: "Friendship",
    story:
      "The former Avengers reunite on Sakaar and fight together to save Asgard’s people.",
  },
  {
    a: "scarlet-witch",
    b: "vision",
    kind: "Family",
    story:
      "Wanda and Vision fall in love; WandaVision explores the family Wanda creates in Westview.",
  },
  {
    a: "scarlet-witch",
    b: "hawkeye",
    kind: "Mentor",
    story:
      "Clint encourages Wanda to step into the fight as an Avenger during the battle of Sokovia.",
  },
  {
    a: "doctor-strange",
    b: "spider-man",
    kind: "Alliance",
    story: "They fight together on Titan against Thanos during Infinity War.",
  },
  {
    a: "doctor-strange",
    b: "iron-man",
    kind: "Alliance",
    story:
      "Different approaches to protecting Earth meet aboard Ebony Maw’s ship and on Titan.",
  },
  {
    a: "black-panther",
    b: "winter-soldier",
    kind: "Alliance",
    story:
      "T’Challa offers Bucky sanctuary in Wakanda after learning the truth about his father’s death.",
  },
  {
    a: "black-panther",
    b: "captain-america",
    kind: "Alliance",
    story:
      "Wakanda shelters Steve’s allies and becomes the frontline against Thanos’s army.",
  },
  {
    a: "ant-man",
    b: "captain-america",
    kind: "Team",
    story:
      "Scott joins Steve in Civil War and later makes the Avengers’ time heist possible.",
  },
  {
    a: "nick-fury",
    b: "captain-marvel",
    kind: "Friendship",
    story:
      "Their 1995 alliance inspires Fury’s vision of extraordinary protectors.",
  },
  {
    a: "nick-fury",
    b: "iron-man",
    kind: "Team",
    story: "Fury introduces Tony to the Avengers Initiative.",
  },
  {
    a: "nick-fury",
    b: "black-widow",
    kind: "Team",
    story: "Natasha is one of Fury’s most trusted S.H.I.E.L.D. operatives.",
  },
  {
    a: "loki",
    b: "hawkeye",
    kind: "Conflict",
    story:
      "Loki uses the scepter to control Clint before the Battle of New York.",
  },
];
