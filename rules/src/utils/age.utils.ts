import GameState, { Step } from '../state/GameState'
import GameView from '../state/view/GameView'
import { getCardByTavern } from './tavern.utils'
import { TAVERN_COUNT } from './constants'
import { getCardsInTavern, isInAgeDeck, isOnPlayerBoard } from './location.utils'
import { getTavernCoins } from './coin.utils'
import groupBy from 'lodash/groupBy'
import { OnPlayerBoard } from '../state/CommonLocations'
import { Coins } from '../coins/Coins'
import pickBy from 'lodash/pickBy'
import { Gem6, Gems } from '../gems/Gems'

export const isAge1 = (game: GameState | GameView) => {
  const playerCount = game.players.length

  if (playerCount <= 3) {
    return game.round <= 4 || game.step === Step.TroopEvaluation
  }

  return game.round <= 3 || game.step === Step.TroopEvaluation
}

export const isAge2 = (state: GameState | GameView) => !isAge1(state)

export const isEndOfAge = (game: GameState | GameView) => {
  const playerCount = game.players.length

  const cardInTaverns = getCardsInTavern(game)
  if (playerCount <= 3) {
    return cardInTaverns.length === 0 && (isAge1(game) ? game.round === 4 : game.round === 8)
  }


  return cardInTaverns.length === 0 && (isAge1(game) ? game.round === 3 : game.round === 6)
}

export const isEndOfGame = (game: GameState | GameView) => {
  return isAge2(game) && isEndOfAge(game) && game.step === Step.Scoring
}

export const drawTavernCards = (state: GameState) => {
  const game = state as GameState
  const cardsByTavern = getCardByTavern(game.players)
  const numberOfCard = cardsByTavern * TAVERN_COUNT
  return game.cards.filter((c) => isInAgeDeck(c.location)).slice(0, numberOfCard)
}

export const getTrades = (state: GameState | GameView) => {
  // Here, the tavern for the gem trade must be the previous one (to get right coins)
  const tavern = state.tavern
  const tavernCoins = getTavernCoins(state, tavern).filter((c) => {
    const playerId = (c.location as OnPlayerBoard).player
    const gem = state.gems.find((g) => isOnPlayerBoard(g.location) && g.location.player === playerId)
    return !gem || Gems[gem.id] !== Gem6
  })

  // Group coins by values (to see tie)
  const coinsByValue = groupBy(tavernCoins, (c) => {
    const player = state.players.find((p) => p.id === (c.location as OnPlayerBoard).player)!
    const discardedCoin = player?.discardedCoin
    // It is possible that the coins for the tavern was the transformed value FIXME: move it to getTavernCoins due to transform coin effect
    return Coins[discardedCoin?.index === tavern ? discardedCoin.id : c.id!].value
  })

  // Omit coin value with only one coin
  return pickBy(coinsByValue, (c) => c.length > 1)
}
