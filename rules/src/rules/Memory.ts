import { RuleStep } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";

export enum Memory {
  Tavern = 1,
  PreviousRule,
  Recruitements,
  DiscardedCoin,
  Age,
  Round,
  Trade,
  Distinction,
  TransformBonus,
  TransformedCoinLocation,
  Dagda,
  Effect,
}

export type PreviousRule = RuleStep

export type DiscardedCoin = {
  tavern: number
  index: number
}

export type Effect = RuleId