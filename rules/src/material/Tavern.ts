import { getEnumValues } from '@gamepark/rules-api'

export enum Tavern {
  LaughingGoblin = 1,
  DancingDragon,
  ShiningHorse,
}

export const taverns = getEnumValues(Tavern)