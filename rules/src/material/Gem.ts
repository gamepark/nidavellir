import {isEnumValue} from "@gamepark/rules-api";

export enum Gem {
    Gem1 = 1,
    Gem2,
    Gem3,
    Gem4,
    Gem5,
    Gem6
}

export const gems = Object.values(Gem).filter<Gem>(isEnumValue)

export const baseGems = gems.filter((gem) => gem < Gem.Gem6)
