/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useCallback } from 'react';
import { CoinToken } from './CoinToken';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlayerId } from '@gamepark/react-client';
import { useLegalMoves } from '../../hook/rules.hook';
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin';
import {
  isInDiscard,
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

type CoinTokensProps = {
  game: GameView;
};

const CoinTokens: FC<CoinTokensProps> = (props) => {
  const { game } = props;
  const playerId = usePlayerId();
  const moves = useLegalMoves<MoveCoin>(game, playerId, [MoveType.MoveCoin]);
  const getCoinTokenMoves = useCallback(
    (c: SecretCoin) =>
      moves.filter((m) => (c.id !== undefined ? m.id === c.id : isSameCoinLocation(m.source!, c.location))),
    [moves]
  );

  const selectedCoin = game.selectedCoin;
  return (
    <>
      {game.coins.map((coin, index) => (
        <CoinToken
          coin={coin}
          key={coin.id ? `coin-${coin.id}` : index}
          moves={getCoinTokenMoves(coin)}
          transform={coinTransform}
          additionalCss={coinAdditionalStyle}
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

const coinAdditionalStyle = (coin: SecretCoin) => {
  if (isInDiscard(coin.location)) {
    return css`
      z-index: ${coin.location.index};
    `;
  } else if (isOnPlayerBoard(coin.location)) {
    return css`
      z-index: ${coin.location.index! + 1};
    `;
  } else if (isInPlayerHand(coin.location)) {
    return css`
      z-index: 50;
    `;
  } else if (isInTreasure(coin.location)) {
    return css`
      z-index: ${coin.location.z};
    `;
  }

  return;
};

export { CoinTokens };
