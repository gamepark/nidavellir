/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Coin } from '@gamepark/nidavellir/coins/Coin';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { InAgeDeck } from '@gamepark/nidavellir/state/LocatedCard';
import { DragLayerMonitor } from 'react-dnd';
import { View } from './View';
import { DwarfType, RoyalOffering } from '@gamepark/nidavellir/cards/Card';
import { HeroType } from '@gamepark/nidavellir/cards/Hero';

/**
 * Dwarf colors
 */

export const BLACKSMITH_COLOR = '#504fa1';
export const HUNTER_COLOR = '#1b986c';
export const EXPLORER_COLOR = '#50b7e8';
export const WARRIOR_COLOR = '#bb4237';
export const MINER_COLOR = '#f79447';

export const gameWidth = 185;
export const gameHeight = 100;
export const navigationWidth = 7;
export const playerPanelsWidth = 38;
export const playerPanelsHeight = 93;
export const playerPanelHeight = 17;
export const playerPanelScoreWidth = 8.5;

export const BASE_SCALE = 0.24;

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

export const GRID_SIZE = 3.5;
export const cardRatio = 54 / 80;
export const cardWidth = 21;
export const cardHeight = cardWidth / cardRatio;
export const playerBoardColumnWidth = cardWidth + 2;
export const playerBoardColumnHeight = playerBoardHeight + 20;

export const playerBoardPositions: Positions[] = [
  {
    left: 29,
    top: 295,
    rotateZ: 0,
    viewPosition: {
      left: -67.5,
      top: -261,
    },
  },
  {
    left: 29,
    top: 12,
    rotateZ: 0,
    viewPosition: {
      left: -67.5,
      top: -40,
    },
  },
  {
    left: 226,
    top: 12,
    rotateZ: 0,
    viewPosition: {
      left: -221.5,
      top: -40,
    },
  },
  {
    left: 424,
    top: 12,
    rotateZ: 0,
    viewPosition: {
      left: -376,
      top: -40,
    },
  },
  {
    left: 424,
    top: 295,
    rotateZ: 0,
    viewPosition: {
      left: -376,
      top: -261,
    },
  },
];

export const treasureLeft = 14;
export const treasureTop = 200;

export const age1DeckTop = 160;
export const age2DeckTop = age1DeckTop + cardHeight + 10;
export const ageDeckLeft = 176;

export const tavernRatio = 1;
export const tavernWidth = 38;
export const tavernHeight = tavernWidth / tavernRatio;

export const tavernLeft = 209;
export const tavernTop = (tavern: number) => 140 + tavern * (tavernHeight + 1) + (tavern === 2 ? 1 : 0);

export const getCardPositionInTavernY = (tavern: number) => 143 + tavern * (tavernHeight + 1);
export const getCardPositionInTavernX = (index: number) => tavernLeft + tavernWidth + 5 + index * (cardWidth + 3);

export const coinPositionInDiscardX = (index: number) => 147 + index * 0.1;
export const coinPositionInDiscardY = (index: number) => 235 + index * 0.1;
export const getCoinPositionInHandY = (position: any) => {
  return position.rotateZ === 180 ? (position.top ?? 0) - coinTokenHeight : (position.top ?? 0) + playerBoardHeight;
};

export const getCoinPositionInHandX = (coinIndex: number, position: any) => {
  return position.rotateZ === 180
    ? (position.left ?? 0) - coinTokenWidth - 4 - coinIndex * (coinTokenWidth + 3)
    : (position.left ?? 0) + playerBoardWidth + 5.5 + coinIndex * (coinTokenWidth + 8.7);
};

export const getCoinPositionInHandRotate = (position: any) => {
  return `${position.rotateZ === 180 ? 'rotateZ(180deg)' : ''}`;
};

export const getCoinPositionInTreasureY = (token: Coin, _z: number) => {
  return treasureTop + Math.floor((token.value - 5) / 7) * (coinTokenHeight + 3);
};

