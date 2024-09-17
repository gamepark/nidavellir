import { CustomMove, isCustomMoveType, Location, MaterialItem } from '@gamepark/rules-api'
import maxBy from 'lodash/maxBy'
import { Card } from '../../cards/Cards'
import { CoinColor } from '../../coins/CoinDescription'
import { Coins } from '../../coins/Coins'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerBoardSpace } from '../../material/PlayerBoardSpace'
import { CustomMoveType } from '../../moves/CustomMoveType'
import { ExchangeCoin } from '../helpers/ExchangeCoin'
import PlayerTurn from '../helpers/PlayerTurn'
import { Memory } from '../Memory'
import { EffectRule } from './EffectRule'

export class TradeCoinRules extends EffectRule {

  onRuleStart() {
    if (this.hasUline) {
      const coins = this.handCoins
      if (coins.length === 2) {
        return [
          this.customMove(CustomMoveType.TradeCoins, coins.getIndexes())
        ]
      }

      return []
    }

    const pouch = this.pouch
    return [
      this.customMove(CustomMoveType.TradeCoins, pouch.getIndexes())
    ]
  }

  getPlayerMoves() {
    if (this.hasUline) {
      const combinations = getCombinations(this.handCoins.getIndexes(), 2)
      return combinations.map((indexes) => this.customMove(CustomMoveType.TradeCoins, indexes))
    }

    return []
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.TradeCoins)(move)) return []
    delete this.game.droppedItem

    // Here is the reveal of token
    const hiddenCoins = this
      .material(MaterialType.Coin)
      .index(move.data)
      .rotation(rotation => !rotation)

    if (hiddenCoins.length) {
      return [
        ...hiddenCoins.rotateItems(true),
        move
      ]
    }
    const tradedCoinsIndexes: number[] = move.data
    const tradedCoins = this.material(MaterialType.Coin).index(tradedCoinsIndexes)
    const maximumCoin = maxBy(tradedCoinsIndexes, (c) => Coins[tradedCoins.getItem(c).id].value)!
    const maximumCoinItem = tradedCoins.getItem(maximumCoin)
    const coin = Coins[maximumCoinItem.id]

    const moves = []
    const location: Location = coin.color === CoinColor.Bronze ? {
      type: LocationType.Discard,
      id: MaterialType.Coin
    } : { type: LocationType.Treasure }

    const exchangedCoin = tradedCoins.index(maximumCoin)
    moves.push(exchangedCoin.moveItem(location))

    const treasureCoin = new ExchangeCoin(this.game, tradedCoins).treasureCoin

    const notTradedCoinIndex = tradedCoinsIndexes.find((index) => index !== maximumCoin)!
    const notTradedCoin = this.material(MaterialType.Coin).index(notTradedCoinIndex)
    const newCoins = this.material(MaterialType.Coin).index([notTradedCoinIndex, treasureCoin.getIndex()])

    moves.push(treasureCoin.moveItem(maximumCoinItem.location))
    moves.push(treasureCoin.moveItem({ ...maximumCoinItem.location, rotation: false }))
    moves.push(notTradedCoin.rotateItem(false))
    moves.push(newCoins.shuffle())
    moves.push(...this.end)
    this.saveCoins(treasureCoin.getItem()!, exchangedCoin.getItem()!)
    return moves
  }

  saveCoins(treasureCoin: MaterialItem, exchangedCoin: MaterialItem) {
    const treasureCoinValue = Coins[treasureCoin.id].value
    const exchangedCoinValue = Coins[exchangedCoin.id].value
    this.memorize(Memory.MaxCoinId, (maximumCoin) => treasureCoinValue > Coins[maximumCoin].value? treasureCoin.id: maximumCoin, this.player)
    this.memorize(Memory.TotalCoinValue, (total = 0) => total - exchangedCoinValue + treasureCoinValue, this.player)
  }

  get nextRules() {
    return new PlayerTurn(this.game, this.player).endOfTurnMoves
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
