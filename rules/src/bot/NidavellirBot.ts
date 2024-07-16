import { isMoveItemType, MaterialGame, MaterialMove, RandomBot } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NidavellirRules } from '../NidavellirRules'
import { PlayerId } from '../player/Player'
import { RuleId } from '../rules/RuleId'

export class NidavellirBot extends RandomBot<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {

  constructor(playerId: PlayerId) {
    super(NidavellirRules, playerId)
  }

  override getLegalMoves(game: MaterialGame<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const rules = new NidavellirRules(game)
    const legalMoves = super.getLegalMoves(game)
    if (rules.game.rule?.id !== RuleId.UlineBid && rules.game.rule?.id !== RuleId.Bids) return legalMoves

    return legalMoves.filter((move: MaterialMove) => {
      if (!isMoveItemType(MaterialType.Coin)(move) || !move.location) return true
      const item = rules.material(MaterialType.Coin).getItem(move.itemIndex)!
      if (move.location.type === LocationType.Hand) return false
      const itemOnTarget = rules
        .material(MaterialType.Coin)
        .location(move.location.type!)
        .locationId(move.location.id)
        .player(move.location.player)

      if (itemOnTarget.length) return false

      return move.location.type !== LocationType.PlayerBoard || item.location.type !== LocationType.PlayerBoard
    })
  }
}
