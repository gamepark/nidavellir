import { Hero, HeroType } from './Hero';
import { DwarfType } from './Card';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { PlayerId } from '../state/Player';
import { getArmy } from '../utils/player.utils';
import { EffectType } from '../effects/EffectType';

export const Bonfur: Hero = {
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

export const Aegur: Hero = {
  type: DwarfType.Blacksmith,
  grades: {
    [DwarfType.Blacksmith]: [0, 0],
  },
};

export const Dagda: Hero = {
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

export const Aral: Hero = {
  type: DwarfType.Hunter,
  grades: {
    [DwarfType.Hunter]: [0, 0],
  },
};

export const Kraal: Hero = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [7, 0],
  },
};

export const Tarah: Hero = {
  type: DwarfType.Warrior,
  grades: {
    [DwarfType.Warrior]: [14],
  },
};

export const Lokdur: Hero = {
  type: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [3],
  },
};

export const Zoral: Hero = {
  type: DwarfType.Miner,
  grades: {
    [DwarfType.Miner]: [1, 0, 0],
  },
};

export const Idunn: Hero = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [7],
  },
};

export const Hourya: Hero = {
  type: DwarfType.Explorer,
  grades: {
    [DwarfType.Explorer]: [20],
  },
  condition: {
    isActive(game: GameState | GameView, playerId: PlayerId): boolean {
      const army = getArmy(game, playerId, DwarfType.Explorer);
      return army.cards.length + army.heroes.length >= 5;
    },
  },
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
  grades: {
    [HeroType.Neutral]: [13],
  },
};

export const Ylud: Hero = {
  type: HeroType.Neutral,
  grades: {
    [DwarfType.Blacksmith]: [0],
    [DwarfType.Hunter]: [0],
    [DwarfType.Explorer]: [11],
    [DwarfType.Warrior]: [7],
    [DwarfType.Miner]: [1],
  },
};

export const Skaa: Hero = {
  type: HeroType.Neutral,
};

export const Uline: Hero = {
  type: HeroType.Neutral,
  effects: [
    {
      type: EffectType.ULINE,
    },
  ],
};

export const Grid: Hero = {
  type: HeroType.Neutral,
  effects: [{
    type: EffectType.TRANSFORM_COIN,
    additionalValue: 7
  }]
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
