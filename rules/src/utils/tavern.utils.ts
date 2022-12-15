import GameState, { Phase, Step } from '../state/GameState';
import GameView from '../state/view/GameView';
import { MIN_DWARVES_PER_TAVERN, TAVERN_COUNT } from './constants';
import { getCardsInTavern } from './location.utils';
import { InTavern, LocatedCard } from '../state/LocatedCard';
import { isLocatedCard } from './player.utils';
import { Player, PlayerId } from '../state/Player';
import { getTavernCoins } from './coin.utils';

export const getCardByTavern = (players: (Player | PlayerId)[]) => Math.max(MIN_DWARVES_PER_TAVERN, players.length);

export const getCurrentTavern = (state: GameState | GameView, coinsMustBeVisible: boolean = true): number => {
  const cardInTaverns = getCardsInTavern(state);
  const tavern = Math.min(2, 3 - Math.ceil(cardInTaverns.length / getCardByTavern(state.players)));

  if (!coinsMustBeVisible || getTavernCoins(state, tavern)?.every((c) => !c.hidden)) {
    return tavern;
  }

  return tavern - 1;
};

export const getCurrentTavernCards = (state: GameState | GameView): LocatedCard[] => {
  const tavern = getCurrentTavern(state, true);
  return getCardsInTavern(state).filter(
    (c) => isLocatedCard(c) && (c.location as InTavern).tavern === tavern
  ) as LocatedCard[];
};

export const nextTavern = (state: GameState | GameView) => {
  state.players.forEach((p) => {
    delete p.ready;
    delete p.discarded;
    delete p.drawn;
    delete p.traded;
  });

  if (getCurrentTavern(state) < TAVERN_COUNT - 1) {
    state.steps = [Step.BidRevelation];
  } else {
    state.phase = Phase.TurnPreparation;
    state.steps = [Step.EnterDwarves];
  }
};
