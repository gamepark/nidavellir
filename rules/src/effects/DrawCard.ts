import EffectRules from './EffectRules'
import { EffectType } from './EffectType'
import Move from '../moves/Move'
import MoveView, { isView } from '../moves/MoveView'
import { getChooseCardMove, onChooseCard } from '../utils/card.utils'
import { LocationType } from '../state/Location'
import { MoveCard, moveKnownCardMove } from '../moves/MoveCard'
import MoveType from '../moves/MoveType'
import { isInAge2Deck, isInPlayerHand } from '../utils/location.utils'
import { Cards } from '../cards/Cards'

export type DrawCard = {
  type: EffectType.DRAW_CARD;
  count: number;
  keep: number;
};

export class DrawCardRules extends EffectRules {
  get effect(): DrawCard {
    return this.player.effects[0] as DrawCard
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    const drawnCards = this.game.cards.filter((c) => isInAge2Deck(c.location)).slice(0, this.effect.count)

    if (this.game.cards.some((c) => isInPlayerHand(c.location) && c.location.player === this.player.id)) {
      return []
    }

    return drawnCards.map((c, index) =>
      moveKnownCardMove(c.id!, {
        type: LocationType.PlayerHand,
        player: this.player.id,
        index
      }, this.player.id)
    )
  }

  getPlayerMoves(): (Move | MoveView)[] {
    const cardsInHand = this.game.cards.filter(
      (c) => isInPlayerHand(c.location) && c.location.player === this.player.id
    )
    if (cardsInHand.length) {
      return cardsInHand.map((c) => getChooseCardMove(this.game, this.player, c.id!))
    }

    return []
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.MoveCard:
        return this.onMoveCard(move)
    }

    return []
  }

  onMoveCard = (move: MoveCard) => {
    if (isInPlayerHand(move.target)) {
      return []
    }
    const cardsInHand = this.game.cards.filter(
      (c) => isInPlayerHand(c.location) && c.location.player === this.player.id
    )

    const card = Cards[move.id!]

    // First, card effect
    if (card.effects?.length) {
      this.player.effects.push(...JSON.parse(JSON.stringify(card.effects)))
    }

    onChooseCard(this.game, this.player, move.id!, 'age')
    if (cardsInHand.length === this.effect.count - this.effect.keep) {
      const locationType = card.age === 1 ? LocationType.Age1Deck : LocationType.Age2Deck
      const ageDeckLength = this.game.cards.filter((c) => locationType === c.location.type).length
      this.player.effects.shift()
      return [
        ...cardsInHand.map((c, index) =>
          moveKnownCardMove(c.id!, {
            type: locationType,
            index: ageDeckLength + index
          }, this.player.id)
        )
      ]
    }

    return []
  }
}
