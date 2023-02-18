import GameView from '../state/view/GameView';
import { PlayerId } from '../state/Player';
import { DwarfType } from '../cards/Card';
import { getArmy } from './player.utils';
import { Heroes } from '../cards/Heroes';
import sum from 'lodash/sum';
import { Cards } from '../cards/Cards';

export const getBlacksmithScore = (game: GameView, playerId: PlayerId) => {
  const numberOfRanks = numberOfGrades(game, playerId, DwarfType.Blacksmith);

  if (numberOfRanks === 0) {
    return 0;
  }

  return sum(Array.from(Array(numberOfRanks)).map((_, index) => 3 + index));
};
export const getHunterScore = (game: GameView, playerId: PlayerId) => {
  const numberOfRanks = numberOfGrades(game, playerId, DwarfType.Hunter);
  return numberOfRanks * numberOfRanks;
};

export const getExplorerScore = (game: GameView, playerId: PlayerId) => {
  return sumGrades(game, playerId, DwarfType.Explorer);
};

export const getMinerScore = (game: GameView, playerId: PlayerId) => {
  return sumGrades(game, playerId, DwarfType.Miner) * numberOfGrades(game, playerId, DwarfType.Miner);
};

export const getWarriorScore = (game: GameView, playerId: PlayerId) => {
  return sumGrades(game, playerId, DwarfType.Warrior);
};

const sumGrades = (game: GameView, playerId: PlayerId, type: DwarfType) => {
  const cards = getArmy(game, playerId, type);
  return (
    sum(cards.heroes.flatMap((h) => Heroes[h.id].grades?.[type] ?? 0)) +
    sum(cards.cards.flatMap((h) => Cards[h.id!].grades?.[type] ?? 0))
  );
};

export const numberOfGrades = (game: GameView, playerId: PlayerId, type: DwarfType) => {
  const cards = getArmy(game, playerId, type);
  return (
    sum(cards.cards.map((c) => Cards[c.id!].grades?.[type]?.length || 0)) +
    sum(cards.heroes.map((c) => Heroes[c.id!].grades?.[type]?.length || 0))
  );
};
