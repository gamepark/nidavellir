/** @jsxImportSource @emotion/react */
import { GridLocator } from "./GridLocator";
import { Coordinates, MaterialItem } from "@gamepark/rules-api";
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { ItemContext } from "@gamepark/react-game/dist/locators/ItemLocator";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { cardDescription } from "../material/DwarfCardDescription";

export class TavernLocator extends GridLocator {
  delta = { x: 1, y: 1 }

  getColumns(_item: MaterialItem, { rules }: ItemContext): number {
    return Math.max(rules.players.length, 3)
  }

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const players = rules.players.length
    const baseY = players > 3? -23: -29
    const cardHeight = cardDescription.getSize(item).height
    const tavernIndex = (item.location.id - 1)
    return {  x: -57, y: baseY + (cardHeight + this.delta.y) * tavernIndex, z: 0.1 }
  }
}
