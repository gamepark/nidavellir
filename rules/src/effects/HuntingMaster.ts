import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import MoveView from '../moves/MoveView';
import Move from '../moves/Move';
import { Coins, HuntingMasterCoin } from '../coins/Coins';
import { isInDiscard, isInPlayerHand, isOnPlayerBoard } from '../utils/location.utils';
import { isExchangeCoin } from '../utils/coin.utils';
import { moveKnownCoinMove, revealCoinMove } from '../moves/MoveCoin';
import { LocationType } from '../state/Location';
import MoveType from '../moves/MoveType';

export type HuntingMaster = {
  type: EffectType.HUNTING_MASTER;
};

class HuntingMasterRules extends EffectRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const huntingMasterCoin = this.game.coins.find((c) => Coins[c.id!] === HuntingMasterCoin)!;
    const zeroValuedCoin = this.game.coins.find(
      (c) => (isInPlayerHand(c.location) || isOnPlayerBoard(c.location)) && isExchangeCoin(c)
    )!;

    const moves = [];
    if (zeroValuedCoin.hidden) {
      moves.push(revealCoinMove(zeroValuedCoin.id!));
    }

    moves.push(
      moveKnownCoinMove(zeroValuedCoin.id!, {
        type: LocationType.Discard,
        index: this.game.coins.filter((c) => isInDiscard(c.location)).length,
      }),
      moveKnownCoinMove(huntingMasterCoin.id!, zeroValuedCoin.location)
    );
    return moves;
  }

  play(move: Move | MoveView) {
    if (move.type !== MoveType.MoveCoin) {
      return [];
    }

    if (move.id !== undefined && Coins[move.id!] === HuntingMasterCoin) {
      this.player.effects.shift();
    }

    return [];
  }
}

export { HuntingMasterRules };
