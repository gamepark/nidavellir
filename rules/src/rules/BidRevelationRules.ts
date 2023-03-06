import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import { getCoinsInPlayerHand, isOnPlayerBoard } from '../utils/location.utils';
import MoveView from '../moves/MoveView';
import { moveCoinAndRevealMove, revealCoinMove } from '../moves/MoveCoin';
import MoveType from '../moves/MoveType';
import { Step } from '../state/GameState';
import { getNextPlayer } from '../utils/player.utils';
import { setStepMove } from '../moves/SetStep';
import { PlayerId } from '../state/Player';
import { Uline } from '../cards/Heroes';
import { getPlayerCoinForTavern } from '../utils/coin.utils';
import { passMove } from '../moves/Pass';
import { LocationType } from '../state/Location';
import { getPlayerWithHero } from '../utils/hero.utils';

class BidRevelationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const tavern = this.game.tavern;
    const tavernCoins = this.game.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.index === tavern);

    if (tavernCoins.some((c) => c.hidden)) {
      return tavernCoins.map((c) => revealCoinMove(c.id!));
    }

    return [];
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    const playerWithUline = getPlayerWithHero(this.game, Uline);
    if (playerWithUline && playerId === playerWithUline.id && !playerWithUline.ready) {
      return true;
    }

    return super.isTurnToPlay(playerId);
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const tavern = this.game.tavern;
    const remainingCoinToReveal = this.game.coins.find(
      (c) => isOnPlayerBoard(c.location) && c.location.index === tavern && c.hidden
    );

    if (remainingCoinToReveal) {
      return [];
    }

    const playerWithUline = getPlayerWithHero(this.game, Uline);

    if (playerId === playerWithUline?.id) {
      const tavern = this.game.tavern;
      if (getPlayerCoinForTavern(this.game, playerId, tavern)) {
        return [passMove(playerId)];
      }

      return getCoinsInPlayerHand(this.game, playerId).map((c) =>
        moveCoinAndRevealMove(c.id!, {
          type: LocationType.PlayerBoard,
          index: tavern,
          player: playerWithUline.id,
        })
      );
    }

    return [];
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCoin:
        return this.onMoveCoin();
      case MoveType.Pass:
        return this.onPass();
    }

    return super.play(move);
  }

  onMoveCoin = (): (Move | MoveView)[] => {
    const tavern = this.game.tavern;
    const remainingCoinToReveal = this.game.coins.find(
      (c) => isOnPlayerBoard(c.location) && c.location.index === tavern && c.hidden
    );

    const playerWithUline = getPlayerWithHero(this.game, Uline);
    if (!playerWithUline && !remainingCoinToReveal) {
      return this.goToEvalandTurn();
    }

    return [];
  };

  onPass = () => {
    // The only case the player can pass at this step is when the player has Uline
    return this.goToEvalandTurn();
  };

  goToEvalandTurn = () => {
    this.game.activePlayer = getNextPlayer(this.game);
    this.game.players.forEach((p) => {
      delete p.ready;
    });
    return [setStepMove(Step.ElvalandTurn)];
  };
}

export { BidRevelationRules };
