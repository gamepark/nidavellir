import Move from '../moves/Move';
import { getPlayerBidCombination } from '../utils/bid.utils';
import { NidavellirRules } from './NidavellirRules';
import { passMove } from '../moves/Pass';
import { LocationType } from '../state/Location';
import { MoveCoin, moveKnownCoinMove } from '../moves/MoveCoin';
import MoveView from '../moves/MoveView';
import { PlayerId } from '../state/Player';
import MoveType from '../moves/MoveType';
import { isOnPlayerBoard } from '../utils/location.utils';
import uniqBy from 'lodash/uniqBy';
import { OnPlayerBoard } from '../state/CommonLocations';

class BidsRules extends NidavellirRules {
  isTurnToPlay(playerId: PlayerId): boolean {
    return !this.game.players.find((p) => playerId === p.id)!.ready;
  }

  getLegalMoves(playerId: number): (Move | MoveView)[] {
    const bidCombinations = getPlayerBidCombination(this.game, playerId);
    const player = this.game.players.find((p) => p.id === playerId)!;

    if (player.ready) {
      return [];
    }

    if (bidCombinations.length === 0) {
      return [passMove(playerId)];
    }

    return bidCombinations.flatMap(({ coin, area }) =>
      moveKnownCoinMove(coin!, {
        type: LocationType.PlayerBoard,
        player: playerId,
        index: area,
      })
    );
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.MoveCoin:
        return this.onBid(move);
    }

    return [];
  }

  onBid(move: MoveCoin): (Move | MoveView)[] {
    if (move.target && isOnPlayerBoard(move.target)) {
      const target: OnPlayerBoard = move.target;
      const moves = this.game.players
        .filter((p) => p.id === target.player)
        .flatMap((p) => {
          const combinations = getPlayerBidCombination(this.game, p.id);
          if (combinations.every((c) => c.area > 2) || uniqBy(combinations, (c) => c.area).length === 1) {
            const uniqCombination = uniqBy(combinations, ['coin', 'area']);
            return uniqCombination.map((c) =>
              moveKnownCoinMove(c.coin!, {
                type: LocationType.PlayerBoard,
                player: p.id,
                index: c.area,
              })
            );
          }

          return [];
        });

      if (moves.length) {
        return [moves[0]];
      }
    }

    return [];
  }
}

export { BidsRules };
