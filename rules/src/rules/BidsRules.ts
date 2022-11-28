import Move from '../moves/Move';
import { getPlayerBidCombination } from '../utils/bid.utils';
import { PlaceCoin, placeCoinMove } from '../moves/PlaceCoin';
import { NidavellirRules } from './NidavellirRules';
import { passMove } from '../moves/Pass';
import { LocationType } from '../state/Location';
import MoveType from '../moves/MoveType';

class BidsRules extends NidavellirRules {
  getLegalMoves(playerId: number): Move[] {
    const bidCombinations = getPlayerBidCombination(this.state, playerId);
    const player = this.state.players.find((p) => p.id === playerId)!;

    if (player.ready) {
      return [];
    }

    if (bidCombinations.length === 0) {
      return [passMove(playerId)];
    }

    return bidCombinations.flatMap(({ coin, area }) => placeCoinMove(playerId, coin!, area));
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.PlaceCoin:
        this.onPlaceCoin(move);
        break;
    }

    super.play(move);
  }

  private onPlaceCoin(move: PlaceCoin) {
    const coin = this.state.coins.find((c) => c.id === move.coin)!;
    coin.location = {
      type: LocationType.PlayerBoard,
      player: move.player,
      index: move.area,
    };
  }
}

export { BidsRules };
