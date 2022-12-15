import { NidavellirRules } from './NidavellirRules';
import { Player, PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { getCardsInTavern, isInDiscard, isOnPlayerBoard } from '../utils/location.utils';
import MoveType from '../moves/MoveType';
import { getCurrentTavern } from '../utils/tavern.utils';
import { getNextIndexByType, isLocatedCoin } from '../utils/player.utils';
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

class ChooseCardRules extends NidavellirRules {
  player: Player;

  constructor(game: GameState | GameView, player: Player) {
    super(game);
    this.player = player;
  }

  getLegalMoves(playerId: PlayerId): Move[] {
    if (playerId !== this.player.id || this.player.drawn !== undefined) {
      return [];
    }

    const currentTavern = getCurrentTavern(this.state);
    const tavernCards = getCardsInTavern(this.state).filter((c) => (c.location as InTavern).tavern === currentTavern);
    const nextIndexesByType = getNextIndexByType(this.state, this.player.id);

    return tavernCards.map((c) => {
      const card = Cards[c.id!];
      if (card.type === RoyalOffering.RoyalOffering) {
        return moveKnownCardMove(c.id!, {
          type: LocationType.Discard,
          index: this.state.cards.filter((c) => isInDiscard(c.location)).length,
        });
      }
      return moveKnownCardMove(c.id!, {
        type: LocationType.PlayerBoard,
        player: playerId,
        index: nextIndexesByType[card.type].nextIndex,
      });
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

    const tavern = getCurrentTavern(this.state);
    const playerCoin = this.state.coins.find(
      (coin) =>
        isOnPlayerBoard(coin.location) && coin.location.index === tavern && coin.location.player === this.player.id
    );

    // Trade is only triggered if the player has played a 0-value coin
    if (playerCoin && isLocatedCoin(playerCoin) && Coins[playerCoin.id].value === 0) {
      this.player.effects.push({
        type: EffectType.TRADE_COIN,
      });
    }

    const recruitHeroCount = computeRecruitHeroCount(this.state, this.player.id);
    if (recruitHeroCount > 0) {
      this.player.effects.push({
        type: EffectType.RECRUIT_HERO,
        count: recruitHeroCount,
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
