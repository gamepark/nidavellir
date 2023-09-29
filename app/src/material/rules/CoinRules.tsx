/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from "react-i18next";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { FC } from "react";
import { Coins } from "@gamepark/nidavellir/coins/Coins";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { PlaceCoinButton } from "./PlaceCoinButton";
import { css } from "@emotion/react";
import { isExchangeCoin } from "@gamepark/nidavellir/utils/coin.utils";
import { MaterialItem, isCustomMoveType, isMoveItemType } from "@gamepark/rules-api";
import { Coin } from "@gamepark/nidavellir/material/Coin";
import { CustomMoveType } from '@gamepark/nidavellir/moves/CustomMoveType'
import { TradeCoinButton } from './TradeCoinButton'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { RuleId } from '@gamepark/nidavellir/rules/RuleId'
import { TransformCoinButton } from './TransformCoinButton'

export const CoinRules: FC<MaterialRulesProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props;
  const visible = item.id !== undefined
  const exchange = visible && isExchangeCoin(item as MaterialItem)
  const huntingMaster = exchange && Coin.HuntingMasterCoin === item.id
  return (
    <>
      <h2 css={norse}>{t(`rule.coin`)}</h2>
      <CoinLocationRule {...props} />
      {visible && <p><Trans defaults="rule.coin.description" values={{ value: Coins[item.id].value, color: t(`rule.coin.color.${Coins[item.id].color}`)}}><strong/></Trans></p>}
      {exchange && <><hr /><p>{t('rule.coin.exchange-coin')}</p></>}
      {huntingMaster && <p>{t('rule.coin.hunting-master')}</p>}
      <PlaceCoinMoves {...props} />
      <TradeCoinsMoves {...props} />
      <TransformCoinsMoves {...props} />
    </>
  )
}

const PlaceCoinMoves: FC<MaterialRulesProps> = (props) => {
  const { itemIndex } = props;
  const placeCoins = useLegalMoves((move) => isMoveItemType(MaterialType.Coin)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.PlayerBoard)
  if (!placeCoins.length) return null;

  return (
    <>
      <hr />
      <div css={buttonContainer}>
        {placeCoins.map((move) => <PlaceCoinButton key={JSON.stringify(move)} move={move} {...props} />)}
      </div>
    </>
  )
}

const TradeCoinsMoves: FC<MaterialRulesProps> = (props) => {
  const { itemIndex } = props;
  const tradeCoins = useLegalMoves((move) => isCustomMoveType(CustomMoveType.TradeCoins)(move) && move.data.includes(itemIndex))
  if (!tradeCoins.length) return null;

  return (
    <>
      <hr />
      <div css={buttonContainer}>
        {tradeCoins.map((move) => <TradeCoinButton key={JSON.stringify(move)} move={move} {...props} />)}
      </div>
    </>
  )
}

const TransformCoinsMoves: FC<MaterialRulesProps> = (props) => {
  const rules = useRules<NidavellirRules>()!
  const transformCoins = useLegalMoves((move) => rules.game.rule?.id === RuleId.TransformCoin && isMoveItemType(MaterialType.Coin)(move) && (move.position.location?.type === LocationType.Discard || move.position.location?.type === LocationType.Treasure))
  if (!transformCoins.length) return null

  return (
    <>
      <hr />
      <div css={buttonContainer}>
        {transformCoins.map((move) => <TransformCoinButton key={JSON.stringify(move)} move={move} {...props} />)}
      </div>
    </>
  )
}

const CoinLocationRule: FC<MaterialRulesProps> = (props) => {
  const { item } = props
  const location = item.location
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(item.location?.player)
  switch (location?.type) {
    case LocationType.PlayerBoard:
      return <>
        <p>{item.location?.player === playerId ? t('rule.coin.board.mine') : t('rule.coin.board', { player })}</p>
      </>
    case LocationType.Treasure:
      return <>
        <p>{t('rule.coin.treasure')}</p>
      </>
    case LocationType.Hand:
      return <>
        <p>{item.location?.player === playerId ? t('rule.coin.hand.mine') : t('rule.coin.hand', { player })}</p>
      </>
    case LocationType.Discard:
      return <>
        <p>{t('rule.coin.discard')}</p>
      </>
  }

  return null;
}

const buttonContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5em;
  margin-bottom: 1em;

  > button {
    text-align: left;
  }
`

const norse = css`
  font-family: Norse, Arial, Serif
`