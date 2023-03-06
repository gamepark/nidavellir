import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { isInCommandZone, isInDiscard } from './location.utils';
import { Player, PlayerId } from '../state/Player';
import { DwarfType, RoyalOffering } from '../cards/Card';
import { getNextIndexByType } from './player.utils';
import { Cards } from '../cards/Cards';
import { moveKnownCardMove } from '../moves/MoveCard';
import { LocationType } from '../state/Location';
import { mayRecruitNewHeroes } from './hero.utils';

export const getCardsInCommandZone = (game: GameState | GameView, playerId: PlayerId) => {
  const heroes = game.heroes.filter((c) => isInCommandZone(c.location) && c.location.player === playerId);
  const distinctions = game.distinctions.filter((c) => isInCommandZone(c.location) && c.location.player === playerId);

  return {
    heroes,
    distinctions,
  };
};

export const getNextCardIndexInDiscard = (game: GameState | GameView) => {
  return game.cards.filter((c) => isInDiscard(c.location)).length;
};

export const getChooseCardMove = (game: GameState | GameView, player: Player, cardId: number) => {
  const nextIndexesByType = getNextIndexByType(game, player.id);
  const card = Cards[cardId];
  if (card.type === RoyalOffering.RoyalOffering) {
    return moveKnownCardMove(cardId, {
      type: LocationType.Discard,
      index: getNextCardIndexInDiscard(game),
    });
  }
  return moveKnownCardMove(cardId, {
    type: LocationType.Army,
    player: player.id,
    index: nextIndexesByType[card.type].nextIndex,
    column: card.type,
  });
};

export const onChooseCard = (
  game: GameState | GameView,
  player: Player,
  cardId: number,
  origin: 'age' | 'heroes',
  unshit?: boolean
) => {
  player.playedCard = {
    id: cardId,
    deck: origin,
  };

  mayRecruitNewHeroes(game, player, unshit);
};

export const DWARF_COLUMNS = [
  DwarfType.Blacksmith,
  DwarfType.Hunter,
  DwarfType.Explorer,
  DwarfType.Miner,
  DwarfType.Warrior,
];
