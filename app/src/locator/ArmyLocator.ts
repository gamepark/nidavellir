/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { Coordinates, MaterialItem } from "@gamepark/rules-api";
import { ArmyLocatorDescription } from "./ArmyLocatorDescription";
import Army from "@gamepark/nidavellir/rules/helpers/Army";

export class ArmyLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new ArmyLocatorDescription()

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const locationCoordinates = this.locationDescription.getCoordinates(item.location, context)
    const locationTop = (0.5 * this.locationDescription.height)
    const cardTop =  context.material[context.type].getSize(item.id).height * 0.5
    const y = 0.2 + locationCoordinates.y - locationTop + cardTop
    return { x: locationCoordinates.x, y, z: 0.05}
  }

  getDelta(item: MaterialItem, context: ItemContext) {
    return { y: 1.2, z: context.material[context.type].getThickness(item, context)}
  }

  getItemIndex(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return new Army(context.rules.game, item.location.player!).getGradeIndex(item);
  }
}
