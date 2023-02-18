/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { coinTokenHeight, coinTokenWidth, getCoinBidPosition, shineEffect } from '../Styles';
import { useDrop } from 'react-dnd';
import { DraggableCoin, DraggableMaterial } from '../../draggable/DraggableMaterial';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';
import { usePlay } from '@gamepark/react-client';

type BidPlaceProps = {
  index: number;
  moves: MoveCoin[];
};

const BidPlace: FC<BidPlaceProps> = (props) => {
  const { index, moves } = props;
  const play = usePlay();

  const canDrop = (item: DraggableCoin) => !!moves.find((m) => m.id === item.id);
  const [{ isOver, isDragging }, ref] = useDrop({
    accept: DraggableMaterial.Coin,
    canDrop,
    drop: (item: DraggableCoin) => moves.find((m) => m.id === item.id)!,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isDragging: monitor.getItemType() === DraggableMaterial.Coin && monitor.canDrop(),
    }),
  });

  const isSelectable = moves.length === 1;
  const hasMoves = moves.length >= 1;
  const selectPlace = () => {
    if (isSelectable) {
      play(moves[0]);
    }
  };

  return (
    <div
      ref={ref}
      onClick={selectPlace}
      css={[bidPlace(index), (isDragging || isSelectable) && highlightPlace, hasMoves && isOver && overPlace]}
    />
  );
};

const overPlace = css`
  background-color: rgba(255, 255, 255, 1);
`;

const highlightPlace = css`
  &:not(:hover) {
    ${shineEffect};
  }

  cursor: pointer;

  &:hover {
    ${overPlace};
  }
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
