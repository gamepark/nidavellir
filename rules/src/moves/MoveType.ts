/**
 * Enumeration of all the types of Move in you game.
 * Even though it is not strictly required to use a type like that, it helps a lot in practice!
 */

enum MoveType {
  FillTaverns = 1,
  PlaceCoin,
  ChooseTavernCard,
  RecruitHero,
  TradeCoin,
  TookCoinFromTreasure,
  DiscardCoin,
  RevealCoins,
  RevealPouch,
  PlaceDwarf,
  TradeGem,
  EvaluateTroops,
  Pass,
  NextPhase,
  DiscardTavern,
}

export default MoveType;
