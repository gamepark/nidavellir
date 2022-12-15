import { FC, useCallback } from 'react';
import { CoinToken } from './CoinToken';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlayerId } from '@gamepark/react-client';
import { useLegalMoves } from '../../hook/legal-move.hook';
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin';
import { isSameCoinLocation } from '@gamepark/nidavellir/utils/location.utils';

type CoinTokensProps = {
  game: GameView;
};

const CoinTokens: FC<CoinTokensProps> = (props) => {
  const { game } = props;
  const playerId = usePlayerId();
  const moves = useLegalMoves<MoveCoin>(game, playerId, MoveType.MoveCoin);
  console.log(moves);
  const getCoinTokenMoves = useCallback(
    (c: SecretCoin) =>
      moves.filter((m) => (c.id !== undefined ? m.id === c.id : isSameCoinLocation(m.source!, c.location))),
    [moves]
  );
  return (
    <>
      {game.coins.map((coin, index) => (
        <CoinToken coin={coin} key={index} moves={getCoinTokenMoves(coin)} />
      ))}
    </>
  );
};

export { CoinTokens };
