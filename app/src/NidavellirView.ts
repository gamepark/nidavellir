import MoveView from '@gamepark/nidavellir/moves/MoveView';
import Nidavellir from '@gamepark/nidavellir/Nidavellir';
import Move from '@gamepark/nidavellir/moves/Move';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { SelectCoin, selectCoin } from '@gamepark/nidavellir/moves/SelectCoin';
import GameView from '@gamepark/nidavellir/state/view/GameView';

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
type LocalMove = Move | MoveView | SelectCoin;
export default class NidavellirView extends Nidavellir {
  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return A MoveView which can be completely anticipated by the player or the spectator
   */
  getAutomaticMoves(): MoveView[] {
    return this.keepPredictableMoves(super.getAutomaticMoves());
  }

  keepPredictableMoves(moves: Move[]): (Move | MoveView)[] {
    return moves.slice(
      0,
      moves.findIndex((move) => !this.isPredictableMove(move))
    ) as (Move & MoveView)[];
  }

  play(_move: Move | MoveView): (Move | MoveView)[] {
    const move = _move as Move | LocalMove;
    switch (move.type) {
      case 'SelectCoin':
        return selectCoin(this.state as GameView, move);
      default:
        return this.keepPredictableMoves(super.play(move));
    }
  }

  isPredictableMove = (move: Move | MoveView): move is MoveView => {
    return (
      (move.type === MoveType.MoveCard && move.target.type !== LocationType.Tavern) ||
      (move.type === MoveType.MoveCoin && !move.reveal && move.target!.type !== LocationType.PlayerHand)
    );
  };
}