import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import { isOnPlayerBoard } from '../utils/location.utils';
import { getCurrentTavern } from '../utils/tavern.utils';
import MoveView from '../moves/MoveView';
import { revealCoinMove } from '../moves/MoveCoin';

class BidRevelationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const tavern = getCurrentTavern(this.state);
    const tavernCoins = this.state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.index === tavern);

    if (tavernCoins.some((c) => c.hidden)) {
      return tavernCoins.map((c) => revealCoinMove(c.id!));
    }

    return [];
  }
}

export { BidRevelationRules };
