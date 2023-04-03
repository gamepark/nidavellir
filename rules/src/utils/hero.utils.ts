import {Player, PlayerId} from '../state/Player'
import GameState from '../state/GameState'
import GameView from '../state/view/GameView'
import {getArmy} from './player.utils'
import {Cards} from '../cards/Cards'
import {Card, DwarfType} from '../cards/Card'
import {InArmy, LocatedCard} from '../state/LocatedCard'
import {SecretCard} from '../state/view/SecretCard'
import {isInArmy, isInCommandZone, isInHeroDeck} from './location.utils'
import sum from 'lodash/sum'
import {Heroes, Thrud, Ylud} from '../cards/Heroes'
import {EffectType} from '../effects/EffectType'
import {Effect} from '../effects/Effect'
import {Hero} from '../cards/Hero'
import {MoveHero, moveHeroMove} from '../moves/MoveHero'
import {getCardsInCommandZone} from './card.utils'
import {LocationType} from '../state/Location'
import MoveView from '../moves/MoveView'
import Move from '../moves/Move'
import {MoveCard} from '../moves/MoveCard'

export const countGrades = (army: { cards: SecretCard[]; heroes: LocatedCard[] }, type: DwarfType) => {
  return (
    sum(
      army.cards
        .filter((c) => (c.location as InArmy).column === type)
        .map((c) => Cards[c.id!])
        .map((c) => c.grades?.[type]?.length ?? 0)
    ) +
    sum(
      army.heroes
        .filter((c) => (c.location as InArmy).column === type)
        .map((c) => Heroes[c.id!])
        .map((c) => c.grades?.[type]?.length ?? 0)
    )
  )
}

export const computeRecruitHeroCount = (state: GameState | GameView, playerId: PlayerId): number => {
  const player = state.players.find((p) => p.id === playerId)!
  const heroes = state.heroes.filter((h) => isInHeroDeck(h.location))

  if (!player.playedCard || !heroes.length) {
    return 0
  }
  const drawnCard = player.playedCard
  const locatedCard = (drawnCard.deck === 'heroes' ? state.heroes : state.cards).find((c) => c.id === drawnCard.id)!

  // If the hero is in command zone, no more recruitment
  if (isInCommandZone(locatedCard.location)) {
    return 0
  }

  const army = getArmy(state, playerId)
  const card = (drawnCard.deck === 'heroes' ? Heroes : Cards)[player.playedCard.id]
  const gradesByTypes = {
    [DwarfType.Blacksmith]: countGrades(army, DwarfType.Blacksmith),
    [DwarfType.Hunter]: countGrades(army, DwarfType.Hunter),
    [DwarfType.Warrior]: countGrades(army, DwarfType.Warrior),
    [DwarfType.Explorer]: countGrades(army, DwarfType.Explorer),
    [DwarfType.Miner]: countGrades(army, DwarfType.Miner)
  }

  const minGradesBeforeCard = Math.min(
    gradesByTypes[DwarfType.Blacksmith] - getCardGradesCount(card, locatedCard, DwarfType.Blacksmith),
    gradesByTypes[DwarfType.Hunter] - getCardGradesCount(card, locatedCard, DwarfType.Hunter),
    gradesByTypes[DwarfType.Warrior] - getCardGradesCount(card, locatedCard, DwarfType.Warrior),
    gradesByTypes[DwarfType.Explorer] - getCardGradesCount(card, locatedCard, DwarfType.Explorer),
    gradesByTypes[DwarfType.Miner] - getCardGradesCount(card, locatedCard, DwarfType.Miner)
  )

  const minGradesAfterCard = Math.min(
    gradesByTypes[DwarfType.Blacksmith],
    gradesByTypes[DwarfType.Hunter],
    gradesByTypes[DwarfType.Warrior],
    gradesByTypes[DwarfType.Explorer],
    gradesByTypes[DwarfType.Miner]
  )

  const recruitmentCount = minGradesAfterCard - minGradesBeforeCard
  // It's not possible to recruit more hero than the number of completed row
  const heroesCount = state.heroes.filter(
    (h) => (isInArmy(h.location) || isInCommandZone(h.location)) && h.location.player === playerId
  )
  if (heroesCount.length >= minGradesAfterCard) {
    return 0
  }

  return recruitmentCount
}

const getCardGradesCount = (card: Hero | Card, locatedCard: SecretCard | LocatedCard, type: DwarfType) => {
  if (!isInArmy(locatedCard.location)) {
    return 0
  }

  if (type === locatedCard.location.column) {
    return card.grades?.[type].length ?? 0
  }

  return 0
}

export const mayRecruitNewHeroes = (game: GameState | GameView, player: Player, unshit?: boolean) => {
  const recruitHeroCount = computeRecruitHeroCount(game, player.id)
  if (recruitHeroCount > 0) {
    const operation = (effect: Effect) => (!unshit ? player.effects.push(effect) : player.effects.unshift(effect))
    operation({
      type: EffectType.RECRUIT_HERO,
      count: recruitHeroCount
    })
  }
}

export const applyThrud = (
  game: GameState | GameView,
  player: Player,
  move: MoveHero | MoveCard
): (Move | MoveView)[] => {
  if (move.target && isInArmy(move.target)) {
    const thrud = getHero(game, player.id, Thrud)
    if (thrud && isInArmy(thrud.location) && thrud.location.column === move.target.column) {
      const cardsInCommandZone = getCardsInCommandZone(game, player.id)
      return [
        moveHeroMove(thrud.id, {
          type: LocationType.CommandZone,
          player: player.id,
          index: cardsInCommandZone.heroes.length + cardsInCommandZone.distinctions.length
        }, player.id),
        JSON.parse(JSON.stringify({...move, target: {...move.target, index: move.target.index! - 1}}))
      ]
    }
  }

  return []
}

export const ensureHeroes = (game: GameState | GameView) => {
  const playerWithYlud = getPlayerWithHero(game, Ylud)
  if (playerWithYlud) {
    playerWithYlud.effects.push({type: EffectType.YLUD})
    delete playerWithYlud.ready
  }
}

export const hasHero = (game: GameState | GameView, playerId: PlayerId, hero: Hero) => {
  const commandZone = getCardsInCommandZone(game, playerId)
  const army = getArmy(game, playerId)
  return [...commandZone.heroes, ...army.heroes].some((h) => Heroes[h.id] === hero)
}

export const getHero = (game: GameState | GameView, playerId: PlayerId, hero: Hero) => {
  return game.heroes.find(
    (c) =>
      (isInCommandZone(c.location) || isInArmy(c.location)) && Heroes[c.id] === hero && c.location.player === playerId
  )
}

export const getPlayerWithHero = (game: GameState | GameView, hero: Hero) => {
  return game.players.find((p) => hasHero(game, p.id, hero))
}
