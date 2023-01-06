import Move from '../moves/Move';
import { getPlayerBidCombination } from '../utils/bid.utils';
import { NidavellirRules } from './NidavellirRules';
import { passMove } from '../moves/Pass';
import { LocationType } from '../state/Location';
import { moveKnownCoinMove } from '../moves/MoveCoin';
import MoveView from '../moves/MoveView';
import { PlayerId } from '../state/Player';
import MoveType from '../moves/MoveType';
import { isSameCoinLocation } from '../utils/location.utils';
import uniqBy from 'lodash/uniqBy';

class BidsRules extends NidavellirRules {
  isTurnToPlay(playerId: PlayerId): boolean {
    return !this.state.players.find((p) => playerId === p.id)!.ready;
  }

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
        return this.onBid();
    }

    return [];
  }

  onBid(): (Move | MoveView)[] {
    // TODO; if player fill all tavern, autofill bids
    const moves = this.state.players.flatMap((p) => {
      const combinations = getPlayerBidCombination(this.state, p.id);
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

    this.state.nextMoves.push(
      ...moves.filter(
        (m) =>
          !this.state.nextMoves.some(
            (move) => move.type === m.type && m.target && move.target && isSameCoinLocation(m.target, move.target)
          )
      )
    );

    return [];
  }
}

export { BidsRules };
