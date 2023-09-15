import { RuleStep } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { DwarfType } from "../cards/DwarfType";

export enum Memory {
  Tavern = 1,
  PreviousRule,
  Recruitments,
  DiscardedCoin,
  Age,
  Round,
  Trade,
  TransformBonus,
  TransformedCoinItemPosition,
  Dagda,
  Effect,
  YludPlayed,
  DrawCard,
}

export type PreviousRule = RuleStep

export type DiscardedCoin = {
  tavern: number
  index: number
}

export type Effect = RuleId

export type Dagda = {
  index: number;
  type: DwarfType
}

export type DrawCard = {
  draw: number
  keep: number,
  age: number
}