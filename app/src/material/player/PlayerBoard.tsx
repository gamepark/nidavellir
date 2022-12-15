/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlayerId } from '@gamepark/nidavellir/state/Player';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { FC } from 'react';
import { cardWidth, playerBoardHeight, playerBoardPositions, playerBoardWidth } from '../Styles';
import Images from '../../images/Images';
import { usePlayerPositions } from '../../table/TableContext';
import { DwarfType } from '@gamepark/nidavellir/cards/Card';
import { BidPlaces } from './BidPlaces';
import { usePlayerId } from '@gamepark/react-client';

type PlayerBoardProps = {
  player: PlayerId;
  index: number;
  game: GameView;
};

const PlayerBoard: FC<PlayerBoardProps> = (props) => {
  const { game, player } = props;
  const playerId = usePlayerId();
  const positions = usePlayerPositions();
  return (
    <>
      <div css={commandZone(positions[player])} />
      <div css={playerBoard(positions[player])}>
        {/*  <span*/}
        {/*    css={css`*/}
        {/*      font-size: 5em;*/}
        {/*      color: black;*/}
        {/*    `}*/}
        {/*  >*/}
        {/*    Player #{player}*/}
        {/*  </span>*/}
        {playerId === player && <BidPlaces game={game} />}
      </div>
      <div css={cardColumn(positions[player], DwarfType.Blacksmith, '#4c2c9f', '#a78aa380')} />
      <div css={cardColumn(positions[player], DwarfType.Hunter, '#277d53', '#99a48780')} />
      <div css={cardColumn(positions[player], DwarfType.Explorer, '#54a9e1', '#92c2d480')} />
      <div css={cardColumn(positions[player], DwarfType.Miner, '#f0782d', '#cfb08e80')} />
      <div css={cardColumn(positions[player], DwarfType.Warrior, '#8f3526', '#ae776980')} />
    </>
  );
};

const columnWidth = cardWidth + 2;

const commandZone = (playerIndex: number) => {
  const position = playerBoardPositions[playerIndex];
  const isRotated = position.rotateZ === 180;
  return css`
    position: absolute;
    height: ${playerBoardHeight - 3}em;
    width: ${columnWidth}em;
    background-color: rgba(128, 128, 128, 0.8);
    border: 0.3em solid black;
    border-radius: 2em;
    ${position.left && `left: ${position.left + (isRotated ? playerBoardWidth : -columnWidth)}em;`}
    ${position.top && `top: ${isRotated ? position.top + 3 : position.top}em;`}
    transform: rotateZ(${position.rotateZ}deg);
  `;
};

const cardColumn = (playerIndex: number, type: DwarfType, color: string, background: string) => {
  const position = playerBoardPositions[playerIndex];
  const isRotated = position.rotateZ === 180;
  return css`
    position: absolute;
    height: ${playerBoardHeight - 3}em;
    width: ${columnWidth}em;
    background-color: ${background};
    border: 0.3em solid ${color};
    border-radius: 2em;
    ${position.left &&
    `left: ${
      position.left +
      (isRotated ? -(columnWidth * type) : playerBoardWidth + columnWidth * (type - 1)) +
      (isRotated ? -0.3 : 0.3) * (type + 1)
    }em;`}
    ${position.top && `top: ${isRotated ? position.top + 3 : position.top}em;`}
    transform: rotateZ(${position.rotateZ}deg);
  `;
};

const playerBoard = (index: number) => css`
  position: absolute;
  height: ${playerBoardHeight}em;
  width: ${playerBoardWidth}em;
  background-image: url(${Images.PlayerBoard});
  background-size: cover;
  filter: drop-shadow(0.3em 0.3em 0.6em black);
  ${playerBoardPositions[index].left && `left: ${playerBoardPositions[index].left}em;`}
  ${playerBoardPositions[index].top && `top: ${playerBoardPositions[index].top}em;`}
  transform: rotateZ(${playerBoardPositions[index].rotateZ}deg) translateZ(0);
`;

export { PlayerBoard };
