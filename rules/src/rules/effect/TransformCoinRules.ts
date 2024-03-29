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

      // persist only if the coin is visible & for the current location
      if (coin.location.rotation && this.tavern === coin.location.id) {
        this.memorize(Memory.DiscardedCoin, { tavern: coin.location.id, id: coin.id }, this.player)
      }
    }

    return []
  }


  saveCoins(oldCoin: MaterialItem, newCoin: MaterialItem) {
    const oldCoinValue = Coins[oldCoin.id].value
    const newCoinValue = Coins[newCoin.id].value
    this.memorize(Memory.MaxCoinId, (maximumCoin) => newCoinValue > Coins[maximumCoin].value? newCoin.id: maximumCoin, this.player)
    this.memorize(Memory.TotalCoinValue, (total = 0) => total - oldCoinValue + newCoinValue, this.player)
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move)) {

      if (move.location.type !== LocationType.Hand && move.location.type !== LocationType.PlayerBoard) {
        const location = this.transformedCoinLocation
        this.forget(Memory.TransformedCoinItemLocation)
        const oldCoin =  this.material(MaterialType.Coin).index(move.itemIndex)
        const newCoin = new ExchangeCoin(this.game, oldCoin, this.additionalValue).treasureCoin
        const moves: MaterialMove[] = newCoin.moveItems(location)
        this.saveCoins(oldCoin.getItem()!, newCoin.getItem()!)

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
