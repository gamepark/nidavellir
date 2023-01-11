import Move from '../moves/Move';
import { NidavellirRules } from './NidavellirRules';
import MoveType from '../moves/MoveType';
import GameState, { Step } from '../state/GameState';
import MoveView from '../moves/MoveView';
import { getCardsInTavern, isInTavern, isOnPlayerBoard } from '../utils/location.utils';
import { LocationType } from '../state/Location';
import { getCardByTavern } from '../utils/tavern.utils';
import { drawTavernCards } from '../utils/age.utils';
import { TAVERN_COUNT } from '../utils/constants';
import { moveKnownCardMove } from '../moves/MoveCard';
import shuffle from 'lodash/shuffle';
import { moveKnownCoinMove } from '../moves/MoveCoin';

class EnterTheDwarvesRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    if (!this.state.cards.filter((c) => isInTavern(c.location)).length) {
      const game = this.state as GameState;
      const cardsByTavern = getCardByTavern(game.players);
      const drawnCards = drawTavernCards(game);
      const moves: Move[] = drawnCards.map((c, index) =>
        moveKnownCardMove(c.id!, {
          type: LocationType.Tavern,
          tavern: Math.floor(index / cardsByTavern),
          index: index % cardsByTavern,
        })
      );

      moves.push(...this.moveCoinInPlayerHand())

      return moves;
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

  moveCoinInPlayerHand = () => {
    return this.state.players.flatMap((p) => {
      return shuffle(this.state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.player == p.id)).map(
        (c, index) =>
          moveKnownCoinMove(c.id!, {
            type: LocationType.PlayerHand,
            player: p.id,
            index,
          })
      );
    });
  };
}

export { EnterTheDwarvesRules };
