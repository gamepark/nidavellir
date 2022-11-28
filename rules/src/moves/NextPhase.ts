import MoveType from './MoveType';

export type NextPhase = {
  type: MoveType.NextPhase;
};

export const nextPhaseMove: NextPhase = {
  type: MoveType.NextPhase,
};

// delete all "passed", change the phase and compute the active player
