/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, useKeyDown } from '@gamepark/react-components'
import { FC } from 'react'
import { dialogCloseIcon, largeDialogCss } from '../material/Styles'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { usePlayers } from '@gamepark/react-client'
import Images from '../images/Images'
import { useTranslation } from 'react-i18next'
import {
  getBlacksmithScore,
  getExplorerScore,
  getGoldCoinsScore,
  getHunterScore,
  getMinerScore,
  getNeutralScoring,
  getPlayerScore,
  getWarriorScore
} from '@gamepark/nidavellir/utils/score.utils'
import { Step } from '@gamepark/nidavellir/state/GameState'

type ScoreDialogProps = {
  game: GameView;
  close: () => void;
};

const ScoreDialog: FC<ScoreDialogProps> = (props) => {
  const { game, close } = props
  const players = usePlayers()
  const { t } = useTranslation()
  useKeyDown('Escape', close)

  console.log('Is VIew ? ', game.view)

  return (
    <Dialog css={ [largeDialogCss, modalStyle] } onBackdropClick={ close } open
            transitionDelay={ 0 }>
      <div css={ closeIcon }><FontAwesomeIcon icon={ faXmark } css={ dialogCloseIcon } onClick={ close }/></div>
      <div css={ scoreTitle }><span>{ t('scoring.pad') }</span></div>
      <table css={ scoreSheet }>
        <thead>
        <tr>
          <th css={ itemType }></th>
          { players.map((p) => (
            <th css={ [playerName, playerColumn] }><span>{ p.name ?? t('player.name', { player: p.id }) }</span></th>
          )) }
        </tr>
        </thead>
        <tbody>
        <tr css={ lineColor('#a78aa380') }>
          <td css={ itemArmyScore(Images.ScoreItemBlacksmith) }/>
          { players.map((p) => (
            <td css={ playerColumn }><span>{ getBlacksmithScore(game, p.id) }</span></td>
          )) }
        </tr>
        <tr css={ lineColor('#99a48780') }>
          <td css={ itemArmyScore(Images.ScoreItemHunter) }/>
          { players.map((p) => (
            <td css={ playerColumn }><span>{ getHunterScore(game, p.id) }</span></td>
          )) }
        </tr>
        <tr css={ lineColor('#92c2d480') }>
          <td css={ itemArmyScore(Images.ScoreItemExplorer) }/>
          { players.map((p) => (
            <td css={ playerColumn }><span>{ getExplorerScore(game, p.id) }</span></td>
          )) }
        </tr>
        <tr css={ lineColor('#cfb08e80') }>
          <td css={ itemArmyScore(Images.ScoreItemMiner) }/>
          { players.map((p) => (
            <td css={ playerColumn }><span>{ getMinerScore(game, p.id) }</span></td>
          )) }
        </tr>
        <tr css={ lineColor('#ae776980') }>
          <td css={ itemArmyScore(Images.ScoreItemWarrior) }/>
          { players.map((p) => (
            <td css={ playerColumn }><span>{ getWarriorScore(game, p.id) }</span></td>
          )) }
        </tr>
        <tr css={ lineColor('#808080CC') }>
          <td css={ itemArmyScore(Images.ScoreItemNeutral) }/>
          { players.map((p) => (
            <td css={ playerColumn }><span>{ getNeutralScoring(game, p.id) }</span></td>
          )) }
        </tr>
        <tr css={ lineColor('#ffffff80') }>
          <td css={ [itemArmyScore(Images.ScoreItemRemaining), remainingItemType] }/>
          { players.map((p) => (
            <td
              css={ playerColumn }><span>{ game.step === Step.Scoring ? getGoldCoinsScore(game, p.id) : '-' }</span>
            </td>
          )) }
        </tr>
        </tbody>
        <tfoot>
        <tr css={ lineColor('#ffffff80') }>
          <td css={ [itemType, scoreTotal] }><span>Total</span></td>
          { players.map((p) => (
            <td
              css={ [playerColumn, scoreTotal] }><span>{ getPlayerScore(game, p.id) }</span>
            </td>
          )) }
        </tr>
        </tfoot>
      </table>
    </Dialog>
  )
}

const playerColumnWidth = 25

const itemArmyHeight = 6
const itemArmyImageRatio = 158 / 103

const itemType = css`
  height: ${ itemArmyHeight }em;
  width: ${ itemArmyHeight * itemArmyImageRatio + 3 }em;
`

const remainingItemRatio = 157 / 135
const remainingItemType = css`
  height: ${ (itemArmyHeight * itemArmyImageRatio) / remainingItemRatio }em;
`

const scoreTotal = css`
  > span {
    font-size: 3.5em;
    font-weight: bold;
  }

  background-color: #c3ebf1;
  box-shadow: 0 0 0.1em;
`

const closeIcon = css`
  position: absolute;
  top: 3em;
  right: 0;

  > svg {
    top: unset;
  }
`

const modalStyle = css`
  padding: 3em;
  width: auto;
`

const itemArmyScore = (image?: any) => css`
  ${ itemType };
  background-image: url(${ image });
  background-size: contain;
  background-repeat: no-repeat;
`

const playerColumn = css`
  width: ${ playerColumnWidth }em;
`

const scoreSheet = css`
  height: 100%;
  font-family: 'Norse', serif;
  overflow: hidden;

  th:not(:first-of-type) > span, td:not(:first-of-type) > span {
    font-size: 3.3em;
    font-weight: bold;
  }

  tr, td, th {
    position: relative;
  }


  tbody td:hover::before {
    background-color: rgba(0, 0, 0, 0.2);
    content: '';
    height: 100%;
    left: -5000px;
    position: absolute;
    top: 0;
    width: 10000px;
    pointer-events: none;
    z-index: 1;
  }

  //Column
  th:hover::before, td:hover::after {
    background-color: rgba(0, 0, 0, 0.2);
    content: '';
    height: 10000px;
    left: 0;
    position: absolute;
    top: -5000px;
    width: 100%;
    pointer-events: none;
    z-index: 1;
  }

  tbody:before {
    content: "@";
    display: block;
    line-height: 1em;
    text-indent: -99999px;
  }

  tfoot:before {
    content: "@";
    display: block;
    line-height: 1em;
    text-indent: -99999px;
  }
`

const lineColor = (color: string) => css`
  background-color: ${ color };
`

const playerName = css`
  background-color: #c3ebf1;
  height: 2em;
  box-shadow: 0 0 0.1em;
`

const scoreTitle = css`
  font-family: 'Norse', serif;
  padding-bottom: 2em;

  > span {
    text-transform: uppercase;
    font-size: 5em;
    font-weight: bold;
  }
`

export {
  ScoreDialog
}
