import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';

export type CrownJeweler = {
  type: EffectType.CROWN_JEWELER;
};

class CrownJewelerRules extends EffectRules {
  play(_move: Move | MoveView) {
    this.player.effects.shift();
  }
}

export { CrownJewelerRules };
