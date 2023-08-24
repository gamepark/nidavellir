export enum RuleId {
  EnterDwarves = 1,
  Bids,
  BidRevelation,
  UlineBid,
  ChooseCard,
  RecruitHero,
  TradeCoin,
  TransformCoin,
  KingsHand,
  HuntingMaster,
  CrownJeweler,
  KingsGreatArmorer,
  PioneerOfTheKingdom,
  GemTrade,

  // Heroes
  Bonfur,
  Dagda,
  Grid,
  Thrud,
  Uline,
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
  RuleId.Bonfur
]