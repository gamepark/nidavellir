import { CustomMove, isCustomMoveType, ItemPosition } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { Card } from "../../material/Card";
import { LocationType } from "../../material/LocationType";
import maxBy from "lodash/maxBy";
import { Coins } from "../../coins/Coins";
import { CoinColor } from "../../coins/CoinDescription";
import ElvalandTurn from "../helpers/ElvalandTurn";
import { ExchangeCoin } from "../helpers/ExchangeCoin";
import { isExchangeCoin } from "../../utils/coin.utils";
import { CustomMoveType } from "../../moves/CustomMoveType";
import { EffectRule } from "./EffectRule";

export class TradeCoinRules extends EffectRule {

  onRuleStart() {
    if (this.hasUline) return []

    const pouch = this.pouch
    return [
      ...pouch.moveItems({ rotation: {} }),
      this.rules().customMove(CustomMoveType.TradeCoins, pouch)
    ]
  }

  getPlayerMoves() {
    if (this.hasUline) {
      const combinations = getCombinations(this.tradableCoins.getIndexes(), 2)
      return combinations.map((indexes) => this.rules().customMove(CustomMoveType.TradeCoins, indexes))
    }

    return []
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.TradeCoins)(move)) {
      // Here is the reveal of token
      const hiddenCoins = this.material(MaterialType.Coin).rotation((rotation) => !!rotation?.y).length
      if (hiddenCoins) return []

      const tradedCoinsIndexes: number[] = move.data
      const tradedCoins = this.material(MaterialType.Coin).indexes(tradedCoinsIndexes)
      const maximumCoin = maxBy(tradedCoinsIndexes, (c) => Coins[tradedCoins.getItem(c)!.id].value)!
      const maximumCoinItem = tradedCoins.getItem(maximumCoin)!;
      const coin = Coins[maximumCoinItem.id]

      const moves = []
      const destination: Partial<ItemPosition> = { location: { type: coin.color === CoinColor.Bronze ? LocationType.Discard : LocationType.Treasure } }

      moves.push(tradedCoins.index(maximumCoin).moveItem(destination))

      const treasureCoin = new ExchangeCoin(this.game, tradedCoins).treasureCoin

      const notTradedCoinIndex = tradedCoinsIndexes.find((index) => index !== maximumCoin)!
      const newCoins = this.material(MaterialType.Coin).indexes([notTradedCoinIndex, maximumCoin])
      moves.push(treasureCoin.moveItem({ location: maximumCoinItem.location, rotation: { y: 1 } }))
      moves.push(newCoins.moveItem({ rotation: { y: 1 } }))
      moves.push(newCoins.shuffle())
      moves.push(...new ElvalandTurn(this.game, this.player).endOfTurnMoves)

      moves.push(...this.moveToPreviousRule)
      return moves
    }

    return []
  }

  get pouch() {
    return this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.Tavern && location.x! > 2)
  }

  get hasUline(): boolean {
    return !!this.material(MaterialType.Card).id(({ front }: Record<string, any>) => front === Card.Uline).length
  }

  get tradableCoins() {
    return this.material(MaterialType.Coin).player(this.player).filter((item) => !isExchangeCoin(item.id))
  }
}

const getCombinations = <T>(array: T[], size: number): T[][] => {
  let i, j, combs, head, tailcombs
  if (size > array.length || size <= 0) {
    return []
  }
  if (size == array.length) {
    return [array]
  }
  if (size == 1) {
    combs = []
    for (i = 0; i < array.length; i++) {
      combs.push([array[i]])
    }
    return combs
  }
  combs = []
  for (i = 0; i < array.length - size + 1; i++) {
    head = array.slice(i, i + 1)
    tailcombs = getCombinations(array.slice(i + 1), size - 1)
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}
