/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { LocationHelpProps, MaterialComponent, MaterialHelpProps, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { greyBackground } from '../../material/rules/ColumnButton'

export const PlayerBoardSpaceRules: FC<LocationHelpProps> = (props) => {
  const { location } = props
  const { t } = useTranslation()
  return (
    <>
      <h2 css={norse}>{t(getSpaceTitleKey(location.id))}</h2>
      <p>{t(getSpaceDescriptionKey(location.id))}</p>
      <PlaceCoinMoves {...props} />
    </>
  )
}

const PlaceCoinMoves: FC<LocationHelpProps> = (props) => {
  const { location } = props;
  const rules = useRules<NidavellirRules>()!
  const placeCoins = useLegalMoves<MoveItem>((move) => isMoveItemType(MaterialType.Coin)(move) && move.location.type === LocationType.PlayerBoard && move.location.id === location.id)
  if (!placeCoins.length) return null;

  return (
    <>
      <hr />
      <div css={buttonContainer}>
        {placeCoins.map((move) => {
          const item = rules.material(move.itemType).getItem(move.itemIndex)!
          return <PlaceCoinHereButton key={JSON.stringify(move)} move={move} itemType={move.itemType} itemIndex={move.itemIndex} item={item} {...props} />
        })}
      </div>
    </>
  )
}

type PlaceCoinHereButtonProps = {
  move: MoveItem
} & MaterialHelpProps

export const PlaceCoinHereButton = (props: PlaceCoinHereButtonProps) => {
  const { move, item, closeDialog } = props;
  return (
    <PlayMoveButton move={move} css={moveAction} onPlay={closeDialog}>
      <Trans defaults="rule.coin.move.here">
        <MaterialComponent css={mini} type={MaterialType.Coin} itemId={item.id} />
      </Trans>
    </PlayMoveButton>
  )
}

export const mini = css`
  font-size: 0.5em;
  margin: 0 0.5em;
`

const getSpaceTitleKey = (space: PlayerBoardSpace) => {
  switch (space) {
    case PlayerBoardSpace.LaughingGoblin:
      return 'tavern.1'
    case PlayerBoardSpace.DancingDragon:
      return 'tavern.2'
    case PlayerBoardSpace.ShiningHorse:
      return 'tavern.3'
    default:
      return 'pouch.name'
  }
}

const getSpaceDescriptionKey = (space: PlayerBoardSpace) => {
  switch (space) {
    case PlayerBoardSpace.LaughingGoblin:
    case PlayerBoardSpace.DancingDragon:
    case PlayerBoardSpace.ShiningHorse:
      return 'rule.tavern'
    default:
      return 'rule.pouch'
  }
}

const buttonContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5em;
  margin-bottom: 1em;

  > button {
    text-align: left;
  }
`
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

const norse = css`
  font-family: Norse, Arial, serif
`
