/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { cardHeight, cardWidth } from '../Styles'
import { useAnimation } from '@gamepark/react-client'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { isInPlayerHand } from '@gamepark/nidavellir/utils/location.utils'
import { PlayerId } from '@gamepark/nidavellir/state/Player'

type CardHandAreaProps = {
  player: PlayerId;
  handSize: number;
} & HTMLAttributes<HTMLDivElement>;

const CardHandArea: FC<CardHandAreaProps> = (props) => {
  const {handSize, player, ...rest} = props
  const {t} = useTranslation()
  const animation = useAnimation((a) =>
    a.move.type === MoveType.MoveCard &&
    ((isInPlayerHand(a.move.target) && player === a.move.target.player)
      || (isInPlayerHand(a.move.source) && player === a.move.source.player)))

  if (animation) {
    return null
  }


  return (
    <div css={area(handSize)} {...rest}>
      <div css={title}>
        <span>{t('hand.card.header', 'Hand')}</span>
      </div>
    </div>
  )
}

const area = (handSize: number) => css`
  position: absolute;
  border-radius: 3em;
  width: ${(cardWidth + 2) * handSize + 2}em;
  height: ${cardHeight + 12}em;
  background-color: #e9e3d8;
`

const title = css`
  position: absolute;
  top: 1em;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  margin-left: 3em;

  > span {
    font-weight: bold;
    font-family: 'Norse', 'Arial', serif;
    font-size: 7em;
  }
`

export { CardHandArea }
