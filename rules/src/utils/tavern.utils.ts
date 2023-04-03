import GameState, { Phase, Step } from '../state/GameState'
import GameView from '../state/view/GameView'
import { MIN_DWARVES_PER_TAVERN, TAVERN_COUNT } from './constants'
import { getCardsInTavern } from './location.utils'
import { InTavern, LocatedCard } from '../state/LocatedCard'
import { isLocatedCard } from './player.utils'
import { Player, PlayerId } from '../state/Player'
import { setStepMove } from '../moves/SetStep'
import MoveView from '../moves/MoveView'
import Move from '../moves/Move'
import { isAge1, isEndOfAge, isEndOfGame } from './age.utils'
import { getPlayerWithMajority } from './distinction.utils'
import { Distinctions } from '../cards/Distinctions'

export const getCardByTavern = (players: (Player | PlayerId)[]) => Math.max(MIN_DWARVES_PER_TAVERN, players.length)

export const getCurrentTavernCards = (state: GameState | GameView): LocatedCard[] => {
  const tavern = state.tavern
  return getCardsInTavern(state).filter(
    (c) => isLocatedCard(c) && (c.location as InTavern).tavern === tavern
  ) as LocatedCard[]
}

export const mayGoToNextTavern = (game: GameState | GameView): (Move | MoveView)[] => {
  if (isEndOfAge(game) && isAge1(game)) {
    if (game.distinctions.some((d) => getPlayerWithMajority(game, Distinctions[d.id].majorityOf))) {
      return [setStepMove(Step.TroopEvaluation)]
    }
  }

  if (isEndOfAge(game) || isEndOfGame(game)) {
    return []
  }

  return nextTavern(game)
}

export const nextTavern = (game: GameState | GameView): (Move | MoveView)[] => {
  for (const p of game.players) {
    delete p.ready
    delete p.discardedCoin
    delete p.discardedCard
    delete p.playedCard
    delete p.traded
  }

  if (game.tavern < TAVERN_COUNT - 1) {
    game.tavern++
    return [setStepMove(Step.BidRevelation)]
  } else {
    game.round++
    game.phase = Phase.TurnPreparation

    return [setStepMove(Step.EnterDwarves)]
  }
}
