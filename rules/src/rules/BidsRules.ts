import { LocationType } from '../material/LocationType'
import { PlayerId } from '../player/Player'
import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import Bid from './helpers/Bid'
import { Memory } from './Memory'

class BidsRules extends SimultaneousRule<PlayerId, MaterialType, LocationType> {

    getLegalMoves(player: PlayerId): MaterialMove[] {
        if (!this.isTurnToPlay(player)) return []

        const moves = new Bid(this.game, player).combinations
        moves.push(
          ...this.material(MaterialType.Coin).location(LocationType.PlayerBoard).player(player).moveItems({ location: { type: LocationType.Hand, player }})
        )

        return moves;
    }

    beforeItemMove(move: ItemMove) {
        if (!isMoveItemType(MaterialType.Coin)(move)) return []
        const coin = this.material(MaterialType.Coin).index(move.itemIndex)
        if (move.position.location?.type === LocationType.PlayerBoard) {
            const item = coin.getItem()!
            const coinsOnBoard = this
              .material(MaterialType.Coin)
              .player(move.position.location?.player!)
              .location(LocationType.PlayerBoard)

            const existingCoin = coinsOnBoard.location((location) => location.id === move.position.location!.id)
            if (existingCoin.length) {
                return [existingCoin.moveItem({ location: item.location, rotation: item.rotation })]
            }
        }

        return []

    }

    afterItemMove(move: ItemMove) {
        if (!isMoveItemType(MaterialType.Coin)(move)) return []
        const player = this.material(MaterialType.Coin).index(move.itemIndex).getItem()!.location.player!
        const playerCoins = this.material(MaterialType.Coin).player(player)
        const coinsInHand = playerCoins.location(LocationType.Hand)
        if (coinsInHand.length) return []
        return [this.rules().endPlayerTurn(player)]
    }

    getMovesAfterPlayersDone() {
        return [this.rules().startRule(RuleId.BidRevelation)]
    }

    get tavern() {
        return this.remind(Memory.Tavern)
    }
}

export {BidsRules}
