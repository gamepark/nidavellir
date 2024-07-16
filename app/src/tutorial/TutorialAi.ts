import { GameAI } from '@gamepark/react-game'
import { MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { NidavellirBot } from '@gamepark/nidavellir/bot/NidavellirBot'

export const ai: GameAI<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>
  = (game: MaterialGame<PlayerId, MaterialType, LocationType>, playerId: PlayerId): Promise<MaterialMove[]> => {
  return Promise.resolve(new NidavellirBot(playerId).run(game))
}