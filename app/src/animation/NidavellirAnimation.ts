import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { RuleId } from '@gamepark/nidavellir/rules/RuleId'
import { and, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isShuffle } from '@gamepark/rules-api'

export const nidavellirAnimations = new MaterialGameAnimations()

// Coins in hand and the age decks are shuffled so that nobody can track a hidden item.
// Pure protection, nothing for the players to watch: no animation, and no shuffle sound either.
nidavellirAnimations.configure(isShuffle).skip()

nidavellirAnimations
  .configure((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Tavern)
  .duration(300)

nidavellirAnimations
  .configure(and(
    isRule(RuleId.EnterDwarves),
    (move) => isMoveItemType(MaterialType.Coin)(move) && move.location.type === LocationType.Hand
  ))
  .duration(300)
