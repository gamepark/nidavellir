import Move from '../moves/Move';
import { NidavellirRules } from './NidavellirRules';
import MoveType from '../moves/MoveType';
import GameState, { Step } from '../state/GameState';
import MoveView from '../moves/MoveView';
import { getCardsInTavern } from '../utils/location.utils';
import { LocationType } from '../state/Location';
import { getCardByTavern } from '../utils/tavern.utils';
import { drawTavernCards } from '../utils/age.utils';
import { moveCardMove } from '../moves/MoveCard';
import { TAVERN_COUNT } from '../utils/constants';

class EnterTheDwarvesRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const game = this.state as GameState;
    const cardsByTavern = getCardByTavern(game);
    const drawnCards = drawTavernCards(game);
    return drawnCards.map((c, index) =>
      moveCardMove(
        {
          type: LocationType.Tavern,
          tavern: Math.floor(index / cardsByTavern),
          index: index % cardsByTavern,
        },
        c.id!
      )
    );
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCard:
        this.onMoveCard();
        break;
    }
  }

  private onMoveCard() {
    const game = this.state;

    const numberOfCardsInTavern = getCardByTavern(game) * TAVERN_COUNT;
    if (getCardsInTavern(game).length === numberOfCardsInTavern) {
      game.steps = [Step.Bids];
    }
  }
}

export { EnterTheDwarvesRules };
