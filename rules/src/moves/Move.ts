import { MoveCard } from './MoveCard'
import { MoveDistinction } from './MoveDistinction'
import { MoveHero } from './MoveHero'
import { NextPhase } from './NextPhase'
import { Pass } from './Pass'
import { MoveCoin } from './MoveCoin'
import { MoveGem } from './MoveGem'
import { ShuffleCoins } from './ShuffleCoins'
import { SetStep } from './SetStep'
import { Scoring } from './Scoring'
import { TradeCoins } from './TradeCoins'
import { TransformCoin } from './TransformCoin'
import { TradeGems } from './TradeGems'

type Move =
  | MoveCard
  | MoveDistinction
  | MoveHero
  | MoveCoin
  | MoveGem
  | NextPhase
  | Pass
  | ShuffleCoins
  | SetStep
  | Scoring
  | TradeCoins
  | TransformCoin
  | TradeGems;

export default Move
