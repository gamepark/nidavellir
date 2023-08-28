import { LocationType } from '../material/LocationType'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import values from 'lodash/values'
import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialItem, MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { Trade } from "./helpers/Trade";
import { Memory } from "./Memory";
import { CustomMoveType } from "../moves/CustomMoveType";
import { MaterialType } from "../material/MaterialType";
import { Tavern } from "./helpers/Tavern";
import { PlayerBoardSpace } from "../material/PlayerBoardSpace";

class GemTradeRules extends MaterialRulesPart {
  onRuleStart() {
    return [this.rules().customMove(CustomMoveType.TradeGems)]
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

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.TradeGems)(move)) {
      const gems: Record<string, MaterialItem> = keyBy(
        this.material(MaterialType.Gem).location(LocationType.PlayerBoard).getItems(),
        (g) => g.location.player!
      )

      const trading = new Trade(this.game).trades

      // for each tie, order coins by value (to exchange it)
      const orderedCoinsByGemValues = mapValues(trading, (values) => {
        return orderBy(values, (v) => {
          const player = this.material(MaterialType.Coin).index(v).getItem()!.location.player
          return this.material(MaterialType.Gem).player(player).getItem()!.id;
        })
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

    return []
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
      return this.material(MaterialType.Gem).id(gemByPlayer[players[index]].id).moveItems({ location: { type: LocationType.PlayerBoard, id: PlayerBoardSpace.Gem, player: newPlayer }})
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Gem)(move)) return []

    this.memorize(Memory.Trade, true, move.position.location?.player)
    if (!this.allTraded) return []

    console.log("Trade", this.allTraded, this.remind(Memory.Trade), new Tavern(this.game).end)
    this.forget(Memory.Trade)
    return new Tavern(this.game).end
  }
}

export { GemTradeRules }
