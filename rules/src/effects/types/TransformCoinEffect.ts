import { EffectType } from '../EffectType';

export type TransformCoinEffect = {
  type: EffectType.TRANSFORM_COIN;
  additionalValue: number;
};
