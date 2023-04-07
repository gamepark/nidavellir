/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DwarfType } from '@gamepark/nidavellir/cards/Card'
import { FC } from 'react'
import {
  columnWidth,
  playerBoardColumnHeight,
  playerBoardColumnLeft,
  playerBoardColumnTop,
  playerBoardPositions,
  shineEffect
} from '../Styles'
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard'
import { usePlay } from '@gamepark/react-client'
import { DraggableCard, DraggableHero, DraggableMaterial } from '../../draggable/DraggableMaterial'
import { useDrop } from 'react-dnd'
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero'
import MoveType from '@gamepark/nidavellir/moves/MoveType'

type CardColumnProps = {
  type: DwarfType;
  color: string;
  background: string;
  position: any;
  moves: (MoveCard | MoveHero)[];
};

const PlayerBoardColumn: FC<CardColumnProps> = (props) => {
  const { position, type, color, background, moves } = props
  const play = usePlay()

  const drop = (item: DraggableHero | DraggableCard) => {
    if (item.type === DraggableMaterial.Hero) {
      return moves.find((m) => m.type === MoveType.MoveHero && m.id === item.id)!
    } else if (item.type === DraggableMaterial.Card) {
      return moves.find((m) => m.type === MoveType.MoveCard && m.id === item.id)!
    }

    return []
  }

  const canDrop = (item?: DraggableHero | DraggableCard) => !!item && !!drop(item)

  const [{ isOver, isDragging, droppable }, ref] = useDrop({
    accept: [DraggableMaterial.Card, DraggableMaterial.Hero],
    canDrop,
    drop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isDragging: monitor.getItem() !== null,
      droppable: monitor.canDrop()
    })
  })

  const isSelectable = moves.length === 1
  const onClick = () => {
    if (isSelectable) {
      play(moves[0])
    }
  }

  return (
    <div
      ref={ ref }
      css={ [
        cardColumn(position, type, color, background),
        isSelectable && (!isDragging || droppable) && selectable,
        droppable && onTop,
        isOver && droppable && overPlace
      ] }
      onClick={ onClick }
    />
  )
}

const onTop = css`
  transform: translateZ(100em);
`

const overPlace = css`
  background-color: rgba(255, 255, 255, 1);
`

const selectable = css`
  cursor: pointer;
  ${ shineEffect };

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`

const cardColumn = (playerIndex: number, type: DwarfType, color: string, background: string) => {
  const position = playerBoardPositions[playerIndex]
  return css`
    position: absolute;
    height: ${ playerBoardColumnHeight }em;
    width: ${ columnWidth }em;
    background-color: ${ background };
    border: 0.3em solid ${ color };
    border-radius: 2em;
    ${ position.left && `left: ${ playerBoardColumnLeft(position, type) }em;` }
    ${ position.top && `top: ${ playerBoardColumnTop(position) }em;` }
  `
}

export { PlayerBoardColumn }
