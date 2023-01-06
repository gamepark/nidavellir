import { FC, useCallback } from 'react';
import { AgeCard } from './AgeCard';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlayerId } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import {
  isInAgeDeck,
  isInDiscard,
  isInTavern,
  isOnPlayerBoardCard,
  isSameCardLocation,
} from '@gamepark/nidavellir/utils/location.utils';
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard';
import { useLegalMoves } from '../../hook/rules.hook';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import {
  cardPositionInDiscardX,
  cardPositionInDiscardY,
  getCardPositionInAgeDeckX,
  getCardPositionInAgeDeckY,
  getCardPositionInTavernX,
  getCardPositionInTavernY,
  getCardPositionOnPlayerBoardTransform,
  getCardPositionOnPlayerBoardX,
  getCardPositionOnPlayerBoardY,
  playerBoardPositions,
} from '../Styles';
import { usePlayerPositions } from '../../table/TableContext';

type AgeCardsProps = {
  game: GameView;
};

const AgeCards: FC<AgeCardsProps> = (props) => {
  const { game } = props;
  const playerId = usePlayerId();
  const playerPositions = usePlayerPositions();
  const moves = useLegalMoves<MoveCard>(game, playerId, [MoveType.MoveCard]);
  const getCardMoves = useCallback(
    (c: SecretCard) =>
      moves.filter((m) => (c.id !== undefined ? m.id === c.id : isSameCardLocation(m.source!, c.location))),
    [moves]
  );

  return (
    <>
      {game.cards.map((c, index) => (
        <AgeCard
          card={c}
          key={index}
          moves={getCardMoves(c)}
          transform={(card, age) => cardPosition(card, age, playerPositions)}
        />
      ))}
    </>
  );
};

// TODO: pass position function to props
const cardPosition = (card: SecretCard, age: number = 1, playerPositions: any) => {
  if (isInAgeDeck(card.location)) {
    return `translate(${getCardPositionInAgeDeckX(card)}em, ${getCardPositionInAgeDeckY(card, age)}em)`;
  }

  if (isInTavern(card.location)) {
    return `translate(
        ${getCardPositionInTavernX(card.location.index)}em,
        ${getCardPositionInTavernY(card.location.tavern)}em
      )
    `;
  }

  if (isOnPlayerBoardCard(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]];
    return `translate(
          ${getCardPositionOnPlayerBoardX(position, card.location.column)}em,
          ${getCardPositionOnPlayerBoardY(position, card.location.index!)}em
        )
        ${getCardPositionOnPlayerBoardTransform(position)}
    `;
  }

  if (isInDiscard(card.location)) {
    return `translate(${cardPositionInDiscardX(card.location.index)}em, ${cardPositionInDiscardY(
      card.location.index
    )}em)`;
  }

  return '';
};

export { AgeCards };
