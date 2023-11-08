import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { PlayerBoardSpace } from '../../material/PlayerBoardSpace'

export const MIN_DWARVES_PER_TAVERN = 3;
export class Tavern extends MaterialRulesPart {

  get end(): MaterialMove[] {
    this.game.players.forEach((p) => this.forget(Memory.DiscardedCoin, p))
    if (this.isEndOfAge) {
      return [this.rules().startRule(RuleId.EndOfAge)]
    }

    if (this.tavern < PlayerBoardSpace.ShiningHorse) {
      return [this.rules().startRule(RuleId.BidRevelation)]
    }
    return [this.rules().startRule(RuleId.EnterDwarves)]
  }

  get isEndOfAge() {
    const playerCount = this.game.players.length
    const cardInTaverns = this.material(MaterialType.Card).location(LocationType.Tavern)
    const round = this.round
    if (playerCount <= 3) {

      if (playerCount === 3) {
        return cardInTaverns.length === 0 && (this.age === 1 ? round === 4 : round === 8)
      } else {
        return cardInTaverns.length <= 1 && (this.age === 1 ? round === 4 : round === 8)
      }
    }

    return cardInTaverns.length === 0 && (this.age === 1 ? round === 3 : round === 6)
  }

  get age () {
    return this.remind(Memory.Age)
  }

  get round() {
    return this.remind(Memory.Round)
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }
}