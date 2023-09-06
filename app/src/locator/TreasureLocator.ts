/** @jsxImportSource @emotion/react */
import { GridLocator } from "./GridLocator";
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { MaterialItem } from "@gamepark/rules-api/dist/material/items/MaterialItem";
import { ItemContext } from "@gamepark/react-game/dist/locators/ItemLocator";
import { Coordinates } from "@gamepark/rules-api/dist/material/location/Location";

export class TreasureLocator extends GridLocator {
  delta = { x: 1, y: 0.5, z: 0.5 }
  columns = 3

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext): Coordinates {
    const players = rules.players.length
    const y = players > 3? -28: -31
    const x = players > 3? 35: 14
    return { x, y, z: 0 }
  }
}