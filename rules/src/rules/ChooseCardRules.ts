import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { ChooseTavernCard, chooseTavernCardMove } from '../moves/ChooseTavernCard';
import { getCardsInTavern, isInTavern, isOnPlayerBoard } from '../utils/location.utils';
import MoveType from '../moves/MoveType';
import { canRecruitHero } from '../utils/hero.utils';
import { Step } from '../state/GameState';
import { getCurrentTavern } from '../utils/tavern.utils';
import { discardTavernMove } from '../moves/DiscardTavern';
import { isLocatedCoin } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { InTavern } from '../state/LocatedCard';

class ChooseCardRules extends NidavellirRules {
  getLegalMoves(_playerId: PlayerId): Move[] {
    const currentTavern = getCurrentTavern(this.state);
    const tavernCards = getCardsInTavern(this.state).filter((c) => (c.location as InTavern).tavern === currentTavern);
    return tavernCards.map((c) => chooseTavernCardMove(c.id!));
  }

  getAutomaticMoves(): Move[] {
    const currentTavern = getCurrentTavern(this.state);
    if (
      this.state.players.length === 2 &&
      this.state.cards.filter((c) => isInTavern(c.location) && c.location.tavern === currentTavern).length === 1
    ) {
      return [discardTavernMove];
    }

    return [];
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.ChooseTavernCard:
        this.onChoseCard(move);
        break;
    }
  }

  onChoseCard(move: ChooseTavernCard) {
    this.state.players.find((p) => this.state.activePlayer === p.id)!.lastCard = move.card;
    if (this.state.activePlayer && canRecruitHero(this.state, this.state.activePlayer)) {
      this.state.steps.push(Step.RecruitHero);
    }

    const tavern = getCurrentTavern(this.state);
    const playerCoin = this.state.coins.find(
      (coin) =>
        isOnPlayerBoard(coin.location) &&
        coin.location.index === tavern &&
        coin.location.player === this.state.activePlayer
    );

    // Trade is only triggered if the player has played a 0-value coin
    if (playerCoin && isLocatedCoin(playerCoin) && Coins[playerCoin.id].value === 0) {
      this.state.steps.push(Step.TradeCoin);
    }
  }
}

export { ChooseCardRules };
