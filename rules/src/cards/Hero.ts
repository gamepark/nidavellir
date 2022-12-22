import { DwarfType } from './Card';
import { Effect } from '../effects/Effect';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { PlayerId } from '../state/Player';
import { Grades } from './Grades';

export enum HeroType {
  Neutral = 7,
}

export interface Condition {
  isActive(game: GameState | GameView, playerId: PlayerId): boolean;
}

export type Hero = {
  type: DwarfType | HeroType;
  grades?: Grades;
  effects?: Effect[];
  condition?: Condition;
};
