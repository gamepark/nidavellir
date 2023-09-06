/** @jsxImportSource @emotion/react */
import { GridLocator } from "./GridLocator";
import { MaterialItem } from "@gamepark/rules-api/dist/material/items/MaterialItem";
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { ItemContext } from "@gamepark/react-game/dist/locators/ItemLocator";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { Coordinates } from "@gamepark/rules-api/dist/material/location/Location";
import { HeroDeckLocatorDescription } from "./HeroDeckLocatorDescription";

export class HeroDeckLocator extends GridLocator {
  locationDescription = new HeroDeckLocatorDescription()
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
