import {isEnumValue} from "@gamepark/rules-api";

export enum Distinction {
    KingsHand = 1,
    HuntingMaster,
    CrownJeweler,
    KingsGreatArmorer,
    PioneerOfTheKingdom
}

export const distinctions = Object.values(Distinction).filter<Distinction>(isEnumValue)