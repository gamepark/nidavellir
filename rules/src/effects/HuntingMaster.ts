import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import MoveView from '../moves/MoveView';
import Move from '../moves/Move';

export type HuntingMaster = {
  type: EffectType.HUNTING_MASTER;
};

class HuntingMasterRules extends EffectRules {
  play(_move: Move | MoveView) {
    this.player.effects.shift();
    return super.play(_move);
  }
}

export { HuntingMasterRules };
