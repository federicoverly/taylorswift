export interface Taylor {
  "The Tortured Poets Department": { [key: string]: songInterface[] };
  midnights: { [key: string]: songInterface[] };
  evermore: { [key: string]: songInterface[] };
  folklore: { [key: string]: songInterface[] };
  Lover: { [key: string]: songInterface[] };
  Reputation: { [key: string]: songInterface[] };
  "1989 (Taylor's Version)": { [key: string]: songInterface[] };
  "Red (Taylor's Version)": { [key: string]: songInterface[] };
  "Speak Now (Taylor's Version)": { [key: string]: songInterface[] };
  "Fearless (Taylor's Version)": { [key: string]: songInterface[] };
  "Taylor Swift": { [key: string]: songInterface[] };
  "Unspecified Album": { [key: string]: songInterface[] };
  Unreleased: { [key: string]: songInterface[] };
  "Singing Credits Only": SingingCreditsOnly;
  "Talkshow Parody": TalkshowParody;
  "EP: Sounds Of The Season: The Taylor Swift Holiday Collection": EPSoundsOfTheSeasonTheTaylorSwiftHolidayCollection;
}

export interface Song {
  [key: string]: songInterface[];
}

export interface songInterface {
  section: string;
  num: number;
  prev: string;
  this: string;
  next: string;
}

export interface EPSoundsOfTheSeasonTheTaylorSwiftHolidayCollection {
  "Last Christmas": songInterface[];
  "Christmases When You Were Mine": songInterface[];
  "Santa Baby": songInterface[];
  "Silent Night": songInterface[];
  "Christmas Must Be Something More": songInterface[];
  "White Christmas": songInterface[];
}

export interface SingingCreditsOnly {
  "Gasoline (Remix)": songInterface[];
  Macavity: songInterface[];
}

export interface TalkshowParody {
  "All Because Of Ellen": songInterface[];
  "Monologue Song (La La La)": songInterface[];
  "Thug Story": songInterface[];
}
