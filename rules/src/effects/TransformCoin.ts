import { NidavellirRules } from '../rules/NidavellirRules';
import { hasHero } from '../utils/card.utils';
import { Uline } from '../cards/Heroes';
import { TransformCoinWithUlineRules } from './uline/TransformCoinWithUline';
import { TransformCoinBaseRules } from './TransformCoinBase';

export class TransformCoinRules extends TransformCoinBaseRules {
  delegate(): NidavellirRules | undefined {
    if (hasHero(this.game, this.player.id, Uline)) {
      return new TransformCoinWithUlineRules(this.game, this.player);
    }

    return;
  }
}
