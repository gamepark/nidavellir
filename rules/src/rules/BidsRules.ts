import { LocationType } from '../material/LocationType'
import { PlayerId } from '../state/Player'
import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { RuleId } from "./RuleId";
import Bid from "./helpers/Bid";

class BidsRules extends SimultaneousRule<PlayerId, MaterialType, LocationType> {

    getLegalMoves(player: PlayerId): MaterialMove[] {
        const combinations = new Bid(this.game, player).combinations

        if (!combinations.length) {
            return [this.rules().endPlayerTurn(player)]
        }

        return combinations
    }

    afterItemMove(move: ItemMove) {
        const moves: MaterialMove[] = []
        if (isMoveItemType(MaterialType.Coin)(move) && move.position.location && move.position.location.type === LocationType.PlayerBoard) {
            const player = move.position.location.player!
            const playerCoins = this.material(MaterialType.Coin).player(player)
            const coinsOnBoard = playerCoins.location(LocationType.PlayerBoard)
            const coinsInHand = playerCoins.location(LocationType.PlayerHand)
            const availableBidSpaces = Array.from(Array(5)).filter((place) => !coinsOnBoard.filter((item) => item.location.x! === place))

            if (coinsInHand.length === 1 || (coinsInHand.length === 2 && !coinsOnBoard.filter((item) => item.location.x! > 2).length)) {
                if (availableBidSpaces.length !== coinsInHand.length) console.error("There is a difference between the number of coin in hand and the remaining place")
                coinsInHand.getIndexes().forEach((itemIndex, index) => {
                    moves.push(
                      coinsInHand.index(itemIndex).moveItem({ location: { type: LocationType.PlayerBoard, player, x: availableBidSpaces[index] }})
                    )
                })
            }
        }

        return moves
    }

    getMovesAfterPlayersDone() {
        return [this.rules().startRule(RuleId.BidRevelation)]
    }
}

export {BidsRules}
