/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import Images from '../../images/Images';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { useTranslation } from 'react-i18next';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';
import { CoinLocation } from '@gamepark/nidavellir/state/LocatedCoin';
import { OnPlayerBoard } from '@gamepark/nidavellir/state/CommonLocations';
import { Effect } from '@gamepark/nidavellir/effects/Effect';
import { EffectType } from '@gamepark/nidavellir/effects/EffectType';
import { usePlayerId } from '@gamepark/react-client';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { getTreasureCoinForValue, getTreasureCoins } from '@gamepark/nidavellir/utils/coin.utils';
import { Coins } from '@gamepark/nidavellir/coins/Coins';

type MoveCoinButtonProps = {
  move: MoveCoin;
  game: GameView;
};

const MoveCoinButton: FC<MoveCoinButtonProps> = (props) => {
  const { move, game } = props;
  const { target } = move;
  const { t } = useTranslation();
  const playerId = usePlayerId();
  const player = game.players.find((p) => p.id === playerId)!;

  const detail = player?.effects?.length ? getEffectDetail(game, move, player?.effects[0]) : getDetail(target);
  return (
    <>
      {!!detail?.icon && <div css={iconStyle(detail.icon)}></div>}
      <span css={buttonStyle}>{t(detail?.text ?? 'None')}</span>
    </>
  );
};

const getEffectDetail = (game: GameView, move: MoveCoin, effect: Effect) => {
  switch (effect.type) {
    case EffectType.TRADE_COIN:
      return { icon: Images.RoyalOfferingIcon, text: 'Trade this coin' };
    case EffectType.TRANSFORM_COIN:
      const newCoin = getTreasureCoinForValue(getTreasureCoins(game), Coins[move.id!].value + effect.additionalValue);
      return { icon: Images.RoyalOfferingIcon, text: `Transform this coin to ${Coins[newCoin.id!].value}` };
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

const buttonStyle = css`
  font-size: 3em;
  flex: 1;
  text-align: left;
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
      return { icon: Images.LaughingGoblinIcon, text: 'Place on Laughing Goblin tavern' };
    case 1:
      return { icon: Images.DancingDragonIcon, text: 'Place on Dancing Dragon tavern' };
    case 2:
      return { icon: Images.ShiningHorseIcon, text: 'Place on Shining Horse tavern' };
    case 3:
      return { icon: Images.PouchIcon, text: 'Place on the first pouch' };
    case 4:
      return { icon: Images.PouchIcon, text: 'Place on the second pouch' };
  }

  return null;
};

export { MoveCoinButton };
