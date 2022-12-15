/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Coin } from '@gamepark/nidavellir/coins/Coin';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { InAgeDeck } from '@gamepark/nidavellir/state/LocatedCard';
import { DragLayerMonitor } from 'react-dnd';
import { View } from './View';
import { DwarfType, RoyalOffering } from '@gamepark/nidavellir/cards/Card';
import { HeroType } from '@gamepark/nidavellir/cards/Hero';

export const coinTokenRatio = 1;
export const coinTokenHeight = 14.4;
export const coinTokenWidth = coinTokenHeight / coinTokenRatio;

export const playerBoardRatio = 950 / 504;
export const playerBoardHeight = 71;
export const playerBoardWidth = playerBoardHeight / playerBoardRatio;
export const headerHeight = 7;
type Positions = {
  left: number;
  top: number;
  rotateZ: number;
  viewPosition: {
    left: number;
    top: number;
    transform?: string;
  };
};

/**
 * Zone 1 2 3
 *     transform: scale(1) rotateZ(180deg);
 *     top: calc(100% + 21em); => 100% + 7 * (1 / 0.33) (0.33 : initial scale)
 *     left: calc(300% - 355em); => 355 = 370 (second player right) = 25 < cards width
 */

/**
 * Zone 0 4:
 *
 *     top: -220em + 21em; => 220 => playerPosition 0 top + 7 + (1/0.33
 *     si premier: left: 0, si dernier right : 0
 *
 */

export const GRID_SIZE = 3.5;
export const cardRatio = 54 / 80;
export const cardWidth = 21;
export const cardHeight = cardWidth / cardRatio;
export const playerBoardColumnWidth = cardWidth + 2;
export const playerBoardColumnHeight = playerBoardHeight - 3;

export const playerBoardPositions: Positions[] = [
  {
    left: 50,
    top: 240,
    rotateZ: 0,
    viewPosition: {
      left: -33.5,
      top: -224.5,
      transform: 'scale(0.95)',
    },
  },
  {
    left: 144,
    top: 12,
    rotateZ: 180,
    viewPosition: {
      left: -404.5,
      top: -228,
      transform: 'rotateZ(180deg) scale(0.95)',
    },
  },
  {
    left: 342,
    top: 12,
    rotateZ: 180,
    viewPosition: {
      left: -216.5,
      top: -228,
      transform: 'rotateZ(180deg) scale(0.95)',
    },
  },
  {
    left: 540,
    top: 12,
    rotateZ: 180,
    viewPosition: {
      left: -28.5,
      top: -228,
      transform: 'rotateZ(180deg) scale(0.95)',
    },
  },
  {
    left: 445,
    top: 240,
    rotateZ: 0,
    viewPosition: {
      left: -408.8,
      top: -225,
      transform: 'scale(0.95)',
    },
  },
];

export const treasureLeft = 65;
export const treasureTop = 120;

export const age1DeckTop = 127;
export const age2DeckTop = age1DeckTop + cardHeight + 10;
export const ageDeckLeft = 197;

export const tavernRatio = 1;
export const tavernWidth = 38;
export const tavernHeight = tavernWidth / tavernRatio;

export const tavernLeft = 225;
export const tavernTop = (tavern: number) => 105 + tavern * (tavernHeight + 1) + (tavern === 2 ? 1 : 0);

export const getCardPositionInTavernY = (tavern: number) => 108 + tavern * (tavernHeight + 1);
export const getCardPositionInTavernX = (index: number) => tavernLeft + tavernWidth + 5 + index * 27;

export const coinPositionInDiscardX = 35;
export const coinPositionInDiscardY = (index: number) => 120 + index * 2;
export const getCoinPositionInHandY = (position: any) => {
  return position.rotateZ === 180 ? (position.top ?? 0) - coinTokenHeight : (position.top ?? 0) + playerBoardHeight;
};

export const getCoinPositionInHandX = (coinIndex: number, position: any) => {
  return position.rotateZ === 180
    ? (position.left ?? 0) - coinTokenWidth - 4 - coinIndex * (coinTokenWidth + 3)
    : (position.left ?? 0) + playerBoardWidth + 4 + coinIndex * (coinTokenWidth + 3);
};

export const getCoinPositionInHandRotate = (position: any) => {
  return `${position.rotateZ === 180 ? 'rotateZ(180deg)' : ''}`;
};

export const getCoinPositionInTreasureY = (token: Coin) => {
  return (
    treasureTop +
    Math.floor((token.value - 5) / 5) * (coinTokenHeight + 3) +
    (((token.value - 5) % 5) % 2 === 1 ? coinTokenHeight / 2 : 0)
  );
};

export const getCoinPositionInTreasureX = (token: Coin, index?: number) => {
  return treasureLeft + (((token.value === 25 ? 27 : token.value) - 5) % 5) * (coinTokenWidth + 3) + (index ?? 0);
};

