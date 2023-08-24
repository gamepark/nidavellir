import { DistinctionDescription } from './DistinctionDescription'
import { DwarfType } from './DwarfDescription'
import { EffectType } from '../effects/EffectType'
import {Distinction} from "../material/Distinction";

export const KingsHand: DistinctionDescription = {
  majorityOf: DwarfType.Warrior,
  effects: [
    {
      type: EffectType.TRANSFORM_COIN,
      additionalValue: 5
    }
  ]
}

export const HuntingMaster: DistinctionDescription = {
  majorityOf: DwarfType.Hunter
}

export const CrownJeweler: DistinctionDescription = {
  majorityOf: DwarfType.Miner
}

export const KingsGreatArmorer: DistinctionDescription = {
  majorityOf: DwarfType.Blacksmith
}

export const PioneerOfTheKingdom: DistinctionDescription = {
  majorityOf: DwarfType.Explorer,
  effects: [
    {
      type: EffectType.DRAW_CARD,
      count: 3,
      keep: 1
    }
  ]
}

export const DistinctionDescriptions: Record<Distinction, DistinctionDescription> = {
  [Distinction.KingsHand]: KingsHand,
  [Distinction.HuntingMaster]: HuntingMaster,
  [Distinction.CrownJeweler]: CrownJeweler,
  [Distinction.KingsGreatArmorer]: KingsGreatArmorer,
  [Distinction.PioneerOfTheKingdom]: PioneerOfTheKingdom
}

export const Distinctions: DistinctionDescription[] = [
    KingsHand,
    HuntingMaster,
    CrownJeweler,
    KingsGreatArmorer,
    PioneerOfTheKingdom
]

