import { Effect } from '../effects/Effect';

export type PlayerId = number;

export type Player = {
  id: PlayerId;
  score?: number;
  ready?: boolean;
  playedCard?: {
    id: number;
    deck: 'age' | 'heroes';
  };
  effects: Effect[];
  traded?: boolean;
  discardedCoin?: {
    id: number;
    index?: number;
  };
};
