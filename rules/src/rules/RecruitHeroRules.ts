import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { getArmy, isLocatedCard } from '../utils/player.utils';
import { Heroes } from '../cards/Heroes';
import { Cards } from '../cards/Cards';
import { maxBy } from 'lodash';
import { LocationType } from '../state/Location';
import { moveHeroMove } from '../moves/MoveHero';
import MoveView from '../moves/MoveView';

class RecruitHeroRules extends NidavellirRules {
  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const army = getArmy(this.state, playerId);
    return this.state.heroes.map((h) => {
      const heroType = Heroes[h.id].type;
      const cardOfSameType = army.cards.filter((c) => isLocatedCard(c) && Cards[c.id].type === heroType);
      const heroesOfSameType = army.heroes.filter((c) => Heroes[c.id].type === heroType);
      const maximumIndex =
        maxBy([...cardOfSameType, ...heroesOfSameType], (c) => c.location.index)?.location.index || 0;
      return moveHeroMove(h.id, {
        type: LocationType.PlayerBoard,
        player: playerId,
        index: !maximumIndex ? 0 : maximumIndex + 1,
      });
    });
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        this.onRecruitHero();
    }
  }

  onRecruitHero() {
    // Evaland turn rules handle the fact that there is no steps left and only allow the player to pass
    this.state.steps.shift();
  }
}

export { RecruitHeroRules };
