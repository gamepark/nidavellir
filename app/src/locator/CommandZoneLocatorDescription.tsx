/** @jsxImportSource @emotion/react */
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { LocationDescription, MaterialContext } from "@gamepark/react-game";
import { cardDescription } from "../material/DwarfCardDescription";
import { css } from "@emotion/react";
import { Coordinates, Location } from "@gamepark/rules-api";
import { playerBoardDescription } from "../material/PlayerBoardDescription";

export class CommandZoneLocatorDescription extends LocationDescription {
  width = cardDescription.width + 0.4
  height = 23.2
  alwaysVisible = true

  getLocations({ rules: { players } }: MaterialContext): Location[] {
    return players.map((player) => ({ type: LocationType.CommandZone, player }))
  }

  getCoordinates(location: Location, _context: MaterialContext): Coordinates {
    const baseX = -75
    const rightMargin = 1
    const playerIndex = (location.player! - 1)
    const playerX = (playerBoardDescription.width + (this.width * 6) + rightMargin) * playerIndex
    return { x: baseX + playerX, y: 22.45, z: 0 }
  }

  getExtraCss = () => css`
    background-color: rgba(128, 128, 128, 0.8);
    border: 0.1em solid black;
    border-radius: 0.3em;
  `
}