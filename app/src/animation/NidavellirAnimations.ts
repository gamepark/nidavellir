import { Animations } from '@gamepark/react-client'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import MoveView from '@gamepark/nidavellir/moves/MoveView'
import { PlayerId } from '@gamepark/nidavellir/state/Player'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import GameState from '@gamepark/nidavellir/state/GameState'
import Move from '@gamepark/nidavellir/moves/Move'
import { isInDiscard, isInPlayerHand, isInTavern } from '@gamepark/nidavellir/utils/location.utils'
import AnimationContext from '@gamepark/react-client/dist/animations/AnimationContext'

export default class NidavellirAnimations extends Animations<GameState | GameView, Move | MoveView, PlayerId> {
  getUndoPostDuration(
    move: Move | MoveView,
    context: AnimationContext<GameState | GameView, Move | MoveView, PlayerId>
  ): number {
    return this.getPostDuration(move, context)
  }

  getPostDuration(move: MoveView, context: AnimationContext<GameState | GameView, Move | MoveView, PlayerId>): number {
    switch (move.type) {
      case MoveType.MoveCoin:
        if (move.target && isInPlayerHand(move.target)) {
          return 0.5
        }
        if (!move.target && move.source && isInPlayerHand(move.source) && context.playerId === move.source.player) {
          return 0
        }
        return 1.5
      case MoveType.MoveCard:
        if (move.target && isInTavern(move.target)) {
          return 0.5
        }
        return 1.5
      case MoveType.MoveDistinction:
        return 1
      case MoveType.MoveHero:
        return 1
      case MoveType.MoveGem:
        if (isInDiscard(move.target)) {
          return 0
        }
        return 1
      default:
        return 0
    }
  }
}
