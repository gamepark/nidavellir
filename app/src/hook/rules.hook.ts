import GameView from '@gamepark/nidavellir/state/view/GameView'
import { PlayerId } from '@gamepark/nidavellir/state/Player'
import { useMemo } from 'react'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import Move from '@gamepark/nidavellir/moves/Move'
import NidavellirView from '../NidavellirView'

export const useLegalMoves = <T extends Move>(
  game: GameView,
  types: MoveType[],
  playerId?: PlayerId,
  predicate?: (move: T) => boolean
): T[] => {

  const rules = useRules(game)
  return useMemo(() => {
    if (!playerId) {
      return []
    }
    const moves = rules.getLegalMoves(playerId)?.filter((m) => types.includes(m.type)) as T[]
    return !predicate ? moves : moves.filter(predicate)
  }, [rules, playerId, types, predicate])
}
export const useRules = (game: GameView) => useMemo(() => new NidavellirView(game), [game])
