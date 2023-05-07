import Move from '../../moves/Move'
import MoveView from '../../moves/MoveView'
import { getCoinsInPlayerHand, isInPlayerHand } from '../../utils/location.utils'
import { getPlayerCoinForTavern, isExchangeCoin } from '../../utils/coin.utils'
import { getCombinations, isLocatedCoin } from '../../utils/player.utils'
import { tradeCoinsMove } from '../../moves/TradeCoins'
import MoveType from '../../moves/MoveType'
import { TradeCoinBaseRules } from '../TradeCoinBase'
import { SecretCoin } from '../../state/view/SecretCoin'
import { LocatedCoin } from '../../state/LocatedCoin'
import { shuffleCoinMove } from '../../moves/ShuffleCoins'

export class TradeCoinWithUlineRules extends TradeCoinBaseRules {
  getEffectAutomaticMoves(): (Move | MoveView)[] {
    return []
  }

  getPlayerMoves(): (Move | MoveView)[] {
    const tavern = this.game.tavern
    const revealedCoin = getPlayerCoinForTavern(this.game, this.player.id, tavern)

    if (!isLocatedCoin(revealedCoin)) {
      throw new Error('There is an issue when searching the revealed coin. It is undefined or secret.')
    }

    const coins = getCoinsInPlayerHand(this.game, this.player.id).filter((c) => !isExchangeCoin(c as LocatedCoin))
    const combinations = getCombinations(coins, 2)
    return combinations.flatMap((coins: SecretCoin[]) => tradeCoinsMove(coins.map((c) => c.id!), this.player.id))
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.TradeCoins:
        return this.onTradeCoins(move)
    }

    return []
  }

  protected shuffleCoins(moves: (Move | MoveView)[], tradedCoinId: number, _notTradedCoinId: number, treasureCoinId: number) {
    moves.push(shuffleCoinMove(
      this.game.coins
        .filter((c) =>
          c.id === treasureCoinId
          || (isInPlayerHand(c.location) && c.location.player === this.player.id && c.id !== tradedCoinId)
        )
        .map((c) => c.id!),
      this.player.id
    ))
  }
}
