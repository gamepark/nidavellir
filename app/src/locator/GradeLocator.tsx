/** @jsxImportSource @emotion/react */
import { Locator, LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'

export class GradeLocator extends Locator {
  locationDescription = new GradeLocationDescription()
  parentItemType = MaterialType.Card
  positionOnParent = { x: 16, y: 10 }
}

class GradeLocationDescription extends LocationDescription {
  alwaysVisible = false
  width = 2
  height = 1
}
