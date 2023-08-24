import { HeroDescription } from './HeroDescription';
import { DwarfType } from './DwarfDescription';
import { EffectType } from '../effects/EffectType';

export const Bonfur: HeroDescription = {
  type: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0, 0, 0],
  },
  effects: [
    {
      type: EffectType.DISCARD_CARD,
      count: 1,
    },
  ],
};

export const Aegur: HeroDescription = {
  type: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0, 0],
  },
};

export const Dagda: HeroDescription = {
  type: DwarfType.Hunter,
  grades: {
    [DwarfType.Hunter]: [0, 0, 0],
  },
  effects: [
    {
      type: EffectType.DISCARD_CARD,
      count: 2,
    },
  ],
};

export const Aral: HeroDescription = {
  type: DwarfType.Hunter,
  grades: {
    [DwarfType.Hunter]: [0, 0],
  },
};

export const Kraal: HeroDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [7, 0],
  },
};

export const Tarah: HeroDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [14],
  },
};

export const Lokdur: HeroDescription = {
  type: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [3],
  },
};

export const Zoral: HeroDescription = {
  type: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [1, 0, 0],
  },
};

export const Idunn: HeroDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [7],
  },
};

export const Hourya: HeroDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [20],
  },
  minGrades: 5
};

export const Astrid: HeroDescription = {
  type: DwarfType.Neutral,
};

export const DwergYmir: HeroDescription = {
  type: DwarfType.Neutral,
};

export const DwergAesir: HeroDescription = {
  type: DwarfType.Neutral,
};

export const DwergSigmir: HeroDescription = {
  type: DwarfType.Neutral,
};

export const DwergJungir: HeroDescription = {
  type: DwarfType.Neutral,
};

export const DwergBergelmir: HeroDescription = {
  type: DwarfType.Neutral,
};

export const Thrud: HeroDescription = {
  type: DwarfType.Neutral,
  grades: {
    [DwarfType.Blacksmith]: [13],
    [DwarfType.Hunter]: [13],
    [DwarfType.Explorer]: [13],
    [DwarfType.Warrior]: [13],
    [DwarfType.Miner]: [13],
  },
};

export const Ylud: HeroDescription = {
  type: DwarfType.Neutral,
  grades: {
    [DwarfType.Blacksmith]: [0],
    [DwarfType.Hunter]: [0],
    [DwarfType.Explorer]: [11],
    [DwarfType.Warrior]: [7],
    [DwarfType.Miner]: [1],
  },
};

export const Skaa: HeroDescription = {
  type: DwarfType.Neutral,
  grades: {
    [DwarfType.Neutral]: [17],
  },
};

export const Uline: HeroDescription = {
  type: DwarfType.Neutral,
  grades: {
    [DwarfType.Neutral]: [9],
  },
  effects: [
    {
      type: EffectType.ULINE,
    },
  ],
};

export const Grid: HeroDescription = {
  type: DwarfType.Neutral,
  grades: {
    [DwarfType.Neutral]: [7],
  },
  effects: [
    {
      type: EffectType.TRANSFORM_COIN,
      additionalValue: 7,
    },
  ],
};

export const Heroes: HeroDescription[] = [
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
