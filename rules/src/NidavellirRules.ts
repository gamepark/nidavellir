import { CompetitiveScore, MaterialGame, MaterialMove, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { hidingStrategies } from './configuration/HidingStrategies'
import { locationsStrategies } from './configuration/LocationStrategies'
import { rules } from './configuration/RuleDefinitions'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './player/Player'
import { Score } from './rules/helpers/Score'
import { RuleId } from './rules/RuleId'

export class NidavellirRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {

  rules = rules
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies

  getScore(playerId: PlayerId) {
    return new Score(this.game, playerId).score
  }

  giveTime(): number {
    return this.game.rule?.id === RuleId.Bids ? 45 : 20
  }
}
