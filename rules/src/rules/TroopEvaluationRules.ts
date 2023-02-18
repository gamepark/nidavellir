import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import MoveView, { isView } from '../moves/MoveView';
import { Distinctions } from '../cards/Distinctions';
import { getPlayerWithMajority } from '../utils/distinction.utils';
import { moveDistinctionMove } from '../moves/MoveDistinction';
import { LocationType } from '../state/Location';
import { getCardsInCommandZone } from '../utils/card.utils';
import { isInCommandZone, isInDistinctionDeck } from '../utils/location.utils';
import { InCommandZone } from '../state/LocatedCard';
import { nextTavern } from '../utils/tavern.utils';
import groupBy from 'lodash/groupBy';

class TroopEvaluationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    return this.getMoveDistinctionMoves();
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveDistinction:
        return this.onMoveDistinction();
    }

    return [];
  }

  private getMoveDistinctionMoves(): Move[] {
    const distinction = this.game.distinctions.filter((d) => isInDistinctionDeck(d.location));
    console.log('Distinctions in the deck', isView(this.game), distinction);

    const distinctionByPlayers = groupBy(distinction, (d) => {
      const distinction = Distinctions[d.id];
      return getPlayerWithMajority(this.game, distinction.majorityOf);
    });

    return this.game.players.flatMap((p) => {
      const wonDistinctions = distinctionByPlayers[p.id] ?? [];
      const commandZoneCards = getCardsInCommandZone(this.game, p.id);
      return wonDistinctions.map((d, index) =>
        moveDistinctionMove(d.id, {
          type: LocationType.CommandZone,
          player: p.id,
          index: commandZoneCards.heroes.length + commandZoneCards.distinctions.length + index,
        })
      );
    });
  }

  private onMoveDistinction() {
    const remainingMoves = this.getMoveDistinctionMoves();
    if (!remainingMoves.length) {
      const distinctionsInCommandZone = this.game.distinctions.filter((d) => isInCommandZone(d.location));

      distinctionsInCommandZone.forEach((d) => {
        const location = d.location as InCommandZone;
        const distinctionCard = Distinctions[d.id];
        if (distinctionCard.effects) {
          const player = this.game.players.find((p) => p.id === location.player)!;
          player.effects.push(...distinctionCard.effects);
        }
      });
      return nextTavern(this.game);
    }

    return [];
  }
}

export { TroopEvaluationRules };
