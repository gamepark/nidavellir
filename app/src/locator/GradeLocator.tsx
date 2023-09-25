/** @jsxImportSource @emotion/react */
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'

export class GradeLocator extends ItemLocator {
  locationDescription = new GradeLocationDescription()
  parentItemType = MaterialType.Card
  positionOnParent = { x: 5, y: 10 }
}

class GradeLocationDescription extends LocationDescription {
  alwaysVisible = false
  width = 3
  height = 1
}
