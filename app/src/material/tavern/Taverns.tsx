import { FC } from 'react';
import { Tavern } from './Tavern';

type TavernsProps = {};

const Taverns: FC<TavernsProps> = () => {
  return (
    <>
      <Tavern tavern={0} />
      <Tavern tavern={1} />
      <Tavern tavern={2} />
    </>
  );
};

export { Taverns };
