import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import { isOnPlayerBoard } from '../utils/location.utils';
import MoveView from '../moves/MoveView';
import { revealCoinMove } from '../moves/MoveCoin';
import MoveType from '../moves/MoveType';
import { Step } from '../state/GameState';
import { getNextPlayer } from '../utils/player.utils';

class BidRevelationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const tavern = this.state.tavern;
    const tavernCoins = this.state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.index === tavern);

    if (tavernCoins.some((c) => c.hidden)) {
      return tavernCoins.map((c) => revealCoinMove(c.id!));
    }

    return [];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCoin:
        this.onMoveCoin();
    }

    return super.play(move);
  }

  onMoveCoin = () => {
    const tavern = this.state.tavern;
    const remainingCoinToReveal = this.state.coins.find(
      (c) => isOnPlayerBoard(c.location) && c.location.index === tavern && c.hidden
    );

    if (!remainingCoinToReveal) {
      this.state.steps = [Step.EvalandTurn];
      this.state.activePlayer = getNextPlayer(this.state);
      this.state.players.forEach((p) => {
        delete p.ready;
      });
    }
  };
}

export { BidRevelationRules };
