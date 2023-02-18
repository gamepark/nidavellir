import MoveType from './MoveType';
import { Step } from '../state/GameState';

export type SetStep = {
  type: MoveType.SetStep;
  step: Step;
};

export const setStepMove = (step: Step): SetStep => ({
  type: MoveType.SetStep,
  step,
});

// delete all "passed", change the phase and compute the active player
