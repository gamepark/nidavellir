import { isMoveItemType, ItemMove, ItemPosition, MaterialItem, MaterialMove } from "@gamepark/rules-api";
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
      this.memorize<ItemPosition>(Memory.TransformedCoinItemPosition, { location: coin.location, rotation: coin.rotation })
      this.memorize(Memory.DiscardedCoin, { tavern: coin.location.id, index: move.itemIndex }, this.player)
    }

    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move) && move.position.location?.type !== LocationType.Hand && move.position.location?.type !== LocationType.PlayerBoard) {
      const position = this.transformedCoinPosition
      this.forget(Memory.TransformedCoinItemPosition)
      const moves: MaterialMove[] = new ExchangeCoin(this.game, this.material(MaterialType.Coin).index(move.itemIndex), this.additionalValue)
        .treasureCoin
        .moveItems(position)

      if (position.location.type === LocationType.Hand) {
        moves.push(this.material(MaterialType.Coin).player(position.location.player).location(LocationType.Hand).shuffle())
      }

      moves.push(...this.end)
      return moves
    }

    return []
  }

  get transformedCoinPosition() {
    return this.remind<ItemPosition>(Memory.TransformedCoinItemPosition)
  }

  get additionalValue() {
    return this.remind(Memory.TransformBonus)
  }
}