import GameState from '../state/GameState'
import GameView from '../state/view/GameView'
import orderBy from 'lodash/orderBy'
import { isOnPlayerBoard, isInArmy } from './location.utils'
import { Coins } from '../coins/Coins'
import { OnPlayerBoard } from '../state/CommonLocations'
import { LocatedCoin } from '../state/LocatedCoin'
import { SecretCoin } from '../state/view/SecretCoin'
import { PlayerId } from '../state/Player'
import { SecretCard } from '../state/view/SecretCard'
import { LocatedCard, InArmy } from '../state/LocatedCard'
import { getTavernCoins } from './coin.utils'
import { Card, DwarfType, RoyalOffering } from '../cards/Card'
import { Cards } from '../cards/Cards'
import { Heroes } from '../cards/Heroes'
import { HeroType } from '../cards/Hero'
import maxBy from 'lodash/maxBy'
import keyBy from 'lodash/keyBy'
import { Gems } from '../gems/Gems'

export const getElvalandTurnOrder = (state: GameState | GameView): PlayerId[] => {
  let tavern = state.tavern
  let coins = getTavernCoins(state, tavern)

  if (coins.some((c) => c.hidden)) {
    throw new Error(`There is some coin for the current tavern ${ tavern } that are hidden !`)
  }

  const orderedCoins = orderBy(
    coins,
    [
      (c) => {
        const player = state.players.find((p) => p.id === (c.location as OnPlayerBoard).player)!
        return player?.discardedCoin?.index === tavern ? Coins[player.discardedCoin.id].value : Coins[c.id!].value
      },
      (c) => {
        const playerGem = state.gems.find(
          (g) => isOnPlayerBoard(g.location) && g.location.player === (c.location as OnPlayerBoard).player
        )!
        return Gems[playerGem.id!].value
      }
    ],
    ['desc', 'desc']
  )

  return orderedCoins.map((c) => (c.location as OnPlayerBoard).player)
}

export const getActivePlayer = (state: GameState | GameView) => state.players.find((p) => state.activePlayer === p.id)!

export const getArmy = (state: GameState | GameView, playerId: PlayerId, type?: DwarfType) => {
  return ({
    cards: state.cards.filter(
      (c) => isInArmy(c.location) && c.location.player === playerId && (!type || c.location.column === type)
    ),
    heroes: state.heroes.filter(
      (c) => isInArmy(c.location) && c.location.player === playerId && (!type || c.location.column === type)
    )
  })
}

export const isLocatedCard = (c: SecretCard | LocatedCard): c is LocatedCard => c.id !== undefined
export const isLocatedCoin = (c: SecretCoin | LocatedCard | undefined): c is LocatedCoin => c?.id !== undefined

export const getNextPlayer = (state: GameState | GameView) => {
  const turnOrder = getElvalandTurnOrder(state)

  if (state.activePlayer === turnOrder[turnOrder.length - 1]) {
    return turnOrder[0]
  }

  const activePlayerIndex = turnOrder.findIndex((id) => state.activePlayer === id)
  return turnOrder[activePlayerIndex + 1]
}

export const getNextIndexByType = (state: GameState | GameView, playerId: PlayerId) => {
  const army = getArmy(state, playerId)
  const computedNextIndexes = [
    DwarfType.Blacksmith,
    DwarfType.Hunter,
    DwarfType.Explorer,
    DwarfType.Miner,
    DwarfType.Warrior,
    RoyalOffering.RoyalOffering,
    HeroType.Neutral
  ].map((type) => {
    // Get age cards of this type
    const cardOfSameType = army.cards
      .filter((c) => (c.location as InArmy).column === type)
      .map((c) => [Cards[c.id!], c] as [Card, SecretCard])

    // Get heroes of this type
    const heroesOfSameType = army.heroes
      .filter((c) => (c.location as InArmy).column === type)
      .map((c) => [Heroes[c.id!], c] as [Card, SecretCard])

    // Getting the card with max index
    const maxCard = maxBy([...cardOfSameType, ...heroesOfSameType], (c) => c[1].location.index)
    return {
      type,
      nextIndex: !maxCard ? 0 : (maxCard[1].location.index ?? 0) + (maxCard[0].grades?.[type]?.length ?? 1)
    }
  })

  return keyBy(computedNextIndexes, (c) => c.type)
}

export const getCombinations = <T>(array: T[], size: number): T[][] => {
  let i, j, combs, head, tailcombs
  if (size > array.length || size <= 0) {
    return []
  }
  if (size == array.length) {
    return [array]
  }
  if (size == 1) {
    combs = []
    for (i = 0; i < array.length; i++) {
      combs.push([array[i]])
    }
    return combs
  }
  combs = []
  for (i = 0; i < array.length - size + 1; i++) {
    head = array.slice(i, i + 1)
    tailcombs = getCombinations(array.slice(i + 1), size - 1)
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}
