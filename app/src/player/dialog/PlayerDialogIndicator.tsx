/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { css } from '@emotion/react'
import { shadowCss } from '@gamepark/react-game'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type PlayerDialogIndicatorProps = {
  icon?: IconDefinition
  image?: string
  ratio?: number
  width?: number
  value: string
  description?: string | null
  radius?: number
  shadow?: boolean

}

const PlayerDialogIndicator: FC<PlayerDialogIndicatorProps> = (props) => {
  const { icon, image, ratio = 1, width = iconWidth, description, value, radius, shadow } = props
  return (
    <div css={indicator}>
      <div
        css={[iconStyle(ratio, width), !!image && iconImageStyle(image, radius), !!image && shadow && shadowCss(image)]}>
        {!!icon && <FontAwesomeIcon icon={faStar} css={fontIcon} fill="#28B8CE"/>}
      </div>
      <div css={detail}>
        <div css={valueStyle}>{value}</div>
        {description && <div css={descriptionStyle}>{description}</div>}
      </div>
    </div>
  )
}

const indicator = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5em;
`

const fontIcon = css`
  font-size: 2em;
  color: #28B8CE
`

const detail = css`
  padding-left: 0.2em;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
`

const valueStyle = css`
  font-size: .9em
`

const descriptionStyle = css`
  font-size: .7em;
  font-style: italic;
`

const iconWidth = 3.3
const iconStyle = (ratio: number = 1, width: number = iconWidth) => css`
  width: ${width}em;
  height: ${width / ratio}em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
`

const iconImageStyle = (image: any, borderRadius: number = 0) => css`
  background-position: center center;
  border-radius: ${borderRadius}em;
  background-image: url(${image});
  background-size: cover;
`

export {
  PlayerDialogIndicator
}
