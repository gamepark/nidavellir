/** @jsxImportSource @emotion/react */
import board from '../images/board/player-board.png'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { tokenSpaces } from "@gamepark/nidavellir/material/PlayerBoardSpace";
import { PlayerBoardHelp } from './rules/PlayerBoardHelp'

class PlayerBoardDescription extends BoardDescription {
  image = board
  width = 10.8
  ratio = 514 / 968

  getStaticItems({ rules: { players } }: MaterialContext) {
    return players.map((p) => ({ id: p, location: { id: p, type: LocationType.Table, player: p }}))
  }

  getLocations(item: MaterialItem): Location<number, number>[] {
    return tokenSpaces.map<Location>((space) => ({ id: space, type: LocationType.PlayerBoard, player: item.location.player  }))
  }

  help = PlayerBoardHelp
}

export const playerBoardDescription = new PlayerBoardDescription()
