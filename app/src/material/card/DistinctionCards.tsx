import { FC } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { DistinctionCard } from './DistinctionCard';

type DistinctionCardsProps = {
  game: GameView;
};

const DistinctionCards: FC<DistinctionCardsProps> = (props) => {
  const { game } = props;
  return (
    <>
      {game.distinctions.map((c, index) => (
        <DistinctionCard card={c} key={index} />
      ))}
    </>
  );
};

export { DistinctionCards };
