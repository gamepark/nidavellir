import { NidavellirRules } from './NidavellirRules';
import { Player, PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { getCardsInTavern, isInDiscard, isOnPlayerBoard } from '../utils/location.utils';
import MoveType from '../moves/MoveType';
import { getActivePlayer, getNextIndexByType, isLocatedCoin } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { InTavern } from '../state/LocatedCard';
import { MoveCard, moveKnownCardMove } from '../moves/MoveCard';
import { LocationType } from '../state/Location';
import { Cards } from '../cards/Cards';
import { EffectType } from '../effects/EffectType';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { computeRecruitHeroCount } from '../utils/hero.utils';
import { RoyalOffering } from '../cards/Card';
import MoveView from '../moves/MoveView';

class ChooseCardRules extends NidavellirRules {
  player: Player;

  constructor(game: GameState | GameView, player: Player) {
    super(game);
    this.player = player;
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    const activePlayer = getActivePlayer(this.state);
    const cardInTavern = getCardsInTavern(this.state)
    if (cardInTavern.length === 1 && activePlayer.drawn === undefined) {
      return [this.getChooseCardMove(cardInTavern[0].id!)];
    }
    return super.getAutomaticMoves();
  }

  getLegalMoves(playerId: PlayerId): Move[] {
    if (playerId !== this.player.id || this.player.drawn !== undefined) {
      return [];
    }

    const currentTavern = this.state.tavern;
    const tavernCards = getCardsInTavern(this.state).filter((c) => (c.location as InTavern).tavern === currentTavern);

    return tavernCards.map((c) => this.getChooseCardMove(c.id!));
  }

  getChooseCardMove = (cardId: number) => {
    const nextIndexesByType = getNextIndexByType(this.state, this.player.id);
    const card = Cards[cardId];
    if (card.type === RoyalOffering.RoyalOffering) {
      return moveKnownCardMove(cardId, {
        type: LocationType.Discard,
        index: this.state.cards.filter((c) => isInDiscard(c.location)).length,
      });
    }
    return moveKnownCardMove(cardId, {
      type: LocationType.PlayerBoard,
      player: this.player.id,
      index: nextIndexesByType[card.type].nextIndex,
      column: card.type,
    });
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.MoveCard:
        return this.chooseCard(move);
    }

    return super.play(move);
  }

  chooseCard(move: MoveCard) {
    this.player.drawn = {
      card: move.id!,
      deck: 'age',
    };

    const tavern = this.state.tavern;
    const playerCoin = this.state.coins.find(
      (coin) =>
        isOnPlayerBoard(coin.location) && coin.location.index === tavern && coin.location.player === this.player.id
    );

    const recruitHeroCount = computeRecruitHeroCount(this.state, this.player.id);
    if (recruitHeroCount > 0) {
      this.player.effects.push({
        type: EffectType.RECRUIT_HERO,
        count: recruitHeroCount,
      });
    }

    // Trade is only triggered if the player has played a 0-value coin
    if (playerCoin && isLocatedCoin(playerCoin) && Coins[playerCoin.id].value === 0) {
      this.player.effects.push({
        type: EffectType.TRADE_COIN,
      });
    }

    const card = Cards[move.id!];
    if (card.effects?.length) {
      this.player.effects.push(...card.effects);
    }

    return [];
  }
}

export { ChooseCardRules };
