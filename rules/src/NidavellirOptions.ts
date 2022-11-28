import {OptionsSpec} from '@gamepark/rules-api'
import {TFunction} from 'i18next'
import GameState from './state/GameState'

/**
 * This is the options for each players in the game.
 */
type NidavellirPlayerOptions = { id: number }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type NidavellirOptions = {
  players: NidavellirPlayerOptions[]
}

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: GameState | NidavellirOptions): arg is NidavellirOptions {
  return typeof (arg as GameState).coins === 'undefined'
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const NidavellirOptionsSpec: OptionsSpec<NidavellirOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Number'),
      values: [1,2,3,4,5,6],
      valueSpec: id => ({label: _ => id.toString() })
    }
  }
}
