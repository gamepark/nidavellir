/**
 * Enumeration of all the types of Move in you game.
 * Even though it is not strictly required to use a type like that, it helps a lot in practice!
 */
enum MoveType {
  Pass = 1,
  NextPhase,
  MoveCard,
  MoveDistinction,
  MoveHero,
  MoveCoin,
  MoveGem,
}

export default MoveType;
