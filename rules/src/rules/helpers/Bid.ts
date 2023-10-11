import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../player/Player'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { tokenSpaces } from '../../material/PlayerBoardSpace'
import equal from 'fast-deep-equal'

export default class Bid extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId, readonly disableBoardCoins?: boolean) {
    super(game)
  }

  get combinations() {
    const playerCoins = this.material(MaterialType.Coin).player(this.player)
    const placableCoins = playerCoins.location(({ type }) => type === LocationType.Hand || (!this.disableBoardCoins && type === LocationType.PlayerBoard))

    return tokenSpaces.flatMap((id) => {
      const location = { type: LocationType.PlayerBoard, id, player: this.player }
      return placableCoins
        .filter((item) => !equal(item.location, location))
        .moveItems({ location })
    })
  }
}