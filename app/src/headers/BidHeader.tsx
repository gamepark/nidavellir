import { Trans, useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { FC } from 'react'
import { isEndPlayerTurn } from '@gamepark/rules-api'
import { PlayMoveButton, UndoMovesButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'

export const BidHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<NidavellirRules>()!
  const players = rules.game.rule?.players ?? [];
  const passMove = useLegalMove(isEndPlayerTurn)

  if (passMove) {
    return <Trans defaults="header.bid.pass">
      <PlayMoveButton auto={5} move={passMove}/>
      <UndoMovesButton moves={1} />
    </Trans>
  }

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