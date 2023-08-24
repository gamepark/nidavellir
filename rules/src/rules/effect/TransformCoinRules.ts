import { isMoveItemType, ItemMove, MaterialItem, MaterialMove } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { CoinColor } from "../../coins/CoinDescription";
import { LocationType } from "../../material/LocationType";
import { Coins } from "../../coins/Coins";
import { ExchangeCoin } from "../helpers/ExchangeCoin";
import { Effect, Memory } from "../Memory";
import { EffectRule } from "./EffectRule";

export class TransformCoinRules extends EffectRule {

  onRuleEnd() {
    if (this.remind<Effect>(Memory.Effect) === this.game.rule?.id) this.forget(Memory.Effect)
    this.forget(Memory.TransformBonus)
    return []
  }

  getPlayerMoves() {
    return this
      .material(MaterialType.Coin)
      .player(this.player)
      .moveItems((item: MaterialItem) => {
        const coin = Coins[item.id]
        return { location: { type: coin.color === CoinColor.Bronze ? LocationType.Discard : LocationType.Treasure } }
      })
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move) && move.position.location?.type !== LocationType.PlayerHand && move.position.location?.type !== LocationType.PlayerBoard) {
      const coin = this.material(MaterialType.Coin).getItem(move.itemIndex)!
      this.memorize(Memory.TransformedCoinLocation, coin.location)
      this.memorize(Memory.DiscardedCoin, { tavern: coin.location.x, index: move.itemIndex })
    }

    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move) && move.position.location?.type !== LocationType.PlayerHand && move.position.location?.type !== LocationType.PlayerBoard) {
      const location = this.remind(Memory.TransformedCoinLocation)
      const playerCoins = this.material(MaterialType.Coin).player(location.player)
      this.forget(Memory.TransformedCoinLocation)
      const moves: MaterialMove[] = new ExchangeCoin(this.game, playerCoins.index(move.itemIndex), this.additionalValue)
        .treasureCoin
        .moveItems({ location })

      if (location.type === LocationType.PlayerHand) {
        moves.push(playerCoins.location(LocationType.PlayerHand).shuffle())
      }

      moves.push(...this.moveToPreviousRule)
      return moves
    }

    return []
  }

  get additionalValue() {
    return this.remind(Memory.TransformBonus)
  }
}
