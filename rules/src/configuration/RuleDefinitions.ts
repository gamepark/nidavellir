import {RuleId} from "../rules/RuleId";
import {BidsRules} from "../rules/BidsRules";
import {EnterTheDwarvesRules} from "../rules/EnterTheDwarvesRules";
import {MaterialRulesPartCreator} from "@gamepark/rules-api/dist/material/rules";
import { UlineBidRules } from "../rules/UlineBidRules";
import { BidRevelationRules } from "../rules/BidRevelationRules";
import { TradeCoinRules } from "../rules/effect/TradeCoinRules";


// TODO: remove partial
export const rules: Partial<Record<number, MaterialRulesPartCreator>> = {
    [RuleId.EnterDwarves]: EnterTheDwarvesRules,
    [RuleId.Bids]: BidsRules,
    [RuleId.BidRevelation]: BidRevelationRules,
    [RuleId.TradeCoin]: TradeCoinRules,
    [RuleId.UlineBid]: UlineBidRules
}