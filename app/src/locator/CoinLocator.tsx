/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { CoinLocationDescription } from "./CoinLocationDescription";

export class CoinLocator extends ItemLocator {
  locationDescription = new CoinLocationDescription()
  parentItemType = MaterialType.Coin
  positionOnParent = { x: 50, y: 50 }
}
