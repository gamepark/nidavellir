import { Trans, useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { FC } from 'react'
import { MaterialMove } from '@gamepark/rules-api'
import { PlayMoveButton, UndoMovesButton, usePlay, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { PlayerBoardSpace, tokenSpaces } from '@gamepark/nidavellir/material/PlayerBoardSpace'

export const BidHeader = () => {
  const { t } = useTranslation()
  const play = usePlay()
  const rules = useRules<NidavellirRules>()!
  const player = usePlayerId()
  const players = rules.game.rule?.players ?? [];
  const lastMoves = getLastMoves(rules, player)

  if (lastMoves.length) {
    const first = lastMoves.shift()
    const playRemainingMoves = () => {
      if (!lastMoves.length) return

      play(lastMoves[0])
    }
    return <Trans defaults="header.bid.pass">
      <PlayMoveButton move={first} onPlay={playRemainingMoves}/>
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

const getLastMoves = (rules: NidavellirRules, player?: PlayerId) => {
  if (!player) return []
  const moves: MaterialMove[] = []
  const playerCoins = rules.material(MaterialType.Coin).player(player)
  const coinsInHand = playerCoins.location(LocationType.Hand)
  const coinsOnBoard = playerCoins.location(LocationType.PlayerBoard)
  const availableBidSpaces = tokenSpaces.filter((space) => !coinsOnBoard.filter((item) => item.location.id === space).length)

  if (coinsInHand.length === 1 || (coinsInHand.length === 2 && !coinsOnBoard.filter((item) => item.location.id > PlayerBoardSpace.ShiningHorse).length)) {
    const indexes = coinsInHand.getIndexes()
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i]

      moves.push(
        coinsInHand.index(index).moveItem({ location: { type: LocationType.PlayerBoard, player, id: availableBidSpaces[i] }})
      )
    }
  }

  return moves
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