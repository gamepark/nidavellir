import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { RuleId } from '@gamepark/nidavellir/rules/RuleId'
import { and, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const nidavellirAnimations = new MaterialGameAnimations()

nidavellirAnimations
  .configure((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Tavern)
  .duration(300)

nidavellirAnimations
  .configure(and(
    isRule(RuleId.EnterDwarves),
    (move) => isMoveItemType(MaterialType.Coin)(move) && move.location.type === LocationType.Hand
  ))
  .duration(300)
