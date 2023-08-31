/** @jsxImportSource @emotion/react */
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { ComponentSize, LocationDescription } from "@gamepark/react-game";
import { cardDescription } from "../material/DwarfCardDescription";
import { css } from "@emotion/react";
import { isMoveItem, Location, MaterialMove, MoveItem } from "@gamepark/rules-api";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";

enum DiscardType {
  Coin = 1,
  Card
}

export class DiscardLocatorDescription extends LocationDescription {
  alwaysVisible = true

  locations = [{ type: LocationType.Discard, id: DiscardType.Coin }, { type: LocationType.Discard, id: DiscardType.Card }]

  getSize(location: Location): ComponentSize {
    if (location.id === DiscardType.Coin) {
      return { width: 10, height: 10 }
    }
    return { width: cardDescription.width, height: cardDescription.width / cardDescription.ratio }
  }

  canDrop(move: MaterialMove, location: Location) {
    return isMoveItem(move) && move.position.location?.type === LocationType.Discard && this.isAllowedLocation(move, location.id)
  }

  isAllowedLocation(move: MoveItem, locationId: DiscardType) {
    return (move.itemType === MaterialType.Card && locationId === DiscardType.Card) || (move.itemType === MaterialType.Coin && locationId === DiscardType.Coin)
  }

  getCoordinates(location: Location) {
    if (location.id === DiscardType.Coin) {
      return { x: -73, y: -1, z: 0 }
    }

    return { x: -73, y: -11, z: 0 }
  }

  getExtraCss = (location: Location) => css`
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: ${location.id === DiscardType.Coin ? 5 : 0.3}em;
  `
}