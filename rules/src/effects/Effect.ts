import { TransformCoin } from './TransformCoin';
import { RecruitHero } from './RecruitHero';
import { TradeCoin } from './TradeCoin';
import { HuntingMaster } from './HuntingMaster';
import { CrownJeweler } from './CrownJeweler';
import { PioneerOfTheKingdom } from './PioneerOfTheKingdom';
import { KingsGreatArmorer } from './KingsGreatArmorer';
import { YludEffect } from './YludEffect';

export type Effect =
  | TransformCoin
  | RecruitHero
  | TradeCoin
  | HuntingMaster
  | CrownJeweler
  | PioneerOfTheKingdom
  | KingsGreatArmorer
  | YludEffect;
