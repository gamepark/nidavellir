import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { MaterialDescription } from '@gamepark/react-game'
import { cardDescription } from "./DwarfCardDescription";
import { distinctionDescription } from "./DistinctionCardDescription";
import { coinDescription } from "./CoinDescription";
import { gemDescription } from "./GemDescription";
import { playerBoardDescription } from "./PlayerBoardDescription";

export const material: Record<any, MaterialDescription> = {
  [MaterialType.Card]: cardDescription,
  [MaterialType.Distinction]: distinctionDescription,
  [MaterialType.Coin]: coinDescription,
  [MaterialType.Gem]: gemDescription,
  [MaterialType.PlayerBoard]: playerBoardDescription,
}