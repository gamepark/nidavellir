/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, useKeyDown } from '@gamepark/react-components'
import { usePlay } from '@gamepark/react-client'
import { useCallback } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { dialogCloseIcon, largeDialogCss } from '../material/Styles'
import { AgeCardRulesDialogContent } from './AgeCardRulesDialogContent'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { RulesDialogType, setRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import { HeroRulesDialogContent } from './HeroRulesDialogContent'
import { DistinctionRulesDialogContent } from './DistinctionRulesDialogContent'
import { CoinRulesDialogContent } from './CoinRulesDialogContent'
import { GemRulesDialogContent } from './GemRulesDialogContent'

type Props = {
  game: GameView;
};

const RulesDialogContents = {
  [RulesDialogType.AgeCard]: AgeCardRulesDialogContent,
  [RulesDialogType.Hero]: HeroRulesDialogContent,
  [RulesDialogType.Distinction]: DistinctionRulesDialogContent,
  [RulesDialogType.Coin]: CoinRulesDialogContent,
  [RulesDialogType.Gem]: GemRulesDialogContent
}

export default function RulesDialog({ game }: Props) {
  const play = usePlay()
  const close = useCallback(() => play(setRulesDialog(undefined), { local: true }), [play])
  useKeyDown('Escape', close)

  if (!game.rulesDialog) {
    return null
  }

  const RulesDialogContent = RulesDialogContents[game.rulesDialog.type] as any
  return (
    <Dialog css={ largeDialogCss } onBackdropClick={ close } open={ !!game.rulesDialog } transitionDelay={ 0 }>
      <FontAwesomeIcon icon={ faXmark } css={ dialogCloseIcon } onClick={ close }/>
      <Scrollbars autoHeight css={ scrollableContainer }>
        <RulesDialogContent game={ game } rulesDialog={ game.rulesDialog } close={ close }/>
      </Scrollbars>
    </Dialog>
  )
}

const scrollableContainer = css`
  max-height: 93em !important;

  > div {
    max-height: calc(93em + 17px) !important;
  }

  // trick to avoid very thin bar on some resolutions with react-custom-scrollbars-2
  > div {
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`
