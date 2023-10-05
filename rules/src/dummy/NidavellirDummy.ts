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
      if (!isMoveItemType(MaterialType.Coin)(move)) return true
      if (move.position.location?.type === LocationType.Hand) return false

      const item = rules.material(MaterialType.Coin).getItem(move.itemIndex)!
      return item.location.type !== LocationType.PlayerBoard || move.position.location?.type !== LocationType.PlayerBoard
    })
  }
}