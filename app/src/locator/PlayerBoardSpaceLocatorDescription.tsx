/** @jsxImportSource @emotion/react */
import { LocationDescription } from "@gamepark/react-game";
import { coinDescription } from "../material/CoinDescription";

export class PlayerBoardSpaceLocatorDescription extends LocationDescription {
  width = coinDescription.diameter
  ratio = 1
  borderRadius = this.width / 2
  alwaysVisible = true
}