/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin';
import { FC } from 'react';
import { Coin } from '@gamepark/nidavellir/coins/Coin';
import {
  Coin0,
  Coin2,
  Coin3,
  Coin4,
  Coin5,
  Coins,
  GoldCoin10,
  GoldCoin11,
  GoldCoin12,
  GoldCoin13,
  GoldCoin14,
  GoldCoin15,
  GoldCoin16,
  GoldCoin17,
  GoldCoin18,
  GoldCoin19,
  GoldCoin20,
  GoldCoin21,
  GoldCoin22,
  GoldCoin23,
  GoldCoin24,
  GoldCoin25,
  GoldCoin5,
  GoldCoin6,
  GoldCoin7,
  GoldCoin8,
  GoldCoin9,
} from '@gamepark/nidavellir/coins/Coins';
import Images from '../../images/Images';
import {
  coinPositionInDiscardX,
  coinPositionInDiscardY,
  coinTokenHeight,
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
  shineEffect,
} from '../Styles';
import {
  isInDiscard,
  isInPlayerHand,
  isInTreasure,
  isOnPlayerBoard,
  isSameCoinLocation,
} from '@gamepark/nidavellir/utils/location.utils';
import { usePlayerPositions } from '../../table/TableContext';
import Move from '@gamepark/nidavellir/moves/Move';
import { Draggable } from '@gamepark/react-components';
import { draggableCoin, DraggableMaterial } from '../../draggable/DraggableMaterial';
import { useProjection } from '../View';
import { Animation, useAnimation, useAnimations, usePlay, usePlayerId } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';

type CoinTokenProps = {
  coin: SecretCoin;
  moves?: MoveCoin[];
};

const isThisCoin = (coin: SecretCoin, move: MoveCoin) => {
  if (coin.id !== undefined) {
    return coin.id === move.id;
  }

  if (move.target) {
    return isSameCoinLocation(coin.location, move.target);
  }

  return false;
};

const CoinToken: FC<CoinTokenProps> = (props) => {
  const { coin, moves } = props;
  const play = usePlay();
  const playerId = usePlayerId();
  const detail = coin.id !== undefined ? Coins[coin.id] : undefined;
  const playerPositions = usePlayerPositions();
  const item = coin.id !== undefined ? draggableCoin(coin.id) : undefined;
  const projection = useProjection();
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveCoin && isThisCoin(coin, move));
  const animations = useAnimations((a) => a.action.playerId === playerId);

  const onDrop = (move: Move) => {
    if (move) {
      play(move);
    }
  };

  const onClick = () => {
    if (moves?.length === 1) {
      play(moves[0]);
    }

    if (hidden && coin.id !== undefined) {
    }
  };

  const hidden =
    (!moves?.length || animation || animations?.length) && (!detail || (isOnPlayerBoard(coin.location) && coin.hidden));
  const isSelectable = !animations?.length && !animation && !!moves?.length;
  return (
    <Draggable
      canDrag={isSelectable}
      type={DraggableMaterial.Coin}
      item={item}
      projection={projection}
      drop={onDrop}
      onClick={onClick}
      preTransform={`${coinPosition(coin, playerPositions)} ${hidden ? `rotateY(180deg)` : ''}`}
      css={[coinToken, coinZIndex(coin), isSelectable && selectable, animation && transitionFor(animation)]}
    >
      {!!detail && <div css={coinFace(detail)} />}
      <div css={coinBack} />
    </Draggable>
  );
};

const transitionFor = (animation: Animation) => css`
  z-index: 100;
  transition: transform ${animation.duration}s;
`;

const coinPosition = (coin: SecretCoin, playerPositions: any) => {
  if (isInPlayerHand(coin.location)) {
    const position = playerBoardPositions[playerPositions[coin.location.player]];
    return `translate3d(${getCoinPositionInHandX(coin.location.index!, position)}em, ${getCoinPositionInHandY(
      position
    )}em, ${coinTokenWidth / 2}em) ${getCoinPositionInHandRotate(position)}`;
  } else if (isInTreasure(coin.location)) {
    const token = Coins[coin.id!];
    return `translate3d(${getCoinPositionInTreasureX(token)}em, ${getCoinPositionInTreasureY(token)}em, ${
      coinTokenWidth / 2
    }em)`;
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

const coinZIndex = (coin: SecretCoin) => {
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
  }

  return;
};

const coinToken = css`
  position: absolute;
  height: ${coinTokenHeight}em;
  width: ${coinTokenWidth}em;
  border-radius: 50%;
  transform-style: preserve-3d;
`;

const coinFace = (coin: Coin) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-image: url(${CoinTokensImages.get(coin)!});
  background-size: cover;
  backface-visibility: hidden;
  box-shadow: 0.5em 0.5em 0.7em -0.2em black;
`;

const selectable = css`
  cursor: grab;
  ${shineEffect}
`;

const coinBack = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: goldenrod;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  box-shadow: 0.5em 0.5em 0.7em -0.2em black;
`;

const CoinTokensImages = new Map<Coin, any>();
CoinTokensImages.set(Coin0, Images.Bronze0);
CoinTokensImages.set(Coin2, Images.Bronze2);
CoinTokensImages.set(Coin3, Images.Bronze3);
CoinTokensImages.set(Coin4, Images.Bronze4);
CoinTokensImages.set(Coin5, Images.Bronze5);

CoinTokensImages.set(GoldCoin5, Images.Gold5);
CoinTokensImages.set(GoldCoin6, Images.Gold6);
CoinTokensImages.set(GoldCoin7, Images.Gold7);
CoinTokensImages.set(GoldCoin8, Images.Gold8);
CoinTokensImages.set(GoldCoin9, Images.Gold9);
CoinTokensImages.set(GoldCoin10, Images.Gold10);
CoinTokensImages.set(GoldCoin11, Images.Gold11);
CoinTokensImages.set(GoldCoin12, Images.Gold12);
CoinTokensImages.set(GoldCoin13, Images.Gold13);
CoinTokensImages.set(GoldCoin14, Images.Gold14);
CoinTokensImages.set(GoldCoin15, Images.Gold15);
CoinTokensImages.set(GoldCoin16, Images.Gold16);
CoinTokensImages.set(GoldCoin17, Images.Gold17);
CoinTokensImages.set(GoldCoin18, Images.Gold18);
CoinTokensImages.set(GoldCoin19, Images.Gold19);
CoinTokensImages.set(GoldCoin20, Images.Gold20);
CoinTokensImages.set(GoldCoin21, Images.Gold21);
CoinTokensImages.set(GoldCoin22, Images.Gold22);
CoinTokensImages.set(GoldCoin23, Images.Gold23);
CoinTokensImages.set(GoldCoin24, Images.Gold24);
CoinTokensImages.set(GoldCoin25, Images.Gold25);

export { CoinToken };
