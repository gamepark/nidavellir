import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { LocationType } from '../state/Location';
import { isInDiscard, isInTreasure, isSameCoinLocation } from '../utils/location.utils';
import { Coins } from '../coins/Coins';
import { moveKnownCoinMove, revealCoinMove } from '../moves/MoveCoin';
import { getTreasureCoinForValue, getTreasureCoins } from '../utils/coin.utils';
import { CoinColor } from '../coins/Coin';
import { maxBy, sumBy } from 'lodash';
import { TradeCoins } from '../moves/TradeCoins';
import MoveView from '../moves/MoveView';

export class TradeCoinBaseRules extends EffectRules {
  play(move: Move) {
    switch (move.type) {
      case MoveType.TradeCoins:
        return this.onTradeCoins(move);
    }

    return [];
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    if (this.delegates().length) {
      return super.getAutomaticMoves();
    }

    return this.getEffectAutomaticMoves();
  }

  getEffectAutomaticMoves(): (Move | MoveView)[] {
    return [];
  }

  onTradeCoins = (move: TradeCoins): (Move | MoveView)[] => {
    const coins = move.ids;
    const maximumCoin = maxBy(coins, (c) => Coins[c].value)!;
    const maximumCoinIndex = coins.indexOf(maximumCoin);
    const coin = Coins[maximumCoin];

    const moves = move.ids.map((i) => revealCoinMove(i));

    if (coin.color === CoinColor.Bronze) {
      // Discard bronze coin
      moves.push(
        moveKnownCoinMove(maximumCoin, {
          type: LocationType.Discard,
          index: this.game.coins.filter((c) => isInDiscard(c.location)).length,
        })
      );
    } else {
      // Set treasure coin to treasure
      const numberOfCoinOfThisValues = this.game.coins.filter(
        (c) => isInTreasure(c.location) && Coins[c.id!].value === coin.value
      ).length;
      moves.push(
        moveKnownCoinMove(maximumCoin, {
          type: LocationType.Treasure,
          z: numberOfCoinOfThisValues,
        })
      );
    }

    const value = sumBy(coins, (c) => Coins[c].value);
    const treasureCoin = getTreasureCoinForValue(getTreasureCoins(this.game), value);
    const actualMaximumCoin = this.game.coins.find(
      (c) => c.id === maximumCoin || (move.sources && isSameCoinLocation(c.location, move.sources[maximumCoinIndex]))
    )!;

    // Get the treasure coin,
    moves.push(moveKnownCoinMove(treasureCoin.id!, actualMaximumCoin.location));

    this.player.effects.shift();
    return moves;
  };
}
