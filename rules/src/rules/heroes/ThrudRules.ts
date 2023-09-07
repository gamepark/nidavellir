import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { dwarfTypes } from '../../cards/DwarfDescription'
import { Card } from '../../cards/Cards'
import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import PlayerTurn from '../helpers/PlayerTurn'
import Army from '../helpers/Army'

export class ThrudRules extends PlayerTurnRule {

  onRuleStart<RuleId extends number>(_move: RuleMove<number, RuleId>, _previousRule?: RuleStep): MaterialMove<number, number, number>[] {
    return new Army(this.game, this.player)
      .getCard(Card.Thrud)
      .moveItems({ location: { type: LocationType.Hand, player: this.player } })
  }

  getPlayerMoves() {
    const thrud = this.material(MaterialType.Card).id((id: Record<string, any>) => id.front === Card.Thrud)
    return dwarfTypes.map((type) => thrud.moveItem({ location: { type: LocationType.Army, id: type, player: this.player } }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type === LocationType.Hand) return []
    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }
}