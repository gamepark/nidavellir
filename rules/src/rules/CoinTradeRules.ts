import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { getActivePlayer, isLocatedCoin } from '../utils/player.utils';
import { getCurrentTavern } from '../utils/tavern.utils';
import { getPlayerCoinForTavern, getPlayerPouch, getTreasureCoinFromValue, isCoinHidden } from '../utils/coin.utils';
import { LocatedCoin } from '../state/LocatedCoin';
import MoveType from '../moves/MoveType';
import { Coins } from '../coins/Coins';
import { LocationType } from '../state/Location';
import { isInDiscard } from '../utils/location.utils';
import { revealCoinMove } from '../moves/RevealCoin';
import { MoveCoin, moveCoinMove } from '../moves/MoveCoin';
import { TAVERN_COUNT } from '../utils/constants';

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
      return pouch
        .filter((c) => !!Coins[(c as LocatedCoin).id].value)
        .map((c) =>
          moveCoinMove(
            {
              type: LocationType.Discard,
              index: this.state.coins.filter((c) => isInDiscard(c.location)).length,
            },
            (c as LocatedCoin).id
          )
        );
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
          return pouch.map((c) => revealCoinMove(c.id!));
        }
      }
    }

    return [];
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.MoveCoin:
        this.onMoveCoin(move);
        break;
    }

    super.play(move);
  }

  onMoveCoin(move: MoveCoin) {
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
    pouch[discardedCoinIndex].location = move.target;
    activePlayer.discarded = {
      coin: pouch[discardedCoinIndex].id,
    };

    this.state.nextMoves.push(
      moveCoinMove(
        {
          type: LocationType.PlayerBoard,
          player: activePlayer.id,
          index: TAVERN_COUNT + discardedCoinIndex,
        },
        treasureCoin.id
      )
    );
  }
}

export { CoinTradeRules };
