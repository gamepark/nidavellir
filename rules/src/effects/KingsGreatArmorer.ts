import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import { BlacksmithDwarfKingsGreatArmorer, Cards } from '../cards/Cards';
import { getChooseCardMove } from '../utils/card.utils';

export type KingsGreatArmorer = {
  type: EffectType.KINGS_GREAT_ARMORER;
};

class KingsGreatArmorerRules extends EffectRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const blacksmithCard = this.game.cards.find((c) => BlacksmithDwarfKingsGreatArmorer === Cards[c.id!])!;
    return [getChooseCardMove(this.game, this.player, blacksmithCard.id!)];
  }
}

export { KingsGreatArmorerRules };
