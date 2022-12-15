import EffectRules from './EffectRules';
import { EffectType } from './EffectType';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { LocationType } from '../state/Location';
import { isInDiscard, isOnPlayerBoard } from '../utils/location.utils';
import { getActivePlayer, isLocatedCoin } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { MoveCoin, moveKnownCoinMove, revealCoinMove } from '../moves/MoveCoin';
import { getCurrentTavern } from '../utils/tavern.utils';
import {
  getPlayerCoinForTavern,
  getPlayerPouch,
  getTreasureCoinForValue,
  getTreasureCoins,
  isCoinHidden,
} from '../utils/coin.utils';
import { LocatedCoin } from '../state/LocatedCoin';
import { CoinColor } from '../coins/Coin';
import { minBy } from 'lodash';
import { OnPlayerBoard } from '../state/CommonLocations';

export type TradeCoin = {
  type: EffectType.TRADE_COIN;
};

export class TradeCoinRules extends EffectRules {
  getAutomaticMoves(): Move[] {
    const activePlayer = getActivePlayer(this.state);

    if (activePlayer) {
      const tavern = getCurrentTavern(this.state);
      const revealedCoin = getPlayerCoinForTavern(this.state, activePlayer.id, tavern);

      if (!isLocatedCoin(revealedCoin)) {
        throw new Error('There is an issue when searching the revealed coin. It is undefined or secret.');
      }

      if (!Coins[revealedCoin.id].value) {
        const pouch = getPlayerPouch(this.state, activePlayer.id);
        if (pouch.some(isCoinHidden)) {
          const minimumCoin = minBy(pouch, (p) => Coins[p.id!].value)!;
          const coin = Coins[minimumCoin.id!];

          const moves = pouch.map((c) => {
            // Reveal the pouch
            return revealCoinMove(c.id!);
          });

          if (coin.color === CoinColor.Bronze) {
            // Discard bronze coin
            moves.push(
              moveKnownCoinMove((minimumCoin as LocatedCoin).id, {
                type: LocationType.Discard,
                index: this.state.coins.filter((c) => isInDiscard(c.location)).length,
              })
            );
          } else {
            // Set treasure coin to treasure
            moves.push(
              moveKnownCoinMove((minimumCoin as LocatedCoin).id!, {
                type: LocationType.Treasure,
              })
            );
          }

          const value = coin.value + Coins[pouch.find((c) => c.id !== minimumCoin.id)!.id!].value;
          const treasureCoin = getTreasureCoinForValue(getTreasureCoins(this.state), value);

          // Get the treasure coin,
          moves.push(
            moveKnownCoinMove(treasureCoin.id!, {
              type: LocationType.PlayerBoard,
              player: this.player.id,
              index: (minimumCoin.location as OnPlayerBoard).index,
            })
          );

          return moves;
        }
      }
    }

    return super.getAutomaticMoves();
  }

  play(move: Move) {
    console.log(move);
    switch (move.type) {
      case MoveType.MoveCoin:
        return this.onMoveCoin(move);
    }

    return [];
  }

  onMoveCoin(move: MoveCoin) {
    console.log(this.player.discarded);
    if (move.target && isOnPlayerBoard(move.target) && this.player.discarded?.coin !== undefined) {
      delete this.player.discarded;
      this.player.effects.shift();
    }

    return [];
  }
}
