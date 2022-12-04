import { PlayerId } from '../state/Player';
import GameState, { Step } from '../state/GameState';
import GameView from '../state/view/GameView';
import { getArmy, isLocatedCard } from './player.utils';
import { Cards } from '../cards/Cards';
import { DwarfType } from '../cards/Card';
import { LocatedCard } from '../state/LocatedCard';
import { SecretCard } from '../state/view/SecretCard';
import { isInHeroDeck } from './location.utils';

export const canRecruitHero = (state: GameState | GameView, playerId: PlayerId) => {
  const player = state.players.find((p) => p.id === playerId)!;
  const hero = state.heroes.filter((h) => isInHeroDeck(h.location));

  if (!hero.length || state.steps.includes(Step.RecruitHero)) {
    return false;
  }

  const army = getArmy(state, playerId);
  const tavernCardIndex = army.cards.find((c) => c.id === player.card)!.location.index;
  const dwarfTypes = [DwarfType.Blacksmith, DwarfType.Hunter, DwarfType.Warrior, DwarfType.Explorer, DwarfType.Miner];
  return dwarfTypes.every((type) => {
    const condition = (c: LocatedCard | SecretCard) =>
      isLocatedCard(c) && Cards[c.id].type === type && c.location.index === tavernCardIndex;
    return army.cards.some(condition) || army.heroes.some(condition);
  });
};
