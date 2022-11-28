import { Distinction } from './Distinction';
import { DwarfType } from './Card';

export const KingsHand: Distinction = {
  majorityOf: DwarfType.Warrior,
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
};

export const Distinctions: Distinction[] = [
  KingsHand,
  HuntingMaster,
  CrownJeweler,
  KingsGreatArmorer,
  PioneerOfTheKingdom,
];
