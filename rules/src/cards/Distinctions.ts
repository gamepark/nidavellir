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
};

export const CrownJeweler: Distinction = {
  majorityOf: DwarfType.Miner,
};

export const KingsGreatArmorer: Distinction = {
  majorityOf: DwarfType.Blacksmith,
};

export const PioneerOfTheKingdom: Distinction = {
  majorityOf: DwarfType.Explorer,
  // TODO: replace by "Draw card" effect
};

export const Distinctions: Distinction[] = [
  KingsGreatArmorer,
  HuntingMaster,
  PioneerOfTheKingdom,
  CrownJeweler,
  KingsHand,
];
