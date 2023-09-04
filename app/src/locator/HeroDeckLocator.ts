/** @jsxImportSource @emotion/react */
import { GridLocator } from "./GridLocator";
import { MaterialItem } from "@gamepark/rules-api/dist/material/items/MaterialItem";
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { ItemContext } from "@gamepark/react-game/dist/locators/ItemLocator";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { Coordinates } from "@gamepark/rules-api/dist/material/location/Location";

export class HeroDeckLocator extends GridLocator {
  delta = { x: 1, y: 1 }
  columns = 7

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const players = rules.players.length
    const y = players > 3? -23: -29
    const x = players > 3? -15: -34
    return { x, y, z: 0 }
  }
}
