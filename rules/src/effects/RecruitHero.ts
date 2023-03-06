import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { getNextIndexByType } from '../utils/player.utils';
import { Heroes, Thrud, Ylud } from '../cards/Heroes';
import { LocationType } from '../state/Location';
import { MoveHero, moveHeroMove } from '../moves/MoveHero';
import MoveView from '../moves/MoveView';
import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import { applyThrud, computeRecruitHeroCount } from '../utils/hero.utils';
import { isInHeroDeck } from '../utils/location.utils';
import { HeroType } from '../cards/Hero';
import { DWARF_COLUMNS, getCardsInCommandZone } from '../utils/card.utils';
import size from 'lodash/size';

export type RecruitHero = {
  type: EffectType.RECRUIT_HERO;
  count?: number;
};

class RecruitHeroRules extends EffectRules {
  get effect(): RecruitHero {
    return this.player.effects[0] as RecruitHero;
  }

  getPlayerMoves(): (Move | MoveView)[] {
    // This computing is here to reduce complexity and prevent computing the next index for each heroes (while there is only 5 types of dwarves vs 20+ hero card)

    const nextIndexesByType = getNextIndexByType(this.game, this.player.id);
    return this.game.heroes
      .filter((h) => {
        const hero = Heroes[h.id];
        return isInHeroDeck(h.location) && (!hero.condition || hero.condition.isActive(this.game, this.player.id));
      })
      .flatMap((h) => {
        const hero = Heroes[h.id];

        if (hero.type === HeroType.Neutral) {
          const cardsInCommandZone = getCardsInCommandZone(this.game, this.player.id);

          // Not so good, but no solution yet
          if (hero !== Ylud) {
            if (size(hero.grades)) {
              const moves = DWARF_COLUMNS.filter((column) => hero.grades?.[column]?.length).flatMap((column) => {
                const nextIndex = nextIndexesByType[column].nextIndex;
                return moveHeroMove(h.id, {
                  type: LocationType.Army,
                  player: this.player.id,
                  index: nextIndex,
                  column,
                });
              });

              if (moves.length) {
                return moves;
              }
            }
          }

          return moveHeroMove(h.id, {
            type: LocationType.CommandZone,
            player: this.player.id,
            index: cardsInCommandZone.heroes.length + cardsInCommandZone.distinctions.length,
          });
        } else {
          const nextIndex = nextIndexesByType[Heroes[h.id!].type].nextIndex;

          // TODO: there is a case where the hero can be placed à several places
          return moveHeroMove(h.id, {
            type: LocationType.Army,
            player: this.player.id,
            index: nextIndex,
            column: hero.type,
          });
        }
      });
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        return this.onRecruitHero(move);
    }

    return super.play(move);
  }

  onRecruitHero(move: MoveHero): (Move | MoveView)[] {
    const hero = Heroes[move.id];

    if (hero !== Thrud) {
      const thrudMoves = applyThrud(this.game, this.player, move);
      if (thrudMoves.length) {
        return thrudMoves;
      }
    }

    this.player.playedCard = {
      id: move.id,
      deck: 'heroes',
    };

    const recruitHeroCount = computeRecruitHeroCount(this.game, this.player.id);
    if (!this.effect.count) {
      this.effect.count = recruitHeroCount;
    } else {
      this.effect.count += recruitHeroCount - 1;
    }

    if (!this.effect.count) {
      this.player.effects.shift();
    }

    if (hero.effects?.length) {
      this.player.effects.unshift(...JSON.parse(JSON.stringify(hero.effects)));
    }

    return [];
  }
}

export { RecruitHeroRules };
