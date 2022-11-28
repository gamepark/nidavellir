import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { getActivePlayer, isLocatedCoin } from '../utils/player.utils';
import { revealPouchMove } from '../moves/RevealPouch';
import { getCurrentTavern } from '../utils/tavern.utils';
import {
  getNextCoinIndexInDiscard,
  getPlayerCoinForTavern,
  getPlayerPouch,
  getTreasureCoinFromValue,
  isCoinHidden,
} from '../utils/coin.utils';
import { LocatedCoin } from '../state/LocatedCoin';
import MoveType from '../moves/MoveType';
import { Coins } from '../coins/Coins';
import { DiscardCoin, discardCoin } from '../moves/DiscardCoin';
import { LocationType } from '../state/Location';
import { CoinColor } from '../coins/Coin';
import { TookCoinFromTreasure, tookCoinFromTreasureMove } from '../moves/TookCoinFromTreasure';
import { isInTreasure, isOnPlayerBoard } from '../utils/location.utils';
import { OnPlayerBoard } from '../state/CommonLocations';

class CoinTradeRules extends NidavellirRules {
  getLegalMoves(playerId: PlayerId): Move[] {
    const activePlayer = getActivePlayer(this.state);
    if (playerId !== activePlayer.id) {
      return [];
    }

    const tavern = getCurrentTavern(this.state);
    const revealedCoin = getPlayerCoinForTavern(this.state, activePlayer.id, tavern);
    const pouch = getPlayerPouch(this.state, activePlayer.id);
    if (
      !pouch.some(isCoinHidden) &&
      pouch.length === 2 &&
      isLocatedCoin(revealedCoin) &&
      !Coins[revealedCoin.id].value
    ) {
      return pouch.filter((c) => !!Coins[(c as LocatedCoin).id].value).map((c) => discardCoin((c as LocatedCoin).id));
    }

    return [];
  }

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
          return [revealPouchMove];
        }
      }
    }

    return [];
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.DiscardCoin:
        this.onDiscardCoin(move);
        break;
      case MoveType.TookCoinFromTreasure:
        this.onTookCoinFromTreasure(move);
        break;
      case MoveType.RevealPouch:
        this.onRevealPouch();
        break;
    }

    super.play(move);
  }

  onDiscardCoin(move: DiscardCoin) {
    const activePlayer = getActivePlayer(this.state);

    if (!activePlayer) {
      throw new Error('There is an error on discard coin move. There is no active player');
    }

    // Here we are sure that the pouch is revealed
    const pouch = getPlayerPouch(this.state, activePlayer.id).map((c) => c as LocatedCoin);
    if (pouch.length !== 2) {
      throw new Error(`The pouch size is wrong, it must have 2 coins, but have ${pouch.length} coin(s)`);
    }

    const value = Coins[pouch[0].id].value + Coins[pouch[1].id].value;
    const treasureCoin = getTreasureCoinFromValue(this.state, value);

    if (!treasureCoin) {
      throw new Error(
        `It is impossible for the player to discard coin since there is no treasure con available. Please prevent user from discarding if there is no coins`
      );
    }

    const discardedCoinIndex = move.id === pouch[0].id ? 0 : 1;
    const discardedPouchCoin = Coins[pouch[discardedCoinIndex].id];
    if (discardedPouchCoin.color === CoinColor.Bronze) {
      pouch[discardedCoinIndex].location = {
        type: LocationType.Discard,
        index: getNextCoinIndexInDiscard(this.state),
      };
    } else {
      pouch[discardedCoinIndex].location = {
        type: LocationType.Treasure,
      };
    }

    this.state.nextMoves.push(tookCoinFromTreasureMove(treasureCoin.id));
  }

  onTookCoinFromTreasure(move: TookCoinFromTreasure) {
    const activePlayer = getActivePlayer(this.state);

    if (!activePlayer) {
      throw new Error('There is an error in took coin from treasure move. There is no active player');
    }

    const treasureCoin = this.state.coins.find((c) => isLocatedCoin(c) && isInTreasure(c.location) && c.id === move.id);
    if (!treasureCoin) {
      throw new Error(`It is impossible for the player to took treasure coin since there is no treasure con available`);
    }

    const pouch = getPlayerPouch(this.state, activePlayer.id).map((c) => c as LocatedCoin);
    if (pouch.length !== 1) {
      throw new Error(
        `There is an error when taking a coin from treasure, the pouch size is incorrect ${pouch.length} instead of 1`
      );
    }

    const remainingCoin = (pouch[0].location as OnPlayerBoard).index;

    treasureCoin.location = {
      type: LocationType.PlayerBoard,
      player: activePlayer.id,
      index: remainingCoin === 3 ? 4 : 3,
    };

    this.state.steps.shift();
  }

  onRevealPouch() {
    const activePlayer = getActivePlayer(this.state);

    if (!activePlayer) {
      throw new Error('There is an error in reveal pouch move. There is no active player');
    }

    this.state.coins
      .filter(
        (c) => isOnPlayerBoard(c.location) && c.location.player === activePlayer.id && (c.location.index ?? 0) > 2
      )
      .forEach((c) => {
        c.hidden = false;
      });
  }
}

export { CoinTradeRules };
