/** @jsxImportSource @emotion/react */
import { GridLocator } from "./GridLocator";
import { Coordinates, MaterialItem } from "@gamepark/rules-api";
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { ItemContext } from "@gamepark/react-game/dist/locators/ItemLocator";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { cardDescription } from "../material/DwarfCardDescription";
import { TavernLocatorDescription } from "./TavernLocatorDescription";

export class TavernLocator extends GridLocator {
  locationDescription = new TavernLocatorDescription()
  delta = { x: 1, y: 1 }

  getColumns(_item: MaterialItem, { rules }: ItemContext): number {
    return Math.max(rules.players.length, 3)
  }

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const players = rules.players.length
    const baseY = players > 3? -23: -29
    const x = this.getX(players)
    const cardHeight = cardDescription.getSize(item).height
    const tavernIndex = (item.location.id - 1)
    return {  x, y: baseY + (cardHeight + this.delta.y) * tavernIndex, z: 0.1 }
  }

  getX(players: number) {
    switch (players) {
      case 2:
      case 3:
        return -56
      case 4:
        return -47
      case 5:
      default:
        return -53
    }
  }
}
