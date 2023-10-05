/** @jsxImportSource @emotion/react */
import { GridLocator } from "./GridLocator";
import { MaterialItem, Coordinates } from "@gamepark/rules-api";
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { ItemContext } from "@gamepark/react-game";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { HeroDeckDescription } from "./HeroDeckDescription";

export class HeroDeckLocator extends GridLocator {
  locationDescription = new HeroDeckDescription()
  delta = { x: 1, y: 1 }
  columns = 7

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const { rules, material, type } = context
    const players = rules.players.length
    const y = players > 3? -23: -29
    const x = players > 3? -15: -33
    return { x, y, z: material[type].getThickness(item, context) }
  }

}
