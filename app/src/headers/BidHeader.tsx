import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { FC } from 'react'

export const BidHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<NidavellirRules>()!
  const players = rules.game.rule?.players ?? [];

  if (players.length === 1) {
    return <LastBidPlayer player={players[0]} />
  }


  return <>{t('header.bid.players')}</>
}

type LastBidPlayerProps = {
  player: PlayerId
}

  export const LastBidPlayer: FC<LastBidPlayerProps> = ({ player }) => {
    const { t } = useTranslation()
    const name = usePlayerName(player)
    const playerId = usePlayerId()
    const me = playerId === player

    if (me) {
      return <>{t('header.bid.player.me')}</>
    }
    return <>{t('header.bid.player', { player: name })}</>
  }