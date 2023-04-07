import { FC, useCallback } from 'react'
import { AgeCard } from './AgeCard'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { usePlayerId } from '@gamepark/react-client'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import {
  isInAgeDeck,
  isInArmy,
  isInDiscard,
  isInDistinctionDeck,
  isInPlayerHand,
  isInTavern,
  isSameCardLocation
} from '@gamepark/nidavellir/utils/location.utils'
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard'
import { useLegalMoves } from '../../hook/rules.hook'
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard'
import {
  cardInDistinctionDeckX,
  cardInDistinctionDeckY,
  cardPositionInDiscardX,
  cardPositionInDiscardY,
  cardWidth,
  getCardPositionInAgeDeckX,
  getCardPositionInAgeDeckY,
  getCardPositionInHandX,
  getCardPositionInHandY,
  getCardPositionInTavernX,
  getCardPositionInTavernY,
  getCardPositionOnPlayerBoardTransform,
  getCardPositionOnPlayerBoardX,
  getCardPositionOnPlayerBoardY,
  playerBoardPositions
} from '../Styles'
import { usePlayerPositions } from '../../table/TableContext'
import size from 'lodash/size'
import { useCardDecksSize } from '../../hook/card.hook'
import { PlayerId } from '@gamepark/nidavellir/state/Player'

type AgeCardsProps = {
  game: GameView;
};

const AgeCards: FC<AgeCardsProps> = (props) => {
  const { game } = props
  const playerId = usePlayerId()
  const playerPositions = usePlayerPositions()
  const moves = useLegalMoves<MoveCard>(game, playerId, [MoveType.MoveCard])
  const getCardMoves = useCallback(
    (c: SecretCard) =>
      moves.filter((m) => (c.id !== undefined ? m.id === c.id : isSameCardLocation(m.source!, c.location))),
    [moves]
  )

  const cardDeckSize = useCardDecksSize(game.cards)

  return (
    <>
      { game.cards.map((c, index) => {
        const deckSize: number | Record<PlayerId, number> = cardDeckSize[c.location.type] ?? 0

        if (isInAgeDeck(c.location) && (deckSize as number) - c.location.index >= 10) {
          return null
        }

        return (
          <AgeCard
            card={ c }
            key={ index }
            moves={ getCardMoves(c) }
            transform={ (card, age) => cardPosition(card, deckSize, age, playerPositions) }
          />
        )
      }) }
    </>
  )
}

const cardPosition = (
  card: SecretCard,
  deckSize: number | Record<PlayerId, number>,
  age: number = 1,
  playerPositions: any
) => {
  const playerCount = size(playerPositions)
  if (isInAgeDeck(card.location)) {
    const size = deckSize as number
    return `translate(${ getCardPositionInAgeDeckX(card, size, playerCount) }em, ${ getCardPositionInAgeDeckY(
      card,
      size,
      age
    ) }em)`
  }

  if (isInTavern(card.location)) {
    return `translate3d(
        ${ getCardPositionInTavernX(card.location.index, playerCount) }em,
        ${ getCardPositionInTavernY(card.location.tavern) }em,
        ${ (card.location.index + 1) * cardWidth }em
      )
    `
  }

  if (isInArmy(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]]
    return `translate3d(
          ${ getCardPositionOnPlayerBoardX(position, card.location.column) }em,
          ${ getCardPositionOnPlayerBoardY(position, card.location.index!) }em,
          ${ (card.location.index ?? 0) + 1 }em
        )
        ${ getCardPositionOnPlayerBoardTransform(position) }
    `
  }

  if (isInDiscard(card.location)) {
    return `translate3d(${ cardPositionInDiscardX(card.location.index) }em, ${ cardPositionInDiscardY(
      card.location.index
    ) }em, ${ (card.location.index ?? 0) + 1 }em)`
  }

  if (isInDistinctionDeck(card.location)) {
    return `
      translate3d(${ cardInDistinctionDeckX(card.location.index) }em, ${ cardInDistinctionDeckY }em, ${
      (card.location.index ?? 0) + 1
    }em)
    `
  }

  if (isInPlayerHand(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]]
    return `translate3d(
          ${ getCardPositionInHandX(position, card.location.index ?? 0) }em,
          ${ getCardPositionInHandY(position) }em,
          ${ (card.location.index ?? 0) + 100 }em
        )
        ${ getCardPositionOnPlayerBoardTransform(position) }
    `
  }

  return ''
}

export { AgeCards }
