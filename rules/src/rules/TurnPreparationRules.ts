import { Step } from '../state/GameState';
import { EnterTheDwarvesRules } from './EnterTheDwarvesRules';
import { BidsRules } from './BidsRules';
import { NidavellirRules } from './NidavellirRules';

class TurnPreparationRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.state.steps[0]) {
      case Step.EnterDwarves:
        return new EnterTheDwarvesRules(this.state);
      case Step.Bids:
        return new BidsRules(this.state);
    }

    return;
  }
}

export { TurnPreparationRules };
