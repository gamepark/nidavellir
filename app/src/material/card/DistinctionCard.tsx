/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { FC } from 'react';
import { cardHeight, cardInDistinctionDeckX, cardInDistinctionDeckY, cardWidth } from '../Styles';
import { isInDistinctionDeck } from '@gamepark/nidavellir/utils/location.utils';
import Images from '../../images/Images';
import { Distinction } from '@gamepark/nidavellir/cards/Distinction';
import { Animation, useAnimation } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import {
  CrownJeweler,
  Distinctions,
  HuntingMaster,
  KingsGreatArmorer,
  KingsHand,
  PioneerOfTheKingdom,
} from '@gamepark/nidavellir/cards/Distinctions';

type DistinctionCardProps = {
  card: SecretCard;
};

const DistinctionCard: FC<DistinctionCardProps> = (props) => {
  const { card } = props;
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveDistinction && move.id === card.id);
  const detail = Distinctions[card.id!];

  return (
    <div css={[distinctionCard, cardPosition(card), animation && transitionFor(animation)]}>
      {<div css={distinctionCardFace(detail)} />}
      <div css={distinctionCardBack} />
    </div>
  );
};

const transitionFor = (animation: Animation) => css`
  z-index: 100;
  //transition: transform ${animation.duration}s;
  // FIXME: change top / left to transform
  transition: ${animation.duration}s transform, ${animation.duration}s top, ${animation.duration}s left;
`;

const distinctionCard = css`
  position: absolute;
  height: ${cardHeight}em;
  width: ${cardWidth}em;
  border-radius: 2em;
  transform: translateZ(0);

  &:hover {
    z-index: 50;
  }
`;

const distinctionCardFace = (distinction: Distinction) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2em;
  background-image: url(${DistinctionCardFront.get(distinction)!});
  background-size: cover;
  backface-visibility: hidden;
  box-shadow: 0 0 0.3em black;
`;

const distinctionCardBack = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2em;
  background-size: cover;
  //background-image: url(); // TODO: distinction back
  transform: rotateY(180deg);
  backface-visibility: hidden;
  box-shadow: 0 0 0.3em black;
`;

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

const DistinctionCardFront = new Map<Distinction, any>();
DistinctionCardFront.set(KingsHand, Images.KingsHand);
DistinctionCardFront.set(HuntingMaster, Images.HuntingMaster);
DistinctionCardFront.set(CrownJeweler, Images.CrownJeweler);
DistinctionCardFront.set(KingsGreatArmorer, Images.KingsGreatArmorer);
DistinctionCardFront.set(PioneerOfTheKingdom, Images.PioneerOfTheKingdom);

export { DistinctionCard };
