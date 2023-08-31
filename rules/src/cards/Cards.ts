import { DwarfDescription } from './DwarfDescription';
import { DwarfType } from './DwarfType';
import { HeroDescription } from "./HeroDescription";
import { RoyalOfferingDescription } from "./RoyalOfferingDescription";
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
} from "./Heroes";
import { isEnumValue } from "@gamepark/rules-api"
import { RuleId } from "../rules/RuleId";

export const WarriorGrade3: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [3],
  },
};
export const WarriorGrade4: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [4],
  },
};

export const WarriorGrade5: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [5],
  },
};

export const WarriorGrade6: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [6],
  },
};

export const WarriorGrade7: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [7],
  },
};

export const WarriorGrade8: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [8],
  },
};

export const WarriorGrade9: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [9],
  },
};

export const WarriorGrade10: DwarfDescription = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [10],
  },
};


export const Hunter: DwarfDescription = {
  type: DwarfType.Hunter,
  grades: {
    [DwarfType.Hunter]: [0],
  },
};

export const MinerGrade0: DwarfDescription = {
  type: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [0],
  },
};
export const MinerGrade1: DwarfDescription = {
  type: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [1],
  },
};

export const MinerGrade2: DwarfDescription = {
  type: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [2],
  },
};


export const Blacksmith: DwarfDescription = {
  type: DwarfType.Blacksmith,
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
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [5],
  },
};

export const ExplorerGrade6: DwarfDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [6],
  },
};

export const ExplorerGrade7: DwarfDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [7],
  },
};

export const ExplorerGrade8: DwarfDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [8],
  },
};

export const ExplorerGrade9: DwarfDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [9],
  },
};

export const ExplorerGrade10: DwarfDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [10],
  },
};

export const ExplorerGrade11: DwarfDescription = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [11],
  },
};

export const ExplorerGrade12: DwarfDescription = {
  type: DwarfType.Explorer,
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
  type: DwarfType.Blacksmith,
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
  Warrior1 = 1, // Warrior grade 3
  Warrior2, // Warrior grade 3
  Warrior3, // Warrior grade 4
  Warrior4, // Warrior grade 4
  Warrior5, // Warrior grade 5
  Warrior6,// Warrior grade 5
  Warrior7,// Warrior grade 6
  Warrior8,// Warrior grade 6
  Warrior9,// Warrior grade 7
  Warrior10,// Warrior grade 7
  Warrior11,// Warrior grade 8
  Warrior12,// Warrior grade 8
  Warrior13,// Warrior grade 9
  Warrior14,// Warrior grade 9
  Warrior15,// Warrior grade 10
  Warrior16,// Warrior grade 10
  Hunter1,
  Hunter2,
  Miner1, // MIner 0 (tourné vers gauche)
  Miner2, // Miner 0 (tourné vers droite)
  Miner3, // Miner 1 (tourné vers la gauche)
  Miner4, // Miner 1 (tourné vers la droite)
  Miner5, // Miner 2(tourné vers gauche)
  Miner6, // Miner 2(tourné vers la droite)
  Blacksmith1,
  Blacksmith2,
  Explorer1, // Explorer 5
  Explorer2, // Explorer 5
  Explorer3, // Explorer 6
  Explorer4, // Explorer 6
  Explorer5, // Explorer 7
  Explorer6, // Explorer 7
  Explorer7, // Explorer 8
  Explorer8, // Explorer 8
  Explorer9, // Explorer 9
  Explorer10, // Explorer 9
  Explorer11, // Explorer 10
  Explorer12, // Explorer 10
  Explorer13, // Explorer 11
  Explorer14, // Explorer 11
  Explorer15, // Explorer 12
  Explorer16, // Explorer 12

  RoyalOffering3,
  RoyalOffering5,

  // Special distinction blacksmith
  BlacksmithKingsGreatArmorer = 500,

  // Heroes starts from 1000
  Bonfur = 1000,
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
  [Card.Warrior1]: WarriorGrade3,
  [Card.Warrior2]: WarriorGrade3,
  [Card.Warrior3]: WarriorGrade4,
  [Card.Warrior4]: WarriorGrade4,
  [Card.Warrior5]: WarriorGrade5,
  [Card.Warrior6]: WarriorGrade5,
  [Card.Warrior7]: WarriorGrade6,
  [Card.Warrior8]: WarriorGrade6,
  [Card.Warrior9]: WarriorGrade7,
  [Card.Warrior10]: WarriorGrade7,
  [Card.Warrior11]: WarriorGrade8,
  [Card.Warrior12]: WarriorGrade8,
  [Card.Warrior13]: WarriorGrade9,
  [Card.Warrior14]: WarriorGrade9,
  [Card.Warrior15]: WarriorGrade10,
  [Card.Warrior16]: WarriorGrade10,
  [Card.Hunter1]: Hunter,
  [Card.Hunter2]: Hunter,
  [Card.Miner1]: MinerGrade0,
  [Card.Miner2]: MinerGrade0,
  [Card.Miner3]: MinerGrade1,
  [Card.Miner4]: MinerGrade1,
  [Card.Miner5]: MinerGrade2,
  [Card.Miner6]: MinerGrade2,
  [Card.Blacksmith1]: Blacksmith,
  [Card.Blacksmith2]: Blacksmith,
  [Card.Explorer1]: ExplorerGrade5,
  [Card.Explorer2]: ExplorerGrade5,
  [Card.Explorer3]: ExplorerGrade6,
  [Card.Explorer4]: ExplorerGrade6,
  [Card.Explorer5]: ExplorerGrade7,
  [Card.Explorer6]: ExplorerGrade7,
  [Card.Explorer7]: ExplorerGrade8,
  [Card.Explorer8]: ExplorerGrade8,
  [Card.Explorer9]: ExplorerGrade9,
  [Card.Explorer10]: ExplorerGrade9,
  [Card.Explorer11]: ExplorerGrade10,
  [Card.Explorer12]: ExplorerGrade10,
  [Card.Explorer13]: ExplorerGrade11,
  [Card.Explorer14]: ExplorerGrade11,
  [Card.Explorer15]: ExplorerGrade12,
  [Card.Explorer16]: ExplorerGrade12,
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
export const isRoyalOffering = (card: Card) => card > Card.Explorer16 && card < Card.BlacksmithKingsGreatArmorer

export const cards = Object.values(Card).filter<Card>(isEnumValue)

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