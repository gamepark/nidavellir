/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { DistinctionCard } from './DistinctionCard';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { isInDistinctionDeck } from '@gamepark/nidavellir/utils/location.utils';
import { cardInDistinctionDeckX, cardInDistinctionDeckY } from '../Styles';

type DistinctionCardsProps = {
  game: GameView;
};

const DistinctionCards: FC<DistinctionCardsProps> = (props) => {
  const { game } = props;
  return (
    <>
      {game.distinctions.map((c, index) => (
        <DistinctionCard card={c} key={index} css={cardPosition(c)} />
      ))}
    </>
  );
};

const cardPosition = (card: SecretCard) => {
  if (isInDistinctionDeck(card.location)) {
    return css`
      transform: translate(${cardInDistinctionDeckX(card.location.index)}em, ${cardInDistinctionDeckY}em);
    `;
  }

  return css`
    display: none;
  `;
};

export { DistinctionCards };
