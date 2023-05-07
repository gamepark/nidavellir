import Move from '../moves/Move'
import { NidavellirRules } from './NidavellirRules'
import MoveType from '../moves/MoveType'
import GameState, { Step } from '../state/GameState'
import MoveView from '../moves/MoveView'
import { getCardsInTavern, isSameCoinLocation } from '../utils/location.utils'
import { LocationType } from '../state/Location'
import { getCardByTavern } from '../utils/tavern.utils'
import { drawTavernCards } from '../utils/age.utils'
import { moveKnownCardMove } from '../moves/MoveCard'
import { MoveCoin, moveKnownCoinMove } from '../moves/MoveCoin'
import { shuffleCoinMove } from '../moves/ShuffleCoins'
import { setStepMove } from '../moves/SetStep'
import { getPlayerCoins } from '../utils/coin.utils'

class EnterTheDwarvesRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    if (!getCardsInTavern(this.game).length) {
      const game = this.game as GameState
      const cardsByTavern = getCardByTavern(game.players)
      const drawnCards = drawTavernCards(game)
      const moves: Move[] = drawnCards.map((c, index) =>
        moveKnownCardMove(c.id!, {
          type: LocationType.Tavern,
          tavern: Math.floor(index / cardsByTavern),
          index: index % cardsByTavern
        })
      )

      moves.push(...this.moveCoinInPlayerHand())
      moves.push(setStepMove(Step.Bids))

      return moves
    }

    return super.getAutomaticMoves()
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCoin:
        return this.onMoveCoinInHand(move)
    }

    return super.play(move)
  }

  onMoveCoinInHand = (move: MoveCoin) => {
    const coin = this.game.coins.find((c) => {
      return c.id !== undefined && move.id !== undefined
        ? move.id === c.id
        : isSameCoinLocation(move.target!, c.location)
    })!
    coin.hidden = true
    return []
  }

  moveCoinInPlayerHand = () => {
    return this.game.players.flatMap((p) => {
      const coins = getPlayerCoins(this.game, p.id)
      return [
        ...coins.flatMap((c, index) =>
          moveKnownCoinMove(c.id!, {
            type: LocationType.PlayerHand,
            player: p.id,
            index
          }, p.id)
        ),
        shuffleCoinMove(coins.map((c) => c.id!), p.id)
      ]
    })
  }
}

export { EnterTheDwarvesRules }
