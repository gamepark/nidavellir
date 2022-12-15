/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { FC } from 'react';
import {
  BlacksmithDwarf10Age1,
  BlacksmithDwarf10Age2,
  BlacksmithDwarf1Age1,
  BlacksmithDwarf1Age2,
  BlacksmithDwarf2Age1,
  BlacksmithDwarf2Age2,
  BlacksmithDwarf3Age1,
  BlacksmithDwarf3Age2,
  BlacksmithDwarf4Age1,
  BlacksmithDwarf4Age2,
  BlacksmithDwarf5Age1,
  BlacksmithDwarf5Age2,
  BlacksmithDwarf6Age1,
  BlacksmithDwarf6Age2,
  BlacksmithDwarf7Age1,
  BlacksmithDwarf7Age2,
  BlacksmithDwarf8Age1,
  BlacksmithDwarf8Age2,
  BlacksmithDwarf9Age1,
  BlacksmithDwarf9Age2,
  Cards,
  ExplorerDwarf1Age1,
  ExplorerDwarf1Age2,
  ExplorerDwarf2Age1,
  ExplorerDwarf2Age2,
  ExplorerDwarf3Age1,
  ExplorerDwarf3Age2,
  ExplorerDwarf4Age1,
  ExplorerDwarf4Age2,
  ExplorerDwarf5Age1,
  ExplorerDwarf5Age2,
  ExplorerDwarf6Age1,
  ExplorerDwarf6Age2,
  ExplorerDwarf7Age1,
  ExplorerDwarf7Age2,
  ExplorerDwarf8Age1,
  ExplorerDwarf8Age2,
  HunterDwarf1Age1,
  HunterDwarf1Age2,
  HunterDwarf2Age1,
  HunterDwarf2Age2,
  HunterDwarf3Age1,
  HunterDwarf3Age2,
  HunterDwarf4Age1,
  HunterDwarf4Age2,
  HunterDwarf5Age1,
  HunterDwarf5Age2,
  HunterDwarf6Age1,
  HunterDwarf6Age2,
  HunterDwarf7Age1,
  HunterDwarf7Age2,
  HunterDwarf8Age1,
  HunterDwarf8Age2,
  MinerDwarf1Age1,
  MinerDwarf1Age2,
  MinerDwarf2Age1,
  MinerDwarf2Age2,
  MinerDwarf3Age1,
  MinerDwarf3Age2,
  MinerDwarf4Age1,
  MinerDwarf4Age2,
  MinerDwarf5Age1,
  MinerDwarf5Age2,
  MinerDwarf6Age1,
  MinerDwarf6Age2,
  MinerDwarf7Age1,
  MinerDwarf7Age2,
  MinerDwarf8Age1,
  MinerDwarf8Age2,
  RoyalOffering1Age1,
  RoyalOffering1Age2,
  RoyalOffering2Age1,
  RoyalOffering2Age2,
  RoyalOffering3Age2,
  WarriorDwarf1Age1,
  WarriorDwarf1Age2,
  WarriorDwarf2Age1,
  WarriorDwarf2Age2,
  WarriorDwarf3Age1,
  WarriorDwarf3Age2,
  WarriorDwarf4Age1,
  WarriorDwarf4Age2,
  WarriorDwarf5Age1,
  WarriorDwarf5Age2,
  WarriorDwarf6Age1,
  WarriorDwarf6Age2,
  WarriorDwarf7Age1,
  WarriorDwarf7Age2,
  WarriorDwarf8Age1,
  WarriorDwarf8Age2,
  WarriorDwarf9Age1,
  WarriorDwarf9Age2,
} from '@gamepark/nidavellir/cards/Cards';
import {
  cardHeight,
  cardPositionInDiscardX,
  cardPositionInDiscardY,
  cardWidth,
  getCardPositionInAgeDeckX,
  getCardPositionInAgeDeckY,
  getCardPositionInTavernX,
  getCardPositionInTavernY,
  getCardPositionOnPlayerBoardX,
  getCardPositionOnPlayerBoardY,
  getCardPositionOnPlayerBoardTransform,
  playerBoardPositions,
  shineEffect,
} from '../Styles';
import { Card } from '@gamepark/nidavellir/cards/Card';
import {
  isInAge1Deck,
  isInAgeDeck,
  isInTavern,
  isOnPlayerBoard,
  isSameCardLocation,
} from '@gamepark/nidavellir/utils/location.utils';
import Images from '../../images/Images';
import { Animation, useAnimation, useAnimations, usePlay } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard';
import { usePlayerPositions } from '../../table/TableContext';

