import { NidavellirRules } from './NidavellirRules';
import { Player, PlayerId } from '../state/Player';
import Move from '../moves/Move';
import { getCardsInTavern, isOnPlayerBoard } from '../utils/location.utils';
import MoveType from '../moves/MoveType';
import { getCurrentTavern } from '../utils/tavern.utils';
import { getArmy, isLocatedCoin } from '../utils/player.utils';
import { Coins } from '../coins/Coins';
import { InTavern } from '../state/LocatedCard';
import { MoveCard, moveCardMove } from '../moves/MoveCard';
import { LocationType } from '../state/Location';
import { Cards } from '../cards/Cards';
import { Heroes } from '../cards/Heroes';
import { EffectType } from '../effects/EffectType';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { computeRecruitHeroCount } from '../utils/hero.utils';

class ChooseCardRules extends NidavellirRules {
  player: Player;

  constructor(game: GameState | GameView, player: Player) {
    super(game);
    this.player = player;
  }

  getLegalMoves(playerId: PlayerId): Move[] {
    if (playerId !== this.player.id) {
      return [];
    }

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
    this.player.card = move.id;

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
  }
}

export { ChooseCardRules };
