/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  columnWidth,
  playerBoardColumnHeight,
  playerBoardColumnTop,
  playerBoardPositions,
  playerBoardWidth,
  shineEffect,
} from '../Styles';
import { FC } from 'react';
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero';
import { usePlay, usePlayerId } from '@gamepark/react-client';
import { DraggableHero, DraggableMaterial } from '../../draggable/DraggableMaterial';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { useDrop } from 'react-dnd';
import { useLegalMoves } from '../../hook/rules.hook';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { LocationType } from '@gamepark/nidavellir/state/Location';

type CommandZoneProps = {
  position: any;
  game: GameView;
};

const CommandZone: FC<CommandZoneProps> = (props) => {
  const { position, game } = props;
  const play = usePlay();
  const playerId = usePlayerId();
  const moves = useLegalMoves<MoveHero>(
    game,
    playerId,
    [MoveType.MoveHero],
    (c) => c.target.type === LocationType.CommandZone
  );

  const drop = (item: DraggableHero) => moves.find((m) => m.type === MoveType.MoveHero && m.id === item.id)!;

  const canDrop = (item: DraggableHero) => !!drop(item);

  const [{ isOver }, ref] = useDrop({
    accept: [DraggableMaterial.Hero],
    canDrop,
    drop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isDragging: monitor.getItemType() === DraggableMaterial.Hero && canDrop(monitor.getItem()),
    }),
  });

  const isSelectable = moves.length === 1;
  const onClick = () => {
    if (isSelectable) {
      play(moves[0]);
    }
  };

  return (
    <div ref={ref} css={[commandZone(position), isSelectable && selectable, isOver && overPlace]} onClick={onClick} />
  );
};

const overPlace = css`
  background-color: rgba(255, 255, 255, 1);
`;

const selectable = css`
  cursor: pointer;
  ${shineEffect};

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const commandZone = (playerIndex: number) => {
  const position = playerBoardPositions[playerIndex];
  const isRotated = position.rotateZ === 180;
  return css`
    position: absolute;
    height: ${playerBoardColumnHeight}em;
    width: ${columnWidth}em;
    background-color: rgba(128, 128, 128, 0.8);
    border: 0.3em solid black;
    border-radius: 2em;
    ${position.left && `left: ${position.left + (isRotated ? playerBoardWidth : -columnWidth)}em;`}
    ${position.top && `top: ${playerBoardColumnTop(position)}em;`}
    transform: rotateZ(${position.rotateZ}deg);
  `;
};

export { CommandZone };