export const getCoinPositionInTreasureX = (token: Coin, z: number, index?: number) => {
  console.log(token.value, index ?? 0, z);
  return treasureLeft + ((token.value - 5) % 7) * (coinTokenWidth + 3) + (index ?? 0) + z * 1.5;
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

const gradeHeight = 4.7;
export const columnWidth = cardWidth + 2;
export const playerBoardColumnTop = (position: any) =>
  position.rotateZ === 180 ? position.top + (playerBoardHeight - playerBoardColumnHeight) : position.top;

export const playerBoardColumnLeft = (position: any, type: DwarfType | HeroType) =>
  position.left +
  (position.rotateZ === 180 ? -(columnWidth * type) : playerBoardWidth + columnWidth * (type - 1)) +
  (position.rotateZ === 180 ? -0.3 : 0.3) * (type + 1);

export const getCardPositionOnPlayerBoardY = (position: any, index: number) => {
  return position.rotateZ === 180
    ? playerBoardColumnTop(position) + playerBoardColumnHeight - cardHeight - index * gradeHeight - 1
    : (position.top ?? 0) + index * gradeHeight + 1;
};

export const getCardPositionOnPlayerBoardTransform = (position: any) => {
  return position.rotateZ === 180 ? 'rotateZ(180deg)' : '';
};
export const getCoinPositionOnPlayerBoardRotation = (position: any) => {
  return position.rotateZ === 180 ? `rotateZ(180deg)` : '';
};

export const cardPositionInDiscardX = (index: number) => 143 + index * 0.1;
export const cardPositionInDiscardY = (index: number) => 196 + index * 0.15;

export const getCardPositionInAgeDeckY = (_card: SecretCard, age: number = 1) => {
  const location = _card.location as InAgeDeck;
  return (age === 1 ? age1DeckTop : age2DeckTop) + 0.1 * location.index;
};

export const getCardPositionInAgeDeckX = (card: SecretCard) => {
  const location = card.location as InAgeDeck;
  return ageDeckLeft + 0.1 * location.index;
};

export const cardInDistinctionDeckX = (index: number) => {
  return 29 + (index ?? 0) * (cardWidth + 3);
};

export const cardInDistinctionDeckY = 155;

export const heroDeckTop = 143;
export const heroDeckLeft = 404;
const heroCardPerLine = 7;
export const getCardPositionInHeroDeckTop = (index: number) =>
  heroDeckTop + Math.floor(index / heroCardPerLine) * (cardHeight + 8);
export const getCardPositionInHeroDeckLeft = (index: number) =>
  heroDeckLeft + (index % heroCardPerLine) * (cardWidth + 4);

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

export const gemRatio = 300 / 453;
export const gemTokenHeight = 27;
export const gemTokenWidth = gemTokenHeight * gemRatio;

export const getGemTokenOnPlayerBoardX = (position: any) => {
  return position.rotateZ === 180 ? position.left + 13.5 : position.left + 6;
};

export const getGemTokenOnPlayerBoardY = (position: any) => {
  return position.rotateZ === 180 ? position.top + playerBoardHeight - 2.5 : position.top - gemTokenHeight + 2.5;
};

export const getGemTokenOnPlayerBoardRotate = (position: any) => {
  return position.rotateZ === 180 ? 0 : 180;
};

export const greyBackground = '#E9E3D8';
export const dialogCss = css`
  position: relative;
  padding: 2em;
  color: black;
  background-color: ${greyBackground};
  border-radius: 2em;
  text-align: center;

  h2 {
    margin: 0.2em 5em;
    font-size: 4em;
    text-align: center;
  }

  p {
    font-size: 3.5em;
  }
`;

export const largeDialogCss = css`
  ${dialogCss};
  width: 150em;
`;

export const dialogCloseIcon = css`
  position: absolute;
  right: 0.8em;
  top: 0.6em;
  font-size: 4em;
  cursor: pointer;
  z-index: 100;
`;
