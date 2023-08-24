export enum RuleId {
  EnterDwarves = 1,
  Bids,
  BidRevelation,
  UlineBid,
  ChooseCard,
  RecruitHero,
  TradeCoin,
  TransformCoin,
  DrawCard,
  ElvalandTurn,
  KingsHand,
  HuntingMaster,
  CrownJeweler,
  KingsGreatArmorer,
  PioneerOfTheKingdom,
  TroopEvaluation,
  GemTrade,
  Scoring,
  EndOfAge1,
  EndOfAge2,

  // Heroes
  Grid,
  Uline,
  Dagda,
  Bonfur,
  Thrud,
  Ylud
}

export const TroopEvaluationRuleIds = [
  RuleId.KingsHand,
  RuleId.HuntingMaster,
  RuleId.CrownJeweler,
  RuleId.KingsGreatArmorer,
  RuleId.PioneerOfTheKingdom
]

export const HeroWithActionRuleIds = [
  RuleId.Grid,
  RuleId.Uline,
  RuleId.Dagda,
  RuleId.Bonfur,
  RuleId.Thrud
]