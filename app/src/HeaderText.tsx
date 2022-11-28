/** @jsxImportSource @emotion/react */
import {usePlayerId} from '@gamepark/react-client'
import {useTranslation} from 'react-i18next'
import GameView from "@gamepark/nidavellir/state/view/GameView";

type Props = {
  loading: boolean
  game?: GameView
}

export default function HeaderText({loading}: Props) {
  const {t} = useTranslation()
  const playerId = usePlayerId()
  if (loading) return <>{t('Game loading...')}</>
  return <>Loaded! Now what? Your player id is {playerId}</>
}
