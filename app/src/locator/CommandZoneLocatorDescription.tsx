/** @jsxImportSource @emotion/react */
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { LocationDescription, MaterialContext } from "@gamepark/react-game";
import { cardDescription } from "../material/DwarfCardDescription";
import { css } from "@emotion/react";
import { Coordinates, Location } from "@gamepark/rules-api";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";

export class CommandZoneLocatorDescription extends LocationDescription {
  width = cardDescription.width + 0.4
  height = 23.2
  alwaysVisible = true

  getLocations({ rules: { players } }: MaterialContext): Location[] {
    return players.map((player) => ({ type: LocationType.CommandZone, player }))
  }

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const {locators, material} = context
    const playerBoardMaterial = material[MaterialType.PlayerBoard]
    const playerBoard = playerBoardMaterial.getStaticItems(context).find((i) => i.location.player === location.player)!
    const playerBoardPosition = locators[LocationType.Table].getPosition(playerBoard, { ...context, type: MaterialType.PlayerBoard, index: 0, displayIndex: 0 })
    const playerX = playerBoardPosition.x!
    const boardLeft = (playerBoardMaterial.getSize(playerBoard).width / 2) + (this.width / 2)
    const locationLeft = -boardLeft
    const playerY = playerBoardPosition.y!
    return { x: playerX + locationLeft, y: playerY + 1.45, z: 0 }
  }

  getExtraCss = () => css`
    background-color: rgba(128, 128, 128, 0.8);
    border: 0.1em solid black;
    border-radius: 0.3em;
  `
}