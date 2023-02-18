import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import MoveType from '../moves/MoveType';
import { LocationType } from '../state/Location';
import { isInDiscard, isInTreasure, isOnPlayerBoard, isSameCoinLocation } from '../utils/location.utils';
import { Coins } from '../coins/Coins';
import { CoinColor } from '../coins/Coin';
import { moveKnownCoinMove, revealCoinMove } from '../moves/MoveCoin';
import { getTreasureCoinForValue, getTreasureCoins, isExchangeCoin } from '../utils/coin.utils';
import { TransformCoin, transformCoinMove } from '../moves/TransformCoin';
import { TransformCoinEffect } from './types/TransformCoinEffect';
import { LocatedCoin } from '../state/LocatedCoin';

export class TransformCoinBaseRules extends EffectRules {
  get effect(): TransformCoinEffect {
    return this.player.effects[0] as TransformCoinEffect;
  }

  getPlayerMoves(): (Move | MoveView)[] {
    return this.game.coins
      .filter((c) => {
        isOnPlayerBoard(c.location) && c.location.player === this.player.id && console.log(c);
        return isOnPlayerBoard(c.location) && c.location.player === this.player.id && !isExchangeCoin(c as LocatedCoin);
      })
      .flatMap((c) => transformCoinMove(c.id!));
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.TransformCoin:
        return this.onTransformCoin(move);
    }

    return [];
  }

  onTransformCoin(move: TransformCoin): (Move | MoveView)[] {
    const id = move.id;
    const locatedCoin = this.game.coins.find((c) =>
      c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCoinLocation(move.source!, c.location)
    )!;
    const coin = Coins[locatedCoin.id!];

    const moves = [];
    const nextDiscardIndex = this.game.coins.filter((c) => isInDiscard(c.location)).length;

    if (locatedCoin.hidden) {
      moves.push(revealCoinMove(id));
    }

    if (coin.color === CoinColor.Bronze) {
      moves.push(
        moveKnownCoinMove(id, {
          type: LocationType.Discard,
          index: nextDiscardIndex,
        })
      );
    } else {
      const numberOfCoinOfThisValues = this.game.coins.filter(
        (c) => isInTreasure(c.location) && Coins[c.id!].value === coin.value
      ).length;
      moves.push(
        moveKnownCoinMove(id, {
          type: LocationType.Treasure,
          z: numberOfCoinOfThisValues,
        })
      );
    }

    const treasureCoin = getTreasureCoinForValue(getTreasureCoins(this.game), coin.value + this.effect.additionalValue);
    moves.push(moveKnownCoinMove(treasureCoin.id!, locatedCoin.location));

    this.player.effects.shift();
    return moves;
  }
}
