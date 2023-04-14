import Move from './Move'
import { ShuffleCoins, ShuffleCoinsRandomized } from './ShuffleCoins'

type MoveRandomized = Exclude<Move, ShuffleCoins> | ShuffleCoinsRandomized;

export default MoveRandomized
