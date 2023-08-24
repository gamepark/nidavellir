import { RuleStep } from "@gamepark/rules-api";

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
  Thrud
}

export type PreviousRule = RuleStep

export type DiscardedCoin = {
  tavern: number;
  index: number
}