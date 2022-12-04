import EffectRules from './EffectRules';
import { EffectType } from './EffectType';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import MoveType from '../moves/MoveType';
import { PlayerId } from '../state/Player';
import { LocationType } from '../state/Location';
import { isInDiscard, isInTreasure, isOnPlayerBoard } from '../utils/location.utils';
import { getActivePlayer } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { CoinColor } from '../coins/Coin';
import { moveCoinMove } from '../moves/MoveCoin';
import { OnPlayerBoard } from '../state/CommonLocations';

export type TransformCoin = {
  type: EffectType.TRANSFORM_COIN;
  additionalValue: number;
};

export class TransformCoinRules extends EffectRules {
  get effect(): TransformCoin {
    return this.player.effects[0] as TransformCoin;
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const activePlayer = getActivePlayer(this.state);
    if (activePlayer.id !== playerId) {
      return [];
    }

    const nextDiscardIndex = this.state.coins.filter((c) => isInDiscard(c.location)).length;
    return this.state.coins
      .filter((c) => isOnPlayerBoard(c.location) && c.location.player === playerId && Coins[c.id!].value)
      .flatMap((c) => {
        const coin = Coins[c.id!];
        if (coin.color === CoinColor.Bronze) {
          return moveCoinMove(
            {
              type: LocationType.Discard,
              index: nextDiscardIndex,
            },
            c.id!
          );
        } else {
          return moveCoinMove(
            {
              type: LocationType.Treasure,
            },
            c.id!
          );
        }
      });
  }

  play(move: Move | MoveView) {
    if (move.type === MoveType.MoveCoin) {
      const coin = Coins[move.id!];
      // TODO: take superior or inferior coin if there is no equal value available (MOVE IT TO A FUNCTION
      const treasureCoin = this.state.coins.find(
        (c) => isInTreasure(c.location) && Coins[c.id!].value === coin.value + this.effect.additionalValue
      )!;

      if (!treasureCoin) {
        throw new Error(`There is no coins available for ${coin.value + this.effect.additionalValue} value`);
      }

      const actualCoinLocation = this.state.coins.find((c) => isOnPlayerBoard(c.location) && c.id === move.id)!
        ?.location as OnPlayerBoard;
      if (!actualCoinLocation) {
        throw new Error(`Impossible to find the discarded coins`);
      }

      this.state.nextMoves.push(
        moveCoinMove(
          {
            type: LocationType.PlayerBoard,
            player: actualCoinLocation.player,
            index: actualCoinLocation.index,
          },
          treasureCoin.id!
        )
      );

      this.player.effects.shift();
    }
  }
}
