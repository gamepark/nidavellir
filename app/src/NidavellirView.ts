import MoveView, { isView } from '@gamepark/nidavellir/moves/MoveView'
import Nidavellir from '@gamepark/nidavellir/Nidavellir'
import Move from '@gamepark/nidavellir/moves/Move'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { LocationType } from '@gamepark/nidavellir/state/Location'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { SET_RULES_DIALOG, SetRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import { ShuffleCoins } from '@gamepark/nidavellir/moves/ShuffleCoins'
import MoveRandomized from '@gamepark/nidavellir/moves/MoveRandomized'
import { isSameCoinLocation } from '@gamepark/nidavellir/utils/location.utils'

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
    return this.keepPredictableMoves(super.getAutomaticMoves())
  }

  randomize(move: MoveRandomized): Move & MoveRandomized {
    return move
  }

  keepPredictableMoves(moves: Move[]): (Move & MoveView)[] {
    const firstUnpredictableMoveIndex = moves.findIndex(move => !this.isPredictableMove(move))
    return (firstUnpredictableMoveIndex !== -1 ? moves.slice(0, firstUnpredictableMoveIndex) : moves) as (Move & MoveView)[]
  }


  play(move: MoveView | LocalMove): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.ShuffleCoins:
        this.onShuffleCoins(move)
        return []
      case SET_RULES_DIALOG:
        (this.game as GameView).rulesDialog = move.rulesDialog
        return []
      default:
        return this.keepPredictableMoves(super.play(move))
    }
  }

  protected onShuffleCoins(move: ShuffleCoins) {
    const sources = move.sources!
    sources.forEach((source) => {
      if (isView(this.game)) {
        const coin = this.game.coins.find((c) => isSameCoinLocation(source, c.location))
        if (coin) {
          if (move.player !== this.game.playerId) {
            delete coin.id
          }

          coin.hidden = true
        }
      }
    })
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
    )
  }
}
