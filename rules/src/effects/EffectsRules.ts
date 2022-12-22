import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { Player } from '../state/Player';
import EffectRules from './EffectRules';
import { TransformCoinRules } from './TransformCoin';
import { EffectType } from './EffectType';
import { RecruitHeroRules } from './RecruitHero';
import { KingsGreatArmorerRules } from './KingsGreatArmorer';
import { HuntingMasterRules } from './HuntingMaster';
import { PioneerOfTheKingdomRules } from './PioneerOfTheKingdom';
import { CrownJewelerRules } from './CrownJeweler';
import { TradeCoinRules } from './TradeCoin';
import { YludRules } from './YludEffect';

export const EffectsRules: Record<EffectType, new (game: GameState | GameView, player: Player) => EffectRules> = {
  [EffectType.TRANSFORM_COIN]: TransformCoinRules,
  [EffectType.RECRUIT_HERO]: RecruitHeroRules,
  [EffectType.TRADE_COIN]: TradeCoinRules,
  [EffectType.KINGS_GREAT_ARMORER]: KingsGreatArmorerRules,
  [EffectType.HUNTING_MASTER]: HuntingMasterRules,
  [EffectType.PIONEER_OF_THE_KINGDOM]: PioneerOfTheKingdomRules,
  [EffectType.CROWN_JEWELER]: CrownJewelerRules,
  [EffectType.YLUD]: YludRules,
};
