import { isEnumValue } from "@gamepark/rules-api"
export enum DwarfType {
  Blacksmith = 1,
  Hunter,
  Explorer,
  Miner,
  Warrior,
  Neutral
}

export const dwarfTypes = Object.values(DwarfType).filter<DwarfType>(isEnumValue).filter((type) => type !== DwarfType.Neutral)