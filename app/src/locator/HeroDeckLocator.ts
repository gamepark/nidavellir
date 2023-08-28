/** @jsxImportSource @emotion/react */
import { GridLocator } from "./GridLocator";

export class HeroDeckLocator extends GridLocator {
  baseY = -29
  coordinates = { x: -34, y: this.baseY, z: 0 }
  delta = { x: 1, y: 1 }
  columns = 7
}
