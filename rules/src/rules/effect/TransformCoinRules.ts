import { isMoveItemType, ItemMove, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { CoinColor } from '../../coins/CoinDescription'
import { Coins } from '../../coins/Coins'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { isExchangeCoin } from '../../utils/coin.utils'
import { ExchangeCoin } from '../helpers/ExchangeCoin'
import { Memory } from '../Memory'
import { EffectRule } from './EffectRule'

export class TransformCoinRules extends EffectRule {

  onRuleEnd() {
    this.forget(Memory.TransformBonus)
    return []
  }

  getPlayerMoves() {
    return this
      .material(MaterialType.Coin)
      .player(this.player)
      .filter((item) => !isExchangeCoin(item))
      .moveItems((item: MaterialItem) => {
        const coin = Coins[item.id]
        if (coin.color === CoinColor.Bronze) return { type: LocationType.Discard, id: MaterialType.Coin }
        return { type: LocationType.Treasure }
      })
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move) && move.location.type !== LocationType.Hand && move.location.type !== LocationType.PlayerBoard) {
      const coin = this.material(MaterialType.Coin).getItem(move.itemIndex)!
      this.memorize(Memory.TransformedCoinItemLocation, coin.location)

      if (!this.previousRule && this.tavern === coin.location.id) {
        this.memorize(Memory.DiscardedCoin, { tavern: coin.location.id, id: coin.id }, this.player)
      }
    }

    return []
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get previousRule() {
    return this.remind(Memory.PreviousRule)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move)) {

      if (move.location.type !== LocationType.Hand && move.location.type !== LocationType.PlayerBoard) {
        const location = this.transformedCoinLocation
        this.forget(Memory.TransformedCoinItemLocation)
        const moves: MaterialMove[] = new ExchangeCoin(this.game, this.material(MaterialType.Coin).index(move.itemIndex), this.additionalValue)
          .treasureCoin
          .moveItems(location)

        if (location.type === LocationType.Hand) {
          moves.push(this.material(MaterialType.Coin).player(location.player).location(LocationType.Hand).shuffle())
        }

        return moves
      }

      return this.end
    }

    return []
  }

  get transformedCoinLocation() {
    return this.remind<Location>(Memory.TransformedCoinItemLocation)
  }

  get additionalValue() {
    return this.remind(Memory.TransformBonus)
  }
}
