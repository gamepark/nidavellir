import { HidingStrategy, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../player/Player'


export const hideCardFront: HidingStrategy = () => ['id.front']
export const hideCardFrontToOthers: HidingStrategy = (
  item: MaterialItem, player?: PlayerId
) => item.location.player === player ? [] : ['id.front']

export const hideCoinWhenNotRotated: HidingStrategy = (
  item: MaterialItem, player?: PlayerId
) => {
  if (item.location.rotation) return []
  return item.location.player === player ? [] : ['id']
}


export const hidingStrategies = {
  [MaterialType.Card]: {
    [LocationType.Age1Deck]: hideCardFront,
    [LocationType.Age2Deck]: hideCardFront,
    [LocationType.Hand]: hideCardFrontToOthers
  },
  [MaterialType.Coin]: {
    [LocationType.PlayerBoard]: hideCoinWhenNotRotated,
    [LocationType.Hand]: hideCoinWhenNotRotated
  }
}