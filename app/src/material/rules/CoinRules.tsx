/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, useLegalMoves, usePlayerId, usePlayerName } from "@gamepark/react-game";
import { Trans, useTranslation } from "react-i18next";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { FC } from "react";
import { Coins } from "@gamepark/nidavellir/coins/Coins";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { isMoveItemType } from "@gamepark/rules-api/dist/material/moves/items/MoveItem";
import { PlaceCoinButton } from "./PlaceCoinButton";
import { css } from "@emotion/react";
import { isExchangeCoin } from "@gamepark/nidavellir/utils/coin.utils";
import { MaterialItem } from "@gamepark/rules-api/dist/material/items/MaterialItem";
import { Coin } from "@gamepark/nidavellir/material/Coin";

export const CoinRules: FC<MaterialRulesProps> = (props) => {
  const { t } = useTranslation()
  const { item, itemIndex } = props;
  const visible = item.id !== undefined
  const placeCoins = useLegalMoves((move) => isMoveItemType(MaterialType.Coin)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.PlayerBoard)
  const exchange = visible && isExchangeCoin(item as MaterialItem)
  const huntingMaster = exchange && Coin.HuntingMasterCoin === item.id
  return (
    <>
      <h2 css={norse}>{t(`rule.coin`)}</h2>
      <CoinLocationRule {...props} />
      {visible && <p><Trans defaults="rule.coin.description" values={{ value: Coins[item.id].value, color: t(`rule.coin.color.${Coins[item.id].color}`)}}><strong/></Trans></p>}
      {exchange && <><hr /><p>{t('rule.coin.exchange-coin')}</p></>}
      {huntingMaster && <p>{t('rule.coin.hunting-master')}</p>}
      {!!placeCoins.length && placeCoins.map((move) => <p key={JSON.stringify(move)} css={moveButton}><PlaceCoinButton move={move} {...props} /></p>)}
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

const moveButton = css`
  margin: 0;
  margin-bottom: 0.6em;
`

const norse = css`
  font-family: Norse, Arial, Serif
`