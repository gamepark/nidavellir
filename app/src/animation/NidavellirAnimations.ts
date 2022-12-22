import { Animations } from '@gamepark/react-client';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import MoveView from '@gamepark/nidavellir/moves/MoveView';
import { PlayerId } from '@gamepark/nidavellir/state/Player';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import GameState from '@gamepark/nidavellir/state/GameState';
import Move from '@gamepark/nidavellir/moves/Move';
import { isInPlayerHand, isInTavern } from '@gamepark/nidavellir/utils/location.utils';

export default class NidavellirAnimations extends Animations<GameState | GameView, Move | MoveView, PlayerId> {
  getUndoPostDuration(move: Move | MoveView): number {
    return this.getPostDuration(move);
  }

  getPostDuration(move: MoveView): number {
    switch (move.type) {
      case MoveType.MoveCoin:
        if (move.target && isInPlayerHand(move.target)) {
          return 0.2;
        }
        return 1;
      case MoveType.MoveCard:
        if (move.target && isInTavern(move.target)) {
          return 0.5;
        }
        return 1;
      case MoveType.MoveHero:
        return 1;
      case MoveType.MoveGem:
        return 1;
      default:
        return 0;
    }
  }
}
