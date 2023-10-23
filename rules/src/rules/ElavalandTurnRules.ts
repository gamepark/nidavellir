import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import PlayerTurn from './helpers/PlayerTurn'
import { Memory, PreviousRule } from './Memory'

class ElavalandTurnRules extends PlayerTurnRule {

  onRuleStart(): MaterialMove[] {
    const previousRule = this.remind<PreviousRule>(Memory.PreviousRule)
    if (this.game.rule?.id === previousRule?.id) {
      this.forget(Memory.PreviousRule)
      return new PlayerTurn(this.game, this.player).goToEndOfTurn
    }

    return []
  }

  getAutomaticMoves() {
    const moves = this.chooseCardMoves
    if (moves.length === 1) {
      return moves
    }

    return []
  }

  getPlayerMoves() {
    return this.chooseCardMoves
  }

  get chooseCardMoves() {
    const playerTurn = new PlayerTurn(this.game, this.player)
    const tavern = this.tavern

    const cards = this
      .material(MaterialType.Card)
      .location((location) => location.type === LocationType.Tavern && location.id === tavern)

    const moves = []
    for (const card of cards.getIndexes()) {
      const locations = playerTurn.getCardLocations(cards.getItem(card)!.id.front)
      moves.push(
        ...locations.map((location) => cards.index(card).moveItem(location))
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    const cardsInTavern = this
      .material(MaterialType.Card)
      .location(LocationType.Tavern)
      .locationId(this.tavern)

    if (this.game.players.length === 2 && !cardsInTavern.length) return []
    // If the card was the last card in tavern for player. ignore it
    const playerTurn = new PlayerTurn(this.game, this.player)
    const choiceConsequences = playerTurn.onChooseCard(move)

    if (choiceConsequences.length) {
      this.memorize<PreviousRule>(Memory.PreviousRule, this.game.rule!)
      return choiceConsequences
    }

    return playerTurn.goToEndOfTurn
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

}

export { ElavalandTurnRules }
