import { HeroDescription } from './HeroDescription';
import { DwarfType } from './DwarfDescription';
import { Card } from "../material/Card";
import { RuleId } from "../rules/RuleId";

export const Bonfur: HeroDescription = {
  type: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0, 0, 0],
  }
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
  }
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
  }
};

export const Grid: HeroDescription = {
  type: DwarfType.Neutral,
  grades: {
    [DwarfType.Neutral]: [7],
  }
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

export const HeroesEffects: Partial<Record<Card, RuleId>> = {
  [RuleId.Grid]: RuleId.Grid,
  [RuleId.Uline]: RuleId.Uline,
  [RuleId.Dagda]: RuleId.Dagda,
  [RuleId.Bonfur]: RuleId.Bonfur
}
