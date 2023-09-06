import { CustomMove, isCustomMoveType, ItemPosition } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import maxBy from "lodash/maxBy";
import { Coins } from "../../coins/Coins";
import { CoinColor } from "../../coins/CoinDescription";
import { ExchangeCoin } from "../helpers/ExchangeCoin";
import { CustomMoveType } from "../../moves/CustomMoveType";
import { EffectRule } from "./EffectRule";
import { Card } from "../../cards/Cards";
import { PlayerBoardSpace } from "../../material/PlayerBoardSpace";

export class TradeCoinRules extends EffectRule {

  onRuleStart() {
    if (this.hasUline) {
      const coins = this.handCoins
      if (coins.length === 2) {
        return [
          this.rules().customMove(CustomMoveType.TradeCoins, coins.getIndexes())
        ]
      }

      return []
    }

    const pouch = this.pouch
    return [
      this.rules().customMove(CustomMoveType.TradeCoins, pouch.getIndexes())
    ]
  }

  getPlayerMoves() {
    if (this.hasUline) {
      const combinations = getCombinations(this.handCoins.getIndexes(), 2)
      return combinations.map((indexes) => this.rules().customMove(CustomMoveType.TradeCoins, indexes))
    }

    return []
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.TradeCoins)(move)) return []
    delete this.game.droppedItem

    // Here is the reveal of token
    const hiddenCoins = this
      .material(MaterialType.Coin)
      .indexes(move.data)
      .rotation((rotation) => !rotation?.y)

    if (hiddenCoins.length) {
      return [
        ...hiddenCoins.moveItems({ rotation: { y: 1 }}),
        move
      ]
    }
    const tradedCoinsIndexes: number[] = move.data
    const tradedCoins = this.material(MaterialType.Coin).indexes(tradedCoinsIndexes)
    const maximumCoin = maxBy(tradedCoinsIndexes, (c) => Coins[tradedCoins.getItem(c)!.id].value)!
    const maximumCoinItem = tradedCoins.getItem(maximumCoin)!;
    const coin = Coins[maximumCoinItem.id]

    const moves = []
    const destination: Partial<ItemPosition> = { location: { type: coin.color === CoinColor.Bronze ? LocationType.Discard : LocationType.Treasure } }
    const tradedPosition = {
      location: maximumCoinItem.location,
      rotation: maximumCoinItem.rotation
    }

    const exchangedCoin = tradedCoins.index(maximumCoin)
    moves.push(exchangedCoin.moveItem(destination))

    const treasureCoin = new ExchangeCoin(this.game, tradedCoins).treasureCoin

    const notTradedCoinIndex = tradedCoinsIndexes.find((index) => index !== maximumCoin)!
    const newCoins = this.material(MaterialType.Coin).indexes([notTradedCoinIndex, treasureCoin.getIndex()])

    moves.push(treasureCoin.moveItem(tradedPosition))
    moves.push(...newCoins.moveItems({ rotation : {} }))
    moves.push(newCoins.shuffle())
    moves.push(...this.end)
    return moves

  }

  get pouch() {
    return this
      .material(MaterialType.Coin)
      .player(this.player)
      .location((location) => location.type === LocationType.PlayerBoard && location.id >= PlayerBoardSpace.Pouch1)
  }

  get hasUline(): boolean {
    return !!this
      .material(MaterialType.Card)
      .player(this.player)
      .id(({ front }: Record<string, any>) => front === Card.Uline)
      .length
  }

  get handCoins() {
    return this
      .material(MaterialType.Coin)
      .location(LocationType.Hand)
      .player(this.player)
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
