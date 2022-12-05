import EffectRules from './EffectRules';
import { EffectType } from './EffectType';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import MoveType from '../moves/MoveType';
import { LocationType } from '../state/Location';
import { isInDiscard, isOnPlayerBoard, isSameCoinLocation } from '../utils/location.utils';
import { getActivePlayer } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { CoinColor } from '../coins/Coin';
import { MoveCoin, moveCoinMove } from '../moves/MoveCoin';
import { OnPlayerBoard } from '../state/CommonLocations';
import GameState from '../state/GameState';
import { getTreasureCoinForValue, getTreasureCoins } from '../utils/coin.utils';

export type TransformCoin = {
  type: EffectType.TRANSFORM_COIN;
  additionalValue: number;
};

export class TransformCoinRules extends EffectRules {
  get effect(): TransformCoin {
    return this.player.effects[0] as TransformCoin;
  }

  getPlayerMoves(): (Move | MoveView)[] {
    const activePlayer = getActivePlayer(this.state);
    if (activePlayer.id !== this.player.id) {
      return [];
    }

    const nextDiscardIndex = this.state.coins.filter((c) => isInDiscard(c.location)).length;
    return this.state.coins
      .filter((c) => isOnPlayerBoard(c.location) && c.location.player === this.player.id && Coins[c.id!].value)
      .flatMap((c) => {
        const coin = Coins[c.id!];
        if (coin.color === CoinColor.Bronze) {
          return moveCoinMove(c.id!, {
            type: LocationType.Discard,
            index: nextDiscardIndex,
          });
        } else {
          return moveCoinMove(c.id!, {
            type: LocationType.Treasure,
          });
        }
      });
  }

  play(move: Move | MoveView) {
    if (move.type !== MoveType.MoveCoin) {
      return;
    }

    this.onDiscardCoin(move);
  }

  onDiscardCoin = (move: MoveCoin) => {
    if (move.id === undefined) {
      throw new Error(`There is an issue while transforming a coin, the coin id is missing in move in view.`);
    }

    const game = this.state as GameState;
    const discardedCoin = game.coins.find((c) =>
      move.id !== undefined
        ? isOnPlayerBoard(c.location) && c.id === move.id
        : isSameCoinLocation(c.location, move.source!)
    );

    if (!discardedCoin) {
      throw new Error(`Impossible to find the discarded coins`);
    }

    discardedCoin.hidden = false;

    const actualCoinLocation = discardedCoin.location as OnPlayerBoard;
    const coin = Coins[move.id];
    const treasureCoin = getTreasureCoinForValue(
      getTreasureCoins(this.state),
      coin.value + this.effect.additionalValue
    );

    if (!treasureCoin) {
      throw new Error(`There is no coins available for ${coin.value + this.effect.additionalValue} value`);
    }

    this.state.nextMoves.push(
      moveCoinMove(treasureCoin.id!, {
        type: LocationType.PlayerBoard,
        player: actualCoinLocation.player,
        index: actualCoinLocation.index,
      })
    );

    this.player.effects.shift();
  };
}
