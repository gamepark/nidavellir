import { LocatedCard } from './LocatedCard';
import { LocatedCoin } from './LocatedCoin';
import { LocatedGem } from './LocatedGem';
import { Player, PlayerId } from './Player';
import Move from '../moves/Move';

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
  steps: Step[];
  nextMoves: Move[];
  tavern: number;
  round: number;
};

export default GameState;
