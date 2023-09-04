/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { Coordinates, MaterialItem } from "@gamepark/rules-api";
import { CardDeck } from "@gamepark/nidavellir/cards/Cards";
import { cardDescription } from "../material/DwarfCardDescription";

export class AgeDeckLocator extends DeckLocator<PlayerId, MaterialType, LocationType> {
  delta = { x: -0.05, y: -0.05, z: 0.1 }
  hidden = true
  limit = 10

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const back = item.id.back
    const x = -74
    const players = rules.players.length
    const y = players > 3? -23: -29
    const deltaY = 1
    if (back === CardDeck.Age1) return { x, y, z: 0 }
    return { x, y: y + cardDescription.getSize(item.id).height + deltaY, z: 0 }
  }
}
