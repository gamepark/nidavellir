import { isMoveItemType, ItemMove, MaterialItem, MaterialMove } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { CoinColor } from "../../coins/CoinDescription";
import { LocationType } from "../../material/LocationType";
import { Coins } from "../../coins/Coins";
import { ExchangeCoin } from "../helpers/ExchangeCoin";
import { Memory } from "../Memory";
import { EffectRule } from "./EffectRule";
import { isExchangeCoin } from "../../utils/coin.utils";

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
        return { location: { type: coin.color === CoinColor.Bronze ? LocationType.Discard : LocationType.Treasure } }
      })
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move) && move.position.location?.type !== LocationType.Hand && move.position.location?.type !== LocationType.PlayerBoard) {
      const coin = this.material(MaterialType.Coin).getItem(move.itemIndex)!
      this.memorize(Memory.TransformedCoinLocation, coin.location)
      this.memorize(Memory.DiscardedCoin, { tavern: coin.location.x, index: move.itemIndex }, this.player)
    }

    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move) && move.position.location?.type !== LocationType.Hand && move.position.location?.type !== LocationType.PlayerBoard) {
      const location = this.transformedCoinLocation
      this.forget(Memory.TransformedCoinLocation)
      const moves: MaterialMove[] = new ExchangeCoin(this.game, this.material(MaterialType.Coin).index(move.itemIndex), this.additionalValue)
        .treasureCoin
        .moveItems({ location })

      if (location.type === LocationType.Hand) {
        moves.push(this.material(MaterialType.Coin).player(location.player).location(LocationType.Hand).shuffle())
      }

      moves.push(...this.end)
      return moves
    }

    return []
  }

  get transformedCoinLocation() {
    return this.remind(Memory.TransformedCoinLocation)
  }

  get additionalValue() {
    return this.remind(Memory.TransformBonus)
  }
}
