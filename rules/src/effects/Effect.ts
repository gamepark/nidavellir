import { RecruitHero } from './RecruitHero';
import { HuntingMaster } from './HuntingMaster';
import { CrownJeweler } from './CrownJeweler';
import { PioneerOfTheKingdom } from './PioneerOfTheKingdom';
import { KingsGreatArmorer } from './KingsGreatArmorer';
import { YludEffect } from './YludEffect';
import { TransformCoinEffect } from './types/TransformCoinEffect';
import { TradeCoin } from './types/TradeCoinEffect';
import { UlineEffect } from './UlineEffect';
import { DiscardCard } from './DiscardCard';
import { DrawCard } from './DrawCard';

export type Effect =
  | TransformCoinEffect
  | RecruitHero
  | TradeCoin
  | HuntingMaster
  | CrownJeweler
  | PioneerOfTheKingdom
  | KingsGreatArmorer
  | YludEffect
  | UlineEffect
  | DiscardCard
  | DrawCard;
