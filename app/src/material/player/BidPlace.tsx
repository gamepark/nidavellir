/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { coinTokenHeight, coinTokenWidth, getCoinBidPosition } from '../Styles';
import { useDrop } from 'react-dnd';
import { DraggableCoin, DraggableMaterial } from '../../draggable/DraggableMaterial';
import { MoveCoin, moveKnownCoinMove } from '@gamepark/nidavellir/moves/MoveCoin';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { usePlayerId } from '@gamepark/react-client';

type BidPlaceProps = {
  index: number;
  moves: MoveCoin[];
};

const BidPlace: FC<BidPlaceProps> = (props) => {
  const { index, moves } = props;
  const playerId = usePlayerId();

  const canDrop = (item: DraggableCoin) => !!moves.find((m) => m.id === item.id);
  const [{ isOver, isDragging }, ref] = useDrop({
    accept: DraggableMaterial.Coin,
    canDrop: (item: DraggableCoin) => {
      //console.log(moves, item);
      return !!moves.find((m) => m.id === item.id);
    },
    drop: (item: DraggableCoin) =>
      moveKnownCoinMove(item.id, {
        type: LocationType.PlayerBoard,
        player: playerId,
        index,
      }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isDragging: monitor.getItemType() === DraggableMaterial.Coin && canDrop(monitor.getItem()),
    }),
  });

  return <div ref={ref} css={[bidPlace(index), isDragging && highlightPlace, isOver && overPlace]} />;
};

const highlightPlace = css`
  background-color: rgba(255, 255, 255, 0.8);
`;

const overPlace = css`
  background-color: rgba(255, 255, 255, 1);
`;

const bidPlace = (index: number) => {
  const coordinates = getCoinBidPosition(index);
  return css`
    position: absolute;
    left: ${coordinates!.left}em;
    top: ${coordinates!.top}em;
    width: ${coinTokenWidth}em;
    height: ${coinTokenHeight}em;
    border-radius: 50%;
  `;
};

export { BidPlace };
