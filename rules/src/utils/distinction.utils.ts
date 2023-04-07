import GameState from '../state/GameState'
import GameView from '../state/view/GameView'
import { getArmy } from './player.utils'
import { DwarfType } from '../cards/Card'
import sum from 'lodash/sum'
import { Cards } from '../cards/Cards'
import { Heroes } from '../cards/Heroes'
import { PlayerId } from '../state/Player'

export const getPlayersWithMajority = (state: GameState | GameView, type: DwarfType): PlayerId[] => {
  let majority: number = 0
  let playersWithMajority: PlayerId[] = []

  for (const player of state.players) {
    const army = getArmy(state, player.id, type)
    const ranks =
      sum(army.cards.map((c) => Cards[c.id!].grades?.[type]?.length ?? 0)) +
      sum(army.heroes.map((c) => Heroes[c.id!].grades?.[type]?.length ?? 0))

    if (ranks === 0) {
      continue
    }

    if (ranks > majority) {
      majority = ranks
      playersWithMajority = [player.id]
    } else if (ranks === majority) {
      playersWithMajority.push(player.id)
    }
  }

  return playersWithMajority
}

export const getPlayerWithMajority = (state: GameState | GameView, type: DwarfType) => {
  const players = getPlayersWithMajority(state, type)
  return players.length === 1 ? players[0] : undefined
}
