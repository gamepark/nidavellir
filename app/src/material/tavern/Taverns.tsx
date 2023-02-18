import { FC } from 'react';
import { Tavern } from './Tavern';

type TavernsProps = {
  playerCount?: number;
};

const Taverns: FC<TavernsProps> = (props) => {
  const { playerCount } = props;
  return (
    <>
      <Tavern tavern={0} playerCount={playerCount} />
      <Tavern tavern={1} playerCount={playerCount} />
      <Tavern tavern={2} playerCount={playerCount} />
    </>
  );
};

export { Taverns };
