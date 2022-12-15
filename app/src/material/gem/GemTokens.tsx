import { FC } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { GemToken } from './GemToken';

type GemTokensProps = {
  game: GameView;
};

const GemTokens: FC<GemTokensProps> = (props) => {
  const { game } = props;
  return (
    <>
      {game.gems.map((gem, index) => (
        <GemToken gem={gem} key={index} />
      ))}
    </>
  );
};

export { GemTokens };
