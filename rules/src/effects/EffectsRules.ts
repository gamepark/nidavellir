import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { Player } from '../state/Player';
import EffectRules from './EffectRules';
import { TransformCoinRules } from './TransformCoin';
import { EffectType } from './EffectType';

export const EffectsRules: Record<EffectType, new (game: GameState | GameView, player: Player) => EffectRules> = {
  [EffectType.TRANSFORM_COIN]: TransformCoinRules,
};
