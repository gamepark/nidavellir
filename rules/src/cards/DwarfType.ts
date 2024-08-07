import { getEnumValues } from '@gamepark/rules-api'

export enum DwarfType {
  Blacksmith = 1,
  Hunter,
  Miner,
  Explorer,
  Warrior,
  Neutral
}

export const dwarfTypes = getEnumValues(DwarfType).filter((type) => type !== DwarfType.Neutral)