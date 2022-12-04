import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { ChooseCardRules } from './ChooseCardRules';
import { RecruitHeroRules } from './RecruitHeroRules';
import { getActivePlayer, getEvalandTurnOrder, getNextPlayer } from '../utils/player.utils';
import { CoinTradeRules } from './CoinTradeRules';
import MoveType from '../moves/MoveType';
import { passMove } from '../moves/Pass';
import { Step } from '../state/GameState';
import { getCurrentTavernCards } from '../utils/tavern.utils';
import { moveCardMove } from '../moves/MoveCard';
import { LocationType } from '../state/Location';
import { isInDiscard } from '../utils/location.utils';
import { EffectsRules } from '../effects/EffectsRules';
import MoveView from '../moves/MoveView';

class EvalandTurnRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    const activePlayer = getActivePlayer(this.state);
    if (activePlayer?.effects?.length) {
      return new EffectsRules[activePlayer.effects[0].type](this.state, activePlayer!);
    }

    switch (this.state.steps[0]) {
      case Step.ChooseCard:
        return new ChooseCardRules(this.state);
      case Step.RecruitHero:
        return new RecruitHeroRules(this.state);
      case Step.TradeCoin:
        return new CoinTradeRules(this.state);
    }

    return;
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const activePlayer = getActivePlayer(this.state);
    if (playerId !== activePlayer?.id || activePlayer.ready) {
      return [];
    }

    if (!this.state.steps.length) {
      return [passMove(playerId)];
    }

    return super.getLegalMoves(playerId) || [];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.Pass:
        this.onPass();
        break;
    }

    return super.play(move);
  }

  onPass() {
    const turnOrder = getEvalandTurnOrder(this.state);
    if (turnOrder[turnOrder.length - 1] === this.state.activePlayer) {
      delete this.state.activePlayer;
      this.state.nextMoves.push(...this.discardTavernMoves());
      this.state.steps = [Step.GemTrade];
      return;
    }

    this.state.activePlayer = getNextPlayer(this.state);
    this.state.steps = [Step.ChooseCard];
  }

  discardTavernMoves = () => {
    return getCurrentTavernCards(this.state).map((c, index) =>
      moveCardMove(
        {
          type: LocationType.Discard,
          index: this.state.cards.filter((c) => isInDiscard(c.location)).length + index,
        },
        c.id
      )
    );
  };
}

export { EvalandTurnRules };
