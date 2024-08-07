import { getEnumValues } from '@gamepark/rules-api'

export enum Distinction {
    KingsHand = 1,
    HuntingMaster,
    CrownJeweler,
    KingsGreatArmorer,
    PioneerOfTheKingdom
}

export const distinctions = getEnumValues(Distinction)