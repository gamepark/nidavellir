/** @jsxImportSource @emotion/react */
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { LocationDescription, MaterialContext } from "@gamepark/react-game";
import { cardDescription } from "../material/DwarfCardDescription";
import { css } from "@emotion/react";
import { Coordinates, Location } from "@gamepark/rules-api";
import { DwarfType, dwarfTypes } from "@gamepark/nidavellir/cards/DwarfType";
import { playerBoardDescription } from "../material/PlayerBoardDescription";

export class ArmyLocatorDescription extends LocationDescription {
  width = cardDescription.width + 0.4
  height = 22
  alwaysVisible = true

  getLocations({ rules: { players } }: MaterialContext): Location[] {
    return players.flatMap((player) => dwarfTypes.map((type) => ({ type: LocationType.Army, id: type,  player })))
  }

  getCoordinates(location: Location, _context: MaterialContext): Coordinates {
    const baseX = -58.40
    const rightMargin = 1
    const playerIndex = (location.player! - 1)
    const playerX = (playerBoardDescription.width + (this.width * 6) + rightMargin) * playerIndex
    const locationLeft = (location.id! - 1) * this.width
    return { x: baseX + playerX + locationLeft, y: 22.77, z: 0 }
  }

  getExtraCss = (location: Location) =>
    css`
      background-color: ${this.getBackground(location.id)};
      border: 0.1em solid ${this.getBorderColor(location.id)};
      border-radius: 0.3em;
    `

  getBorderColor(type: DwarfType) {
    switch (type) {
      case DwarfType.Blacksmith:
        return "#4c2c9f"
      case DwarfType.Hunter:
        return "#277d53"
      case DwarfType.Explorer:
        return "#54a9e1"
      case DwarfType.Miner:
        return "#f0782d"
      case DwarfType.Warrior:
        return "#8f3526"
    }

    return ""
  }

  getBackground(type: DwarfType) {
    switch (type) {
      case DwarfType.Blacksmith:
        return "#a78aa380"
      case DwarfType.Hunter:
        return "#99a48780"
      case DwarfType.Explorer:
        return "#92c2d480"
      case DwarfType.Miner:
        return "#cfb08e80"
      case DwarfType.Warrior:
        return "#ae776980"
    }

    return ""
  }
}