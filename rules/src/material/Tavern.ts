import { isEnumValue } from "@gamepark/rules-api"

export enum Tavern {
  LaughingGoblin = 1,
  DancingDragon,
  ShiningHorse,
}

export const taverns = Object.values(Tavern).filter<Tavern>(isEnumValue)