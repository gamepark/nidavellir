/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { Avatar, RulesDialog, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { PlayerDialogIndicator } from './PlayerDialogIndicator'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import Images from '../../images/Images'
import { Score } from '@gamepark/nidavellir/rules/helpers/Score'
import { coinDescription } from '../../material/CoinDescription'
import Army from '@gamepark/nidavellir/rules/helpers/Army'
import { DwarfType } from '@gamepark/nidavellir/cards/DwarfType'

type PlayerDialogProps = {
  player: PlayerId
  close: () => void
  open: boolean
}

export const PlayerDialog: FC<PlayerDialogProps> = ({ close, player }) => {
  const { t } = useTranslation()
  const rules = useRules<NidavellirRules>()!
  const name = usePlayerName(player)
  const score = new Score(rules.game, player)
  const maxCoin = score.maximumCoin
  const army = new Army(rules.game, player)
  return (
    <RulesDialog open close={close}>
      <div css={container}>
        <div css={header}>
          <Avatar playerId={player} css={avatar}/>
          <h2>{name}</h2>
        </div>
        <div css={content}>
          <PlayerDialogIndicator
            width={2.1}
            icon={faStar}
            value={t('player.dialog.score.value', { player: name, score: score.score })}/>
          <PlayerDialogIndicator
            width={2.1}
            image={Images.BlacksmithIcon}
            value={t('player.dialog.score.blacksmith.value', { player: name, score: score.blacksmith })}
            description={t('player.dialog.score.board-score')}
          />
          <PlayerDialogIndicator
            width={2.1}
            image={Images.HunterIcon}
            value={t('player.dialog.score.hunter.value', { player: name, score: score.hunter })}
            description={t('player.dialog.score.board-score')}
          />
          <PlayerDialogIndicator
            width={2.1}
            image={Images.MinerIcon}
            value={t('player.dialog.score.miner.value', { player: name, score: score.miner })}
            description={t('player.dialog.score.miner.reason', {
              ranks: army.countGradesOfType(DwarfType.Miner),
              sumGrades: army.sumGradesOfType(DwarfType.Miner)
            })}
          />
          <PlayerDialogIndicator
            width={2.1}
            image={Images.ExplorerIcon}
            value={t('player.dialog.score.explorer.value', { player: name, score: score.explorer })}
            description={t('player.dialog.score.sum-ranks-value')}
          />
          <PlayerDialogIndicator
            width={2.1}
            image={Images.WarriorIcon}
            value={t('player.dialog.score.warrior.value', { player: name, score: score.warrior - score.warriorMajority })}
            description={t('player.dialog.score.sum-ranks-value')}
          />
          {!!maxCoin && <PlayerDialogIndicator
              width={2.1}
              image={coinDescription.images[maxCoin.id]} // Get the max coin image
              value={t('player.dialog.score.max-coin.value', { player: name, score: score.maximumCoinValue })}
              description={t('player.dialog.score.max-coin.reason')}
          />}
          <PlayerDialogIndicator
            width={2.1}
            image={Images.CommandIcon}
            value={t('player.dialog.score.neutral.value', { player: name, score: score.neutral })}
          />
          {<PlayerDialogIndicator
            width={2.1}
              image={Images.ClearCoin} // Get the max coin image
              value={t('player.dialog.score.additional.value', { player: name, score: score.coinsTotal })}
              description={t('player.dialog.score.sum-coin.reason')}
          />}
          {/*<PlayerDialogIndicator*/}
          {/*  ratio={ticketDescription.width / ticketDescription.height}*/}
          {/*  width={3}*/}
          {/*  image={ticket}*/}
          {/*  value={t('player.dialog.ticket.value', {*/}
          {/*    player: name,*/}
          {/*    tickets: rules ? countPlayerTickets(rules, player) : 0*/}
          {/*  })}*/}
          {/*  shadow*/}
          {/*/>*/}
          {/*<PlayerDialogIndicator*/}
          {/*  image={hand}*/}
          {/*  width={3}*/}
          {/*  value={t('player.dialog.card.value', {*/}
          {/*    player: name,*/}
          {/*    cards: rules?.material(MaterialType.Card).location(LocationType.Hand).player(player).length*/}
          {/*  })}*/}
          {/*  shadow*/}
          {/*/>*/}
          {/*<PlayerDialogIndicator*/}
          {/*  image={playerTokensDescription.images[player]}*/}
          {/*  width={3}*/}
          {/*  radius={3}*/}
          {/*  value={t('player.dialog.token.value', {*/}
          {/*    player: name,*/}
          {/*    tokens: rules?.material(MaterialType.Token).location(LocationType.Place).id(player).length*/}
          {/*  })}*/}
          {/*  shadow*/}
          {/*/>*/}

        </div>
      </div>
    </RulesDialog>
  )
}

const container = css`
  padding: 3em;
  max-width: 90vw;
  max-height: 90vh;
`

const header = css`
  display: flex;
  margin: 0 0.7em 0 0.7em;
  padding-bottom: 1em;
  font-size: 3em;
  border-bottom: 0.1em solid lightgray;

  > h2 {
    margin: 0 0.7em;
    text-align: center;
    line-height: 1.3;
  }
`

const avatar = css`
  position: relative;
  border-radius: 100%;
  height: 3em;
  width: 3em;

  > svg {
    width: 112.3%;
    height: 117%;
  }
`

const content = css`
  margin: 0 0.7em 0 0.7em;
  font-size: 3em;

  > p {
    white-space: break-spaces;
  }
`
