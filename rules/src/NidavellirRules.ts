import { SecretMaterialRules } from '@gamepark/rules-api'
import { PlayerId } from './player/Player'
import { LocationType } from './material/LocationType'
import { MaterialType } from "./material/MaterialType";
import { hidingStrategies } from "./configuration/HidingStrategies";
import { rules } from "./configuration/RuleDefinitions";
import { MaterialRulesPartCreator } from "@gamepark/rules-api/dist/material/rules";
import { locationsStrategies } from "./configuration/LocationStrategies";


export default class NidavellirRules
  extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {

  rules = rules as Record<number, MaterialRulesPartCreator>
  locationsStrategies = locationsStrategies
  hidingStrategies = hidingStrategies
}
