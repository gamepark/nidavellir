import { NidavellirRules } from './NidavellirRules';
import { BidRevelationRules } from './BidRevelationRules';
import { ElvalandTurnRules } from './ElvalandTurnRules';
import { Step } from '../state/GameState';
import { GemTradeRules } from './GemTradeRules';
import { SetStep } from '../moves/SetStep';
import { getPlayerWithHero } from '../utils/card.utils';
import { Uline } from '../cards/Heroes';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import MoveType from '../moves/MoveType';

class TavernResolutionRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.game.step) {
      case Step.BidRevelation:
        return new BidRevelationRules(this.game);
      case Step.ElvalandTurn:
        return new ElvalandTurnRules(this.game);
      case Step.GemTrade:
        return new GemTradeRules(this.game);
    }

    return;
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.SetStep:
        this.onSetStep(move);
        break;
    }

    return super.play(move);
  }

  onSetStep(move: SetStep) {
    // If the player has Uline in his game, choose coin only when everyone bids
    const playerWithUline = getPlayerWithHero(this.game, Uline);
    if (!playerWithUline || move.step !== Step.BidRevelation) {
      return;
    }

    delete playerWithUline.ready;
  }
}

export { TavernResolutionRules };
