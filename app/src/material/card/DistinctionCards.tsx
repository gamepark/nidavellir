/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { DistinctionCard } from './DistinctionCard';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { isInCommandZone, isInDistinctionDeck } from '@gamepark/nidavellir/utils/location.utils';
import {
  cardInDistinctionDeckX,
  cardInDistinctionDeckY,
  cardWidth,
  getCardPositionInCommandZoneX,
  getCardPositionInCommandZoneY,
  playerBoardPositions,
} from '../Styles';
import { usePlayerPositions } from '../../table/TableContext';

type DistinctionCardsProps = {
  game: GameView;
};

const DistinctionCards: FC<DistinctionCardsProps> = (props) => {
  const { game } = props;
  const playerPositions = usePlayerPositions();
  return (
    <>
      {game.distinctions.map((c, index) => (
        <DistinctionCard card={c} key={index} css={cardPosition(c, playerPositions)} />
      ))}
    </>
  );
};

const cardPosition = (card: SecretCard, playerPositions: any) => {
  if (isInDistinctionDeck(card.location)) {
    return css`
      transform: translate3d(
        ${cardInDistinctionDeckX(card.location.index)}em,
        ${cardInDistinctionDeckY}em,
        ${(card.location.index + 1) * cardWidth}em
      );
    `;
  }

  if (isInCommandZone(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]];
    return css`
      transform: translate3d(
        ${getCardPositionInCommandZoneX(position)}em,
        ${getCardPositionInCommandZoneY(position, card.location.index!)}em,
        ${(card.location.index + 1) * cardWidth}em
      );
      z-index: ${card.location.index};
    `;
  }

  return css`
    display: none;
  `;
};

export { DistinctionCards };
