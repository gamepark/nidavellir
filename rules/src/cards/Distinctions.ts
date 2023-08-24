import { DistinctionDescription } from './DistinctionDescription'
import { DwarfType } from './DwarfDescription'
import { Distinction } from "../material/Distinction";

export const KingsHand: DistinctionDescription = {
  majorityOf: DwarfType.Warrior
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
  majorityOf: DwarfType.Explorer
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

