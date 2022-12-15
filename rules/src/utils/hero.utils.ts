import { PlayerId } from '../state/Player';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { getArmy } from './player.utils';
import { Cards } from '../cards/Cards';
import { DwarfType } from '../cards/Card';
import { LocatedCard } from '../state/LocatedCard';
import { SecretCard } from '../state/view/SecretCard';
import { isInHeroDeck } from './location.utils';
import sum from 'lodash/sum';
import { Heroes } from '../cards/Heroes';

export const sumBravery = (army: { cards: SecretCard[]; heroes: LocatedCard[] }, type: DwarfType) => {
  return (
    sum(
      army.cards
        .map((c) => Cards[c.id!])
        .filter((c) => c.type === type)
        .map((c) => c.bravery?.length ?? 0)
    ) +
    sum(
      army.heroes
        .map((c) => Heroes[c.id!])
        .filter((c) => c.type === type)
        .map((c) => c.bravery?.length ?? 0)
    )
  );
};

export const computeRecruitHeroCount = (state: GameState | GameView, playerId: PlayerId): number => {
  const player = state.players.find((p) => p.id === playerId)!;
  const heroes = state.heroes.filter((h) => isInHeroDeck(h.location));

  if (!player.drawn || !heroes.length) {
    return 0;
  }

  const army = getArmy(state, playerId);
  const drawnCard = player.drawn;
  const card = (drawnCard.deck === 'heroes' ? Heroes : Cards)[player.drawn.card];
  const cardBravery = card.bravery?.length ?? 0;
  const braveryByTypes = {
    [DwarfType.Blacksmith]: sumBravery(army, DwarfType.Blacksmith),
    [DwarfType.Hunter]: sumBravery(army, DwarfType.Hunter),
    [DwarfType.Warrior]: sumBravery(army, DwarfType.Warrior),
    [DwarfType.Explorer]: sumBravery(army, DwarfType.Explorer),
    [DwarfType.Miner]: sumBravery(army, DwarfType.Miner),
  };

  const minBraveryBeforeCard = Math.min(
    braveryByTypes[DwarfType.Blacksmith] - (card.type === DwarfType.Blacksmith ? cardBravery : 0),
    braveryByTypes[DwarfType.Hunter] - (card.type === DwarfType.Hunter ? cardBravery : 0),
    braveryByTypes[DwarfType.Warrior] - (card.type === DwarfType.Warrior ? cardBravery : 0),
    braveryByTypes[DwarfType.Explorer] - (card.type === DwarfType.Explorer ? cardBravery : 0),
    braveryByTypes[DwarfType.Miner] - (card.type === DwarfType.Miner ? cardBravery : 0)
  );

  const minBraveryAfterCard = Math.min(
    braveryByTypes[DwarfType.Blacksmith],
    braveryByTypes[DwarfType.Hunter],
    braveryByTypes[DwarfType.Warrior],
    braveryByTypes[DwarfType.Explorer],
    braveryByTypes[DwarfType.Miner]
  );

  return minBraveryAfterCard - minBraveryBeforeCard;
};
