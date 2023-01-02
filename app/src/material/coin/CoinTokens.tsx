import { FC, useCallback } from 'react';
import { CoinToken } from './CoinToken';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlay, usePlayerId } from '@gamepark/react-client';
import { useLegalMoves } from '../../hook/legal-move.hook';
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin';
import {
  isInPlayerHand,
  isInTreasure,
  isOnPlayerBoard,
  isSameCoinLocation,
} from '@gamepark/nidavellir/utils/location.utils';
import {
  coinPositionInDiscardX,
  coinPositionInDiscardY,
  coinTokenWidth,
  getCoinPositionInHandRotate,
  getCoinPositionInHandX,
  getCoinPositionInHandY,
  getCoinPositionInTreasureX,
  getCoinPositionInTreasureY,
  getCoinPositionOnPlayerBoardRotation,
  getCoinPositionOnPlayerBoardX,
  getCoinPositionOnPlayerBoardY,
  playerBoardPositions,
} from '../Styles';
import { Coins } from '@gamepark/nidavellir/coins/Coins';
import { selectCoinMove } from '@gamepark/nidavellir/moves/SelectCoin';

type CoinTokensProps = {
  game: GameView;
};

const CoinTokens: FC<CoinTokensProps> = (props) => {
  const { game } = props;
  const play = usePlay();
  const playerId = usePlayerId();
  const moves = useLegalMoves<MoveCoin>(game, playerId, [MoveType.MoveCoin]);
  const getCoinTokenMoves = useCallback(
    (c: SecretCoin) =>
      moves.filter((m) => (c.id !== undefined ? m.id === c.id : isSameCoinLocation(m.source!, c.location))),
    [moves]
  );

  const selectCoin = (coinId?: number) => {
    if (coinId === undefined) {
      return;
    }

    play(selectCoinMove(coinId), { local: true });
  };

  const selectedCoin = game.selectedCoin;
  return (
    <>
      {game.coins.map((coin, index) => (
        <CoinToken
          coin={coin}
          key={coin.id ? `coin-${coin.id}` : index}
          moves={getCoinTokenMoves(coin)}
          onClick={() => selectCoin(coin.id)}
          transform={coinTransform}
          disabled={isInPlayerHand(coin.location) && selectedCoin !== undefined && selectedCoin !== coin.id}
        />
      ))}
    </>
  );
};

const coinTransform = (coin: SecretCoin, playerPositions: any) => {
  if (isInPlayerHand(coin.location)) {
    const position = playerBoardPositions[playerPositions[coin.location.player]];
    return `translate3d(${getCoinPositionInHandX(coin.location.index!, position)}em, ${getCoinPositionInHandY(
      position
    )}em, ${coinTokenWidth / 2}em) ${getCoinPositionInHandRotate(position)}`;
  } else if (isInTreasure(coin.location)) {
    const token = Coins[coin.id!];
    return `translate3d(${getCoinPositionInTreasureX(token, coin.location.z)}em, ${getCoinPositionInTreasureY(
      token,
      coin.location.z
    )}em, ${coinTokenWidth / 2}em)`;
  } else if (isOnPlayerBoard(coin.location)) {
    const position = playerBoardPositions[playerPositions[coin.location.player]];
    return `translate3d(${getCoinPositionOnPlayerBoardX(
      position,
      coin.location.index!
    )}em, ${getCoinPositionOnPlayerBoardY(position, coin.location.index!)}em, ${
      coinTokenWidth / 2
    }em) ${getCoinPositionOnPlayerBoardRotation(position)}`;
  }

  return `translate(${coinPositionInDiscardX(coin.location.index)}em, ${coinPositionInDiscardY(
    coin.location.index
  )}em)`;
};

export { CoinTokens };
