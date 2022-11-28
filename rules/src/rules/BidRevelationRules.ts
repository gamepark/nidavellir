import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { RevealCoins, revealCoinsMove } from '../moves/RevealCoins';
import { isInDiscard, isInTavern, isOnPlayerBoard } from '../utils/location.utils';
import { Step } from '../state/GameState';
import { getCurrentTavern } from '../utils/tavern.utils';
import { LocationType } from '../state/Location';

class BidRevelationRules extends NidavellirRules {
  getAutomaticMoves(): Move[] {
    const tavern = getCurrentTavern(this.state);
    return [revealCoinsMove(tavern)];
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.DiscardTavern:
        this.onDiscardTavern();
        break;
      case MoveType.RevealCoins:
        this.onRevealCoins(move);
        break;
    }
  }

  private onRevealCoins(move: RevealCoins) {
    const playerCoins = this.state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.index === move.index);
    playerCoins.forEach((c) => (c.hidden = false));
    this.state.steps = [Step.ChooseCard];
  }

  private onDiscardTavern() {
    const currentTavern = getCurrentTavern(this.state);
    const cardsInCurrentTavern = this.state.cards.filter(
      (c) => isInTavern(c.location) && c.location.tavern === currentTavern
    );
    const cardsInDiscard = this.state.cards.filter((c) => isInDiscard(c.location));
    cardsInCurrentTavern.forEach((c) => {
      c.location = {
        type: LocationType.Discard,
        index: cardsInDiscard.length + 1,
      };
    });
  }
}

export { BidRevelationRules };
