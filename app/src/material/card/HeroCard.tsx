/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { FC } from 'react';
import {
  cardHeight,
  cardWidth,
  getCardPositionInHeroDeckLeft,
  getCardPositionInHeroDeckTop,
  getCardPositionInTavernX,
  getCardPositionInTavernY,
  getCardPositionOnPlayerBoardTransform,
  getCardPositionOnPlayerBoardX,
  getCardPositionOnPlayerBoardY,
  playerBoardPositions,
  shineEffect,
} from '../Styles';
import { isInHeroDeck, isInTavern, isOnPlayerBoardCard } from '@gamepark/nidavellir/utils/location.utils';
import Images from '../../images/Images';
import {
  Aegur,
  Aral,
  Astrid,
  Bonfur,
  Dagda,
  DwergAesir,
  DwergBergelmir,
  DwergJungir,
  DwergSigmir,
  DwergYmir,
  Grid,
  Heroes,
  Hourya,
  Idunn,
  Kraal,
  Lokdur,
  Skaa,
  Tarah,
  Thrud,
  Uline,
  Ylud,
  Zoral,
} from '@gamepark/nidavellir/cards/Heroes';
import { Hero } from '@gamepark/nidavellir/cards/Hero';
import { Animation, useAnimation, useAnimations, usePlay } from '@gamepark/react-client';
import { usePlayerPositions } from '../../table/TableContext';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero';
import Move from '@gamepark/nidavellir/moves/Move';
import { draggableHero, DraggableMaterial } from '../../draggable/DraggableMaterial';
import { Draggable } from '@gamepark/react-components';
import { LocatedCard } from '@gamepark/nidavellir/state/LocatedCard';
import { useProjection } from '../View';

type HeroCardProps = {
  card: LocatedCard;
  moves: MoveHero[];
};

const HeroCard: FC<HeroCardProps> = (props) => {
  const { card, moves } = props;
  const play = usePlay();
  const playerPositions = usePlayerPositions();
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveHero && move.id === card.id);
  const animations = useAnimations();
  const item = draggableHero(card.id);
  const projection = useProjection();

  const onDrop = (move: Move) => {
    if (move) {
      play(move);
    }
  };

  const chooseHero = () => {
    if (!isSelectable) {
      return;
    }

    if (moves?.length === 1) {
      play(moves[0]);
    }
  };

  const detail = Heroes[card.id!];

  const isSelectable = !animation && !animations.length && !!moves.length;
  return (
    <Draggable
      canDrag={isSelectable}
      type={DraggableMaterial.Hero}
      item={item}
      projection={projection}
      drop={onDrop}
      preTransform={cardPosition(card, playerPositions)}
      css={[heroCard, cardZIndex(card), isSelectable && selectable, animation && transitionFor(animation)]}
      onClick={chooseHero}
    >
      {<div css={heroCardFace(detail)} />}
      <div css={heroCardBack} />
    </Draggable>
  );
};

const transitionFor = (animation: Animation) => css`
  z-index: 100;
  transition: ${animation.duration}s transform;
`;

const selectable = css`
  cursor: pointer;
  ${shineEffect}
`;

const heroCard = css`
  position: absolute;
  height: ${cardHeight}em;
  width: ${cardWidth}em;
  border-radius: 2em;

  &:hover {
    z-index: 50;
  }
`;

const heroCardFace = (hero: Hero) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2em;
  background-image: url(${HeroCardFront.get(hero)!});
  background-size: cover;
  backface-visibility: hidden;
  box-shadow: 0 0 0.7em -0.2em black;
`;

const heroCardBack = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2em;
  background-size: cover;
  //background-image: url(); // TODO: hero back
  transform: rotateY(180deg);
`;

const cardPosition = (card: SecretCard, playerPositions: any) => {
  if (isInHeroDeck(card.location)) {
    return `translate(${getCardPositionInHeroDeckLeft(card.location.index)}em, ${getCardPositionInHeroDeckTop(
      card.location.index
    )}em)
    `;
  }

  if (isInTavern(card.location)) {
    return `translate(${getCardPositionInTavernX(card.location.index)}em, ${getCardPositionInTavernY(
      card.location.tavern
    )}em)`;
  }

  if (isOnPlayerBoardCard(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]];
    return `translate(${getCardPositionOnPlayerBoardX(
      position,
      Heroes[card.id!].type
    )}em, ${getCardPositionOnPlayerBoardY(position, card.location.index!)}em) ${getCardPositionOnPlayerBoardTransform(
      position
    )}
    `;
  }

  return '';
};

const cardZIndex = (card: LocatedCard) => {
  if (isOnPlayerBoardCard(card.location)) {
    return css`
      z-index: ${card.location.index};
    `;
  }

  return undefined;
};

const HeroCardFront = new Map<Hero, any>();
HeroCardFront.set(Aegur, Images.Aegur);
HeroCardFront.set(Aral, Images.Aral);
HeroCardFront.set(Astrid, Images.Astrid);
HeroCardFront.set(Bonfur, Images.Bonfur);
HeroCardFront.set(Dagda, Images.Dagda);
HeroCardFront.set(DwergAesir, Images.DwergAesir);
HeroCardFront.set(DwergBergelmir, Images.DwergBergelmir);
HeroCardFront.set(DwergJungir, Images.DwergJungir);
HeroCardFront.set(DwergSigmir, Images.DwergSigmir);
HeroCardFront.set(DwergYmir, Images.DwergYmir);
HeroCardFront.set(Grid, Images.Grid);
HeroCardFront.set(Hourya, Images.Hourya);
HeroCardFront.set(Idunn, Images.Idunn);
HeroCardFront.set(Kraal, Images.Kraal);
HeroCardFront.set(Lokdur, Images.Lokdur);
HeroCardFront.set(Skaa, Images.Skaa);
HeroCardFront.set(Tarah, Images.Tarah);
HeroCardFront.set(Thrud, Images.Thrud);
HeroCardFront.set(Uline, Images.Uline);
HeroCardFront.set(Ylud, Images.Ylud);
HeroCardFront.set(Zoral, Images.Zoral);

export { HeroCard };