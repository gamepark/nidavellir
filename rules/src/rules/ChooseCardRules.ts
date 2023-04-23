import { NidavellirRules } from './NidavellirRules'
import { Player, PlayerId } from '../state/Player'
import Move from '../moves/Move'
import { getCardsInTavern, isOnPlayerBoard } from '../utils/location.utils'
import MoveType from '../moves/MoveType'
import { isLocatedCoin } from '../utils/player.utils'
import { InTavern } from '../state/LocatedCard'
import { MoveCard } from '../moves/MoveCard'
import { Cards } from '../cards/Cards'
import { EffectType } from '../effects/EffectType'
import GameState from '../state/GameState'
import GameView from '../state/view/GameView'
import { isExchangeCoin } from '../utils/coin.utils'
import { getChooseCardMove, onChooseCard } from '../utils/card.utils'

class ChooseCardRules extends NidavellirRules {
  player: Player

  constructor(game: GameState | GameView, player: Player) {
    super(game)
    this.player = player
  }

  getLegalMoves(playerId: PlayerId): Move[] {
    if (playerId !== this.player.id || this.player.playedCard !== undefined) {
      return []
    }

    const currentTavern = this.game.tavern
    const tavernCards = getCardsInTavern(this.game).filter((c) => (c.location as InTavern).tavern === currentTavern)

    return tavernCards.map((c) => getChooseCardMove(this.game, this.player, c.id!))
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.MoveCard:
        return this.chooseCard(move)
    }

    return super.play(move)
  }

  chooseCard(move: MoveCard) {


    const tavern = this.game.tavern
    const playerCoin = this.game.coins.find(
      (coin) =>
        isOnPlayerBoard(coin.location) && coin.location.index === tavern && coin.location.player === this.player.id
    )

    const card = Cards[move.id!]

    // Then, potential hero recruiting
    const moves = onChooseCard(this.game, this.player, move, 'age', true)
    if (moves.length) {
      return moves
    }

    // First, card effect
    if (card.effects?.length) {
      this.player.effects.unshift(...JSON.parse(JSON.stringify(card.effects)))
    }

    // Trade is only triggered if the player has played a 0-value coin
    // Finally, trade coin if needed
    if (playerCoin && isLocatedCoin(playerCoin) && isExchangeCoin(playerCoin)) {
      this.player.effects.push({
        type: EffectType.TRADE_COIN
      })
    }

    return moves
  }
}

export { ChooseCardRules }
