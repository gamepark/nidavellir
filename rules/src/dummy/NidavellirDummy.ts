import { PlayerId } from '../player/Player'
import { Dummy, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { NidavellirRules } from '../NidavellirRules'

export class NidavellirDummy extends Dummy<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {

  constructor() {
    super(NidavellirRules)
  }

  getLegalMoves(game: MaterialGame<PlayerId, MaterialType, LocationType>, player: PlayerId): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const rules = new NidavellirRules(game)
    return super.getLegalMoves(game, player).filter((move: MaterialMove) => {
      if (!isMoveItemType(MaterialType.Coin)(move) || !move.location) return true
      const item = rules.material(MaterialType.Coin).getItem(move.itemIndex)!
      if (move.location.type === LocationType.Hand) return false
      const itemOnTarget = rules
        .material(MaterialType.Coin)
        .location(move.location.type)
        .locationId(move.location.id)
        .player(move.location.player)

      if (itemOnTarget.length) return false
      return !(move.location.type === LocationType.PlayerBoard && item.location.type === LocationType.PlayerBoard);

    })
  }
}