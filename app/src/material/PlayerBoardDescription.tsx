/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { tokenSpaces } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import board from '../images/board/player-board.png'
import { PlayerBoardHelp } from './rules/PlayerBoardHelp'

class PlayerBoardDescription extends BoardDescription {
  image = board
  width = 10.8
  ratio = 514 / 968

  getStaticItems({ rules: { players } }: MaterialContext) {
    return players.map(player => this.getPlayerBoard(player))
  }

  getPlayerBoard(player: number) {
    return { location: { id: player, type: LocationType.Table, player } }
  }

  getLocations(item: MaterialItem): Location[] {
    return tokenSpaces.map<Location>((space) => ({ id: space, type: LocationType.PlayerBoard, player: item.location.player }))
  }

  help = PlayerBoardHelp
}

export const playerBoardDescription = new PlayerBoardDescription()
