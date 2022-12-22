import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import MoveView from '../moves/MoveView';
import { Distinctions } from '../cards/Distinctions';
import { getPlayerWithMajority } from '../utils/distinction.utils';
import { MoveDistinction, moveDistinctionMove } from '../moves/MoveDistinction';
import { LocationType } from '../state/Location';
import { getCardsInCommandZone } from '../utils/card.utils';
import { isInCommandZone } from '../utils/location.utils';
import { OnPlayerBoardCard } from '../state/LocatedCard';
import { HeroType } from '../cards/Hero';

class TroopEvaluationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    return this.getMoveDistinctionMoves();
  }

  private getMoveDistinctionMoves(): Move[] {
    return this.state.distinctions.flatMap((d) => {
      const distinction = Distinctions[d.id];
      const playerWithMajority = getPlayerWithMajority(this.state, distinction.majorityOf);

      if (playerWithMajority === undefined) {
        return [];
      }

      const commandZoneCards = getCardsInCommandZone(this.state, playerWithMajority);
      return moveDistinctionMove(d.id, {
        type: LocationType.PlayerBoard,
        player: playerWithMajority,
        index: commandZoneCards.heroes.length + commandZoneCards.distinctions.length,
        column: HeroType.Neutral,
      });
    });
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveDistinction:
        this.onMoveDistinction(move);
        break;
    }

    return [];
  }

  private onMoveDistinction(move: MoveDistinction) {
    const location = move.target as OnPlayerBoardCard;
    const distinction = this.state.distinctions.find((d) => isInCommandZone(d.location) && d.id === move.id)!;

    distinction.location = move.target;
    const distinctionCard = Distinctions[distinction.id];

    if (distinctionCard.effects) {
      const player = this.state.players.find((p) => p.id === location.player)!;
      player.effects.push(...distinctionCard.effects);
    }

    const remainingDistinctionMoves = this.getMoveDistinctionMoves();
    if (!remainingDistinctionMoves.length) {
      this.state.steps.shift();
    }
  }
}

export { TroopEvaluationRules };
