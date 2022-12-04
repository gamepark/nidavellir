import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { getArmy } from './player.utils';
import { DwarfType } from '../cards/Card';
import sum from 'lodash/sum';
import { Cards } from '../cards/Cards';
import { Heroes } from '../cards/Heroes';
import { PlayerId } from '../state/Player';

export const getPlayerWithMajority = (state: GameState | GameView, type: DwarfType) => {
  let tie = false;
  let majority: number = 0;
  let playerWithMajority: PlayerId | undefined = undefined;

  for (const player of state.players) {
    const army = getArmy(state, player.id, type);
    const ranks =
      sum(army.cards.map((c) => Cards[c.id!].bravery?.length || 0)) +
      sum(army.heroes.map((c) => Heroes[c.id!].bravery?.length || 0));

    if (ranks > majority) {
      if (tie) {
        tie = false;
      }

      majority = ranks;
      playerWithMajority = player.id;
    } else if (ranks === majority) {
      tie = true;
    }
  }

  return tie ? undefined : playerWithMajority;
};
