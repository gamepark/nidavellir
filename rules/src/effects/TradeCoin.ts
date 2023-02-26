import Move from '../moves/Move';
import { getPlayerPouch } from '../utils/coin.utils';
import { NidavellirRules } from '../rules/NidavellirRules';
import { hasHero } from '../utils/card.utils';
import { Uline } from '../cards/Heroes';
import { TradeCoinWithUlineRules } from './uline/TradeCoinWithUline';
import { tradeCoinsMove } from '../moves/TradeCoins';
import { TradeCoinBaseRules } from './TradeCoinBase';

export class TradeCoinRules extends TradeCoinBaseRules {
  delegate(): NidavellirRules | undefined {
    if (hasHero(this.game, this.player.id, Uline)) {
      return new TradeCoinWithUlineRules(this.game, this.player);
    }

    return;
  }

  getEffectAutomaticMoves(): Move[] {
    const pouch = getPlayerPouch(this.game, this.player.id);
    return [tradeCoinsMove(pouch.map((c) => c.id!))];
  }
}
