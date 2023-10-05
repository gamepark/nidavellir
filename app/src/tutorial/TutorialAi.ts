import { GameAI } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'

export const ai: GameAI<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>
  = (game: MaterialGame<PlayerId, MaterialType, LocationType>, bot: PlayerId): Promise<MaterialMove[]> => {
  const rules = new NidavellirRules(game)
  let moves = rules
    .getLegalMoves(bot)
    .filter((move: MaterialMove) => {
      if (!isMoveItemType(MaterialType.Coin)(move)) return true
      if (move.position.location?.type === LocationType.Hand) return false

      const item = rules.material(MaterialType.Coin).getItem(move.itemIndex)!
      return item.location.type !== LocationType.PlayerBoard || move.position.location?.type !== LocationType.PlayerBoard
    })

  if (!moves.length) return Promise.resolve([])
  return Promise.resolve([moves[Math.floor(Math.random() * moves.length)]])
}