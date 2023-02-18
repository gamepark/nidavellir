/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import Images from '../../images/Images';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { Trans } from 'react-i18next';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';
import { CoinLocation } from '@gamepark/nidavellir/state/LocatedCoin';
import { OnPlayerBoard } from '@gamepark/nidavellir/state/CommonLocations';
import { Effect } from '@gamepark/nidavellir/effects/Effect';
import { usePlayerId } from '@gamepark/react-client';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { getTreasureCoinForValue, getTreasureCoins } from '@gamepark/nidavellir/utils/coin.utils';
import { Coins } from '@gamepark/nidavellir/coins/Coins';
import { CoinToken } from '../../material/coin/CoinToken';
import { TradeCoins } from '@gamepark/nidavellir/moves/TradeCoins';
import { TransformCoin } from '@gamepark/nidavellir/moves/TransformCoin';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { TransformCoinEffect } from '@gamepark/nidavellir/effects/types/TransformCoinEffect';
import sumBy from 'lodash/sumBy';

type MoveCoinButtonProps = {
  move: MoveCoin;
  game: GameView;
};

const MoveCoinButton: FC<MoveCoinButtonProps> = (props) => {
  const { move, game } = props;
  const { target } = move;
  const playerId = usePlayerId();
  const player = game.players.find((p) => p.id === playerId)!;

  const detail = player?.effects?.length ? getEffectDetail(game, move, player?.effects[0]) : getDetail(target);
  return (
    <>
      {!!detail?.icon && <div css={iconStyle(detail.icon)}></div>}
      <div css={textContainer}>{detail?.text ?? 'None'}</div>
    </>
  );
};

const getEffectDetail = (game: GameView, move: MoveCoin | TradeCoins | TransformCoin, effect: Effect): any => {
  switch (move.type) {
    case MoveType.TradeCoins: {
      const newCoin = getTreasureCoinForValue(
        getTreasureCoins(game),
        sumBy(move.ids!, (c) => Coins[c].value)
      );
      const first = game.coins.find((c) => c.id === move.ids?.[0])!;
      const second = game.coins.find((c) => c.id === move.ids?.[1])!;
      return {
        text: (
          <Trans
            defaults="coin.moves.trade-coins"
            components={[
              <span css={buttonStyle} />,
              <CoinToken css={innerCoinStyle} coin={first} />,
              <CoinToken css={innerCoinStyle} coin={second} />,
              <CoinToken css={innerCoinStyle} coin={newCoin} />,
            ]}
          />
        ),
      };
    }
    case MoveType.TransformCoin: {
      const e = effect as TransformCoinEffect;
      const newCoin = getTreasureCoinForValue(getTreasureCoins(game), Coins[move.id!].value + e.additionalValue);
      return {
        text: (
          <Trans
            defaults="coin.moves.transform-coins"
            components={[<CoinToken css={innerCoinStyle} coin={newCoin} />]}
          />
        ),
      };
    }
  }

  return null;
};

const iconStyle = (icon: any) => css`
  width: 5em;
  height: 5em;
  margin-right: 1em;
  background-image: url(${icon});
  background-size: cover;
`;

const innerCoinStyle = css`
  width: 5em;
  height: 5em;
  position: relative;
  margin-left: 1em;
  margin-right: 1em;
`;

const textContainer = css`
  flex: 1;
  text-align: left;
  display: flex;
  margin-left: 1em;
  align-items: center;
`;

const buttonStyle = css`
  font-size: 3em;
`;

const getDetail = (target?: CoinLocation) => {
  if (!target) {
    return null;
  }

  switch (target.type) {
    case LocationType.PlayerBoard:
      return getBidDetail(target);
  }

  return null;
};

const getBidDetail = (location: OnPlayerBoard) => {
  switch (location.index) {
    case 0:
      return {
        icon: Images.LaughingGoblinIcon,
        text: <Trans defaults="coin.moves.tavern.1" components={[<span css={buttonStyle} />]} />,
      };
    case 1:
      return {
        icon: Images.DancingDragonIcon,
        text: <Trans defaults="coin.moves.tavern.2" components={[<span css={buttonStyle} />]} />,
      };
    case 2:
      return {
        icon: Images.ShiningHorseIcon,
        text: <Trans defaults="coin.moves.tavern.3" components={[<span css={buttonStyle} />]} />,
      };
    case 3:
      return {
        icon: Images.PouchIcon,
        text: <Trans defaults="coin.moves.pouch.1" components={[<span css={buttonStyle} />]} />,
      };
    case 4:
      return {
        icon: Images.PouchIcon,
        text: <Trans defaults="coin.moves.pouch.2" components={[<span css={buttonStyle} />]} />,
      };
  }

  return null;
};

export { MoveCoinButton };