export const getCoinPositionOnPlayerBoardX = (position: any, index: number) => {
  switch (index) {
    case 0:
      return position.rotateZ === 180 ? (position.left ?? 0) + playerBoardWidth - 21.8 : (position.left ?? 0) + 7.4;
    case 1:
      return position.rotateZ === 180 ? (position.left ?? 0) + playerBoardWidth - 19.2 : (position.left ?? 0) + 4.9;
    case 2:
      return position.rotateZ === 180 ? (position.left ?? 0) + playerBoardWidth - 15.2 : (position.left ?? 0) + 0.8;
    case 3:
      return position.rotateZ === 180 ? (position.left ?? 0) + playerBoardWidth - 10.7 : (position.left ?? 0) - 3.8;
    case 4:
      return position.rotateZ === 180 ? (position.left ?? 0) + playerBoardWidth - 25.6 : (position.left ?? 0) + 11.2;
  }
};

export const getCoinPositionOnPlayerBoardY = (position: any, index: number) => {
  switch (index) {
    case 0:
      return position.rotateZ === 180 ? (position.top ?? 0) + 50.8 : (position.top ?? 0) + 5.8;
    case 1:
      return position.rotateZ === 180 ? (position.top ?? 0) + 34 : (position.top ?? 0) + 22.4;
    case 2:
      return position.rotateZ === 180 ? (position.top ?? 0) + 18 : (position.top ?? 0) + 38.8;
    case 3:
      return position.rotateZ === 180 ? (position.top ?? 0) - 4.7 : (position.top ?? 0) + 61.2;
    case 4:
      return position.rotateZ === 180 ? (position.top ?? 0) - 10.8 : (position.top ?? 0) + 67.5;
  }
};

export const getCardPositionOnPlayerBoardX = (position: any, dwarf: DwarfType | RoyalOffering | HeroType) => {
  if (dwarf === HeroType.Neutral) {
    return position.rotateZ === 180
      ? (position.left ?? 0) + playerBoardWidth + 1.3
      : (position.left ?? 0) - (cardWidth + 1);
  }
  return position.rotateZ === 180
    ? (position.left ?? 0) - (cardWidth + 2) * dwarf - 0.3 * (dwarf + 1) + 1
    : (position.left ?? 0) + playerBoardWidth + (cardWidth + 2) * (dwarf - 1) + 0.3 * (dwarf + 1) + 1;
};

const gradeHeight = 5;
export const getCardPositionOnPlayerBoardY = (position: any, index: number) => {
  return position.rotateZ === 180
    ? (position.top ?? 0) + playerBoardColumnHeight - cardHeight - index * gradeHeight + 2
    : (position.top ?? 0) + index * gradeHeight + 1;
};

export const getCardPositionOnPlayerBoardTransform = (position: any) => {
  return position.rotateZ === 180 ? 'rotateZ(180deg)' : '';
};
export const getCoinPositionOnPlayerBoardRotation = (position: any) => {
  return position.rotateZ === 180 ? `rotateZ(180deg)` : '';
};

export const cardPositionInDiscardX = (index: number) => 164 + index * 0.1;
export const cardPositionInDiscardY = (index: number) => 120 + index * 0.15;

export const getCardPositionInAgeDeckY = (_card: SecretCard, age: number = 1) => {
  const location = _card.location as InAgeDeck;
  return (age === 1 ? age1DeckTop : age2DeckTop) + 0.1 * location.index;
};

export const getCardPositionInAgeDeckX = (card: SecretCard) => {
  const location = card.location as InAgeDeck;
  return ageDeckLeft + 0.1 * location.index;
};

export const heroDeckTop = 108;
export const heroDeckLeft = 422;
const heroCardPerLine = 7;
export const getCardPositionInHeroDeckTop = (index: number) =>
  heroDeckTop + Math.floor(index / heroCardPerLine) * (cardHeight + 8);
export const getCardPositionInHeroDeckLeft = (index: number) =>
  heroDeckLeft + (index % heroCardPerLine) * (cardWidth + 5);

export const slideKeyframes = keyframes`
  0%, 60% {
    transform: translate(-33%, 33%);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translate(33%, -33%);
    opacity: 0;
  }
`;

export const shineEffect = css`
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    pointer-events: none;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    animation: ${slideKeyframes} 2.5s infinite;
    z-index: 1;
    transform-style: preserve-3d;
    background: linear-gradient(
      to top right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    );
  }
`;

export const getCoinBidPosition = (index: number) => {
  switch (index) {
    case 0:
      return {
        left: 7.4,
        top: 6,
      };
    case 1:
      return {
        left: 4.9,
        top: 22.6,
      };
    case 2:
      return {
        left: 0.7,
        top: 38.9,
      };
    case 3:
      return {
        top: 61.2,
        left: -3.8,
      };
    case 4:
      return {
        left: 11.3,
        top: 67.5,
      };
  }

  return;
};

export const viewProjection = (monitor: DragLayerMonitor, view: View) => {
  const offset = monitor.getDifferenceFromInitialOffset();
  if (!offset) return null;

  const x = offset.x * view.scale;
  const y = offset.y * view.scale;

  return { x, y };
};
