import { isMoveItemType, ItemMove, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import keyBy from 'lodash/keyBy'
import values from 'lodash/values'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerBoardSpace } from '../material/PlayerBoardSpace'
import { Tavern } from './helpers/Tavern'
import { Trade } from './helpers/Trade'
import { Memory } from './Memory'

class GemTradeRules extends MaterialRulesPart {
  onRuleStart() {
    const gems: Record<string, MaterialItem> = keyBy(
      this.material(MaterialType.Gem).location(LocationType.PlayerBoard).getItems(),
      (g) => g.location.player!
    )

    const trading = new Trade(this.game).trades

    const moves = []
    const keys = Object.keys(trading)
    for (const key of keys) {
      // If there is a tie (more than one player with same coin value
      if (trading[key].length > 1) {
        moves.push(...this.getGemExchangesMoves(trading[key], gems))
      }
    }

    return moves
  }

  get allTraded() {
    const trading = new Trade(this.game).trades
    const trades = values(trading)
    return trades.every(
      (trade) =>
        // There is only one player with the coin value
        trade.every((c) => this.remind(Memory.Trade, this.material(MaterialType.Coin).getItem(c)!.location.player))
    )
  }

  getGemExchangesMoves(coins: number[], gemByPlayer: Record<number, MaterialItem>): MaterialMove[] {
    // Create a reverses array (to prepare move computing)
    const reversed = coins.slice().reverse()
    // Get all players ordered by coin value (before reverse)
    const players = coins.map((c) => this.material(MaterialType.Coin).getItem(c)!.location.player!)

    // For each item in reversed item we get the same index in the non-reversed array to switch gems
    return reversed.flatMap((coin, index) => {
      const item = this.material(MaterialType.Coin).getItem(coin)!
      const newPlayer = item.location.player!
      return this.material(MaterialType.Gem).id(gemByPlayer[players[index]].id)
        .moveItems({ type: LocationType.PlayerBoard, id: PlayerBoardSpace.Gem, player: newPlayer })
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Gem)(move)) return []

    this.memorize(Memory.Trade, true, move.location.player)
    if (!this.allTraded) return []

    this.forget(Memory.Trade)
    return new Tavern(this.game).end
  }
}

export { GemTradeRules }
