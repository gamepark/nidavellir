import { isStartPlayerTurn, Location, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart, MoveItem } from "@gamepark/rules-api";
import { Effect, Memory } from "../Memory";
import { MaterialType } from "../../material/MaterialType";
import { Cards, isDwarfDescription, isHeroDescription, isRoyalOfferingDescription } from "../../cards/Cards";
import { LocationType } from "../../material/LocationType";
import Army from "./Army";
import { Card } from "../../material/Card";
import { PlayerId } from "../../state/Player";
import { DwarfType } from "../../cards/DwarfDescription";
import { RuleId } from "../RuleId";
import { HeroesEffects } from "../../cards/Heroes";

export class CardChoice extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game);
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  getLocation(card: Card): Location {
    const description = Cards[card]

    if (isHeroDescription(card, description) && description.type === DwarfType.Neutral) {
      return { type: LocationType.CommandZone, player: this.player }
    }

    if (isDwarfDescription(card, description) || isHeroDescription(card, description)) {
      return { type: LocationType.Army, x: description.type, player: this.player }
    }

    return { type: LocationType.Discard }
  }


  onMove(move: MoveItem) {
    const moves: MaterialMove[] = []
    const movedItem = this.material(MaterialType.Card).getItem(move.itemIndex)!

    this.applyEffect(movedItem)

    if (move.position.location?.type !== LocationType.Army) return []

    moves.push(...new Army(this.game, this.player).onRecruit(move))

    if (moves.some((move) => isStartPlayerTurn(move))) {
      return moves;
    }

    if (this.game.rule?.id !== RuleId.RecruitHero && this.hasRecruitment) {
      moves.push(this.rules().startPlayerTurn(RuleId.RecruitHero, this.player))
    }

    return moves;
  }

  get hasRecruitment() {
    return this.remind(Memory.Recruitements)
  }

  applyEffect (item: MaterialItem) {
    const cardId = item.id.front
    const description = Cards[cardId]

    if (isRoyalOfferingDescription(cardId, description)) {
      this.memorize(Memory.TransformBonus, description.bonus)
      this.memorize<Effect>(Memory.Effect, { rule: RuleId.TransformCoin })
    }

    if (isHeroDescription(cardId, description)) {
      const effect = HeroesEffects[cardId]
      if (effect) this.memorize<Effect>(Memory.Effect, HeroesEffects[cardId])
    }
  }
}