import { isEnumValue } from "@gamepark/rules-api";
import { DwarfDescription } from "../cards/DwarfDescription";
import { Cards } from "../cards/Cards";
import { RoyalOfferingDescription } from "../cards/RoyalOfferingDescription";

export enum CardDeck {
    Age1 = 1,
    Age2,
    Hero,
    Distinction
}

export enum Card {
    WarriorDwarf1Age1 = 1,
    WarriorDwarf2Age1,
    WarriorDwarf3Age1,
    WarriorDwarf4Age1,
    WarriorDwarf5Age1,
    WarriorDwarf6Age1,
    WarriorDwarf7Age1,
    WarriorDwarf8Age1,
    WarriorDwarf9Age1,
    WarriorDwarf1Age2,
    WarriorDwarf2Age2,
    WarriorDwarf3Age2,
    WarriorDwarf4Age2,
    WarriorDwarf5Age2,
    WarriorDwarf6Age2,
    WarriorDwarf7Age2,
    WarriorDwarf8Age2,
    WarriorDwarf9Age2,
    HunterDwarf1Age1,
    HunterDwarf2Age1,
    HunterDwarf3Age1,
    HunterDwarf4Age1,
    HunterDwarf5Age1,
    HunterDwarf6Age1,
    HunterDwarf7Age1,
    HunterDwarf8Age1,
    HunterDwarf1Age2,
    HunterDwarf2Age2,
    HunterDwarf3Age2,
    HunterDwarf4Age2,
    HunterDwarf5Age2,
    HunterDwarf6Age2,
    HunterDwarf7Age2,
    HunterDwarf8Age2,
    MinerDwarf1Age1,
    MinerDwarf2Age1,
    MinerDwarf3Age1,
    MinerDwarf4Age1,
    MinerDwarf5Age1,
    MinerDwarf6Age1,
    MinerDwarf7Age1,
    MinerDwarf8Age1,
    MinerDwarf1Age2,
    MinerDwarf2Age2,
    MinerDwarf3Age2,
    MinerDwarf4Age2,
    MinerDwarf5Age2,
    MinerDwarf6Age2,
    MinerDwarf7Age2,
    MinerDwarf8Age2,
    BlacksmithDwarf1Age1,
    BlacksmithDwarf2Age1,
    BlacksmithDwarf3Age1,
    BlacksmithDwarf4Age1,
    BlacksmithDwarf5Age1,
    BlacksmithDwarf6Age1,
    BlacksmithDwarf7Age1,
    BlacksmithDwarf8Age1,
    BlacksmithDwarf9Age1,
    BlacksmithDwarf10Age1,
    BlacksmithDwarf1Age2,
    BlacksmithDwarf2Age2,
    BlacksmithDwarf3Age2,
    BlacksmithDwarf4Age2,
    BlacksmithDwarf5Age2,
    BlacksmithDwarf6Age2,
    BlacksmithDwarf7Age2,
    BlacksmithDwarf8Age2,
    BlacksmithDwarf9Age2,
    BlacksmithDwarf10Age2,
    ExplorerDwarf1Age1,
    ExplorerDwarf2Age1,
    ExplorerDwarf3Age1,
    ExplorerDwarf4Age1,
    ExplorerDwarf5Age1,
    ExplorerDwarf6Age1,
    ExplorerDwarf7Age1,
    ExplorerDwarf8Age1,
    ExplorerDwarf1Age2,
    ExplorerDwarf2Age2,
    ExplorerDwarf3Age2,
    ExplorerDwarf4Age2,
    ExplorerDwarf5Age2,
    ExplorerDwarf6Age2,
    ExplorerDwarf7Age2,
    ExplorerDwarf8Age2,

    RoyalOffering1Age1 = 300,
    RoyalOffering2Age1,
    RoyalOffering1Age2,
    RoyalOffering2Age2,
    RoyalOffering3Age2,

    // Special distinction blacksmith
    BlacksmithDwarfKingsGreatArmorer = 500,

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

export const isHero = (card: Card) => card >= Card.Bonfur
export const isSimpleDwarf = (card: Card) => card < Card.RoyalOffering1Age1
export const isRoyalOffering = (card: Card) => card > Card.ExplorerDwarf8Age2 && card < Card.BlacksmithDwarfKingsGreatArmorer

export const isAge1Card = (card: Card) => (Cards[card] as (DwarfDescription | RoyalOfferingDescription)).age === 1
export const isAge2Card = (card: Card) => (Cards[card] as (DwarfDescription | RoyalOfferingDescription)).age === 2

export const cards = Object.values(Card).filter<Card>(isEnumValue)
export const age1Cards = cards.filter(isAge1Card)
export const age2Cards = cards.filter(isAge2Card)
export const heroCards = cards.filter(isHero)