type AgeCardProps = {
  card: SecretCard;
  moves: MoveCard[];
};

const getCardAge = (card: SecretCard) => {
  if (card.id !== undefined) {
    return Cards[card.id].age;
  }

  if (isInAgeDeck(card.location)) {
    return isInAge1Deck(card.location) ? 1 : 2;
  }

  return undefined;
};

const isThisCard = (card: SecretCard, move: MoveCard) => {
  if (card.id !== undefined && move.id !== undefined) {
    return card.id === move.id;
  }

  if (move.target) {
    return isSameCardLocation(card.location, move.target);
  }

  return false;
};

const AgeCard: FC<AgeCardProps> = (props) => {
  const { card, moves } = props;
  const play = usePlay();
  const detail = card.id !== undefined ? Cards[card.id] : undefined;
  const age = getCardAge(card);
  const playerPositions = usePlayerPositions();
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveCard && isThisCard(card, move));
  const animations = useAnimations();

  const isSelectable = !animation && !animations.length && moves.length;
  const chooseCard = () => {
    if (!isSelectable) {
      return;
    }

    if (moves?.length === 1) {
      play(moves[0]);
    }
  };

  return (
    <div
      css={[
        ageCard,
        isSelectable && selectable,
        !!detail && cardOnTop,
        cardPosition(card, age, playerPositions, `${!detail ? `rotateY(180deg)` : ''}`),
        animation && transitionFor(animation),
      ]}
      onClick={chooseCard}
    >
      {!!detail && <div css={ageCardFace(detail)} />}
      <div css={ageCardBack(age)} />
    </div>
  );
};

const transitionFor = (animation: Animation) => css`
  z-index: 100;

  // FIXME: change top / left to transform
  transition: ${animation.duration}s transform, ${animation.duration}s top, ${animation.duration}s left;
`;

const selectable = css`
  cursor: pointer;
  ${shineEffect}
`;

const ageCard = css`
  position: absolute;
  height: ${cardHeight}em;
  width: ${cardWidth}em;
  border-radius: 2em;
  transform-style: preserve-3d;
  transform: translateZ(0);
`;

const cardOnTop = css`
  &:hover {
    z-index: 50;
  }
`;

const ageCardFace = (card: Card) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2em;
  background-image: url(${AgeCardFront.get(card)!});
  background-size: cover;
  backface-visibility: hidden;
  box-shadow: 0 0 0.3em black;
`;

const ageCardBack = (age: number = 1) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2em;
  background-size: cover;
  background-image: url(${AgeCardBacks.get(age)!});
  transform: rotateY(180deg);
  backface-visibility: hidden;
  box-shadow: 0 0 0.3em black;
`;

const cardPosition = (
  card: SecretCard,
  age: number = 1,
  playerPositions: any,
  preTransform: string = '',
  _r1: number = Math.random(),
  _r2: number = Math.random()
) => {
  if (isInAgeDeck(card.location)) {
    return css`
      transform: translate(${getCardPositionInAgeDeckX(card)}em, ${getCardPositionInAgeDeckY(card, age)}em)
        ${preTransform};

      > div {
        box-shadow: unset;
      }
    `;
  }

  if (isInTavern(card.location)) {
    return css`
      transform: translate(
        ${getCardPositionInTavernX(card.location.index)}em,
        ${getCardPositionInTavernY(card.location.tavern)}em
      );
    `;
  }

  if (isOnPlayerBoard(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]];
    return css`
      transform: ${preTransform}
        translate(
          ${getCardPositionOnPlayerBoardX(position, Cards[card.id!].type)}em,
          ${getCardPositionOnPlayerBoardY(position, card.location.index!)}em
        )
        ${getCardPositionOnPlayerBoardTransform(position)};
      z-index: ${card.location.index};
    `;
  }

  return css`
    transform: ${preTransform}
      translate(${cardPositionInDiscardX(card.location.index)}em, ${cardPositionInDiscardY(card.location.index)}em);
    z-index: ${card.location.index};
  `;
};

