import GameState, { Phase, Step } from '../state/GameState';
import GameView from '../state/view/GameView';
import { MIN_DWARVES_PER_TAVERN, TAVERN_COUNT } from './constants';
import { getCardsInAgeDeck, getCardsInTavern, isInHeroDeck } from './location.utils';
import { InTavern, LocatedCard, OnPlayerBoardCard } from '../state/LocatedCard';
import { isLocatedCard } from './player.utils';
import { Player, PlayerId } from '../state/Player';
import { Heroes, Ylud } from '../cards/Heroes';
import { EffectType } from '../effects/EffectType';

export const getCardByTavern = (players: (Player | PlayerId)[]) => Math.max(MIN_DWARVES_PER_TAVERN, players.length);

export const getCurrentTavernCards = (state: GameState | GameView): LocatedCard[] => {
  const tavern = state.tavern;
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

  if (state.tavern < TAVERN_COUNT - 1) {
    state.tavern++;
    state.steps = [Step.BidRevelation];
  } else {
    state.round++;
    state.phase = Phase.TurnPreparation;
    state.steps = [Step.EnterDwarves];

    // TODO: compute end of game (all cards are not necessary drawn...)
    if (!getCardsInAgeDeck(state).length) {
      endGameActions(state);
    }
  }
};

export const endGameActions = (game: GameState | GameView) => {
  const ylud = game.heroes.find((c) => Heroes[c.id] === Ylud)!;
  if (!isInHeroDeck(ylud.location)) {
    const player = game.players.find((p) => p.id === (ylud.location as OnPlayerBoardCard).player)!;
    player.effects.push({ type: EffectType.YLUD });
  }
};
