import Move from './Move';
import MoveType from './MoveType';
import { LocationType } from '../state/Location';

/**
 * A "MoveView" is the combination of all the types of move views that exists in you game.
 * It usually derives from "Move". You can exclude some Move using: = Exclude<Move, MoveToExclude | OtherMoveToExclude> | MoveToInclude...
 */
type MoveView = Move;

export default MoveView;

export const isPredictable = (move: Move | MoveView): move is MoveView => {
  return (
    (move.type === MoveType.MoveCard && move.target.type !== LocationType.Tavern) ||
    (move.type === MoveType.MoveCoin && !move.reveal && move.target!.type !== LocationType.PlayerHand)
  );
};
