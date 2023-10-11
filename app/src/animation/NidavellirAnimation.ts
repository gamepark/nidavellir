import { isMoveItemType, MaterialMove } from "@gamepark/rules-api"
import { AnimationStep } from "@gamepark/react-client"
import { MaterialAnimationContext, MaterialGameAnimations } from "@gamepark/react-game";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";

export class NidavellirAnimations extends MaterialGameAnimations {

  override getDuration(move: MaterialMove, context: MaterialAnimationContext): number {
    if (isMoveItemType(MaterialType.Card)(move) && move.position.location?.type === LocationType.Tavern && context.step === AnimationStep.BEFORE_MOVE) return 0.3
    if (isMoveItemType(MaterialType.Coin)(move)
      && move.position.location?.type === LocationType.Hand
      && context.game.items[move.itemType]![move.itemIndex].location.type === LocationType.PlayerBoard
      && context.step === AnimationStep.BEFORE_MOVE) return 0.3
    return super.getDuration(move, context);
  }
}