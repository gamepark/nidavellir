import {EffectType} from './EffectType'
import EffectRules from './EffectRules'
import MoveView from '../moves/MoveView'
import Move from '../moves/Move'
import {Coins, HuntingMasterCoin} from '../coins/Coins'
import {isInDiscard, isInPlayerHand, isOnPlayerBoard} from '../utils/location.utils'
import {isExchangeCoin} from '../utils/coin.utils'
import {moveKnownCoinMove, revealCoinMove} from '../moves/MoveCoin'
import {LocationType} from '../state/Location'

export type HuntingMaster = {
  type: EffectType.HUNTING_MASTER;
};

class HuntingMasterRules extends EffectRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const huntingMasterCoin = this.game.coins.find((c) => Coins[c.id!] === HuntingMasterCoin)!
    const zeroValuedCoin = this.game.coins.find(
      (c) =>
        (isInPlayerHand(c.location) || isOnPlayerBoard(c.location)) &&
        c.id !== undefined &&
        isExchangeCoin(c) &&
        c.location.player === this.player.id
    )

    if (!zeroValuedCoin) {
      return []
    }

    const moves = []
    if (zeroValuedCoin.hidden) {
      moves.push(revealCoinMove(zeroValuedCoin.id!, this.player.id))
    }

    moves.push(
      moveKnownCoinMove(zeroValuedCoin.id!, {
        type: LocationType.Discard,
        index: this.game.coins.filter((c) => isInDiscard(c.location)).length
      }, this.player.id),
      moveKnownCoinMove(huntingMasterCoin.id!, zeroValuedCoin.location, this.player.id)
    )
    return moves
  }
}

export {HuntingMasterRules}
