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
  isInDistinctionDeck,
  isInPlayerHand,
  isInTreasure,
  isOnPlayerBoard,
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
import { TransformCoin } from '@gamepark/nidavellir/moves/TransformCoin';
import { TradeCoins } from '@gamepark/nidavellir/moves/TradeCoins';
import { filterCoinMoves } from '@gamepark/nidavellir/utils/coin.utils';

type CoinTokensProps = {
  game: GameView;
};

const CoinTokens: FC<CoinTokensProps> = (props) => {
  const { game } = props;
  const playerId = usePlayerId();
  const moves = useLegalMoves<MoveCoin | TransformCoin | TradeCoins>(game, playerId, [
    MoveType.MoveCoin,
    MoveType.TransformCoin,
    MoveType.TradeCoins,
  ]);
  const getCoinTokenMoves = useCallback(
    (c: SecretCoin) => moves.filter((m) => filterCoinMoves(game, c, m)),
    [game, moves]
  );

  const selectedCoin = game.selectedCoin;
  return (
    <>
      {game.coins.map((coin, index) => (
        <CoinToken
          coin={coin}
          key={getCoinKey(coin, index)}
          moves={getCoinTokenMoves(coin)}
          transform={coinTransform}
          additionalCss={coinAdditionalStyle}
          disabled={isInPlayerHand(coin.location) && selectedCoin !== undefined && selectedCoin !== coin.id}
        />
      ))}
    </>
  );
};

const getCoinKey = (_coin: SecretCoin, index: number) => {
  return _coin.id !== undefined ? `coin-${_coin?.id}` : index;
};

const coinTransform = (coin: SecretCoin, playerPositions: any) => {
  if (isInPlayerHand(coin.location)) {
    const position = playerBoardPositions[playerPositions[coin.location.player]];
    return `translate3d(${getCoinPositionInHandX(coin.location.index!, position)}em, ${getCoinPositionInHandY(
      position
    )}em, ${coinTokenWidth / 2}em) ${getCoinPositionInHandRotate(position)}`;
  }

  if (isInTreasure(coin.location)) {
    const token = Coins[coin.id!];
    return `translate3d(${getCoinPositionInTreasureX(token, coin.location.z)}em, ${getCoinPositionInTreasureY(
      token,
      coin.location.z
    )}em, ${coinTokenWidth / 2}em)`;
  }

  if (isOnPlayerBoard(coin.location)) {
    const position = playerBoardPositions[playerPositions[coin.location.player]];
    return `translate3d(${getCoinPositionOnPlayerBoardX(
      position,
      coin.location.index!
    )}em, ${getCoinPositionOnPlayerBoardY(position, coin.location.index!)}em, ${
      coinTokenWidth / 2
    }em) ${getCoinPositionOnPlayerBoardRotation(position)}`;
  }

  if (isInDistinctionDeck(coin.location)) {
    return `
      translate(42em, 160em)
    `;
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
  }

  if (isInPlayerHand(coin.location)) {
    return css`
      z-index: 50;
    `;
  }

  if (isInTreasure(coin.location)) {
    return css`
      z-index: ${coin.location.z};
    `;
  }

  if (isInDistinctionDeck(coin.location)) {
    return css`
      z-index: 0;
    `;
  }

  return;
};

export { CoinTokens };
