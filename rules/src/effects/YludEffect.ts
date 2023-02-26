import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import MoveType from '../moves/MoveType';
import { passMove } from '../moves/Pass';
import { isAge1 } from '../utils/age.utils';
import { getNextIndexByType } from '../utils/player.utils';
import { LocationType } from '../state/Location';
import { Heroes, Ylud } from '../cards/Heroes';
import { MoveHero, moveHeroMove } from '../moves/MoveHero';
import { isInCommandZone } from '../utils/location.utils';
import { DWARF_COLUMNS, onChooseCard } from '../utils/card.utils';

export type YludEffect = {
  type: EffectType.YLUD;
};

class YludRules extends EffectRules {
  getPlayerMoves(): (Move | MoveView)[] {
    if (!this.player.ready) {
      const ylud = this.game.heroes.find((c) => Heroes[c.id] === Ylud)!;
      if (isAge1(this.game) && isInCommandZone(ylud.location)) {
        const nextIndexesByType = getNextIndexByType(this.game, this.player.id);
        return DWARF_COLUMNS.map((type) => {
          return moveHeroMove(ylud.id, {
            type: LocationType.Army,
            player: this.player.id,
            index: nextIndexesByType[type].nextIndex,
            column: type,
          });
        });
      }

      return [passMove(this.player.id)];
    }

    return [];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        this.onMoveYlud(move);
        break;
      case MoveType.Pass:
        this.player.effects.shift();
        break;
    }

    return [];
  }

  onMoveYlud = (move: MoveHero) => {
    onChooseCard(this.game, this.player, move.id, 'heroes', true);
  };
}

export { YludRules };
