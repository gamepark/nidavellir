/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { cardDescription } from "../material/DwarfCardDescription";
import { MaterialItem } from "@gamepark/rules-api";

export class DistinctionDeckLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  baseY = -29
  coordinates = { x: 33, y: this.baseY, z: 0 }

  getDelta(item: MaterialItem, _context: ItemContext) {
    return { y: cardDescription.getSize(item.id).height - 2 }
  }
}
