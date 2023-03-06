import { Phase, Step } from '../state/GameState';
import { EnterTheDwarvesRules } from './EnterTheDwarvesRules';
import { BidsRules } from './BidsRules';
import { NidavellirRules } from './NidavellirRules';
import { nextPhaseMove } from '../moves/NextPhase';
import MoveView from '../moves/MoveView';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { SetStep, setStepMove } from '../moves/SetStep';
import { Uline } from '../cards/Heroes';
import { getPlayerWithHero } from '../utils/hero.utils';

class TurnPreparationRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.game.step) {
      case Step.EnterDwarves:
        return new EnterTheDwarvesRules(this.game);
      case Step.Bids:
        return new BidsRules(this.game);
    }

    return;
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    if (this.game.players.every((p) => p.ready)) {
      return [nextPhaseMove];
    }

    return super.getAutomaticMoves();
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.NextPhase:
        this.game.phase = Phase.TavernResolution;
        this.game.tavern = 0;
        return [setStepMove(Step.BidRevelation)];
      case MoveType.SetStep:
        this.onSetStep(move);
    }

    return super.play(move);
  }

  onSetStep(move: SetStep) {
    // If the player has Uline in his game, choose coin only when everyone bids
    const playerWithUline = getPlayerWithHero(this.game, Uline);
    if (!playerWithUline || move.step !== Step.Bids) {
      return;
    }

    playerWithUline.ready = true;
  }
}

export { TurnPreparationRules };
