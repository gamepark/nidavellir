import { isEnumValue } from "@gamepark/rules-api"

export enum PlayerBoardSpace {
  LaughingGoblin = 1,
  DancingDragon,
  ShiningHorse,
  Pouch1,
  Pouch2,
  Gem
}

export const playerBoardSpaces = Object.values(PlayerBoardSpace).filter<PlayerBoardSpace>(isEnumValue)

export const tokenSpaces = playerBoardSpaces.filter((s) => s !== PlayerBoardSpace.Gem)