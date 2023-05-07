import { getCoinsInPlayerHand } from '../../utils/location.utils'
import { shuffleCoinMove } from '../../moves/ShuffleCoins'
import MoveView from '../../moves/MoveView'
import Move from '../../moves/Move'
import { TransformCoin, transformCoinMove } from '../../moves/TransformCoin'
import { MoveCoin } from '../../moves/MoveCoin'
import { TransformCoinBaseRules } from '../TransformCoinBase'
import { isExchangeCoin } from '../../utils/coin.utils'
import { LocatedCoin } from '../../state/LocatedCoin'

export class TransformCoinWithUlineRules extends TransformCoinBaseRules {
  getPlayerMoves(): (Move | MoveView)[] {
    const moves = super.getPlayerMoves()
    getCoinsInPlayerHand(this.game, this.player.id)
      .filter((c) => !isExchangeCoin(c as LocatedCoin))
      .forEach((c) => moves.push(transformCoinMove(c.id!, this.player.id)))

    return moves
  }


  protected shuffleCoins(moves: (Move | MoveView)[], move: TransformCoin) {
    const treasureCoin = (moves[moves.length] as MoveCoin).id!
    const remainingCoinsInHand = getCoinsInPlayerHand(this.game, this.player.id).filter((c) => c.id !== move.id)

    const coinToShuffle = [...remainingCoinsInHand.map((c) => c.id!), treasureCoin]
    moves.push(shuffleCoinMove(coinToShuffle, this.player.id))
  }
}
