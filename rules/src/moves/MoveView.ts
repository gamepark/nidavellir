import Move from './Move';
import { RevealCoin, RevealCoinInView } from './RevealCoin';
import MoveType from './MoveType';
import { LocationType } from '../state/Location';
import { MoveCard, MoveCardInView } from './MoveCard';
import { MoveCoinInView } from './MoveCoin';

/**
 * A "MoveView" is the combination of all the types of move views that exists in you game.
 * It usually derives from "Move". You can exclude some Move using: = Exclude<Move, MoveToExclude | OtherMoveToExclude> | MoveToInclude...
 */
type MoveView = Exclude<Move, MoveCard | RevealCoin> | MoveCardInView | MoveCoinInView | RevealCoinInView;

export default MoveView;

export const isPredictable = (move: Move | MoveView): move is MoveView => {
  return (
    (move.type === MoveType.MoveCard && move.target.type !== LocationType.Tavern) ||
    (move.type === MoveType.MoveCoin &&
      move.target.type !== LocationType.PlayerBoard &&
      move.target.type !== LocationType.PlayerHand)
  );
};
