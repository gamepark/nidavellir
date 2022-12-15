import EffectRules from './EffectRules';
import { EffectType } from './EffectType';
import Move from '../moves/Move';
import MoveView, { isView } from '../moves/MoveView';
import MoveType from '../moves/MoveType';
import { LocationType } from '../state/Location';
import { isInDiscard, isInTreasure, isOnPlayerBoard } from '../utils/location.utils';
import { getActivePlayer } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { CoinColor } from '../coins/Coin';
import { MoveCoin, moveCoinAndRevealMove, moveKnownCoinMove } from '../moves/MoveCoin';
import GameState from '../state/GameState';
import { getTreasureCoinForValue, getTreasureCoins } from '../utils/coin.utils';
import { getCurrentTavern } from '../utils/tavern.utils';
import GameView from '../state/view/GameView';
import { PlayerId } from '../state/Player';

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
        const coinMove = c.hidden ? moveCoinAndRevealMove : moveKnownCoinMove;
        if (coin.color === CoinColor.Bronze) {
          return coinMove(c.id!, {
            type: LocationType.Discard,
            index: nextDiscardIndex,
          });
        } else {
          return coinMove(c.id!, {
            type: LocationType.Treasure,
          });
        }
      });
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCoin:
        return this.onDiscardCoin(move);
    }

    return [];
  }

  hasPlayerFlipped0Coin = (state: GameState | GameView, lastTavern: number, playerId: PlayerId) => {
    for (let i = 0; i <= lastTavern; i++) {
      const coin = state.coins.find(
        (c) => isOnPlayerBoard(c.location) && c.location.index === i && c.location.player === playerId
      );
      if (coin && Coins[coin.id!].value === 0) {
        return true;
      }
    }

    return false;
  };

  onDiscardCoin = (move: MoveCoin) => {
    if (move.target && isOnPlayerBoard(move.target) && this.player.discarded?.coin !== undefined) {
      const coin = this.state.coins.find((c) => c.id === move.id)!;
      const tavern = getCurrentTavern(this.state, false);

      console.log('Current tavern', tavern);
      console.log('Coin tavern', move.target.index);
      if (
        move.target.index !== undefined &&
        move.target.index > tavern &&
        (move.target.index < 3 || !this.hasPlayerFlipped0Coin(this.state, tavern, this.player.id))
      ) {
        if (isView(this.state) && this.state.playerId !== move.target.player) {
          delete coin.id;
        }

        coin.hidden = true;
      }
      this.player.effects.shift();
      return [];
    }

    if (!move.target || (!isInDiscard(move.target) && !isInTreasure(move.target))) {
      // Needed, instead if there is a trade coin effect before, consequence (getting a coin from treasure) will be treated as this effect
      return [];
    }

    if (move.id === undefined) {
      throw new Error(`There is an issue while transforming a coin, the coin id is missing in move in view.`);
    }

    const game = this.game as GameState;
    const discardedCoin = game.coins.find((c) => c.id === move.id!);
    if (!discardedCoin) {
      throw new Error(`Impossible to find the discarded coins`);
    }

    const coin = Coins[move.id];
    const treasureCoin = getTreasureCoinForValue(
      getTreasureCoins(this.state),
      coin.value + this.effect.additionalValue
    );

    if (!treasureCoin) {
      throw new Error(`There is no coins available for ${coin.value + this.effect.additionalValue} value`);
    }

    const emptyBoardSpace = [0, 1, 2, 3, 4].find(
      (index) =>
        !this.state.coins.find(
          (c) => isOnPlayerBoard(c.location) && c.location.player === this.player.id && c.location.index === index
        )
    );

    if (emptyBoardSpace === undefined) {
      throw new Error(`Impossible to find where was the discarded coin`);
    }

    return [
      moveKnownCoinMove(treasureCoin.id!, {
        type: LocationType.PlayerBoard,
        player: this.player.id,
        index: emptyBoardSpace,
      }),
    ];
  };
}
