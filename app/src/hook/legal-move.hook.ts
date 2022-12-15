import GameView from '@gamepark/nidavellir/state/view/GameView';
import { PlayerId } from '@gamepark/nidavellir/state/Player';
import { useMemo } from 'react';
import Nidavellir from '@gamepark/nidavellir/Nidavellir';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import Move from '@gamepark/nidavellir/moves/Move';

export const useLegalMoves = <T extends Move>(game: GameView, playerId: PlayerId, type: MoveType): T[] =>
  useMemo(
    () => new Nidavellir(game).getLegalMoves(playerId)?.filter((m) => m.type === type) as T[],
    [game, playerId, type]
  );
