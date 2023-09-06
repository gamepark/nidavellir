import { CompetitiveScore, MaterialGame, MaterialMove, rankByScore, SecretMaterialRules, MaterialRulesPartCreator } from '@gamepark/rules-api'
import { PlayerId } from './player/Player'
import { LocationType } from './material/LocationType'
import { MaterialType } from "./material/MaterialType";
import { hidingStrategies } from "./configuration/HidingStrategies";
import { rules } from "./configuration/RuleDefinitions";
import { locationsStrategies } from "./configuration/LocationStrategies";
import { Score } from "./rules/helpers/Score";

export class NidavellirRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>
{

  rankPlayers(playerA: PlayerId, playerB: PlayerId): number {
    return rankByScore(playerA, playerB, this.getScore.bind(this))
  }

  getScore(playerId: PlayerId) {
    return new Score(this.game, playerId).score
  }

  rules = rules as Record<number, MaterialRulesPartCreator>
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies
}
