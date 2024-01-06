import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { RuleId } from '@gamepark/nidavellir/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const nidavellirAnimations = new MaterialGameAnimations()

nidavellirAnimations.when()
  .move(move =>
    isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Tavern
  ).duration(0.3)

nidavellirAnimations.when()
  .rule(RuleId.EnterDwarves)
  .move(move =>
    isMoveItemType(MaterialType.Coin)(move) && move.location.type === LocationType.Hand
  ).duration(0.3)
