import MoveType from './MoveType';
import { Step } from '../state/GameState';

export type SetStep = {
  type: MoveType.SetStep;
  step: Step;

  data?: any;
};

export const setStepMove = (step: Step, data?: any): SetStep => ({
  type: MoveType.SetStep,
  step,
  data
});

// delete all "passed", change the phase and compute the active player
