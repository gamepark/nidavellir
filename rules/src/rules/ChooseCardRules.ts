import { NidavellirRules } from './NidavellirRules';
import { PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { getCardsInTavern, isOnPlayerBoard } from '../utils/location.utils';
import MoveType from '../moves/MoveType';
import { canRecruitHero } from '../utils/hero.utils';
import { Step } from '../state/GameState';
import { getCurrentTavern } from '../utils/tavern.utils';
import { getActivePlayer, getArmy, isLocatedCoin } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { InTavern } from '../state/LocatedCard';
import { MoveCard, moveCardMove } from '../moves/MoveCard';
import { LocationType } from '../state/Location';
import { Cards } from '../cards/Cards';
import { Heroes } from '../cards/Heroes';

class ChooseCardRules extends NidavellirRules {
  getLegalMoves(playerId: PlayerId): Move[] {
    const currentTavern = getCurrentTavern(this.state);
    const tavernCards = getCardsInTavern(this.state).filter((c) => (c.location as InTavern).tavern === currentTavern);
    const playerArmy = getArmy(this.state, playerId);

    return tavernCards.map((c) => {
      const card = Cards[c.id!];
      const cards = playerArmy.cards.filter((h) => Cards[h.id!].type === card.type);
      const heroes = playerArmy.heroes.filter((h) => Heroes[h.id!].type === card.type);
      return moveCardMove(
        {
          type: LocationType.PlayerBoard,
          player: playerId,
          index: cards.length + heroes.length,
        },
        c.id
      );
    });
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.MoveCard:
        this.onMoveCard(move);
        break;
    }

    super.play(move);
  }

  private onMoveCard(move: MoveCard) {
    switch (move.target.type) {
      case LocationType.PlayerBoard:
        this.chooseCard(move);
        break;
    }
  }

  chooseCard(move: MoveCard) {
    const activePlayer = getActivePlayer(this.state);

    if (!activePlayer) {
      throw new Error('There is no active player but there is a choose card move. Check rules please.');
    }

    activePlayer.card = move.id;
    if (this.state.activePlayer && canRecruitHero(this.state, activePlayer.id)) {
      this.state.steps.push(Step.RecruitHero);
    }

    const tavern = getCurrentTavern(this.state);
    const playerCoin = this.state.coins.find(
      (coin) =>
        isOnPlayerBoard(coin.location) && coin.location.index === tavern && coin.location.player === activePlayer.id
    );

    // Trade is only triggered if the player has played a 0-value coin
    if (playerCoin && isLocatedCoin(playerCoin) && Coins[playerCoin.id].value === 0) {
      this.state.steps.push(Step.TradeCoin);
    }

    const card = Cards[move.id!];
    if (card.effects?.length) {
      activePlayer.effects.push(...card.effects);
    }
  }
}

export { ChooseCardRules };
