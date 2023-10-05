import { LocationType } from '../material/LocationType'
import { PlayerId } from '../player/Player'
import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import Bid from './helpers/Bid'
import { Memory } from './Memory'

class BidsRules extends SimultaneousRule<PlayerId, MaterialType, LocationType> {

    getLegalMoves(player: PlayerId): MaterialMove[] {
        if (!this.isTurnToPlay(player)) return []

        const playerCoins = this.material(MaterialType.Coin).player(player)
        const coinsInHand = playerCoins.location(LocationType.Hand)
        if (!coinsInHand.length) return [this.rules().endPlayerTurn(player)]
        const moves = new Bid(this.game, player).combinations
        moves.push(
          ...this.material(MaterialType.Coin).location(LocationType.PlayerBoard).player(player).moveItems({ location: { type: LocationType.Hand, player }})
        )

        return moves;
    }

    getMovesAfterPlayersDone() {
        return [this.rules().startRule(RuleId.BidRevelation)]
    }

    get tavern() {
        return this.remind(Memory.Tavern)
    }
}

export {BidsRules}
