import GameState from '../state/GameState'
import GameView from '../state/view/GameView'
import { isInCommandZone, isInDiscard, isSameCardLocation } from './location.utils'
import { Player, PlayerId } from '../state/Player'
import { DwarfType, RoyalOffering } from '../cards/Card'
import { getNextIndexByType } from './player.utils'
import { Cards } from '../cards/Cards'
import { MoveCard, moveCardAndRevealMove } from '../moves/MoveCard'
import { LocationType } from '../state/Location'
import { applyThrud, mayRecruitNewHeroes } from './hero.utils'
import { SecretCard } from '../state/view/SecretCard'
import { MoveHero } from '../moves/MoveHero'
import MoveView from '../moves/MoveView'
import Move from '../moves/Move'
import { Heroes, Thrud } from '../cards/Heroes'

export const getCardsInCommandZone = (game: GameState | GameView, playerId: PlayerId) => {
  const heroes = game.heroes.filter((c) => isInCommandZone(c.location) && c.location.player === playerId)
  const distinctions = game.distinctions.filter((c) => isInCommandZone(c.location) && c.location.player === playerId)

  return {
    heroes,
    distinctions
  }
}

export const getNextCardIndexInDiscard = (game: GameState | GameView) => {
  return game.cards.filter((c) => isInDiscard(c.location)).length
}

export const getChooseCardMove = (game: GameState | GameView, player: Player, cardId: number) => {
  const nextIndexesByType = getNextIndexByType(game, player.id)
  const card = Cards[cardId]
  if (card.type === RoyalOffering.RoyalOffering) {
    return moveCardAndRevealMove(cardId, {
      type: LocationType.Discard,
      index: getNextCardIndexInDiscard(game)
    }, player.id)
  }

  return moveCardAndRevealMove(cardId, {
    type: LocationType.Army,
    player: player.id,
    index: nextIndexesByType[card.type].nextIndex,
    column: card.type
  }, player.id)
}

export const onChooseCard = (
  game: GameState | GameView,
  player: Player,
  move: (MoveCard | MoveHero),
  origin: 'age' | 'heroes',
  unshit?: boolean,
  computeHeroes: boolean = true
): (Move | MoveView)[] => {
  player.playedCard = {
    id: move.id!,
    deck: origin
  }

  if (origin !== 'heroes' || Heroes[move.id!] !== Thrud) {
    const thrudMoves = applyThrud(game, player, move)
    if (thrudMoves.length) {
      return thrudMoves
    }
  }

  if (computeHeroes) {
    mayRecruitNewHeroes(game, player, unshit)
  }

  return []
}

export const isThisCard = (card: SecretCard, move: MoveCard) => {
  if (card.id !== undefined && move.id !== undefined) {
    return card.id === move.id
  }

  if (move.target) {
    return isSameCardLocation(card.location, move.target)
  }

  return false
}

export const DWARF_COLUMNS = [
  DwarfType.Blacksmith,
  DwarfType.Hunter,
  DwarfType.Explorer,
  DwarfType.Miner,
  DwarfType.Warrior
]
