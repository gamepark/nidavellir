import { useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { Card } from '@gamepark/nidavellir/cards/Cards'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { FC } from 'react'

export const TradeCoinHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const player = rules.getActivePlayer()!
  const hasUline = !!rules
      .material(MaterialType.Card)
      .player(player)
      .id(({ front }: Record<string, any>) => front === Card.Uline)
      .length

  if (hasUline) {
    return <TradeCoinWithUlineHeader player={player} />
  }

  return <TradeCoinWithoutUlineHeader player={player} />
}

type TradeCoinHeaderProps = {
  player: PlayerId
}

const TradeCoinWithUlineHeader: FC<TradeCoinHeaderProps> = ({ player }) => {
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player
  const { t } = useTranslation()

  if (me) {
    return <>{t('header.trade-coin.uline.me')}</>
  }
  return <>{t('header.trade-coin.uline', { player: name })}</>
}

const TradeCoinWithoutUlineHeader: FC<TradeCoinHeaderProps> = ({ player }) => {
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player
  const { t } = useTranslation()

  if (me) {
    return <>{t('header.trade-coin.me')}</>
  }
  return <>{t('header.trade-coin', { player: name })}</>
}