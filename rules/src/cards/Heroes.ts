import { HeroDescription } from './HeroDescription';
import { DwarfType } from './DwarfType';

export const Bonfur: HeroDescription = {
  types: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0, 0, 0],
  }
};

export const Aegur: HeroDescription = {
  types: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0, 0],
  },
};

export const Dagda: HeroDescription = {
  types: DwarfType.Hunter,
  grades: {
    [DwarfType.Hunter]: [0, 0, 0],
  }
};

export const Aral: HeroDescription = {
  types: DwarfType.Hunter,
  grades: {
    [DwarfType.Hunter]: [0, 0],
  },
};

export const Kraal: HeroDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [7, 0],
  },
};

export const Tarah: HeroDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [14],
  },
};

export const Lokdur: HeroDescription = {
  types: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [3],
  },
};

export const Zoral: HeroDescription = {
  types: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [1, 0, 0],
  },
};

export const Idunn: HeroDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [7],
  },
};

export const Hourya: HeroDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [20],
  },
  minGrades: 5
};

export const Astrid: HeroDescription = {
  types: DwarfType.Neutral,
};

export const DwergYmir: HeroDescription = {
  types: DwarfType.Neutral,
};

export const DwergAesir: HeroDescription = {
  types: DwarfType.Neutral,
};

export const DwergSigmir: HeroDescription = {
  types: DwarfType.Neutral,
};

export const DwergJungir: HeroDescription = {
  types: DwarfType.Neutral,
};

export const DwergBergelmir: HeroDescription = {
  types: DwarfType.Neutral,
};

export const Thrud: HeroDescription = {
  types: DwarfType.Neutral,
  grades: {
    [DwarfType.Blacksmith]: [13],
    [DwarfType.Hunter]: [13],
    [DwarfType.Explorer]: [13],
    [DwarfType.Warrior]: [13],
    [DwarfType.Miner]: [13],
  },
};

export const Ylud: HeroDescription = {
  types: DwarfType.Neutral,
  grades: {
    [DwarfType.Blacksmith]: [0],
    [DwarfType.Hunter]: [0],
    [DwarfType.Explorer]: [11],
    [DwarfType.Warrior]: [7],
    [DwarfType.Miner]: [1],
  },
};

export const Skaa: HeroDescription = {
  types: DwarfType.Neutral,
  grades: {
    [DwarfType.Neutral]: [17],
  },
};

export const Uline: HeroDescription = {
  types: DwarfType.Neutral,
  grades: {
    [DwarfType.Neutral]: [9],
  }
};

export const Grid: HeroDescription = {
  types: DwarfType.Neutral,
  grades: {
    [DwarfType.Neutral]: [7],
  }
};
