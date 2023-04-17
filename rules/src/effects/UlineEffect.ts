import { EffectType } from './EffectType'
import EffectRules from './EffectRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { LocationType } from '../state/Location'
import { getCoinOnPlayerBoard, isOnPlayerBoard } from '../utils/location.utils'
import { moveCoinAndHideMove } from '../moves/MoveCoin'

export type UlineEffect = {
  type: EffectType.ULINE;
};

class UlineRules extends EffectRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    return this.getCoinToGetInHand()
  }

  getCoinToGetInHand = () => {
    const tavern = this.game.tavern
    const boardCoins = getCoinOnPlayerBoard(this.game, this.player.id)

    return boardCoins
      .filter((c) => c.hidden && isOnPlayerBoard(c.location) && c.location.index! >= tavern)
      .map((c, index) =>
        moveCoinAndHideMove(c.id!, {
          type: LocationType.PlayerHand,
          player: this.player.id,
          index
        }, this.player.id)
      )
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCoin:
        this.onMoveCoin()
        break
    }

    return []
  }

  onMoveCoin = () => {
    const remainingMoves = this.getCoinToGetInHand()
    if (!remainingMoves.length) {
      this.player.effects.shift()
    }
  }
}

export { UlineRules }
