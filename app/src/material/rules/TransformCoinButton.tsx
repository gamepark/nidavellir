/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Trans } from 'react-i18next'
import { MoveItem } from '@gamepark/rules-api'
import { MaterialComponent, MaterialHelpProps, PlayMoveButton, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { ExchangeCoin } from '@gamepark/nidavellir/rules/helpers/ExchangeCoin'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { Memory } from '@gamepark/nidavellir/rules/Memory'


type TransformCoinButtonProps = {
  move: MoveItem
} & MaterialHelpProps

export const TransformCoinButton = (props: TransformCoinButtonProps) => {
  const { move, closeDialog } = props;
  const rules = useRules<NidavellirRules>()!
  const treasureCoin = new ExchangeCoin(rules.game, rules.material(MaterialType.Coin).index(move.itemIndex), rules.remind(Memory.TransformBonus)).treasureCoin
  return (
    <PlayMoveButton move={move} css={moveAction} onPlay={closeDialog}>
      <Trans
        defaults="coin.moves.transform-coins"
        components={[
          <MaterialComponent css={mini} type={MaterialType.Coin} itemId={treasureCoin.getItem()!.id} />,
        ]}
      />
    </PlayMoveButton>
  )
}

export const mini = css`
  font-size: 0.5em;
  margin: 0 0.5em;
`

export const greyBackground = '#E9E3D8'
export const moveAction = css`
  border: 0.1em solid black;
  border-radius: 0.8em;
  background-color: ${greyBackground};
  font-family: 'Norse', 'Arial', serif;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5em 0.7em;
  display: flex;
  align-items: center;
  justify-content: left;
  
    
  &:hover,
  &:active {
    background-color: white;
  }
`
