import { OptionsSpec } from '@gamepark/rules-api'
import GameState from './state/GameState'
import GameView from './state/view/GameView'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type NidavellirOptions = {
  players: number;
};

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: GameState | GameView | NidavellirOptions): arg is NidavellirOptions {
  return typeof (arg as GameState).coins === 'undefined'
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const NidavellirOptionsSpec: OptionsSpec<NidavellirOptions> = {}
