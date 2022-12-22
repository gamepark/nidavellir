import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import MoveType from '../moves/MoveType';
import { MoveCard } from '../moves/MoveCard';
import { passMove } from '../moves/Pass';

export type YludEffect = {
  type: EffectType.YLUD;
};

class YludRules extends EffectRules {
  getPlayerMoves(): (Move | MoveView)[] {
    if (!this.player.ready) {
      // TODO: compute ylud moves
      return [];
    }

    return [passMove(this.player.id)];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCard:
        this.onMoveYlud(move);
        break;
      case MoveType.Pass:
        this.player.effects.shift();
        break;
    }

    return [];
  }

  onMoveYlud = (move: MoveCard) => {
    console.log(move);
  };
}

export { YludRules };
