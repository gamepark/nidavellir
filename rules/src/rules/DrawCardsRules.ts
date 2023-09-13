import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { DrawCard, Memory } from './Memory'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import PlayerTurn from './helpers/PlayerTurn'
import { EffectRule } from './effect/EffectRule'

export class DrawCardsRules extends EffectRule {
  onRuleStart(): MaterialMove[] {
    const { draw } = this.drawCard
    return this.ageDeck
      .sort((item) => -item.location.x!)
      .limit(draw)
      .moveItems({ location: { type: LocationType.Hand, player: this.player } })
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playerTurn = new PlayerTurn(this.game, this.player)

    const cards = this
      .material(MaterialType.Card)
      .location(LocationType.Hand)
      .player(this.player)


    const moves = []
    for (const card of cards.getIndexes()) {
      const locations = playerTurn.getCardLocations(cards.getItem(card)!.id.front)
      moves.push(
        ...locations.map((location) => cards.index(card).moveItem({ location })),
      )
    }

    return moves
  }


  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)
      || move.position.location?.type === LocationType.Hand
      || move.position.location?.type === this.deck) return []

    const moves = []
    if (this.cardsInHand?.length === (this.drawCard.draw - this.drawCard.keep)) {
      moves.push(...this.cardsInHand.moveItems({ location: { type: this.deck } }))
    }

    const chooseCardMoves = new PlayerTurn(this.game, this.player).onChooseCard(move)
    if (chooseCardMoves.length) {
      moves.push(...chooseCardMoves)
    }

    return moves
  }



  get cardsInHand() {
    const player = this.player
    if (!player) return
    return this.material(MaterialType.Card).location(LocationType.Hand).player(player)
  }

  get ageDeck() {
    return this
      .material(MaterialType.Card)
      .location(this.deck)
  }

  onRuleEnd() {
    const shuffle = this.ageDeck.shuffle()
    this.forget(Memory.DrawCard)
    return [shuffle]
  }

  get drawCard() {
    return this.remind<DrawCard>(Memory.DrawCard)
  }

  get deck() {
    const { age } = this.drawCard
    return age === 1 ? LocationType.Age1Deck : LocationType.Age2Deck
  }
}