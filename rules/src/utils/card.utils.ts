import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { isInCommandZone } from './location.utils';
import { Player, PlayerId } from '../state/Player';
import { Heroes, Ylud } from '../cards/Heroes';
import { EffectType } from '../effects/EffectType';
import { Hero } from '../cards/Hero';

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
  return commandZone.heroes.some((h) => Heroes[h.id] === hero);
};

export const getPlayerWithHero = (game: GameState | GameView, hero: Hero) => {
  return game.players.find((p) => hasHero(game, p, hero));
};
