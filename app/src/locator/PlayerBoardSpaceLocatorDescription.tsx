/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { coinDescription } from '../material/CoinDescription'
import { PlayerBoardSpaceRules } from './rules/PlayerBoardSpaceRules'
import { Location } from '@gamepark/rules-api/dist/material/location/Location'
import Images from '../images/Images'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'

export class PlayerBoardSpaceLocatorDescription extends LocationDescription {
  width = coinDescription.diameter
  ratio = 1
  borderRadius = this.width / 2
  alwaysVisible = true

  rules = PlayerBoardSpaceRules

  getRulesImage(location: Location) {
    switch (location.id) {
      case PlayerBoardSpace.LaughingGoblin:
        return Images.LaughingGoblin
      case PlayerBoardSpace.DancingDragon:
        return Images.DancingDragon
      case PlayerBoardSpace.ShiningHorse:
        return Images.ShiningHorse
      default:
        return Images.PouchIcon
    }
  }
}