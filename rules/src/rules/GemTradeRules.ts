import { NidavellirRules } from './NidavellirRules';
import MoveType from '../moves/MoveType';
import Move from '../moves/Move';
import { Step } from '../state/GameState';
import { getCurrentTavern } from '../utils/tavern.utils';
import { getTavernCoins } from '../utils/coin.utils';
import { Coins } from '../coins/Coins';
import { LocatedCoin } from '../state/LocatedCoin';
import { MoveGem, moveGemMove } from '../moves/MoveGem';
import { isOnPlayerBoard } from '../utils/location.utils';
import { SecretCoin } from '../state/view/SecretCoin';
import { OnPlayerBoard } from '../state/CommonLocations';
import { LocationType } from '../state/Location';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';
import { Gems } from '../gems/Gems';
import MoveView from '../moves/MoveView';
import { omitBy } from 'lodash';

class GemTradeRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const gems = keyBy(
      this.state.gems.filter((g) => isOnPlayerBoard(g.location)),
      (g) => (g.location as OnPlayerBoard).player
    );

    const trading = this.getTrades();

    // for each tie, order coins by value (to exchange it)
    const orderedCoinsByGemValues = mapValues(trading, (values) =>
      orderBy(values, (v) => Gems[gems[(v.location as OnPlayerBoard).player].id].value)
    );

    const moves = [];
    const keys = Object.keys(orderedCoinsByGemValues);
    for (const key of keys) {
      // If there is a tie (more than one player with same coin value
      if (orderedCoinsByGemValues[key].length > 1) {
        moves.push(...this.getGemExchangesMoves(orderedCoinsByGemValues[key], gems));
      }
    }

    if (moves.length) {
      return moves;
    }

    return super.getAutomaticMoves();
  }

  getGemExchangesMoves(coins: (LocatedCoin | SecretCoin)[], gemByPlayer: any): MoveGem[] {
    // Create a reverses array (to prepare move computing)
    const reversed = coins.slice().reverse();
    // Get all players ordered by coin value (before reverse)
    const players = coins.map((c) => (c.location as OnPlayerBoard).player);

    // For each item in reversed item we get the same index in the non-reversed array to switch gems
    return reversed.flatMap((coin, index) => {
      const newPlayer = (coin.location as OnPlayerBoard).player;
      return moveGemMove(gemByPlayer[players[index]].id, {
        type: LocationType.PlayerBoard,
        player: newPlayer,
      });
    });
  }

  private getTrades = () => {
    // Here, the tavern for the gem trade must be the previous one (to get right coins)
    const tavern = getCurrentTavern(this.state);
    const tavernCoins = getTavernCoins(this.state, tavern - 1);

    // Group coins by values (to see tie)
    const coinsByValue = groupBy(tavernCoins, (c) => {
      const player = this.state.players.find((p) => p.id === (c.location as OnPlayerBoard).player)!;
      const discardedCoin = player?.discarded;
      // It is possible that the coins for the tavern was the transformed value
      return Coins[discardedCoin?.tavern === tavern ? discardedCoin.coin : c.id!].value;
    });

    // Omit coin value with only one coin
    return omitBy(coinsByValue, (c) => c.length > 1);
  };

  play(move: Move | MoveView): void {
    switch (move.type) {
      case MoveType.MoveGem:
        this.onMoveGem(move);
        break;
    }

    return super.play(move);
  }

  onMoveGem(move: MoveGem) {
    const gem = this.state.gems.find((g) => isOnPlayerBoard(g.location) && g.id === move.id);

    if (!gem) {
      throw new Error('There is an error while fetching the moved gem. This gem is not on player board');
    }

    const playersById = keyBy(this.state.players, (p) => p.id);
    const player = playersById[(gem.location as OnPlayerBoard).player];
    player.traded = true;
    gem.location = move.target;

    // Group coins by values (to see tie)
    const trades = values(this.getTrades());
    // Maybe not so good in perf, but no good solution yet
    if (
      trades.every(
        (trade) =>
          // There is only one player with the coin value
          trade.length === 1 ||
          // Or all trades that must be done were done
          trade.every((c) => playersById[(c.location as OnPlayerBoard).player].traded)
      )
    ) {
      this.state.players.forEach((p) => {
        delete p.ready;
        delete p.discarded;
        delete p.card;
        delete p.traded;
      });

      this.state.steps = [Step.BidRevelation];
    }
  }
}

export { GemTradeRules };
