import { Effect } from '../effects/Effect';

export type PlayerId = number;

export type Player = {
  id: PlayerId;
  score: number;
  ready?: boolean;
  card?: number;
  effects: Effect[];
  traded?: boolean;
  discarded?: {
    coin: number;
    tavern?: number;
  };
};
