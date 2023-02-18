import { LocatedCard } from './LocatedCard';
import { LocatedCoin } from './LocatedCoin';
import { LocatedGem } from './LocatedGem';
import { Player, PlayerId } from './Player';

export enum Phase {
  TurnPreparation = 1,
  TavernResolution,
}

export enum Step {
  EnterDwarves = 1,
  Bids,
  BidRevelation,
  ElvalandTurn,
  TroopEvaluation,
  GemTrade,
  Scoring,
}

type GameState = {
  cards: LocatedCard[];
  distinctions: LocatedCard[];
  heroes: LocatedCard[];
  coins: LocatedCoin[];
  gems: LocatedGem[];
  players: Player[];
  activePlayer?: PlayerId;
  phase: Phase;
  step: Step;
  tavern: number;
  round: number;
};

export default GameState;
