import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card } from '../../cards/Cards'
import { dwarfTypes } from '../../cards/DwarfDescription'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import Army from '../helpers/Army'
import PlayerTurn from '../helpers/PlayerTurn'

export class ThrudRules extends PlayerTurnRule {

  onRuleStart(): MaterialMove[] {
    return new Army(this.game, this.player)
      .getCard(Card.Thrud)
      .moveItems({ type: LocationType.Hand, player: this.player })
  }

  getPlayerMoves() {
    const thrud = this.material(MaterialType.Card).id((id: Record<string, any>) => id.front === Card.Thrud)
    return dwarfTypes.map((type) => thrud.moveItem({ type: LocationType.Army, id: type, player: this.player }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type === LocationType.Hand) return []
    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }
}