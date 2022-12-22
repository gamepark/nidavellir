import { FC, useCallback } from 'react';
import { AgeCard } from './AgeCard';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlayerId } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { isSameCardLocation } from '@gamepark/nidavellir/utils/location.utils';
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard';
import { useLegalMoves } from '../../hook/legal-move.hook';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';

type AgeCardsProps = {
  game: GameView;
};

const AgeCards: FC<AgeCardsProps> = (props) => {
  const { game } = props;
  const playerId = usePlayerId();
  const moves = useLegalMoves<MoveCard>(game, playerId, [MoveType.MoveCard]);
  const getCardMoves = useCallback(
    (c: SecretCard) =>
      moves.filter((m) => (c.id !== undefined ? m.id === c.id : isSameCardLocation(m.source!, c.location))),
    [moves]
  );

  return (
    <>
      {game.cards.map((c, index) => (
        <AgeCard card={c} key={index} moves={getCardMoves(c)} />
      ))}
    </>
  );
};

export { AgeCards };
