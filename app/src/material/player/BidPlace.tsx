/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { coinTokenHeight, coinTokenWidth, getCoinBidPosition, shineEffect } from '../Styles';
import { useDrop } from 'react-dnd';
import { DraggableCoin, DraggableMaterial } from '../../draggable/DraggableMaterial';
import { MoveCoin, moveKnownCoinMove } from '@gamepark/nidavellir/moves/MoveCoin';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { usePlay, usePlayerId } from '@gamepark/react-client';
import { selectCoinMove } from '@gamepark/nidavellir/moves/SelectCoin';

type BidPlaceProps = {
  index: number;
  moves: MoveCoin[];
};

const BidPlace: FC<BidPlaceProps> = (props) => {
  const { index, moves } = props;
  const play = usePlay();
  const playerId = usePlayerId();

  const canDrop = (item: DraggableCoin) => !!moves.find((m) => m.id === item.id);
  const [{ isOver, isDragging }, ref] = useDrop({
    accept: DraggableMaterial.Coin,
    canDrop,
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

  const isSelectable = moves.length === 1;
  const selectPlace = () => {
    if (isSelectable) {
      play(
        moveKnownCoinMove(moves[0].id!, {
          type: LocationType.PlayerBoard,
          player: playerId,
          index,
        })
      );
      play(selectCoinMove(), { local: true });
    }
  };

  return (
    <div
      ref={ref}
      onClick={selectPlace}
      css={[bidPlace(index), (isDragging || isSelectable) && highlightPlace, isOver && overPlace]}
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
