import { Hero, HeroType } from './Hero';
import { DwarfType } from './Card';

export const Bonfur: Hero = {
  type: DwarfType.Blacksmith,
  bravery: [0, 0, 0],
};

export const Aegur: Hero = {
  type: DwarfType.Blacksmith,
  bravery: [0, 0],
};

export const Dagda: Hero = {
  type: DwarfType.Hunter,
  bravery: [0, 0, 0],
};

export const Aral: Hero = {
  type: DwarfType.Hunter,
  bravery: [0, 0],
};

export const Kraal: Hero = {
  type: DwarfType.Warrior,
  bravery: [7, 0],
};

export const Tarah: Hero = {
  type: DwarfType.Warrior,
  bravery: [14],
};

export const Lokdur: Hero = {
  type: DwarfType.Miner,
  bravery: [3],
};

export const Zoral: Hero = {
  type: DwarfType.Miner,
  bravery: [1, 0, 0],
};

export const Idunn: Hero = {
  type: DwarfType.Explorer,
  bravery: [7],
};

export const Hourya: Hero = {
  type: DwarfType.Explorer,
  bravery: [20],
};

export const Astrid: Hero = {
  type: HeroType.Neutral,
};

export const DwergYmir: Hero = {
  type: HeroType.Neutral,
};

export const DwergAesir: Hero = {
  type: HeroType.Neutral,
};

export const DwergSigmir: Hero = {
  type: HeroType.Neutral,
};

export const DwergJungir: Hero = {
  type: HeroType.Neutral,
};

export const DwergBergelmir: Hero = {
  type: HeroType.Neutral,
};

export const Thrud: Hero = {
  type: HeroType.Neutral,
  bravery: [13],
};

export const Ylud: Hero = {
  type: HeroType.Neutral,
  // How to manager multiple bravery ?
  // bravery: { [HeroType.Explorer]: [11], [DwardType.Warrior]: [10], [DwardType.Minor]: [10]
};

export const Skaa: Hero = {
  type: HeroType.Neutral,
};

export const Uline: Hero = {
  type: HeroType.Neutral,
};

export const Grid: Hero = {
  type: HeroType.Neutral,
};

export const Heroes: Hero[] = [
  Bonfur,
  Aegur,
  Dagda,
  Aral,
  Kraal,
  Tarah,
  Lokdur,
  Zoral,
  Idunn,
  Hourya,
  Astrid,
  DwergYmir,
  DwergAesir,
  DwergSigmir,
  DwergJungir,
  DwergBergelmir,
  Thrud,
  Ylud,
  Skaa,
  Uline,
  Grid,
];
