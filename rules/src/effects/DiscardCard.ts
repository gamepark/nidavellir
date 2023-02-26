import EffectRules from './EffectRules';
import { EffectType } from './EffectType';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import { getArmy } from '../utils/player.utils';
import { DWARF_COLUMNS, getNextCardIndexInDiscard } from '../utils/card.utils';
import maxBy from 'lodash/maxBy';
import { OnPlayerBoard } from '../state/CommonLocations';
import { LocationType } from '../state/Location';
import { moveKnownCardMove } from '../moves/MoveCard';
import { DwarfType } from '../cards/Card';
import { SecretCard } from '../state/view/SecretCard';
import { LocatedCard } from '../state/LocatedCard';
import MoveType from '../moves/MoveType';
import { isInArmy } from '../utils/location.utils';
import { moveHeroMove } from '../moves/MoveHero';

export type DiscardCard = {
  type: EffectType.DISCARD_CARD;
  count: number;
};

export class DiscardCardRules extends EffectRules {
  get effect(): DiscardCard {
    return this.player.effects[0] as DiscardCard;
  }

  getPlayerMoves(): (Move | MoveView)[] {
    if (!this.player.playedCard) {
      throw new Error('There is a discard move without played card. Not supported yet');
    }
    const card = (this.player.playedCard.deck === 'heroes' ? this.game.heroes : this.game.cards).find(
      (c) => c.id === this.player.playedCard!.id
    )!;

    return DWARF_COLUMNS.filter((column) => this.isNotEffectCardColumn(card, column))
      .filter((column) => this.filterNotChosenColumn(column))
      .flatMap((column) => this.lastCardInColumn(column))
      .flatMap((maxCard) => {
        const moves = [];
        if (!maxCard) {
          return [];
        }

        const moveBuilder = maxCard?.type === 'age' ? this.toMoveCard : this.toMoveHero;
        moves.push(moveBuilder(maxCard.card));

        return moves;
      });
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.MoveCard:
        this.onMoveCard();
    }

    return [];
  }

  onMoveCard = () => {
    const remainingDiscard = this.effect.count ?? 1;
    if (remainingDiscard === 1) {
      this.player.effects.shift();
    } else {
      // TODO: get the initial location of the card but here, the card has already moved
      if (!this.player.playedCard) {
        throw new Error('There is a discard card but no card was played');
      }

      this.effect.count--;
    }
  };

  toMoveCard = (c: SecretCard | LocatedCard) => {
    return moveKnownCardMove(c.id!, {
      type: LocationType.Discard,
      index: getNextCardIndexInDiscard(this.game),
    });
  };

  toMoveHero = (c: SecretCard | LocatedCard) => {
    return moveHeroMove(c.id!, {
      type: LocationType.Discard,
      index: getNextCardIndexInDiscard(this.game),
    });
  };

  lastCardInColumn = (type: DwarfType) => {
    const army = getArmy(this.game, this.player.id, type);
    const maxCard = maxBy(army.cards, (c) => (c.location as unknown as OnPlayerBoard).index) as any;
    const maxHero = maxBy(army.heroes, (c) => (c.location as unknown as OnPlayerBoard).index);

    const max = maxBy(
      [maxCard, maxHero].filter((c) => !!c),
      (c) => (c.location as unknown as OnPlayerBoard).index
    ) as any;

    if (!maxCard && !maxHero) {
      return;
    }

    if (max === maxCard) {
      return {
        type: 'age',
        card: maxCard,
      };
    }

    return {
      type: 'hero',
      card: maxHero,
    };
  };

  filterNotChosenColumn = (type: DwarfType) =>
    this.player.discardedCard?.origin?.type !== LocationType.Army || this.player.discardedCard.origin.column !== type;

  isNotEffectCardColumn = (card: SecretCard | LocatedCard, type: DwarfType) =>
    !isInArmy(card.location) || card.location.column !== type;
}
