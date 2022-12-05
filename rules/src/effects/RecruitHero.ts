import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { getArmy, isLocatedCard } from '../utils/player.utils';
import { Heroes } from '../cards/Heroes';
import { Cards } from '../cards/Cards';
import { maxBy } from 'lodash';
import { LocationType } from '../state/Location';
import { MoveHero, moveHeroMove } from '../moves/MoveHero';
import MoveView from '../moves/MoveView';
import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import { computeRecruitHeroCount } from '../utils/hero.utils';

export type RecruitHero = {
  type: EffectType.RECRUIT_HERO;
  count?: number;
};

class RecruitHeroRules extends EffectRules {
  get effect(): RecruitHero {
    return this.player.effects[0] as RecruitHero;
  }

  getPlayerMoves(): (Move | MoveView)[] {
    const army = getArmy(this.state, this.player.id);
    return this.state.heroes.map((h) => {
      const heroType = Heroes[h.id].type;
      const cardOfSameType = army.cards.filter((c) => isLocatedCard(c) && Cards[c.id].type === heroType);
      const heroesOfSameType = army.heroes.filter((c) => Heroes[c.id].type === heroType);
      const maximumIndex =
        maxBy([...cardOfSameType, ...heroesOfSameType], (c) => c.location.index)?.location.index || 0;
      return moveHeroMove(h.id, {
        type: LocationType.PlayerBoard,
        player: this.player.id,
        index: !maximumIndex ? 0 : maximumIndex + 1,
      });
    });
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        this.onRecruitHero(move);
    }
  }

  onRecruitHero(move: MoveHero) {
    const hero = Heroes[move.id];
    if (hero.effects?.length) {
      this.player.effects.unshift(...hero.effects);
    }

    const recruitHeroCount = computeRecruitHeroCount(this.state, this.player.id);
    if (recruitHeroCount > 0) {
      if (!this.effect.count) {
        this.effect.count = recruitHeroCount;
      } else {
        this.effect.count += recruitHeroCount - 1;
      }
    }

    if (!this.effect.count) {
      this.player.effects.shift();
    }
  }
}

export { RecruitHeroRules };
