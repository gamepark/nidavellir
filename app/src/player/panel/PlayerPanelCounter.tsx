/** @jsxImportSource @emotion/react */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shadowCss } from '@gamepark/react-game';
import { css } from '@emotion/react';


type PlayerPanelCounterProps = {
  icon?: IconProp;
  image?: any;
  ratio?: number;
  width?: number;
  value: string | number;
  shadow?: boolean;
  borderRadius?: number
}

export const PlayerPanelCounter: FC<PlayerPanelCounterProps> = (props) => {
  const { icon, image, ratio = 1, width = iconWidth, value, shadow, borderRadius } = props
  return (
    <div css={indicator}>
      <div
        css={[iconStyle(ratio, width), !!image && iconImageStyle(image, borderRadius), !!image && shadow && shadowCss(image)]}>
        {!!icon && <FontAwesomeIcon icon={icon} css={fontIcon} fill="#28B8CE"/>}
      </div>
      <div css={counter}>
        {value}
      </div>
    </div>
  )
}

const indicator = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const fontIcon = css`
  font-size: 3em;
  color: #28B8CE
`

const counter = css`
  font-size: 2em;
  padding-left: 0.2em;
`

const iconWidth = 3.3
const iconStyle = (ratio: number = 1, width: number = iconWidth) => css`
  width: ${width}em;
  height: ${width / ratio}em;
`

const iconImageStyle = (image: any, borderRadius: number = 0) => css`
  background-position: center center;
  border-radius: ${borderRadius}em;
  background-image: url(${image});
  background-size: cover;
`
