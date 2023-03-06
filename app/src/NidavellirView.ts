import MoveView from '@gamepark/nidavellir/moves/MoveView';
import Nidavellir from '@gamepark/nidavellir/Nidavellir';
import Move from '@gamepark/nidavellir/moves/Move';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { SET_RULES_DIALOG, SetRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog';

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
type LocalMove = Move | MoveView | SetRulesDialog;
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

  keepPredictableMoves(moves: Move[]): (Move & MoveView)[] {
    const firstUnpredictableMoveIndex = moves.findIndex((move) => !this.isPredictableMove(move));
    return (firstUnpredictableMoveIndex !== -1 ? moves.slice(0, firstUnpredictableMoveIndex) : moves) as (Move &
      MoveView)[];
  }

  play(_move: Move | MoveView): (Move | MoveView)[] {
    const move = _move as Move | LocalMove;
    switch (move.type) {
      case SET_RULES_DIALOG:
        (this.game as GameView).rulesDialog = move.rulesDialog;
        return [];
      default:
        return this.keepPredictableMoves(super.play(move));
    }
  }

  isPredictableMove = (move: Move | MoveView): move is MoveView => {
    return (
      (move.type === MoveType.MoveCard &&
        move.target.type !== LocationType.Tavern &&
        move.target.type !== LocationType.PlayerHand &&
        move.target.type !== LocationType.Age2Deck &&
        move.target.type !== LocationType.Age1Deck) ||
      (move.type === MoveType.MoveCoin && !move.reveal && move.target!.type !== LocationType.PlayerHand) ||
      move.type === MoveType.MoveDistinction
    );
  };
}
