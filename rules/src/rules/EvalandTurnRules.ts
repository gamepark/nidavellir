import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { ChooseCardRules } from './ChooseCardRules';
import { getActivePlayer, getEvalandTurnOrder, getNextPlayer } from '../utils/player.utils';
import MoveType from '../moves/MoveType';
import { passMove } from '../moves/Pass';
import { Step } from '../state/GameState';
import { getCurrentTavernCards, nextTavern } from '../utils/tavern.utils';
import { LocationType } from '../state/Location';
import { isInDiscard } from '../utils/location.utils';
import MoveView from '../moves/MoveView';
import { moveKnownCardMove } from '../moves/MoveCard';
import isEmpty from 'lodash/isEmpty';
import { getTrades } from '../utils/age.utils';

class EvalandTurnRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    const activePlayer = getActivePlayer(this.state);
    if (!activePlayer) {
      return;
    }

    if (activePlayer.drawn === undefined) {
      return new ChooseCardRules(this.state, activePlayer);
    }

    return;
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    return this.state.activePlayer === playerId;
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const activePlayer = getActivePlayer(this.state);
    if (playerId !== activePlayer?.id || activePlayer.ready) {
      return [];
    }

    if (activePlayer.drawn !== undefined && !activePlayer.effects.length) {
      return [passMove(playerId)];
    }

    return super.getLegalMoves(playerId) || [];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.Pass:
        return this.onPass();
    }

    return super.play(move);
  }

  onPass() {
    const turnOrder = getEvalandTurnOrder(this.state);
    if (turnOrder[turnOrder.length - 1] === this.state.activePlayer) {
      delete this.state.activePlayer;
      const discardMoves = this.discardTavernMoves();
      if (!isEmpty(getTrades(this.state))) {
        this.state.steps = [Step.GemTrade];
      } else {
        nextTavern(this.state);
      }
      return discardMoves;
    }

    this.state.activePlayer = getNextPlayer(this.state);
    return [];
  }

  discardTavernMoves = () => {
    return getCurrentTavernCards(this.state).map((c, index) =>
      moveKnownCardMove(c.id, {
        type: LocationType.Discard,
        index: this.state.cards.filter((c) => isInDiscard(c.location)).length + index,
      })
    );
  };
}

export { EvalandTurnRules };
