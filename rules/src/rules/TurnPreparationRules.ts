import { Phase, Step } from '../state/GameState';
import { EnterTheDwarvesRules } from './EnterTheDwarvesRules';
import { BidsRules } from './BidsRules';
import { NidavellirRules } from './NidavellirRules';
import { nextPhaseMove } from '../moves/NextPhase';
import MoveView, { isView } from '../moves/MoveView';
import Move from '../moves/Move';
import { isInPlayerHand, isInTavern, isOnPlayerBoard, isSameCoinLocation } from '../utils/location.utils';
import { MoveCoin, moveKnownCoinMove } from '../moves/MoveCoin';
import { LocationType } from '../state/Location';
import shuffle from 'lodash/shuffle';
import MoveType from '../moves/MoveType';

class TurnPreparationRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.state.steps[0]) {
      case Step.EnterDwarves:
        return new EnterTheDwarvesRules(this.state);
      case Step.Bids:
        return new BidsRules(this.state);
    }

    return;
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    if (
      this.state.steps[0] === Step.EnterDwarves &&
      this.state.cards.filter((c) => isInTavern(c.location)).length === 0 &&
      this.state.coins.filter((c) => isOnPlayerBoard(c.location)).length === this.state.players.length * 5
    ) {
      return this.moveCoinInPlayerHand();
    }

    if (this.state.players.every((p) => p.ready)) {
      // si fini, prendre une carte distinction
      // return [distributeDistinctionMove]
      return [nextPhaseMove];
    }

    return super.getAutomaticMoves();
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.NextPhase:
        this.state.phase = Phase.TavernResolution;
        this.state.steps = [Step.BidRevelation];
        break;
      case MoveType.MoveCoin:
        this.onGetCoinInHand(move);
    }
    return super.play(move);
  }

  onGetCoinInHand = (move: MoveCoin) => {
    const coin = this.state.coins.find((c) =>
      c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCoinLocation(move.target!, c.location)
    );

    if (!coin) {
      console.log(move);
      throw new Error(`There is an error, the coin to get in hand was not found ${JSON.stringify(move)}`);
    }

    if (move.target && isInPlayerHand(move.target)) {
      coin.hidden = true;
      if (isView(this.state) && (this.state.playerId === undefined || this.state.playerId !== move.target.player)) {
        delete coin.id;
      }
    }
  };

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

export { TurnPreparationRules };
