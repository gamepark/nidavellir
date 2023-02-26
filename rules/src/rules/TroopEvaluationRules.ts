import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import MoveView from '../moves/MoveView';
import { CrownJeweler, Distinctions, HuntingMaster, KingsGreatArmorer } from '../cards/Distinctions';
import { getPlayerWithMajority } from '../utils/distinction.utils';
import { moveDistinctionMove } from '../moves/MoveDistinction';
import { LocationType } from '../state/Location';
import { getCardsInCommandZone, onChooseCard } from '../utils/card.utils';
import { isInArmy, isInCommandZone, isInDistinctionDeck } from '../utils/location.utils';
import { InCommandZone } from '../state/LocatedCard';
import { nextTavern } from '../utils/tavern.utils';
import groupBy from 'lodash/groupBy';
import { Player, PlayerId } from '../state/Player';
import { passMove } from '../moves/Pass';
import { HuntingMasterRules } from '../effects/HuntingMaster';
import { KingsGreatArmorerRules } from '../effects/KingsGreatArmorer';
import { CrownJewelerRules } from '../effects/CrownJeweler';
import { MoveCard } from '../moves/MoveCard';
import { BlacksmithDwarfKingsGreatArmorer, Cards } from '../cards/Cards';

class TroopEvaluationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const moveDistinctionMoves = this.getMoveDistinctionMoves();
    if (moveDistinctionMoves.length) {
      return moveDistinctionMoves;
    }

    return [];
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    const player = this.game.players.find((p) => p.id === playerId)!;
    return !player.ready;
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const player = this.game.players.find((p) => p.id === playerId)!;
    const moveDistinctionMoves = this.getMoveDistinctionMoves();

    if (moveDistinctionMoves.length || player.ready) {
      return [];
    }

    return [passMove(playerId)];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveDistinction:
        return this.onMoveDistinction();
      case MoveType.MoveCard:
        return this.onMoveCard(move);
      case MoveType.Pass:
        if (this.game.players.every((p) => p.ready)) {
          return nextTavern(this.game);
        }
    }

    return [];
  }

  private onMoveCard(move: MoveCard): (Move | MoveView)[] {
    const card = Cards[move.id!];
    if (card === BlacksmithDwarfKingsGreatArmorer && isInArmy(move.target)) {
      const playerId = move.target.player;
      const player = this.game.players.find((p) => p.id === playerId)!;
      onChooseCard(this.game, player, move.id!, 'age');
    }

    return [];
  }

  private getMoveDistinctionMoves(): Move[] {
    const distinction = this.game.distinctions.filter((d) => isInDistinctionDeck(d.location));

    const distinctionByPlayers = groupBy(distinction, (d) => {
      const distinction = Distinctions[d.id];
      return getPlayerWithMajority(this.game, distinction.majorityOf);
    });

    return this.game.players.flatMap((p) => {
      const wonDistinctions = distinctionByPlayers[p.id] ?? [];
      const commandZoneCards = getCardsInCommandZone(this.game, p.id);
      return wonDistinctions.flatMap((d, index) => {
        const moveDistinction = moveDistinctionMove(d.id, {
          type: LocationType.CommandZone,
          player: p.id,
          index: commandZoneCards.heroes.length + commandZoneCards.distinctions.length + index,
        });

        const distinctionRule = this.getDistinctionRule(d.id, p);

        if (distinctionRule) {
          return [moveDistinction, ...distinctionRule.getAutomaticMoves()];
        }

        return [moveDistinction];
      });
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
          delete player.ready;
        }
      });

      if (this.game.players.every((p) => p.ready)) {
        return nextTavern(this.game);
      }
    }

    return [];
  }

  private getDistinctionRule(distinctionId: number, player: Player) {
    const distinction = Distinctions[distinctionId];
    switch (distinction) {
      case KingsGreatArmorer:
        return new KingsGreatArmorerRules(this.game, player);
      case HuntingMaster:
        return new HuntingMasterRules(this.game, player);
      case CrownJeweler:
        return new CrownJewelerRules(this.game, player);
    }

    return null;
  }
}

export { TroopEvaluationRules };
