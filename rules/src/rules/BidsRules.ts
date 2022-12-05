import Move from '../moves/Move';
import { getPlayerBidCombination } from '../utils/bid.utils';
import { NidavellirRules } from './NidavellirRules';
import { passMove } from '../moves/Pass';
import { LocationType } from '../state/Location';
import { moveCoinMove } from '../moves/MoveCoin';
import MoveView from '../moves/MoveView';

class BidsRules extends NidavellirRules {
  getLegalMoves(playerId: number): (Move | MoveView)[] {
    const bidCombinations = getPlayerBidCombination(this.state, playerId);
    const player = this.state.players.find((p) => p.id === playerId)!;

    if (player.ready) {
      return [];
    }

    if (bidCombinations.length === 0) {
      return [passMove(playerId)];
    }

    return bidCombinations.flatMap(({ coin, area }) =>
      moveCoinMove(coin!, {
        type: LocationType.PlayerBoard,
        player: playerId,
        index: area,
      })
    );
  }
}

export { BidsRules };
