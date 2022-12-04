import GameState, { Phase } from '../state/GameState';
import GameView from '../state/view/GameView';
import { isAge1 } from './age.utils';
import { Age1Rules } from '../rules/Age1Rules';
import { Age2Rules } from '../rules/Age2Rules';
import { TavernResolutionRules } from '../rules/TavernResolutionRules';
import { TurnPreparationRules } from '../rules/TurnPreparationRules';
import { NidavellirRules } from '../rules/NidavellirRules';

export const getRules = (state: GameState | GameView): NidavellirRules => {
  if (isAge1(state)) {
    return new Age1Rules(state);
  }

  return new Age2Rules(state);
};

export const getPhaseRules = (state: GameState | GameView): NidavellirRules => {
  switch (state.phase) {
    case Phase.TurnPreparation:
      return new TurnPreparationRules(state);
    case Phase.TavernResolution:
      return new TavernResolutionRules(state);
  }
};
