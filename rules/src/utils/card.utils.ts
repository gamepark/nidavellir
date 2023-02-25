import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { isInCommandZone, isInDiscard } from './location.utils';
import { Player, PlayerId } from '../state/Player';
import { Heroes, Ylud } from '../cards/Heroes';
import { EffectType } from '../effects/EffectType';
import { Hero } from '../cards/Hero';
import { DwarfType, RoyalOffering } from '../cards/Card';
import { LocatedCard } from '../state/LocatedCard';
import { SecretCard } from '../state/view/SecretCard';
import { getArmy, getNextIndexByType } from './player.utils';
import { Cards } from '../cards/Cards';
import { moveKnownCardMove } from '../moves/MoveCard';
import { LocationType } from '../state/Location';

export const getCardsInCommandZone = (game: GameState | GameView, playerId: PlayerId) => {
  const heroes = game.heroes.filter((c) => isInCommandZone(c.location) && c.location.player === playerId);
  const distinctions = game.distinctions.filter((c) => isInCommandZone(c.location) && c.location.player === playerId);

  return {
    heroes,
    distinctions,
  };
};

export const ensureHeroes = (game: GameState | GameView) => {
  const playerWithYlud = getPlayerWithHero(game, Ylud);
  if (playerWithYlud) {
    playerWithYlud.effects.push({ type: EffectType.YLUD });
    delete playerWithYlud.ready;
  }
};

export const hasHero = (game: GameState | GameView, player: Player, hero: Hero) => {
  const commandZone = getCardsInCommandZone(game, player.id);
  const army = getArmy(game, player.id);
  return [...commandZone.heroes, ...army.heroes].some((h) => Heroes[h.id] === hero);
};

export const getPlayerWithHero = (game: GameState | GameView, hero: Hero) => {
  return game.players.find((p) => hasHero(game, p, hero));
};

export const getCardInColumn = (c: (SecretCard | LocatedCard)[], type: DwarfType) => {
  return c.filter((c) => (c.location as any).column === type);
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

export const DWARF_COLUMNS = [
  DwarfType.Blacksmith,
  DwarfType.Hunter,
  DwarfType.Explorer,
  DwarfType.Miner,
  DwarfType.Warrior,
];
