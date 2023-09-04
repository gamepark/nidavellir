/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { cardDescription } from "../material/DwarfCardDescription";
import { Coordinates, MaterialItem } from "@gamepark/rules-api";

export class DistinctionDeckLocator extends LineLocator<PlayerId, MaterialType, LocationType> {

  getDelta(item: MaterialItem, { rules }: ItemContext) {
    const players = rules.players.length
    const y = cardDescription.getSize(item.id).height - (players > 3? 3: 2)
    return { y }
  }

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const players = rules.players.length
    const y = players > 3? -24: -29
    const x = players > 3? 57: 33
    return { x, y, z: 0 }
  }
}
