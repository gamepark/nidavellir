import {PlayerId} from '../state/Player'
import GameState from '../state/GameState'
import GameView from '../state/view/GameView'
import {isInDiscard, isInPlayerHand, isInTreasure, isOnPlayerBoard, isSameCoinLocation} from './location.utils'
import {InTreasure, LocatedCoin} from '../state/LocatedCoin'
import {SecretCoin} from '../state/view/SecretCoin'
import {Coins, HuntingMasterCoin} from '../coins/Coins'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import {MoveCoin} from '../moves/MoveCoin'
import {TransformCoin} from '../moves/TransformCoin'
import {TradeCoins} from '../moves/TradeCoins'
import MoveType from '../moves/MoveType'
import sumBy from 'lodash/sumBy'

export const getPlayerCoinForTavern = (
  game: GameState | GameView,
  playerId: PlayerId,
  tavern: number
): LocatedCoin | SecretCoin | undefined => {
  return game.coins.find(
    (c) => isOnPlayerBoard(c.location) && c.location.player === playerId && c.location.index === tavern
  )
}

export const isCoinHidden = (coin: LocatedCoin | SecretCoin): boolean => !!coin.hidden

export const getPlayerPouch = (state: GameState | GameView, playerId: PlayerId): (LocatedCoin | SecretCoin)[] => {
  return state.coins.filter(
    (c) => isOnPlayerBoard(c.location) && c.location.player === playerId && (c.location.index || 0) > 2
  )
}

/**
 * Get the next index of coin in discard
 * @param state The game state
 */
export const getNextCoinIndexInDiscard = (state: GameState | GameView) =>
  state.coins.filter((c) => isInDiscard(c.location)).length

/**
 * Get coins for current tavern
 * @param state The game state
 * @param tavern The tavern number
 */
export const getTavernCoins = (state: GameState | GameView, tavern: number) =>
  state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.index === tavern)

/**
 * Get treasure coins
 */
export const getTreasureCoins = (state: GameState | GameView) => state.coins.filter((c) => isInTreasure(c.location))

/**
 * Get coins of a player
 * @param game The game state
 * @param playerId the player of coins
 */
export const getPlayerCoins = (game: GameState | GameView, playerId: PlayerId): (SecretCoin | LocatedCoin)[] => {
  return game.coins.filter(
    (c) => (isInPlayerHand(c.location) || isOnPlayerBoard(c.location)) && c.location.player === playerId
  )
}

/**
 * Get a treasure coin for a value.
 * If there is no coin for the value, choose the immediately superior token
 * If there is no superior value, choose the immediately inferior token
 * @param treasure Treasure coins
 * @param value The token value
 */
export const getTreasureCoinForValue = (
  treasure: (LocatedCoin | SecretCoin)[],
  value: number
): LocatedCoin | SecretCoin => {
  const orderedCoins = orderBy(
    treasure,
    [(c) => Coins[c.id!].value, (c) => (c.location as InTreasure).z],
    ['asc', 'desc']
  )
  const [lowerCoins, higherCoins] = partition(orderedCoins, (c) => Coins[c.id!].value < value)

  if (higherCoins.length) {
    return higherCoins[0]
  } else {
    return lowerCoins[0]
  }
}

export const isExchangeCoin = (coin: SecretCoin | LocatedCoin) => {
  return Coins[coin.id!].value === 0 || Coins[coin.id!] === HuntingMasterCoin
}

type CoinMoveTypes = MoveCoin | TransformCoin | TradeCoins;
export const filterCoinMoves = (game: GameState | GameView, c: SecretCoin | LocatedCoin, m: CoinMoveTypes): boolean => {
  switch (m.type) {
    case MoveType.TransformCoin:
    case MoveType.MoveCoin:
      return c.id !== undefined ? m.id === c.id : isSameCoinLocation(m.source!, c.location)
    case MoveType.TradeCoins: {
      const newCoin = getTreasureCoinForValue(
        getTreasureCoins(game),
        sumBy(m.ids!, (c) => Coins[c].value)
      )

      return c.id !== undefined && (newCoin.id === c.id || m.ids?.includes(c.id))
    }
  }
  return false
}
export const isThisCoin = (coin: SecretCoin, move: MoveCoin) => {
  if (coin.id !== undefined) {
    return coin.id === move.id
  }

  if (move.target) {
    return isSameCoinLocation(coin.location, move.target)
  }

  return false
}
