/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from "@gamepark/react-game";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { css } from "@emotion/react";
import { Location } from "@gamepark/rules-api/dist/material/location/Location";

export class TavernLocatorDescription extends LocationDescription {
  alwaysVisible = true
  location = { type: LocationType.Tavern }

  getCoordinates(_location: Location, { rules }: MaterialContext) {
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

  getSize(_location: Location, { rules }: MaterialContext) {
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

  getExtraCss(_location: Location<number, number>, _context: MaterialContext<number, number, number>) {
    return css`background: #FAEBD780; border-radius: 0.5em`
  }


}