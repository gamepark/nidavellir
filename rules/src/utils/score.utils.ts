import GameView from '../state/view/GameView';
import { PlayerId } from '../state/Player';
import { DwarfType } from '../cards/Card';
import { getArmy } from './player.utils';
import {
  Astrid,
  DwergAesir,
  DwergBergelmir,
  DwergJungir,
  DwergSigmir,
  DwergYmir,
  Heroes,
  Idunn,
} from '../cards/Heroes';
import sum from 'lodash/sum';
import { Cards } from '../cards/Cards';
import { getCardsInCommandZone, hasHero } from './card.utils';
import GameState from '../state/GameState';
import sumBy from 'lodash/sumBy';
import { Coins } from '../coins/Coins';
import { CoinColor } from '../coins/Coin';
import { getPlayersWithMajority } from './distinction.utils';
import maxBy from 'lodash/maxBy';
import { getPlayerCoins } from './coin.utils';
import { HeroType } from '../cards/Hero';
import { LocatedCard } from '../state/LocatedCard';

export const getBlacksmithScore = (game: GameState | GameView, playerId: PlayerId) => {
  const numberOfRanks = numberOfGrades(game, playerId, DwarfType.Blacksmith);

  if (numberOfRanks === 0) {
    return 0;
  }

  return sum(Array.from(Array(numberOfRanks)).map((_, index) => 3 + index));
};
export const getHunterScore = (game: GameState | GameView, playerId: PlayerId) => {
  const numberOfRanks = numberOfGrades(game, playerId, DwarfType.Hunter);
  return numberOfRanks * numberOfRanks;
};

export const getExplorerScore = (game: GameState | GameView, playerId: PlayerId) => {
  const gradeScore = sumGrades(game, playerId, DwarfType.Explorer);
  if (hasHero(game, playerId, Idunn)) {
    return gradeScore + 2 * numberOfGrades(game, playerId, DwarfType.Explorer);
  }

  return gradeScore;
};

export const getMinerScore = (game: GameState | GameView, playerId: PlayerId) => {
  return sumGrades(game, playerId, DwarfType.Miner) * numberOfGrades(game, playerId, DwarfType.Miner);
};

export const getWarriorScore = (game: GameState | GameView, playerId: PlayerId) => {
  const majorityPlayers = getPlayersWithMajority(game, DwarfType.Warrior);
  const gradeScore = sumGrades(game, playerId, DwarfType.Warrior);
  if (majorityPlayers.includes(playerId)) {
    return gradeScore + getMaximumCoinValue(game, playerId);
  }
  return gradeScore;
};

export const getMaximumCoinValue = (game: GameState | GameView, playerId: PlayerId) => {
  const playerCoins = getPlayerCoins(game, playerId);
  if (playerCoins.some((c) => !c.id)) {
    return 0;
  }
  
  const maximumCoin = maxBy(playerCoins, (c) => Coins[c.id!].value)!;

  return Coins[maximumCoin.id!].value;
};

export const getHeroesScoring = (game: GameState | GameView, playerId: PlayerId) => {
  const commandZone = getCardsInCommandZone(game, playerId);
  const gradeScore = sum(commandZone.heroes.flatMap((h) => Heroes[h.id].grades?.[HeroType.Neutral] ?? 0));
  const dwergScore = getDwergBrothersScore(commandZone.heroes);
  const astridScore = getAstridScore(game, playerId);

  return gradeScore + dwergScore + astridScore;
};

export const getAstridScore = (game: GameState | GameView, playerId: PlayerId) => {
  if (hasHero(game, playerId, Astrid)) {
    return getMaximumCoinValue(game, playerId);
  }

  return 0;
};

export const getDwergBrothersScore = (cards: LocatedCard[]) => {
  const dwergBrothers = cards.filter((c) =>
    [DwergAesir, DwergSigmir, DwergJungir, DwergYmir, DwergBergelmir].some((h) => h === Heroes[c.id!])
  );

  const browerCount = dwergBrothers.length === 0 ? 0 : dwergBrothers.length - 1;
  return [13, 40, 81, 108, 135][browerCount];
};

export const getGoldCoinsScore = (game: GameState | GameView, playerId: PlayerId) => {
  const coins = getPlayerCoins(game, playerId).filter((c) => Coins[c.id!].color !== CoinColor.Bronze);
  return sumBy(coins, (c) => Coins[c.id!].value);
};

const sumGrades = (game: GameState | GameView, playerId: PlayerId, type: DwarfType) => {
  const cards = getArmy(game, playerId, type);
  return (
    sum(cards.heroes.flatMap((h) => Heroes[h.id].grades?.[type] ?? 0)) +
    sum(cards.cards.flatMap((h) => Cards[h.id!].grades?.[type] ?? 0))
  );
};

export const numberOfGrades = (game: GameState | GameView, playerId: PlayerId, type: DwarfType) => {
  const cards = getArmy(game, playerId, type);
  return (
    sum(cards.cards.map((c) => Cards[c.id!].grades?.[type]?.length || 0)) +
    sum(cards.heroes.map((c) => Heroes[c.id!].grades?.[type]?.length || 0))
  );
};

export const getPlayerScore = (game: GameState | GameView, playerId: PlayerId) => {
  return (
    getBlacksmithScore(game, playerId) +
    getHunterScore(game, playerId) +
    getExplorerScore(game, playerId) +
    getMinerScore(game, playerId) +
    getWarriorScore(game, playerId) +
    getGoldCoinsScore(game, playerId) +
    getHeroesScoring(game, playerId)
  );
};
