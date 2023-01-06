/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin';
import { FC, useCallback } from 'react';
import { useLegalMoves } from '../hook/rules.hook';
import { usePlayerId } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { isSameCoinLocation } from '@gamepark/nidavellir/utils/location.utils';
import { MoveButton } from './moves/MoveButton';
import { Trans, useTranslation } from 'react-i18next';
import { CoinToken } from '../material/coin/CoinToken';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { CoinRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog';
import { Player } from '@gamepark/nidavellir/state/Player';
import { Effect } from '@gamepark/nidavellir/effects/Effect';
import { EffectType } from '@gamepark/nidavellir/effects/EffectType';
import { Coins } from '@gamepark/nidavellir/coins/Coins';
import { getTreasureCoinForValue, getTreasureCoins } from '@gamepark/nidavellir/utils/coin.utils';

type CoinRulesDialogContentProps = {
  game: GameView;
  rulesDialog: CoinRulesDialog;
  close: () => void;
  moveTypes?: MoveType[];
};

const CoinRulesDialogContent: FC<CoinRulesDialogContentProps> = (props) => {
  const { game, rulesDialog, close } = props;
  const { coin } = rulesDialog;
  const { t } = useTranslation();
  const playerId = usePlayerId();
  const predicate = useCallback(
    (move: any) => (move.id !== undefined ? coin.id === move.id : isSameCoinLocation(coin.location, move.source)),
    [coin]
  );
  const legalMoves = useLegalMoves(game, playerId, [MoveType.MoveCoin], predicate);
  const player = game.players.find((p) => p.id === playerId);
  const rules = getCoinRules(game, coin, player);

  const hasActions = !!legalMoves.length;
  const transform = (c: SecretCoin) => (c.id !== undefined && c.hidden ? 'rotateY(180deg)' : '');

  return (
    <div css={container}>
      <div css={coinContainer}>
        <CoinToken coin={coin} css={coinInRules} scale={2} transform={transform} />
      </div>
      <div css={descriptionContainer}>
        <div css={rulesContainer}>
          <span css={ruleHeader}>{rules?.header ?? 'None'}</span>
          <div css={ruleDescription}>
            <div>{rules?.description ?? 'None'}</div>
          </div>
          {hasActions && (
            <div css={movesContainer}>
              <div css={actionTitle}>
                <span>{t('Actions')}</span>
              </div>
              <div css={buttonContainer}>
                {legalMoves.map((m, index) => (
                  <MoveButton key={index} move={m} onClick={close} game={game} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const coinContainer = css`
  flex: 1;
  display: flex;
  padding: 1em;
`;

const descriptionContainer = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 2em;
`;

const rulesContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

const ruleHeader = css`
  font-size: 5em;
  text-align: center;
  font-family: 'Norse', 'Arial', serif;
  font-weight: bold;
`;

const ruleDescription = css`
  margin-top: 2em;
  margin-bottom: 2em;
  text-align: left;

  > div {
    font-size: 3em;
    white-space: pre-wrap;
    text-align: justify;
  }
`;

const movesContainer = css`
  flex: 1;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const coinInRules = css`
  position: relative;
`;

const actionTitle = css`
  font-weight: bold;
  font-family: 'Norse', 'Arial', serif;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.5);
  height: 5em;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 2em;

  > span {
    font-size: 4em;
  }
`;

const buttonContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
`;

const getCoinRules = (game: GameView, coin: SecretCoin, player?: Player) => {
  // TODO: effects ? (maybe manage it as a part like "Action"
  switch (coin.location.type) {
    case LocationType.Treasure:
      return {
        header: 'coin.rules.header.treasure',
        description: 'coin.rules.desc.treasure',
      };
    case LocationType.PlayerHand:
      return {
        header: 'coin.rules.header.hand',
        description: 'coin.rules.desc.hand',
      };
    case LocationType.PlayerBoard:
      if (player?.effects?.length && coin.location.player === player.id) {
        return getCoinEffectRules(game, coin, player.effects[0]);
      }
      return {
        header: 'coin.rules.header.board',
        description: 'coin.rules.desc.board',
      };
    case LocationType.Discard:
      return {
        header: 'coin.rules.header.discard',
        description: 'coin.rules.desc.discard',
      };
  }
};

const getCoinEffectRules = (game: GameView, coin: SecretCoin, effect: Effect) => {
  switch (effect.type) {
    case EffectType.TRADE_COIN: {
      const c = Coins[coin.id!];
      return {
        header: 'coin.rules.header.trade-coin',
        description: !c.value ? 'coin.rules.desc.cant-trade' : 'coin.rules.desc.trade-coin',
      };
    }
    case EffectType.TRANSFORM_COIN: {
      const c = Coins[coin.id!];
      const newCoin = getTreasureCoinForValue(getTreasureCoins(game), Coins[coin.id!].value + effect.additionalValue);
      return {
        header: <Trans defaults="coin.rules.header.transform-coin" />,
        description: (
          <Trans
            defaults={!c.value ? 'coin.rules.desc.cant-transform' : 'coin.rules.desc.transform-coin'}
            components={[<strong />]}
            values={{
              additionalValue: effect.additionalValue,
              newValue: Coins[newCoin.id!].value,
            }}
          />
        ),
      };
    }
  }

  return null;
};

export { CoinRulesDialogContent };
