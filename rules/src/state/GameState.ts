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
  EvalandTurn,
  TroopEvaluation,
  GemTrade,
  FillTaverns,
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
};

export default GameState;
