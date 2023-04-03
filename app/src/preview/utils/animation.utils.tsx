import { CoinLocation } from '@gamepark/nidavellir/state/LocatedCoin'
import { FC } from 'react'
import { LocationType } from '@gamepark/nidavellir/state/Location'
import { DiscardCoinAnimation } from '../DiscardCoinAnimation'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { Animation } from '@gamepark/react-client'
import { Step } from '@gamepark/nidavellir/state/GameState'
import { BidAnimation } from '../BidAnimation'
import { BidRevelationAnimation } from '../BidRevelationAnimation'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { PlayerId } from '@gamepark/nidavellir/state/Player'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import { View, ViewType } from '../../material/View'
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard'
import { MoveCardAnimation } from '../MoveCardAnimation'
import { MoveHeroAnimation } from '../MoveHeroAnimation'


const getMoveCoinLocationAnimation = (location: CoinLocation): FC<any> | undefined => {
  switch (location.type) {
    case LocationType.Discard:
    case LocationType.Treasure:
      return DiscardCoinAnimation
  }

  return
}

const getMoveCardAnimationComponent = (move?: MoveCard) => {
  if (!move?.target) {
    return
  }

  switch (move.target.type) {
    case LocationType.Discard:
      return (props: any) => <MoveCardAnimation {...props} title="player.animation.discard"/>
    case LocationType.Army:
      return (props: any) => <MoveCardAnimation {...props} title="player.animation.choose"/>
  }

  return
}

const getMoveHeroLocationAnimation = (move?: MoveCard) => {
  if (!move?.target) {
    return
  }

  switch (move.target.type) {
    case LocationType.Army:
      return (props: any) => <MoveHeroAnimation {...props} title="player.animation.choose"/>
  }

  return
}

export const getMoveCoinAnimationComponent = (game: GameView, playerId: PlayerId, animation: Animation<MoveCoin>): FC<any> | undefined => {
  switch (game.step) {
    case Step.Bids:
      return BidAnimation
    case Step.BidRevelation:
      return BidRevelationAnimation
    case Step.ElvalandTurn:
      if (animation.move.target && playerId === animation.action.playerId) {
        const comp = getMoveCoinLocationAnimation(animation.move.target)

        if (comp) {
          return comp
        }
      }
  }

  return
}

export const getAnimationComponent = (game: GameView, playerId: PlayerId, animation?: Animation, view?: View): FC<any> | undefined => {
  if (!animation || !view || view.type === ViewType.GLOBAL || (view.type === ViewType.PLAYER && view.player === playerId)) {
    return
  }

  if (!animation || animation.action.cancelled || animation.move.player !== playerId) {
    return
  }

  const move = animation.move
  switch (move.type) {
    case MoveType.MoveCoin:
      return getMoveCoinAnimationComponent(game, playerId, animation)
    case MoveType.MoveCard:
      return getMoveCardAnimationComponent(move)
    case MoveType.MoveHero:
      return getMoveHeroLocationAnimation(move)
  }

  return
}
