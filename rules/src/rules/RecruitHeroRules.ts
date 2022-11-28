import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { RecruitHero, recruitHeroMove } from '../moves/RecruitHero';
import MoveType from '../moves/MoveType';
import { Step } from '../state/GameState';
import { getActivePlayer, getArmy, isLocatedCard } from '../utils/player.utils';
import { Heroes } from '../cards/Heroes';
import { Cards } from '../cards/Cards';
import { maxBy } from 'lodash';
import { LocationType } from '../state/Location';

class RecruitHeroRules extends NidavellirRules {
  getLegalMoves(_playerId: PlayerId): Move[] {
    return [recruitHeroMove(4)];
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.RecruitHero:
        this.onRecruitHero(move);
    }
  }

  onRecruitHero(move: RecruitHero) {
    if (this.state.steps[0] !== Step.RecruitHero) {
      console.error('The player try to recruit hero but the current step is not RecruitHero');
      return;
    }

    const activePlayer = getActivePlayer(this.state);
    const heroCard = this.state.heroes.find((h) => h.id === move.card)!;
    const heroType = Heroes[heroCard.id].type;
    const army = getArmy(this.state, activePlayer.id);
    const cardOfSameType = army.cards.filter((c) => isLocatedCard(c) && Cards[c.id].type === heroType);
    const heroesOfSameType = army.heroes.filter((c) => Heroes[c.id].type === heroType);
    const maximumIndex = maxBy([...cardOfSameType, ...heroesOfSameType], (c) => c.location.index)?.location.index || 0;

    heroCard.location = {
      type: LocationType.PlayerBoard,
      player: activePlayer.id,
      index: !maximumIndex ? 0 : maximumIndex + 1,
    };

    this.state.steps.shift();
  }
}

export { RecruitHeroRules };
