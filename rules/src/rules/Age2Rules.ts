import { getPhaseRules } from '../utils/rule.utils';
import { NidavellirRules } from './NidavellirRules';

class Age2Rules extends NidavellirRules {
  delegate(): NidavellirRules {
    return getPhaseRules(this.state);
  }
}

export { Age2Rules };
