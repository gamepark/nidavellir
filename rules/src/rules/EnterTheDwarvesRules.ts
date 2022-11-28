import Move from '../moves/Move';
import { NidavellirRules } from './NidavellirRules';
import { fillTavernsMove } from '../moves/FillTaverns';
import MoveType from '../moves/MoveType';
import { Step } from '../state/GameState';

class EnterTheDwarvesRules extends NidavellirRules {
  getAutomaticMoves(): Move[] {
    return [fillTavernsMove];
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.FillTaverns:
        this.onFillTavern();
        break;
    }
  }

  private onFillTavern() {
    this.state.steps = [Step.Bids];
  }
}

export { EnterTheDwarvesRules };
