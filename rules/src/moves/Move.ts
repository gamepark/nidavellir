import { MoveCard } from './MoveCard';
import { MoveDistinction } from './MoveDistinction';
import { MoveHero } from './MoveHero';
import { NextPhase } from './NextPhase';
import { Pass } from './Pass';
import { MoveCoin } from './MoveCoin';
import { MoveGem } from './MoveGem';

type Move = MoveCard | MoveDistinction | MoveHero | MoveCoin | MoveGem | NextPhase | Pass;

export default Move;
