import { NidavellirRules } from './NidavellirRules';
import MoveType from '../moves/MoveType';
import Move from '../moves/Move';
import { tradeGemMove } from '../moves/TradeGem';
import { Step } from '../state/GameState';

class GemTradeRules extends NidavellirRules {
  getAutomaticMoves(): Move[] {
    return [tradeGemMove];
  }

  play(move: Move): void {
    switch (move.type) {
      case MoveType.TradeGem:
        this.onGemTrade();
        break;
    }

    return super.play(move);
  }

  onGemTrade() {
    this.state.steps = [Step.BidRevelation];
  }
}

export { GemTradeRules };
