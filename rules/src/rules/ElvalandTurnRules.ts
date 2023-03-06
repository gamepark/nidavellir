import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { ChooseCardRules } from './ChooseCardRules';
import { getActivePlayer, getElvalandTurnOrder, getNextPlayer } from '../utils/player.utils';
import MoveType from '../moves/MoveType';
import { passMove } from '../moves/Pass';
import { Step } from '../state/GameState';
import { getCurrentTavernCards, mayGoToNextTavern } from '../utils/tavern.utils';
import { LocationType } from '../state/Location';
import { isInCommandZone, isInDiscard } from '../utils/location.utils';
import MoveView from '../moves/MoveView';
import { moveKnownCardMove } from '../moves/MoveCard';
import isEmpty from 'lodash/isEmpty';
import { getTrades } from '../utils/age.utils';
import { setStepMove } from '../moves/SetStep';
import { getChooseCardMove } from '../utils/card.utils';
import { Thrud } from '../cards/Heroes';
import { ThrudRules } from '../effects/ThrudEffect';
import { getHero } from '../utils/hero.utils';

class ElvalandTurnRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    const activePlayer = getActivePlayer(this.game);
    if (!activePlayer) {
      return;
    }

    if (activePlayer.playedCard === undefined) {
      return new ChooseCardRules(this.game, activePlayer);
    }

    const thrud = getHero(this.game, activePlayer.id, Thrud);
    if (thrud && isInCommandZone(thrud.location)) {
      return new ThrudRules(this.game, activePlayer);
    }

    return;
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    return this.game.activePlayer === playerId;
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const activePlayer = getActivePlayer(this.game);
    if (playerId !== activePlayer?.id || activePlayer.ready) {
      return [];
    }

    if (activePlayer.playedCard !== undefined && !activePlayer.effects.length) {
      const thrud = getHero(this.game, activePlayer.id, Thrud);
      if (!thrud || !isInCommandZone(thrud.location)) {
        return [passMove(playerId)];
      }
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
    const turnOrder = getElvalandTurnOrder(this.game);
    if (turnOrder[turnOrder.length - 1] === this.game.activePlayer) {
      delete this.game.activePlayer;
      const consequences: (Move | MoveView)[] = this.discardTavernMoves();

      if (!isEmpty(getTrades(this.game))) {
        consequences.push(setStepMove(Step.GemTrade));
      } else {
        consequences.push(...mayGoToNextTavern(this.game));
      }

      return consequences;
    } else {
      const consequences = [];
      const nextPlayer = getNextPlayer(this.game);
      const cardInTaverns = getCurrentTavernCards(this.state);
      if (cardInTaverns.length === 1) {
        const activePlayer = this.game.players.find((p) => p.id === nextPlayer)!;
        consequences.push(getChooseCardMove(this.game, activePlayer, cardInTaverns[0].id));
      }

      this.game.activePlayer = nextPlayer;
      return consequences;
    }
  }

  discardTavernMoves = () => {
    return getCurrentTavernCards(this.game).map((c, index) =>
      moveKnownCardMove(c.id, {
        type: LocationType.Discard,
        index: this.game.cards.filter((c) => isInDiscard(c.location)).length + index,
      })
    );
  };
}

export { ElvalandTurnRules };
