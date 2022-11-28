import { FillTaverns } from './FillTaverns';
import { PlaceCoin } from './PlaceCoin';
import { ChooseTavernCard } from './ChooseTavernCard';
import { RecruitHero } from './RecruitHero';
import { Pass } from './Pass';
import { NextPhase } from './NextPhase';
import { EvaluateTroops } from './EvaluateTroop';
import { RevealCoins } from './RevealCoins';
import { DiscardTavern } from './DiscardTavern';
import { RevealPouch } from './RevealPouch';
import { TookCoinFromTreasure } from './TookCoinFromTreasure';
import { DiscardCoin } from './DiscardCoin';
import { TradeGem } from './TradeGem';

type Move =
  | FillTaverns
  | PlaceCoin
  | ChooseTavernCard
  | RecruitHero
  | Pass
  | NextPhase
  | EvaluateTroops
  | RevealCoins
  | DiscardTavern
  | RevealPouch
  | TookCoinFromTreasure
  | DiscardCoin
  | TradeGem;

export default Move;
