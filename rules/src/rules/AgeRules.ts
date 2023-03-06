import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import MoveType from '../moves/MoveType';
import { isEndOfAge } from '../utils/age.utils';
import { Phase } from '../state/GameState';
import { TurnPreparationRules } from './TurnPreparationRules';
import { TavernResolutionRules } from './TavernResolutionRules';
import { ensureHeroes } from '../utils/hero.utils';

abstract class AgeRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.game.phase) {
      case Phase.TurnPreparation:
        return new TurnPreparationRules(this.game);
      case Phase.TavernResolution:
        return new TavernResolutionRules(this.game);
    }
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    const consequences = super.play(move);
    switch (move.type) {
      case MoveType.Pass:
        this.onInnerPass();
        consequences.push(...this.onPass());
        break;
    }

    return consequences;
  }

  abstract onPass(): (Move | MoveView)[];

  onInnerPass = (): void => {
    if (this.game.players.some((p) => !p.ready) || !isEndOfAge(this.game)) {
      return;
    }

    ensureHeroes(this.game);
  };
}

export { AgeRules };
