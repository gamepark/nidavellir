import { getEnumValues } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'
import { DwarfDescription } from './DwarfDescription'
import { DwarfType } from './DwarfType'
import { HeroDescription } from './HeroDescription'
import {
  Aegur,
  Aral,
  Astrid,
  Bonfur,
  Dagda,
  DwergAesir,
  DwergBergelmir,
  DwergJungir,
  DwergSigmir,
  DwergYmir,
  Grid,
  Hourya,
  Idunn,
  Kraal,
  Lokdur,
  Skaa,
  Tarah,
  Thrud,
  Uline,
  Ylud,
  Zoral
} from './Heroes'
import { RoyalOfferingDescription } from './RoyalOfferingDescription'

export const WarriorGrade3: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [3],
  },
};
export const WarriorGrade4: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [4],
  },
};

export const WarriorGrade5: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [5],
  },
};

export const WarriorGrade6: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [6],
  },
};

export const WarriorGrade7: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [7],
  },
};

export const WarriorGrade8: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [8],
  },
};

export const WarriorGrade9: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [9],
  },
};

export const WarriorGrade10: DwarfDescription = {
  types: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [10],
  },
};


export const Hunter: DwarfDescription = {
  types: DwarfType.Hunter,
  grades: {
    [DwarfType.Hunter]: [0],
  },
};

export const MinerGrade0: DwarfDescription = {
  types: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [0],
  },
};
export const MinerGrade1: DwarfDescription = {
  types: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [1],
  },
};

export const MinerGrade2: DwarfDescription = {
  types: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [2],
  },
};


export const Blacksmith: DwarfDescription = {
  types: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0],
  },
};

/**
 * Explorer1, // Explorer 5
 * Explorer2, // Explorer 5
 * Explorer3, // Explorer 6
 * Explorer4, // Explorer 6
 * Explorer5, // Explorer 7
 * Explorer6, // Explorer 7
 * Explorer7, // Explorer 8
 * Explorer8, // Explorer 8
 * Explorer9, // Explorer 9
 * Explorer10, // Explorer 9
 * Explorer11, // Explorer 10
 * Explorer12, // Explorer 10
 * Explorer13, // Explorer 11
 * Explorer14, // Explorer 11
 * Explorer15, // Explorer 12
 * Explorer16, // Explorer 12
 */

export const ExplorerGrade5: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [5],
  },
};

export const ExplorerGrade6: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [6],
  },
};

export const ExplorerGrade7: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [7],
  },
};

export const ExplorerGrade8: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [8],
  },
};

export const ExplorerGrade9: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [9],
  },
};

export const ExplorerGrade10: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [10],
  },
};

export const ExplorerGrade11: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [11],
  },
};

export const ExplorerGrade12: DwarfDescription = {
  types: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [12],
  },
};

export const RoyalOffering3: RoyalOfferingDescription = {
  bonus: 3
};

export const RoyalOffering5: RoyalOfferingDescription = {
  bonus: 5
};

export const BlacksmithDwarfKingsGreatArmorer: DwarfDescription = {
  types: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0, 0],
  },
};


export enum CardDeck {
  Age1 = 1,
  Age2,
  Hero,
  Distinction
}

export enum Card {
  WarriorGrade3_1 = 1,
  WarriorGrade3_2,
  WarriorGrade4_1,
  WarriorGrade4_2,
  WarriorGrade5_1,
  WarriorGrade5_2,
  WarriorGrade6_1,
  WarriorGrade6_2,
  WarriorGrade7_1,
  WarriorGrade7_2,
  WarriorGrade8_1,
  WarriorGrade8_2,
  WarriorGrade9_1,
  WarriorGrade9_2,
  WarriorGrade10_1,
  WarriorGrade10_2,

  Hunter1,
  Hunter2,

  MinerGrade0_1,
  MinerGrade0_2,
  MinerGrade1_1,
  MinerGrade1_2,
  MinerGrade2_1,
  MinerGrade2_2,

  Blacksmith1,
  Blacksmith2,

  ExplorerGrade5_1,
  ExplorerGrade5_2,
  ExplorerGrade6_1,
  ExplorerGrade6_2,
  ExplorerGrade7_1,
  ExplorerGrade7_2,
  ExplorerGrade8_1,
  ExplorerGrade8_2,
  ExplorerGrade9_1,
  ExplorerGrade9_2,
  ExplorerGrade10_1,
  ExplorerGrade10_2,
  ExplorerGrade11_1,
  ExplorerGrade11_2,
  ExplorerGrade12_1,
  ExplorerGrade12_2,

  RoyalOffering3,
  RoyalOffering5,

  // Special distinction blacksmith
  BlacksmithKingsGreatArmorer = 100,

  // Heroes starts from 500
  Bonfur = 500,
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
}

