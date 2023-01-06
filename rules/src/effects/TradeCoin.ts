import EffectRules from './EffectRules';
import { EffectType } from './EffectType';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { LocationType } from '../state/Location';
import { isInDiscard, isInTreasure, isOnPlayerBoard } from '../utils/location.utils';
import { getActivePlayer, isLocatedCoin } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { MoveCoin, moveKnownCoinMove, revealCoinMove } from '../moves/MoveCoin';
import {
  getPlayerCoinForTavern,
  getPlayerPouch,
  getTreasureCoinForValue,
  getTreasureCoins,
  isCoinHidden,
} from '../utils/coin.utils';
import { LocatedCoin } from '../state/LocatedCoin';
import { CoinColor } from '../coins/Coin';
import { maxBy } from 'lodash';
import { OnPlayerBoard } from '../state/CommonLocations';

export type TradeCoin = {
  type: EffectType.TRADE_COIN;
};

export class TradeCoinRules extends EffectRules {
  getAutomaticMoves(): Move[] {
    const activePlayer = getActivePlayer(this.state);

    if (activePlayer) {
      const tavern = this.state.tavern;
      const revealedCoin = getPlayerCoinForTavern(this.state, activePlayer.id, tavern);

      if (!isLocatedCoin(revealedCoin)) {
        throw new Error('There is an issue when searching the revealed coin. It is undefined or secret.');
      }

      if (!Coins[revealedCoin.id].value) {
        const pouch = getPlayerPouch(this.state, activePlayer.id);
        if (pouch.some(isCoinHidden)) {
          const maximumCoin = maxBy(pouch, (p) => Coins[p.id!].value)!;
          const coin = Coins[maximumCoin.id!];

          const moves = pouch.map((c) => {
            // Reveal the pouch
            return revealCoinMove(c.id!);
          });

          if (coin.color === CoinColor.Bronze) {
            // Discard bronze coin
            moves.push(
              moveKnownCoinMove((maximumCoin as LocatedCoin).id, {
                type: LocationType.Discard,
                index: this.state.coins.filter((c) => isInDiscard(c.location)).length,
              })
            );
          } else {
            // Set treasure coin to treasure
            const numberOfCoinOfThisValues = this.state.coins.filter(
              (c) => isInTreasure(c.location) && Coins[c.id!].value === coin.value
            ).length;
            moves.push(
              moveKnownCoinMove((maximumCoin as LocatedCoin).id!, {
                type: LocationType.Treasure,
                z: numberOfCoinOfThisValues,
              })
            );
          }

          const value = coin.value + Coins[pouch.find((c) => c.id !== maximumCoin.id)!.id!].value;
          const treasureCoin = getTreasureCoinForValue(getTreasureCoins(this.state), value);

          // Get the treasure coin,
          moves.push(
            moveKnownCoinMove(treasureCoin.id!, {
              type: LocationType.PlayerBoard,
              player: this.player.id,
              index: (maximumCoin.location as OnPlayerBoard).index,
            })
          );

          return moves;
        }
      }
    }

    return super.getAutomaticMoves();
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.MoveCoin:
        return this.onMoveCoin(move);
    }

    return [];
  }

  onMoveCoin(move: MoveCoin) {
    if (move.target && isOnPlayerBoard(move.target) && this.player.discarded?.coin !== undefined) {
      //delete this.player.discarded;
      this.player.effects.shift();
    }

    return [];
  }
}
