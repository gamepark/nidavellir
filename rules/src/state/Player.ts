import { Effect } from '../effects/Effect';
import { CardLocation } from './LocatedCard';

export type PlayerId = number;

export type Player = {
  id: PlayerId;
  score?: number;
  ready?: boolean;
  playedCard?: {
    id: number;
    deck: 'age' | 'heroes';
  };

  discardedCard?: {
    id: number;
    origin: CardLocation;
  };
  
  effects: Effect[];
  traded?: boolean;
  discardedCoin?: {
    id: number;
    index?: number;
  };
};
