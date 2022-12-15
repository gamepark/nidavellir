import { Effect } from '../effects/Effect';

export type PlayerId = number;

export type Player = {
  id: PlayerId;
  score: number;
  ready?: boolean;
  drawn?: {
    card: number;
    deck: 'age' | 'heroes'
  };
  effects: Effect[];
  traded?: boolean;
  discarded?: {
    coin: number;
    index?: number;
  };
};
