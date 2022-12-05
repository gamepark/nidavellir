import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';

export type PioneerOfTheKingdom = {
  type: EffectType.PIONEER_OF_THE_KINGDOM;
};

class PioneerOfTheKingdomRules extends EffectRules {
  play(_move: Move | MoveView) {
    this.player.effects.shift();
  }
}

export { PioneerOfTheKingdomRules };
