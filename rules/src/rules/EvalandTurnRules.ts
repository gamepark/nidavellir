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
import { discardTavernMove } from '../moves/DiscardTavern';

class EvalandTurnRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
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

  getLegalMoves(playerId: PlayerId): Move[] {
    const activePlayer = getActivePlayer(this.state);
    if (playerId !== activePlayer?.id || activePlayer.ready) {
      return [];
    }

    if (!this.state.steps.length) {
      return [passMove(playerId)];
    }

    return super.getLegalMoves(playerId) || [];
  }

  play(move: Move) {
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
      if (getCurrentTavernCards(this.state).length) {
        this.state.nextMoves.push(discardTavernMove);
      }

      this.state.steps = [Step.GemTrade];
      return;
    }

    this.state.activePlayer = getNextPlayer(this.state);
    this.state.steps = [Step.ChooseCard];
  }
}

export { EvalandTurnRules };
