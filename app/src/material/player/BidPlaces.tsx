import GameView from '@gamepark/nidavellir/state/view/GameView'
import { FC } from 'react'
import { useLegalMoves } from '../../hook/rules.hook'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import { usePlayerId } from '@gamepark/react-client'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils'
import { BidPlace } from './BidPlace'

type BidPlacesProps = {
  game: GameView;
};

const BidPlaces: FC<BidPlacesProps> = (props) => {
  const { game } = props
  const playerId = usePlayerId()
  const { selectedCoin } = game
  const moves = useLegalMoves<MoveCoin>(game, [MoveType.MoveCoin], playerId)

  const getBidPlaceMoves = (index: number) =>
    moves.filter(
      (m) =>
        m.target &&
        isOnPlayerBoard(m.target) &&
        m.target.index === index &&
        (selectedCoin === undefined || selectedCoin === m.id)
    )
  return (
    <>
      <BidPlace key={ 0 } index={ 0 } moves={ getBidPlaceMoves(0) }/>
      <BidPlace key={ 1 } index={ 1 } moves={ getBidPlaceMoves(1) }/>
      <BidPlace key={ 2 } index={ 2 } moves={ getBidPlaceMoves(2) }/>
      <BidPlace key={ 3 } index={ 3 } moves={ getBidPlaceMoves(3) }/>
      <BidPlace key={ 4 } index={ 4 } moves={ getBidPlaceMoves(4) }/>
    </>
  )
}

export { BidPlaces }
