import Move from '../moves/Move';
import { NidavellirRules } from './NidavellirRules';
import MoveType from '../moves/MoveType';
import GameState, { Step } from '../state/GameState';
import MoveView from '../moves/MoveView';
import { getCardsInTavern, isInTavern } from '../utils/location.utils';
import { LocationType } from '../state/Location';
import { getCardByTavern } from '../utils/tavern.utils';
import { drawTavernCards } from '../utils/age.utils';
import { TAVERN_COUNT } from '../utils/constants';
import { moveKnownCardMove } from '../moves/MoveCard';

class EnterTheDwarvesRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    if (!this.state.cards.filter((c) => isInTavern(c.location)).length) {
      const game = this.state as GameState;
      const cardsByTavern = getCardByTavern(game.players);
      const drawnCards = drawTavernCards(game);
      return drawnCards.map((c, index) =>
        moveKnownCardMove(c.id!, {
          type: LocationType.Tavern,
          tavern: Math.floor(index / cardsByTavern),
          index: index % cardsByTavern,
        })
      );
    }

    return super.getAutomaticMoves();
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCard:
        this.onMoveCard();
        break;
    }

    return [];
  }

  private onMoveCard() {
    const game = this.state;

    const numberOfCardsInTavern = getCardByTavern(game.players) * TAVERN_COUNT;
    if (getCardsInTavern(game).length === numberOfCardsInTavern) {
      game.steps = [Step.Bids];
    }
  }
}

export { EnterTheDwarvesRules };
