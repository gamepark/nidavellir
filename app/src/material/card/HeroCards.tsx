import { FC, useCallback } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlayerId } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { useLegalMoves } from '../../hook/legal-move.hook';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero';
import { HeroCard } from './HeroCard';

type AgeCardsProps = {
  game: GameView;
};

const HeroCards: FC<AgeCardsProps> = (props) => {
  const { game } = props;
  const playerId = usePlayerId();
  const moves = useLegalMoves<MoveHero>(game, playerId, MoveType.MoveHero);
  const getCardMoves = useCallback((c: SecretCard) => moves.filter((m) => m.id === c.id), [moves]);

  return (
    <>
      {game.heroes.map((c, index) => (
        <HeroCard card={c} key={index} moves={getCardMoves(c)} />
      ))}
    </>
  );
};

export { HeroCards };
