import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { getNextIndexByType } from '../utils/player.utils';
import { Heroes } from '../cards/Heroes';
import { LocationType } from '../state/Location';
import { MoveHero, moveHeroMove } from '../moves/MoveHero';
import MoveView from '../moves/MoveView';
import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import { computeRecruitHeroCount } from '../utils/hero.utils';
import { isInHeroDeck } from '../utils/location.utils';

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

    const nextIndexesByType = getNextIndexByType(this.state, this.player.id);
    return this.state.heroes
      .filter((h) => {
        const hero = Heroes[h.id];
        return isInHeroDeck(h.location) && (!hero.condition || hero.condition.isActive(this.state, this.player.id));
      })
      .flatMap((h) => {
        const hero = Heroes[h.id];
        const nextIndex = nextIndexesByType[Heroes[h.id!].type].nextIndex;
        // TODO: there is a case where the hero can be placed à several places
        return moveHeroMove(h.id, {
          type: LocationType.PlayerBoard,
          player: this.player.id,
          index: nextIndex,
          column: hero.type,
        });
      });
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        this.onRecruitHero(move);
    }

    return super.play(move);
  }

  onRecruitHero(move: MoveHero) {
    const hero = Heroes[move.id];
    this.player.drawn = {
      card: move.id,
      deck: 'heroes',
    };

    if (hero.effects?.length) {
      this.player.effects.unshift(...hero.effects);
    }

    const recruitHeroCount = computeRecruitHeroCount(this.state, this.player.id);
    if (!this.effect.count) {
      this.effect.count = recruitHeroCount;
    } else {
      this.effect.count += recruitHeroCount - 1;
    }

    if (!this.effect.count) {
      this.player.effects.shift();
    }
  }
}

export { RecruitHeroRules };