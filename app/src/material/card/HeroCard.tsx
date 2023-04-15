/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, HTMLAttributes, useState } from 'react'
import { cardHeight, cardWidth, shineEffect } from '../Styles'
import Images from '../../images/Images'
import {
  Aegur,
  Aral,
  Astrid,
  Bonfur,
  Dagda,
  DwergAesir,
  DwergBergelmir,
  DwergJungir,
  DwergSigmir,
  DwergYmir,
  Grid,
  Heroes,
  Hourya,
  Idunn,
  Kraal,
  Lokdur,
  Skaa,
  Tarah,
  Thrud,
  Uline,
  Ylud,
  Zoral
} from '@gamepark/nidavellir/cards/Heroes'
import { Hero } from '@gamepark/nidavellir/cards/Hero'
import { Animation, useAnimation, useAnimations, usePlay } from '@gamepark/react-client'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero'
import Move from '@gamepark/nidavellir/moves/Move'
import { draggableHero, DraggableMaterial } from '../../draggable/DraggableMaterial'
import { Draggable } from '@gamepark/react-components'
import { LocatedCard } from '@gamepark/nidavellir/state/LocatedCard'
import { useProjection } from '../View'
import { heroRulesDialog, setRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'

type HeroCardProps = {
  card: LocatedCard;
  moves?: MoveHero[];
  transform?: (card: LocatedCard) => string;
  scale?: number;
} & HTMLAttributes<HTMLDivElement>;

const HeroCard: FC<HeroCardProps> = (props) => {
  const { card, moves = [], transform, scale, ...rest } = props
  const play = usePlay()
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveHero && move.id === card.id)
  const animations = useAnimations()
  const item = draggableHero(card.id)
  const projection = useProjection()
  const [isDragging, setDragging] = useState(false)

  const playMove = (move: Move) => {
    if (move) {
      play(move)
    }
  }

  const onEnd = () => {
    setDragging(false)
  }

  const onHeroClick = () => {
    if (!detail) {
      return
    }

    play(setRulesDialog(heroRulesDialog(card)), { local: true })
  }

  const detail = Heroes[card.id!]

  const isSelectable = !animation && !animations.length && !!moves.length
  const onDrag = () => {
    if (isSelectable) {
      setDragging(true)
      return item
    }

    return false
  }

  return (
    <Draggable
      canDrag={ isSelectable }
      type={ DraggableMaterial.Hero }
      item={ onDrag }
      projection={ projection }
      drop={ playMove }
      end={ onEnd }
      preTransform={ `${ isDragging || animation ? `translateZ(1000em)` : '' } ${ transform?.(card) ?? '' }` }
      css={ [heroCard(scale), isSelectable && selectable, animation && transitionFor(animation)] }
      onClick={ onHeroClick }
      { ...rest }
    >
      { <div css={ heroCardFace(detail) }/> }
    </Draggable>
  )
}

const transitionFor = (animation: Animation) => css`
  z-index: 100 !important;
  transition: ${ animation.duration }s transform;
`

const selectable = css`
  cursor: grab;
  ${ shineEffect }
`

const heroCard = (scale: number = 1) => css`
  position: absolute;
  height: ${ cardHeight * scale }em;
  width: ${ cardWidth * scale }em;
  border-radius: 2.5em;
  cursor: pointer;
`

const heroCardFace = (hero: Hero) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2.5em;
  background-image: url(${ HeroCardFront.get(hero)! });
  background-size: cover;
  cursor: pointer;
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
  box-shadow: 0 0 0.7em -0.2em black;
`

const HeroCardFront = new Map<Hero, any>()
HeroCardFront.set(Aegur, Images.Aegur)
HeroCardFront.set(Aral, Images.Aral)
HeroCardFront.set(Astrid, Images.Astrid)
HeroCardFront.set(Bonfur, Images.Bonfur)
HeroCardFront.set(Dagda, Images.Dagda)
HeroCardFront.set(DwergAesir, Images.DwergAesir)
HeroCardFront.set(DwergBergelmir, Images.DwergBergelmir)
HeroCardFront.set(DwergJungir, Images.DwergJungir)
HeroCardFront.set(DwergSigmir, Images.DwergSigmir)
HeroCardFront.set(DwergYmir, Images.DwergYmir)
HeroCardFront.set(Grid, Images.Grid)
HeroCardFront.set(Hourya, Images.Hourya)
HeroCardFront.set(Idunn, Images.Idunn)
HeroCardFront.set(Kraal, Images.Kraal)
HeroCardFront.set(Lokdur, Images.Lokdur)
HeroCardFront.set(Skaa, Images.Skaa)
HeroCardFront.set(Tarah, Images.Tarah)
HeroCardFront.set(Thrud, Images.Thrud)
HeroCardFront.set(Uline, Images.Uline)
HeroCardFront.set(Ylud, Images.Ylud)
HeroCardFront.set(Zoral, Images.Zoral)

export { HeroCard }
