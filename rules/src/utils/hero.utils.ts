import { PlayerId } from '../state/Player';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { getArmy } from './player.utils';
import { Cards } from '../cards/Cards';
import { DwarfType } from '../cards/Card';
import { LocatedCard, OnPlayerBoardCard } from '../state/LocatedCard';
import { SecretCard } from '../state/view/SecretCard';
import { isInHeroDeck, isOnPlayerBoardCard } from './location.utils';
import sum from 'lodash/sum';
import { Heroes } from '../cards/Heroes';
import { HeroType } from '../cards/Hero';

export const countGrades = (army: { cards: SecretCard[]; heroes: LocatedCard[] }, type: DwarfType) => {
  return (
    sum(
      army.cards
        .filter((c) => (c.location as OnPlayerBoardCard).column === type)
        .map((c) => Cards[c.id!])
        .map((c) => c.grades?.[type]?.length ?? 0)
    ) +
    sum(
      army.heroes
        .filter((c) => (c.location as OnPlayerBoardCard).column === type)
        .map((c) => Heroes[c.id!])
        .map((c) => c.grades?.[type]?.length ?? 0)
    )
  );
};

export const computeRecruitHeroCount = (state: GameState | GameView, playerId: PlayerId): number => {
  const player = state.players.find((p) => p.id === playerId)!;
  const heroes = state.heroes.filter((h) => isInHeroDeck(h.location));

  if (!player.drawn || !heroes.length) {
    return 0;
  }
  const drawnCard = player.drawn;
  const locatedCard = (drawnCard.deck === 'heroes' ? state.heroes : state.cards).find((c) => c.id === drawnCard.card)!;

  // If the hero is in command zone, no more recruitment
  if (isOnPlayerBoardCard(locatedCard.location) && locatedCard.location.column === HeroType.Neutral) {
    return 0;
  }

  const army = getArmy(state, playerId);
  const card = (drawnCard.deck === 'heroes' ? Heroes : Cards)[player.drawn.card];
  const gradesByTypes = {
    [DwarfType.Blacksmith]: countGrades(army, DwarfType.Blacksmith),
    [DwarfType.Hunter]: countGrades(army, DwarfType.Hunter),
    [DwarfType.Warrior]: countGrades(army, DwarfType.Warrior),
    [DwarfType.Explorer]: countGrades(army, DwarfType.Explorer),
    [DwarfType.Miner]: countGrades(army, DwarfType.Miner),
  };

  // TODO: will not work if the hero is places explicitely in this column (hero with multiple types)
  const minGradesBeforeCard = Math.min(
    gradesByTypes[DwarfType.Blacksmith] - (card.grades?.[DwarfType.Blacksmith]?.length ?? 0),
    gradesByTypes[DwarfType.Hunter] - (card.grades?.[DwarfType.Hunter]?.length ?? 0),
    gradesByTypes[DwarfType.Warrior] - (card.grades?.[DwarfType.Warrior]?.length ?? 0),
    gradesByTypes[DwarfType.Explorer] - (card.grades?.[DwarfType.Explorer]?.length ?? 0),
    gradesByTypes[DwarfType.Miner] - (card.grades?.[DwarfType.Miner]?.length ?? 0)
  );

  const minGradesAfterCard = Math.min(
    gradesByTypes[DwarfType.Blacksmith],
    gradesByTypes[DwarfType.Hunter],
    gradesByTypes[DwarfType.Warrior],
    gradesByTypes[DwarfType.Explorer],
    gradesByTypes[DwarfType.Miner]
  );

  return minGradesAfterCard - minGradesBeforeCard;
};
