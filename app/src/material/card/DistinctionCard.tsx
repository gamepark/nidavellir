/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, HTMLAttributes } from 'react';
import { cardHeight, cardWidth } from '../Styles';
import Images from '../../images/Images';
import { Distinction } from '@gamepark/nidavellir/cards/Distinction';
import { Animation, useAnimation, usePlay } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import {
  CrownJeweler,
  Distinctions,
  HuntingMaster,
  KingsGreatArmorer,
  KingsHand,
  PioneerOfTheKingdom,
} from '@gamepark/nidavellir/cards/Distinctions';
import { distinctionRulesDialog, setRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog';
import { LocatedCard } from '@gamepark/nidavellir/state/LocatedCard';

type DistinctionCardProps = {
  card: LocatedCard;
  scale?: number;
  getPosition?: (card: LocatedCard, animation?: Animation) => any;
} & HTMLAttributes<HTMLDivElement>;

const DistinctionCard: FC<DistinctionCardProps> = (props) => {
  const { card, scale, getPosition, ...rest } = props;
  const play = usePlay();
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveDistinction && move.id === card.id);
  const detail = Distinctions[card.id!];

  const onDistinctionClick = () => {
    if (!detail) {
      return;
    }

    play(setRulesDialog(distinctionRulesDialog(card)), { local: true });
  };

  return (
    <div
      css={[distinctionCard(scale), animation && transitionFor(animation), getPosition?.(card, animation)]}
      onClick={onDistinctionClick}
      {...rest}
    >
      {<div css={distinctionCardFace(detail)} />}
    </div>
  );
};

const transitionFor = (animation: Animation) => css`
  transition: ${animation.duration}s transform;
`;

const distinctionCard = (scale: number = 1) => css`
  position: absolute;
  height: ${cardHeight * scale}em;
  width: ${cardWidth * scale}em;
  border-radius: 2.5em;
  transform: translateZ(0);
  cursor: pointer;
`;

const distinctionCardFace = (distinction: Distinction) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2.5em;
  background-image: url(${DistinctionCardFront.get(distinction)!});
  background-size: cover;
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
  box-shadow: 0 0 0.3em black;
`;

const DistinctionCardFront = new Map<Distinction, any>();
DistinctionCardFront.set(KingsHand, Images.KingsHand);
DistinctionCardFront.set(HuntingMaster, Images.HuntingMaster);
DistinctionCardFront.set(CrownJeweler, Images.CrownJeweler);
DistinctionCardFront.set(KingsGreatArmorer, Images.KingsGreatArmorer);
DistinctionCardFront.set(PioneerOfTheKingdom, Images.PioneerOfTheKingdom);

export { DistinctionCard };