export const Cards: Record<Card, CardDescription> = {
  [Card.WarriorGrade3_1]: WarriorGrade3,
  [Card.WarriorGrade3_2]: WarriorGrade3,
  [Card.WarriorGrade4_1]: WarriorGrade4,
  [Card.WarriorGrade4_2]: WarriorGrade4,
  [Card.WarriorGrade5_1]: WarriorGrade5,
  [Card.WarriorGrade5_2]: WarriorGrade5,
  [Card.WarriorGrade6_1]: WarriorGrade6,
  [Card.WarriorGrade6_2]: WarriorGrade6,
  [Card.WarriorGrade7_1]: WarriorGrade7,
  [Card.WarriorGrade7_2]: WarriorGrade7,
  [Card.WarriorGrade8_1]: WarriorGrade8,
  [Card.WarriorGrade8_2]: WarriorGrade8,
  [Card.WarriorGrade9_1]: WarriorGrade9,
  [Card.WarriorGrade9_2]: WarriorGrade9,
  [Card.WarriorGrade10_1]: WarriorGrade10,
  [Card.WarriorGrade10_2]: WarriorGrade10,
  [Card.Hunter1]: Hunter,
  [Card.Hunter2]: Hunter,
  [Card.MinerGrade0_1]: MinerGrade0,
  [Card.MinerGrade0_2]: MinerGrade0,
  [Card.MinerGrade1_1]: MinerGrade1,
  [Card.MinerGrade1_2]: MinerGrade1,
  [Card.MinerGrade2_1]: MinerGrade2,
  [Card.MinerGrade2_2]: MinerGrade2,
  [Card.Blacksmith1]: Blacksmith,
  [Card.Blacksmith2]: Blacksmith,
  [Card.ExplorerGrade5_1]: ExplorerGrade5,
  [Card.ExplorerGrade5_2]: ExplorerGrade5,
  [Card.ExplorerGrade6_1]: ExplorerGrade6,
  [Card.ExplorerGrade6_2]: ExplorerGrade6,
  [Card.ExplorerGrade7_1]: ExplorerGrade7,
  [Card.ExplorerGrade7_2]: ExplorerGrade7,
  [Card.ExplorerGrade8_1]: ExplorerGrade8,
  [Card.ExplorerGrade8_2]: ExplorerGrade8,
  [Card.ExplorerGrade9_1]: ExplorerGrade9,
  [Card.ExplorerGrade9_2]: ExplorerGrade9,
  [Card.ExplorerGrade10_1]: ExplorerGrade10,
  [Card.ExplorerGrade10_2]: ExplorerGrade10,
  [Card.ExplorerGrade11_1]: ExplorerGrade11,
  [Card.ExplorerGrade11_2]: ExplorerGrade11,
  [Card.ExplorerGrade12_1]: ExplorerGrade12,
  [Card.ExplorerGrade12_2]: ExplorerGrade12,
  [Card.BlacksmithKingsGreatArmorer]: BlacksmithDwarfKingsGreatArmorer,
  [Card.RoyalOffering3]: RoyalOffering3,
  [Card.RoyalOffering5]: RoyalOffering5,
  [Card.Bonfur]: Bonfur,
  [Card.Aegur]: Aegur,
  [Card.Dagda]: Dagda,
  [Card.Aral]: Aral,
  [Card.Kraal]: Kraal,
  [Card.Tarah]: Tarah,
  [Card.Lokdur]: Lokdur,
  [Card.Zoral]: Zoral,
  [Card.Idunn]: Idunn,
  [Card.Hourya]: Hourya,
  [Card.Astrid]: Astrid,
  [Card.DwergYmir]: DwergYmir,
  [Card.DwergAesir]: DwergAesir,
  [Card.DwergSigmir]: DwergSigmir,
  [Card.DwergJungir]: DwergJungir,
  [Card.DwergBergelmir]: DwergBergelmir,
  [Card.Thrud]: Thrud,
  [Card.Ylud]: Ylud,
  [Card.Skaa]: Skaa,
  [Card.Uline]: Uline,
  [Card.Grid]: Grid,
};

export const isHero = (card: Card) => card >= Card.Bonfur
export const isSimpleDwarf = (card: Card) => card < Card.RoyalOffering3 || card === Card.BlacksmithKingsGreatArmorer
export const isRoyalOffering = (card: Card) => card > Card.ExplorerGrade12_2 && card < Card.BlacksmithKingsGreatArmorer

export const cards = getEnumValues(Card)

export const dwarfCards = cards.filter((c) => (isSimpleDwarf(c) && c !== Card.BlacksmithKingsGreatArmorer) || isRoyalOffering(c))
export const heroCards = cards.filter(isHero)

export type CardDescription = DwarfDescription | HeroDescription | RoyalOfferingDescription

export const isRoyalOfferingDescription = (card: Card, _description: CardDescription): _description is RoyalOfferingDescription => isRoyalOffering(card)
export const isDwarfDescription = (card: Card, _description: CardDescription): _description is DwarfDescription => isSimpleDwarf(card)
export const isHeroDescription = (card: Card, _description: CardDescription): _description is HeroDescription => isHero(card)


export const HeroesEffects: Partial<Record<Card, RuleId>> = {
  [Card.Grid]: RuleId.Grid,
  [Card.Uline]: RuleId.Uline,
  [Card.Dagda]: RuleId.Dagda,
  [Card.Bonfur]: RuleId.Bonfur
}

export type CardId = {
  back: CardDeck,
  front?: Card
}