import { NidavellirRules } from './NidavellirRules';
import { BidRevelationRules } from './BidRevelationRules';
import { EvalandTurnRules } from './EvalandTurnRules';
import { Step } from '../state/GameState';
import { GemTradeRules } from './GemTradeRules';

class TavernResolutionRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.state.steps[0]) {
      case Step.BidRevelation:
        return new BidRevelationRules(this.state);
      case Step.EvalandTurn:
        return new EvalandTurnRules(this.state);
      case Step.GemTrade:
        return new GemTradeRules(this.state);
    }

    return;
  }
}

export { TavernResolutionRules };
