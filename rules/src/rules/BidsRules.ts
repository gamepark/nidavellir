import { LocationType } from '../material/LocationType'
import { PlayerId } from '../player/Player'
import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { RuleId } from "./RuleId";
import Bid from "./helpers/Bid";
import { PlayerBoardSpace, tokenSpaces } from "../material/PlayerBoardSpace";
import { Memory } from "./Memory";

class BidsRules extends SimultaneousRule<PlayerId, MaterialType, LocationType> {

    getLegalMoves(player: PlayerId): MaterialMove[] {
        return new Bid(this.game, player).combinations
    }

    afterItemMove(move: ItemMove) {
        const moves: MaterialMove[] = []
        if (isMoveItemType(MaterialType.Coin)(move) && move.position.location && move.position.location.type === LocationType.PlayerBoard) {
            const player = move.position.location.player!
            const playerCoins = this.material(MaterialType.Coin).player(player)
            const coinsInHand = playerCoins.location(LocationType.PlayerHand)
            if (!coinsInHand.length) return [this.rules().endPlayerTurn(player)]

            const coinsOnBoard = playerCoins.location(LocationType.PlayerBoard)
            const availableBidSpaces = tokenSpaces.filter((space) => !coinsOnBoard.filter((item) => item.location.id === space).length)

            if (coinsInHand.length === 1 || (coinsInHand.length === 2 && !coinsOnBoard.filter((item) => item.location.id > PlayerBoardSpace.ShiningHorse).length)) {
                if (availableBidSpaces.length !== coinsInHand.length) console.error("There is a difference between the number of coin in hand and the remaining place")
                moves.push(
                  coinsInHand.index(coinsInHand.getIndex()).moveItem({ location: { type: LocationType.PlayerBoard, player, id: availableBidSpaces[0] }, rotation: { y: 1 }})
                )
            }
        }

        return moves
    }

    getMovesAfterPlayersDone() {
        return [this.rules().startRule(RuleId.BidRevelation)]
    }

    get tavern() {
        return this.remind(Memory.Tavern)
    }
}

export {BidsRules}
