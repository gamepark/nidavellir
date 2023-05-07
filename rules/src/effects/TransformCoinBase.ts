import EffectRules from './EffectRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { LocationType } from '../state/Location'
import { isInDiscard, isInTreasure, isOnPlayerBoard, isSameCoinLocation } from '../utils/location.utils'
import { Coins } from '../coins/Coins'
import { CoinColor } from '../coins/Coin'
import { moveCoinAndHideMove, moveKnownCoinMove, revealCoinMove } from '../moves/MoveCoin'
import { getTreasureCoinForValue, getTreasureCoins, isExchangeCoin } from '../utils/coin.utils'
import { TransformCoin, transformCoinMove } from '../moves/TransformCoin'
import { TransformCoinEffect } from './types/TransformCoinEffect'
import { LocatedCoin } from '../state/LocatedCoin'

export class TransformCoinBaseRules extends EffectRules {
  get effect(): TransformCoinEffect {
    return this.player.effects[0] as TransformCoinEffect
  }

  getPlayerMoves(): (Move | MoveView)[] {
    return this.game.coins
      .filter(
        (c) => isOnPlayerBoard(c.location) && c.location.player === this.player.id && !isExchangeCoin(c as LocatedCoin)
      )
      .flatMap((c) => transformCoinMove(c.id!, this.player.id))
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.TransformCoin:
        return this.onTransformCoin(move)
    }

    return []
  }

  onTransformCoin(move: TransformCoin): (Move | MoveView)[] {
    const id = move.id
    const locatedCoin = this.game.coins.find((c) =>
      c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCoinLocation(move.source!, c.location)
    )!

    const coin = Coins[id]
    const moves = []
    const nextDiscardIndex = this.game.coins.filter((c) => isInDiscard(c.location)).length

    if (locatedCoin.hidden) {
      moves.push(revealCoinMove(id, this.player.id))
    }

    if (coin.color === CoinColor.Bronze) {
      moves.push(
        moveKnownCoinMove(id, {
          type: LocationType.Discard,
          index: nextDiscardIndex
        }, this.player.id)
      )
    } else {
      const numberOfCoinOfThisValues = this.game.coins.filter(
        (c) => isInTreasure(c.location) && Coins[c.id!].value === coin.value
      ).length
      moves.push(
        moveKnownCoinMove(id, {
          type: LocationType.Treasure,
          z: numberOfCoinOfThisValues
        }, this.player.id)
      )
    }

    const treasureCoin = getTreasureCoinForValue(getTreasureCoins(this.game), coin.value + this.effect.additionalValue)
    const operation = locatedCoin.hidden ? moveCoinAndHideMove : moveKnownCoinMove
    moves.push(operation(treasureCoin.id!, locatedCoin.location, this.player.id))

    const treasureCoinIndex = this.game.coins.findIndex((c) => c === treasureCoin)
    const locatedCoinIndex = this.game.coins.findIndex((c) =>
      c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCoinLocation(move.source!, c.location)
    )!

    this.shuffleCoins(moves, move, locatedCoinIndex, treasureCoinIndex)
    this.player.effects.shift()
    return moves
  }


  protected shuffleCoins(_moves: (Move | MoveView)[], _move: TransformCoin, _replacedCoinIndex: number, _treasureCoinIndex: number) {

  }
}
