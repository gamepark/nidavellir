import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { RevealCoin, RevealCoinInView, revealCoinMove } from '../moves/RevealCoin';
import { isOnPlayerBoard, isSameCoinLocation } from '../utils/location.utils';
import { Step } from '../state/GameState';
import { getCurrentTavern } from '../utils/tavern.utils';
import { isGameView } from '../state/view/GameView';
import { LocatedCoin } from '../state/LocatedCoin';
import MoveView from '../moves/MoveView';

class BidRevelationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const tavern = getCurrentTavern(this.state);
    const tavernCoins = this.state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.index === tavern);

    if (tavernCoins.some((c) => c.hidden)) {
      return tavernCoins.map((c) => revealCoinMove(c.id!));
    }

    return [];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.RevealCoin:
        if (isGameView(this.state)) {
          this.onRevealCoinsInView(move as RevealCoinInView);
        } else {
          this.onRevealCoins(move as RevealCoin);
        }
        break;
    }
  }

  private onRevealCoins(move: RevealCoin) {
    const coin = this.state.coins.find((c) => c.id === move.id);

    if (!coin) {
      throw new Error(`There is an issue while searching coin in state, ${move.id} not found`);
    }

    this.doRevealCoin(coin as LocatedCoin);
  }

  private onRevealCoinsInView(move: RevealCoinInView) {
    const coin = this.state.coins.find((c) => isSameCoinLocation(c.location, move.coin.location));

    if (!coin) {
      throw new Error(`There is an issue while searching coin in state, ${move.coin.location} not found`);
    }

    coin.id = move.coin.id;
    this.doRevealCoin(coin as LocatedCoin);
  }

  private doRevealCoin = (coin: LocatedCoin) => {
    coin.hidden = false;

    const tavern = getCurrentTavern(this.state);
    const remainingCoins = this.state.coins.filter(
      (c) => isOnPlayerBoard(c.location) && c.location.index === tavern && c.hidden
    );
    if (!remainingCoins.length) {
      this.state.steps = [Step.ChooseCard];
      return;
    }
  };
}

export { BidRevelationRules };
