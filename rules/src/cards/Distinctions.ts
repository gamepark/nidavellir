import { Distinction } from './Distinction';
import { DwarfType } from './Card';
import { EffectType } from '../effects/EffectType';

export const KingsHand: Distinction = {
  majorityOf: DwarfType.Warrior,
  effects: [
    {
      type: EffectType.TRANSFORM_COIN,
      additionalValue: 5,
    },
  ],
};

export const HuntingMaster: Distinction = {
  majorityOf: DwarfType.Hunter,
  effects: [
    {
      type: EffectType.HUNTING_MASTER,
    },
  ],
};

export const CrownJeweler: Distinction = {
  majorityOf: DwarfType.Miner,
  effects: [
    {
      type: EffectType.CROWN_JEWELER,
    },
  ],
};

export const KingsGreatArmorer: Distinction = {
  majorityOf: DwarfType.Blacksmith,
  effects: [
    {
      type: EffectType.KINGS_GREAT_ARMORER,
    },
  ],
};

export const PioneerOfTheKingdom: Distinction = {
  majorityOf: DwarfType.Explorer,
  effects: [
    {
      type: EffectType.PIONEER_OF_THE_KINGDOM,
    },
  ],
};

export const Distinctions: Distinction[] = [
  KingsGreatArmorer,
  HuntingMaster,
  PioneerOfTheKingdom,
  CrownJeweler,
  KingsHand,
];
