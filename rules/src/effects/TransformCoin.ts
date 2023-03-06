import { NidavellirRules } from '../rules/NidavellirRules';
import { Uline } from '../cards/Heroes';
import { TransformCoinWithUlineRules } from './uline/TransformCoinWithUline';
import { TransformCoinBaseRules } from './TransformCoinBase';
import { hasHero } from '../utils/hero.utils';

export class TransformCoinRules extends TransformCoinBaseRules {
  delegate(): NidavellirRules | undefined {
    if (hasHero(this.game, this.player.id, Uline)) {
      return new TransformCoinWithUlineRules(this.game, this.player);
    }

    return;
  }
}
