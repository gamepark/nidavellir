/** @jsxImportSource @emotion/react */
import { Locator } from '@gamepark/react-game'
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { CoinLocationDescription } from "./CoinLocationDescription";

export class CoinLocator extends Locator {
  locationDescription = new CoinLocationDescription()
  parentItemType = MaterialType.Coin
  positionOnParent = { x: 50, y: 50 }
}
