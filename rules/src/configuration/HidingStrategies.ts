import {hideItemIdToOthers, HidingStrategy, MaterialItem} from "@gamepark/rules-api";
import {PlayerId} from "../player/Player";
import {LocationType} from "../material/LocationType";
import {MaterialType} from "../material/MaterialType";


export const hideCardFront: HidingStrategy = () => ['id.front']
export const hideCardFrontToOthers: HidingStrategy = (
    item: MaterialItem, player?: PlayerId
) => item.location.player === player ? [] : ['id.front']

export const hideCoinWhenRotated: HidingStrategy = (
  item: MaterialItem, player?: PlayerId
) => {
    if (item.rotation?.y) {
        return item.location.player === player ? [] : ['id']
    }

    return []
}


export const hidingStrategies = {
    [MaterialType.Card]: {
        [LocationType.Age1Deck]: hideCardFront,
        [LocationType.Age2Deck]: hideCardFront
    },
    [MaterialType.Coin]: {
        [LocationType.PlayerBoard]: hideCoinWhenRotated,
        [LocationType.PlayerHand]: hideItemIdToOthers
    }
}