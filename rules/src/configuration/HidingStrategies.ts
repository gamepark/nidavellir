import {hideItemIdToOthers, HidingStrategy, MaterialItem} from "@gamepark/rules-api";
import {PlayerId} from "../state/Player";
import {LocationType} from "../material/LocationType";
import {MaterialType} from "../material/MaterialType";


export const hideCardFront: HidingStrategy = () => ['id.front']
export const hideCardFrontToOthers: HidingStrategy = (
    item: MaterialItem, player?: PlayerId
) => item.location.player === player ? [] : ['id.front']

export const hideCardWhenRotated: HidingStrategy = (
    item: MaterialItem, player?: PlayerId
) => {
    if (item.rotation?.y) {
        return item.location.player === player ? [] : ['id.front']
    }

    return []
}


export const hidingStrategies = {
    [MaterialType.Card]: {
        [LocationType.Age1Deck]: hideCardFront,
        [LocationType.Age2Deck]: hideCardFront
    },
    [MaterialType.Coin]: {
        [LocationType.PlayerBoard]: hideCardWhenRotated,
        [LocationType.PlayerHand]: hideItemIdToOthers
    }
}