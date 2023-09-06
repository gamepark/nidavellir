import { RuleId } from "../rules/RuleId";
import { BidsRules } from "../rules/BidsRules";
import { EnterTheDwarvesRules } from "../rules/EnterTheDwarvesRules";
import { MaterialRulesPartCreator } from "@gamepark/rules-api";
import { UlineBidRules } from "../rules/UlineBidRules";
import { BidRevelationRules } from "../rules/BidRevelationRules";
import { TradeCoinRules } from "../rules/effect/TradeCoinRules";
import { ChooseCardRules } from "../rules/ChooseCardRules";
import { RecruitHeroRules } from "../rules/RecruitHeroRules";
import { TransformCoinRules } from "../rules/effect/TransformCoinRules";
import { KingsHandRules } from "../rules/distinctions/KingsHandRules";
import { HuntingMasterRules } from "../rules/distinctions/HuntingMasterRules";
import { CrownJewelerRules } from "../rules/distinctions/CrownJewelerRules";
import { KingsGreatArmorerRules } from "../rules/distinctions/KingsGreatArmorerRules";
import { PioneerOfTheKingdomRules } from "../rules/distinctions/PioneerOfTheKingdomRules";
import { GemTradeRules } from "../rules/GemTradeRules";
import { BonfurRules } from "../rules/heroes/BonfurRules";
import { DagdaRules } from "../rules/heroes/DagdaRules";
import { GridRules } from "../rules/heroes/GridRules";
import { ThrudRules } from "../rules/heroes/ThrudRules";
import { UlineRules } from "../rules/heroes/UlineRules";
import { YludRules } from "../rules/heroes/YludRules";


export const rules: Record<RuleId, MaterialRulesPartCreator> = {
    [RuleId.EnterDwarves]: EnterTheDwarvesRules,
    [RuleId.Bids]: BidsRules,
    [RuleId.BidRevelation]: BidRevelationRules,
    [RuleId.UlineBid]: UlineBidRules,
    [RuleId.ChooseCard]: ChooseCardRules,
    [RuleId.RecruitHero]: RecruitHeroRules,
    [RuleId.TradeCoin]: TradeCoinRules,
    [RuleId.TransformCoin]: TransformCoinRules,
    [RuleId.KingsHand]: KingsHandRules,
    [RuleId.HuntingMaster]: HuntingMasterRules,
    [RuleId.CrownJeweler]: CrownJewelerRules,
    [RuleId.KingsGreatArmorer]: KingsGreatArmorerRules,
    [RuleId.PioneerOfTheKingdom]: PioneerOfTheKingdomRules,
    [RuleId.GemTrade]: GemTradeRules,
    [RuleId.Bonfur]: BonfurRules,
    [RuleId.Dagda]: DagdaRules,
    [RuleId.Grid]: GridRules,
    [RuleId.Thrud]: ThrudRules,
    [RuleId.Uline]: UlineRules,
    [RuleId.Ylud]: YludRules
}