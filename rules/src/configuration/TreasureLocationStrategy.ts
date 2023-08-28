import { Material, MaterialItem, LocationStrategy } from '@gamepark/rules-api'
import { Coins } from "../coins/Coins";
import { PlayerId } from "../player/Player";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";

export class TreasureLocationStrategy implements LocationStrategy<PlayerId, MaterialType, LocationType> {

  addItem(material: Material, item: MaterialItem): void {
    item.location.x = Coins[item.id].value - 5
    item.location.z = material.filter((i: MaterialItem) => item.id === i.id).length
  }
}