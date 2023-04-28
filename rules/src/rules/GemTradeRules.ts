import { NidavellirRules } from './NidavellirRules'
import MoveType from '../moves/MoveType'
import Move from '../moves/Move'
import { mayGoToNextTavern } from '../utils/tavern.utils'
import { LocatedCoin } from '../state/LocatedCoin'
import { MoveGem, moveGemMove } from '../moves/MoveGem'
import { isOnPlayerBoard } from '../utils/location.utils'
import { SecretCoin } from '../state/view/SecretCoin'
import { OnPlayerBoard } from '../state/CommonLocations'
import { LocationType } from '../state/Location'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import values from 'lodash/values'
import { Gems } from '../gems/Gems'
import MoveView from '../moves/MoveView'
import { getTrades } from '../utils/age.utils'
import { tradeGemsMove } from '../moves/TradeGems'

class GemTradeRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {

    const trades = values(getTrades(this.game))
    const playersById = keyBy(this.game.players, (p) => p.id)

    if (
      trades.every(
        (trade) =>
          // There is only one player with the coin value
          trade.every((c) => playersById[(c.location as OnPlayerBoard).player].traded)
      )
    ) {
      return []
    }


    return [tradeGemsMove]
  }

  getGemExchangesMoves(coins: (LocatedCoin | SecretCoin)[], gemByPlayer: any): MoveGem[] {
    // Create a reverses array (to prepare move computing)
    const reversed = coins.slice().reverse()
    // Get all players ordered by coin value (before reverse)
    const players = coins.map((c) => (c.location as OnPlayerBoard).player)

    // For each item in reversed item we get the same index in the non-reversed array to switch gems
    return reversed.flatMap((coin, index) => {
      const newPlayer = (coin.location as OnPlayerBoard).player
      return moveGemMove(gemByPlayer[players[index]].id, {
        type: LocationType.PlayerBoard,
        player: newPlayer
      }, newPlayer)
    })
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.TradeGems:
        return this.onTradeGems()
      case MoveType.MoveGem:
        return this.onMoveGem(move)
    }

    return super.play(move)
  }

  onTradeGems = (): (Move | MoveView)[] => {
    const gems = keyBy(
      this.game.gems.filter((g) => isOnPlayerBoard(g.location)),
      (g) => (g.location as OnPlayerBoard).player
    )

    const trading = getTrades(this.game)

    // for each tie, order coins by value (to exchange it)
    const orderedCoinsByGemValues = mapValues(trading, (values) => {
      return orderBy(values, (v) => Gems[gems[(v.location as OnPlayerBoard).player].id].value)
    })

    const moves = []
    const keys = Object.keys(orderedCoinsByGemValues)
    for (const key of keys) {
      // If there is a tie (more than one player with same coin value
      if (orderedCoinsByGemValues[key].length > 1) {
        moves.push(...this.getGemExchangesMoves(orderedCoinsByGemValues[key], gems))
      }
    }

    return moves
  }

  onMoveGem(move: MoveGem): (Move | MoveView)[] {
    const gem = this.game.gems.find((g) => isOnPlayerBoard(g.location) && g.id === move.id)

    if (!gem) {
      throw new Error('There is an error while fetching the moved gem. This gem is not on player board')
    }

    const playersById = keyBy(this.game.players, (p) => p.id)
    const player = playersById[move.player]
    player.traded = true
    gem.location = move.target

    // Group coins by values (to see tie)
    const trades = values(getTrades(this.game))
    // Maybe not so good in perf, but no good solution yet
    if (
      trades.every(
        (trade) =>
          // There is only one player with the coin value
          trade.length === 1 ||
          // Or all trades that must be done were done
          trade.every((c) => playersById[(c.location as OnPlayerBoard).player].traded)
      )
    ) {
      return mayGoToNextTavern(this.game)
    }

    return []
  }
}

export { GemTradeRules }