const AgeCardFront = new Map<Card, any>();
AgeCardFront.set(BlacksmithDwarf1Age1, Images.BlacksmithDwarf1Age1);
AgeCardFront.set(BlacksmithDwarf1Age2, Images.BlacksmithDwarf1Age2);
AgeCardFront.set(BlacksmithDwarf2Age1, Images.BlacksmithDwarf2Age1);
AgeCardFront.set(BlacksmithDwarf2Age2, Images.BlacksmithDwarf2Age2);
AgeCardFront.set(BlacksmithDwarf3Age1, Images.BlacksmithDwarf3Age1);
AgeCardFront.set(BlacksmithDwarf3Age2, Images.BlacksmithDwarf3Age2);
AgeCardFront.set(BlacksmithDwarf4Age1, Images.BlacksmithDwarf4Age1);
AgeCardFront.set(BlacksmithDwarf4Age2, Images.BlacksmithDwarf4Age2);
AgeCardFront.set(BlacksmithDwarf5Age1, Images.BlacksmithDwarf5Age1);
AgeCardFront.set(BlacksmithDwarf5Age2, Images.BlacksmithDwarf5Age2);
AgeCardFront.set(BlacksmithDwarf6Age1, Images.BlacksmithDwarf6Age1);
AgeCardFront.set(BlacksmithDwarf6Age2, Images.BlacksmithDwarf6Age2);
AgeCardFront.set(BlacksmithDwarf7Age1, Images.BlacksmithDwarf7Age1);
AgeCardFront.set(BlacksmithDwarf7Age2, Images.BlacksmithDwarf7Age2);
AgeCardFront.set(BlacksmithDwarf8Age1, Images.BlacksmithDwarf8Age1);
AgeCardFront.set(BlacksmithDwarf8Age2, Images.BlacksmithDwarf8Age2);
AgeCardFront.set(BlacksmithDwarf9Age1, Images.BlacksmithDwarf9Age1);
AgeCardFront.set(BlacksmithDwarf9Age2, Images.BlacksmithDwarf9Age2);
AgeCardFront.set(BlacksmithDwarf10Age1, Images.BlacksmithDwarf10Age1);
AgeCardFront.set(BlacksmithDwarf10Age2, Images.BlacksmithDwarf10Age2);
//AgeCardFront.set(BlacksmithDwarfKingsGreatArmorer, Images.BlacksmithDwarfKingsGreatArmorer);
AgeCardFront.set(ExplorerDwarf1Age1, Images.ExplorerDwarf1Age1);
AgeCardFront.set(ExplorerDwarf1Age2, Images.ExplorerDwarf1Age2);
AgeCardFront.set(ExplorerDwarf2Age1, Images.ExplorerDwarf2Age1);
AgeCardFront.set(ExplorerDwarf2Age2, Images.ExplorerDwarf2Age2);
AgeCardFront.set(ExplorerDwarf3Age1, Images.ExplorerDwarf3Age1);
AgeCardFront.set(ExplorerDwarf3Age2, Images.ExplorerDwarf3Age2);
AgeCardFront.set(ExplorerDwarf4Age1, Images.ExplorerDwarf4Age1);
AgeCardFront.set(ExplorerDwarf4Age2, Images.ExplorerDwarf4Age2);
AgeCardFront.set(ExplorerDwarf5Age1, Images.ExplorerDwarf5Age1);
AgeCardFront.set(ExplorerDwarf5Age2, Images.ExplorerDwarf5Age2);
AgeCardFront.set(ExplorerDwarf6Age1, Images.ExplorerDwarf6Age1);
AgeCardFront.set(ExplorerDwarf6Age2, Images.ExplorerDwarf6Age2);
AgeCardFront.set(ExplorerDwarf7Age1, Images.ExplorerDwarf7Age1);
AgeCardFront.set(ExplorerDwarf7Age2, Images.ExplorerDwarf7Age2);
AgeCardFront.set(ExplorerDwarf8Age1, Images.ExplorerDwarf8Age1);
AgeCardFront.set(ExplorerDwarf8Age2, Images.ExplorerDwarf8Age2);
AgeCardFront.set(HunterDwarf1Age1, Images.HunterDwarf1Age1);
AgeCardFront.set(HunterDwarf1Age2, Images.HunterDwarf1Age2);
AgeCardFront.set(HunterDwarf2Age1, Images.HunterDwarf2Age1);
AgeCardFront.set(HunterDwarf2Age2, Images.HunterDwarf2Age2);
AgeCardFront.set(HunterDwarf3Age1, Images.HunterDwarf3Age1);
AgeCardFront.set(HunterDwarf3Age2, Images.HunterDwarf3Age2);
AgeCardFront.set(HunterDwarf4Age1, Images.HunterDwarf4Age1);
AgeCardFront.set(HunterDwarf4Age2, Images.HunterDwarf4Age2);
AgeCardFront.set(HunterDwarf5Age1, Images.HunterDwarf5Age1);
AgeCardFront.set(HunterDwarf5Age2, Images.HunterDwarf5Age2);
AgeCardFront.set(HunterDwarf6Age1, Images.HunterDwarf6Age1);
AgeCardFront.set(HunterDwarf6Age2, Images.HunterDwarf6Age2);
AgeCardFront.set(HunterDwarf7Age1, Images.HunterDwarf7Age1);
AgeCardFront.set(HunterDwarf7Age2, Images.HunterDwarf7Age2);
AgeCardFront.set(HunterDwarf8Age1, Images.HunterDwarf8Age1);
AgeCardFront.set(HunterDwarf8Age2, Images.HunterDwarf8Age2);
AgeCardFront.set(MinerDwarf1Age1, Images.MinerDwarf1Age1);
AgeCardFront.set(MinerDwarf1Age2, Images.MinerDwarf1Age2);
AgeCardFront.set(MinerDwarf2Age1, Images.MinerDwarf2Age1);
AgeCardFront.set(MinerDwarf2Age2, Images.MinerDwarf2Age2);
AgeCardFront.set(MinerDwarf3Age1, Images.MinerDwarf3Age1);
AgeCardFront.set(MinerDwarf3Age2, Images.MinerDwarf3Age2);
AgeCardFront.set(MinerDwarf4Age1, Images.MinerDwarf4Age1);
AgeCardFront.set(MinerDwarf4Age2, Images.MinerDwarf4Age2);
AgeCardFront.set(MinerDwarf5Age1, Images.MinerDwarf5Age1);
AgeCardFront.set(MinerDwarf5Age2, Images.MinerDwarf5Age2);
AgeCardFront.set(MinerDwarf6Age1, Images.MinerDwarf6Age1);
AgeCardFront.set(MinerDwarf6Age2, Images.MinerDwarf6Age2);
AgeCardFront.set(MinerDwarf7Age1, Images.MinerDwarf7Age1);
AgeCardFront.set(MinerDwarf7Age2, Images.MinerDwarf7Age2);
AgeCardFront.set(MinerDwarf8Age1, Images.MinerDwarf8Age1);
AgeCardFront.set(MinerDwarf8Age2, Images.MinerDwarf8Age2);
AgeCardFront.set(RoyalOffering1Age1, Images.RoyalOffering1Age1);
AgeCardFront.set(RoyalOffering1Age2, Images.RoyalOffering1Age2);
AgeCardFront.set(RoyalOffering2Age1, Images.RoyalOffering2Age1);
AgeCardFront.set(RoyalOffering2Age2, Images.RoyalOffering2Age2);
AgeCardFront.set(RoyalOffering3Age2, Images.RoyalOffering3Age2);
AgeCardFront.set(WarriorDwarf1Age1, Images.WarriorDwarf1Age1);
AgeCardFront.set(WarriorDwarf1Age2, Images.WarriorDwarf1Age2);
AgeCardFront.set(WarriorDwarf2Age1, Images.WarriorDwarf2Age1);
AgeCardFront.set(WarriorDwarf2Age2, Images.WarriorDwarf2Age2);
AgeCardFront.set(WarriorDwarf3Age1, Images.WarriorDwarf3Age1);
AgeCardFront.set(WarriorDwarf3Age2, Images.WarriorDwarf3Age2);
AgeCardFront.set(WarriorDwarf4Age1, Images.WarriorDwarf4Age1);
AgeCardFront.set(WarriorDwarf4Age2, Images.WarriorDwarf4Age2);
AgeCardFront.set(WarriorDwarf5Age1, Images.WarriorDwarf5Age1);
AgeCardFront.set(WarriorDwarf5Age2, Images.WarriorDwarf5Age2);
AgeCardFront.set(WarriorDwarf6Age1, Images.WarriorDwarf6Age1);
AgeCardFront.set(WarriorDwarf6Age2, Images.WarriorDwarf6Age2);
AgeCardFront.set(WarriorDwarf7Age1, Images.WarriorDwarf7Age1);
AgeCardFront.set(WarriorDwarf7Age2, Images.WarriorDwarf7Age2);
AgeCardFront.set(WarriorDwarf8Age1, Images.WarriorDwarf8Age1);
AgeCardFront.set(WarriorDwarf8Age2, Images.WarriorDwarf8Age2);
AgeCardFront.set(WarriorDwarf9Age1, Images.WarriorDwarf9Age1);
AgeCardFront.set(WarriorDwarf9Age2, Images.WarriorDwarf9Age2);

const AgeCardBacks = new Map<number, any>();
AgeCardBacks.set(1, Images.Age1Back);
AgeCardBacks.set(2, Images.Age2Back);

export { AgeCard };
