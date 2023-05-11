/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, useCallback } from 'react'
import { TavernRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import { Trans, useTranslation } from 'react-i18next'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { Tavern } from '../material/tavern/Tavern'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import { useLegalMoves } from '../hook/rules.hook'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { usePlayerId } from '@gamepark/react-client'
import { isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils'
import { MoveButton } from './moves/MoveButton'

type TavernRulesDialogContentProps = {
  game: GameView;
  tavern: number;
  rulesDialog: TavernRulesDialog;
  close: () => void;
};

const TavernRulesDialogContent: FC<TavernRulesDialogContentProps> = (props) => {
  const playerId = usePlayerId()
  const { game, rulesDialog, close } = props
  const { tavern } = rulesDialog
  const predicate = useCallback(
    (move: MoveCoin) => !!move.target && isOnPlayerBoard(move.target) && move.target.index === tavern,
    [game]
  )
  const legalMoves = useLegalMoves(
    game,
    [MoveType.MoveCoin],
    playerId,
    predicate
  )

  const hasActions = !!legalMoves.length

  const { t } = useTranslation()
  return (
    <div css={ container }>
      <div css={ tavernContainer }>
        <Tavern tavern={ tavern } scale={ 1 } css={ tavernImage }/>
      </div>
      <div css={ descriptionContainer }>
        <div css={ rulesContainer }>
          <span css={ ruleHeader }>
            <Trans
              defaults="tavern.rules.header" components={ [<strong/>] }
              values={ { tavern: t(`tavern.${ tavern }.name`) } }/>
          </span>
          <div css={ ruleDescription }>
            <div>
              <Trans
                defaults="tavern.rules.desc"
                components={ [<strong/>, <div css={ divider }/>] }
                values={ { tavern: t(`tavern.${ tavern }.name`) } }
              />
            </div>
          </div>
          { hasActions && (
            <div css={ movesContainer }>
              <div css={ actionTitle }>
                <span>{ t('move.actions') }</span>
              </div>
              <div css={ buttonContainer }>
                { legalMoves.map((m, index) => (
                  <MoveButton key={ index } move={ m } onClick={ close } game={ game }/>
                )) }
              </div>
            </div>
          ) }
        </div>
      </div>
    </div>
  )
}

const divider = css`
  width: 20%;
  border-bottom: 0.1em solid rgba(0, 0, 0, 0.5);
`

const tavernImage = css`
  top: unset;
  left: unset;
  position: relative;
`

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const tavernContainer = css`
  flex: 1;
  display: flex;
  padding: 2em;
`

const descriptionContainer = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 2em;
`

const rulesContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`

const ruleHeader = css`
  font-size: 5em;
  text-align: center;
  font-family: 'Norse', 'Arial', serif;
  font-weight: bold;
  white-space: pre;
`

const ruleDescription = css`
  margin-top: 2em;
  margin-bottom: 2em;
  text-align: left;

  > div {
    font-size: 2.4em;
    white-space: pre-wrap;
    text-align: justify;
    padding-bottom: 1.5em;
  }
`

const movesContainer = css`
  flex: 1;
  margin-top: 3em;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const actionTitle = css`
  font-weight: bold;
  font-family: 'Norse', 'Arial', serif;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.5);
  height: 5em;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 2em;

  > span {
    font-size: 4em;
  }
`

const buttonContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
`

export { TavernRulesDialogContent }
