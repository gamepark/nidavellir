/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from "@gamepark/react-game";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { css } from "@emotion/react";
import { Location } from "@gamepark/rules-api";
import { Tavern } from "@gamepark/nidavellir/material/Tavern";
import Images from "../images/Images";

export class TavernLocatorDescription extends LocationDescription {
  alwaysVisible = true
  locations = [
    { type: LocationType.Tavern },
    { type: LocationType.Tavern, id: Tavern.LaughingGoblin },
    { type: LocationType.Tavern, id: Tavern.DancingDragon },
    { type: LocationType.Tavern, id: Tavern.ShiningHorse },
  ]

  getCoordinates(location: Location, context: MaterialContext) {
    if (!location.id) return this.getPlaceholderCoordinates(context)
    return this.getEmblemCoordinates(location, context)
  }

  getSize(location: Location, context: MaterialContext) {
    if (!location.id) return this.getPlaceholderSize(context)
    return this.getEmblemSize(location)
  }

  getPlaceholderCoordinates({ rules }: MaterialContext) {
    switch(rules.players.length) {
      case 2:
      case 3:
        return { x: -54.2, y: -20, z: 0}
      case 4:
        return { x: -42, y: -14, z: 0}
      case 5:
      default:
        return { x: -45, y: -14, z: 0}
    }
  }

  getEmblemCoordinates(location: Location, context: MaterialContext) {
    const deltaY = this.getEmblemDeltaX(context)
    const placeholderCoordinates = this.getPlaceholderCoordinates(context)
    switch (location.id) {
      case Tavern.LaughingGoblin:
        return { x: placeholderCoordinates.x + deltaY, y: placeholderCoordinates.y - 8.9, z: placeholderCoordinates.z };
      case Tavern.DancingDragon:
        return { x: placeholderCoordinates.x + deltaY, y: placeholderCoordinates.y, z: placeholderCoordinates.z };
      case Tavern.ShiningHorse:
      default:
        return { x: placeholderCoordinates.x + deltaY, y: placeholderCoordinates.y + 9.1, z: placeholderCoordinates.z };
    }

  }

  getEmblemDeltaX({ rules }: MaterialContext) {
    switch(rules.players.length) {
      case 2:
      case 3:
        return -10
      case 4:
        return -13
      case 5:
      default:
        return -16
    }
  }

  getPlaceholderSize({ rules }: MaterialContext) {
    switch(rules.players.length) {
      case 2:
      case 3:
        return { height: 28.5, width: 30 }
      case 4:
        return { height: 28.5, width: 37 }
      case 5:
      default:
        return { height: 28.5, width: 43 }
    }
  }

  getEmblemSize(location: Location) {
    switch (location.id) {
      case Tavern.LaughingGoblin:
        return { height: 8, width: 8 };
      case Tavern.DancingDragon:
        return { height: 8, width: 8 };
      case Tavern.ShiningHorse:
      default:
        return { height: 8, width: 8 };
    }
  }

  getExtraCss(location: Location<number, number>, _context: MaterialContext<number, number, number>) {
    if (!location.id) return css`background: #FAEBD780; border-radius: 0.5em`

    let image;
    switch (location.id) {
      case Tavern.LaughingGoblin:
        image = Images.LaughingGoblin
        break
      case Tavern.DancingDragon:
        image = Images.DancingDragon
        break
      case Tavern.ShiningHorse:
      default:
        image = Images.ShiningHorse
    }

    return css`
      background: url(${image}) no-repeat;
      background-size: cover;
    `
  }
}