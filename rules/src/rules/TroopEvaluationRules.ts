import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { Step } from '../state/GameState';
import MoveView from '../moves/MoveView';
import { Distinctions } from '../cards/Distinctions';
import { getPlayerWithMajority } from '../utils/distinction.utils';
import { MoveDistinction, moveDistinctionMove } from '../moves/MoveDistinction';
import { LocationType } from '../state/Location';
import { getCardsInCommandZone } from '../utils/card.utils';
import { isInCommandZone } from '../utils/location.utils';
import { InCommandZone } from '../state/LocatedCard';

class TroopEvaluationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    switch (this.state.steps[0]) {
      case Step.TroopEvaluation:
        return this.getMoveDistinctionMoves();
    }

    return [];
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
        type: LocationType.CommandZone,
        player: playerWithMajority,
        index: commandZoneCards.heroes.length + commandZoneCards.distinctions.length,
      });
    });
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveDistinction:
        this.onMoveDistinction(move);
        break;
    }
  }

  private onMoveDistinction(move: MoveDistinction) {
    const location = move.target as InCommandZone;
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
