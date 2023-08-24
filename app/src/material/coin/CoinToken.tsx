/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {SecretCoin} from '@gamepark/nidavellir/state/view/SecretCoin'
import {FC, HTMLAttributes, useState} from 'react'
import {CoinDescription} from '@gamepark/nidavellir/coins/CoinDescription'
import {
  Coin0,
  Coin2,
  Coin3,
  Coin4,
  Coin5,
  Coins,
  GoldCoin10,
  GoldCoin11,
  GoldCoin12,
  GoldCoin13,
  GoldCoin14,
  GoldCoin15,
  GoldCoin16,
  GoldCoin17,
  GoldCoin18,
  GoldCoin19,
  GoldCoin20,
  GoldCoin21,
  GoldCoin22,
  GoldCoin23,
  GoldCoin24,
  GoldCoin25,
  GoldCoin5,
  GoldCoin6,
  GoldCoin7,
  GoldCoin8,
  GoldCoin9,
  HuntingMasterCoin
} from '@gamepark/nidavellir/coins/Coins'
import Images from '../../images/Images'
import {coinTokenHeight, coinTokenWidth, shineEffect} from '../Styles'
import {isInPlayerHand, isOnPlayerBoard} from '@gamepark/nidavellir/utils/location.utils'
import {usePlayerPositions} from '../../table/TableContext'
import Move from '@gamepark/nidavellir/moves/Move'
import {Draggable} from '@gamepark/react-components'
import {draggableCoin, DraggableMaterial} from '../../draggable/DraggableMaterial'
import {useProjection} from '../View'
import {Animation, useAnimation, useAnimations, usePlay, usePlayerId} from '@gamepark/react-client'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import {coinRulesDialog, setRulesDialog} from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import {isThisCoin} from '@gamepark/nidavellir/utils/coin.utils'

type CoinTokenProps = {
  coin: SecretCoin;
  moves?: Move[];
  scale?: number;
  disabled?: boolean;
  transform?: (coin: SecretCoin, playerPositions: any) => string;
} & HTMLAttributes<HTMLDivElement>;


const CoinToken: FC<CoinTokenProps> = (props) => {
  const {coin, moves, transform, disabled, scale, ...rest} = props
  const play = usePlay()
  const playerId = usePlayerId()
  const detail = coin.id !== undefined ? Coins[coin.id] : undefined
  const playerPositions = usePlayerPositions()
  const item = coin.id !== undefined ? draggableCoin(coin.id) : undefined
  const projection = useProjection()
  const animation = useAnimation(({move}) => move.type === MoveType.MoveCoin && isThisCoin(coin, move))
  const animations = useAnimations((a) => a.action.playerId === playerId)
  const [isDragging, setDragging] = useState(false)

  const onDrop = (move: Move) => {
    if (move) {
      play(move)
    }
  }

  const onEnd = () => {
    setDragging(false)
  }

  const onTokenClick = () => {
    if (!detail || disabled) {
      return
    }

    play(setRulesDialog(coinRulesDialog(coin)), {local: true})
  }

  const isReallyHidden =
    coin.hidden &&
    (isOnPlayerBoard(coin.location) || (isInPlayerHand(coin.location) && coin.location.player !== playerId))
  const hidden = (!moves?.length || animation || animations?.length) && (!detail || isReallyHidden)
  const isSelectable = !disabled && !animations?.length && !animation && !!moves?.length
  const onDrag = () => {
    if (isSelectable) {
      setDragging(true)
      return item
    }

    return false
  }
  return (
    <Draggable
      canDrag={isSelectable}
      type={DraggableMaterial.Coin}
      item={onDrag}
      projection={projection}
      drop={onDrop}
      end={onEnd}
      onClick={onTokenClick}
      preTransform={`${transform?.(coin, playerPositions) ?? ''} ${
        isDragging || animation ? `translateZ(1000em)` : ''
      } ${hidden ? `rotateY(180deg)` : ''}`}
      css={[
        coinToken(scale),
        isSelectable && selectable,
        disabled && !hidden && disabledStyle,
        animation && transitionFor(animation)
      ]}
      {...rest}
    >
      {!!detail && <div css={coinFace(detail)}/>}
      <div css={coinBack}/>
    </Draggable>
  )
}

const transitionFor = (animation: Animation) => css`
  transition: transform ${animation.duration}s;
`

const disabledStyle = css`
  filter: brightness(50%);
`

const coinToken = (scale: number = 1) => css`
  position: absolute;
  height: ${coinTokenHeight * scale}em;
  width: ${coinTokenWidth * scale}em;
  border-radius: 50%;
  transform-style: preserve-3d;
  cursor: pointer;
  will-change: transform;
`

const coinFace = (coin: CoinDescription) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-image: url(${CoinTokensImages.get(coin)!});
  background-size: cover;
  backface-visibility: hidden;
  cursor: pointer;
  image-rendering: -webkit-optimize-contrast;
  box-shadow: 0.5em 0.5em 0.7em -0.2em black;
`

const selectable = css`
  cursor: grab;
  ${shineEffect}
`

const coinBack = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-image: url(${Images.TokenBack});
  background-size: cover;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  cursor: pointer;
  image-rendering: -webkit-optimize-contrast;
  box-shadow: 0.5em 0.5em 0.7em -0.2em black;
`

const CoinTokensImages = new Map<CoinDescription, any>()
CoinTokensImages.set(Coin0, Images.Bronze0)
CoinTokensImages.set(Coin2, Images.Bronze2)
CoinTokensImages.set(Coin3, Images.Bronze3)
CoinTokensImages.set(Coin4, Images.Bronze4)
CoinTokensImages.set(Coin5, Images.Bronze5)

CoinTokensImages.set(GoldCoin5, Images.Gold5)
CoinTokensImages.set(GoldCoin6, Images.Gold6)
CoinTokensImages.set(GoldCoin7, Images.Gold7)
CoinTokensImages.set(GoldCoin8, Images.Gold8)
CoinTokensImages.set(GoldCoin9, Images.Gold9)
CoinTokensImages.set(GoldCoin10, Images.Gold10)
CoinTokensImages.set(GoldCoin11, Images.Gold11)
CoinTokensImages.set(GoldCoin12, Images.Gold12)
CoinTokensImages.set(GoldCoin13, Images.Gold13)
CoinTokensImages.set(GoldCoin14, Images.Gold14)
CoinTokensImages.set(GoldCoin15, Images.Gold15)
CoinTokensImages.set(GoldCoin16, Images.Gold16)
CoinTokensImages.set(GoldCoin17, Images.Gold17)
CoinTokensImages.set(GoldCoin18, Images.Gold18)
CoinTokensImages.set(GoldCoin19, Images.Gold19)
CoinTokensImages.set(GoldCoin20, Images.Gold20)
CoinTokensImages.set(GoldCoin21, Images.Gold21)
CoinTokensImages.set(GoldCoin22, Images.Gold22)
CoinTokensImages.set(GoldCoin23, Images.Gold23)
CoinTokensImages.set(GoldCoin24, Images.Gold24)
CoinTokensImages.set(GoldCoin25, Images.Gold25)
CoinTokensImages.set(HuntingMasterCoin, Images.GreenCoin)

export {CoinToken}
