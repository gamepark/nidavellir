import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';

export type KingsGreatArmorer = {
  type: EffectType.KINGS_GREAT_ARMORER;
};

class KingsGreatArmorerRules extends EffectRules {
  play(_move: Move | MoveView) {
    this.player.effects.shift();
    return super.play(_move);
  }
}

export { KingsGreatArmorerRules };
