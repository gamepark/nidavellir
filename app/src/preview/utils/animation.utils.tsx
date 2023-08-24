import { FC } from 'react'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { Animation } from '@gamepark/react-client'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { Player, PlayerId } from '@gamepark/nidavellir/state/Player'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import { View, ViewType } from '../../material/View'
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard'
import { MoveCardAnimation } from '../MoveCardAnimation'
import { MoveHeroAnimation } from '../MoveHeroAnimation'
import { MoveCoinAnimation } from '../MoveCoinAnimation'
import { BidAnimation } from '../BidAnimation'
import { BidRevelationAnimation } from '../BidRevelationAnimation'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { Step } from '@gamepark/nidavellir/state/GameState'
import { hasHero } from '@gamepark/nidavellir/utils/hero.utils'
import { Uline } from '@gamepark/nidavellir/cards/Heroes'
import { getPlayerCoinForTavern } from '@gamepark/nidavellir/utils/coin.utils'
import { LocatedCoin } from '@gamepark/nidavellir/state/LocatedCoin'
import { MoveGem } from '@gamepark/nidavellir/moves/MoveGem'
import { MoveGemAnimation } from '../MoveGemAnimation'


const getMoveCoinAnimationComponent = (game: GameView, player: Player, move?: MoveCoin): FC<any> | undefined => {
  if (!move?.target) {
    if (game.step === Step.BidRevelation) {
      return BidRevelationAnimation
    }

    return
  }


  switch (move.target.type) {
    case LocationType.Discard:
    case LocationType.Treasure:
      return (props: any) => <MoveCoinAnimation { ...props } title="player.animation.discard"/>
    case LocationType.PlayerBoard: {
      const isBidFromUline = hasHero(game, player.id, Uline)
        && !player.discardedCoin
        && move.id !== undefined
        && move.id === (getPlayerCoinForTavern(game, player.id, game.tavern) as LocatedCoin).id

      if (game.step === Step.Bids || isBidFromUline) {
        return BidAnimation
      } else {
        return (props: any) => <MoveCoinAnimation { ...props } title="player.animation.choose"/>
      }
    }
  }

  return
}

const getMoveCardAnimationComponent = (move?: MoveCard) => {
  if (!move?.target) {
    return
  }

  switch (move.target.type) {
    case LocationType.Discard:
      return (props: any) => <MoveCardAnimation { ...props } title="player.animation.discard"/>
    case LocationType.Army:
      return (props: any) => <MoveCardAnimation { ...props } title="player.animation.choose"/>
  }

  return
}

const getMoveGemAnimationComponent = (move?: MoveGem) => {
  if (!move?.target) {
    return
  }

  switch (move.target.type) {
    case LocationType.PlayerBoard:
      return (props: any) => <MoveGemAnimation { ...props } title="player.animation.obtain"/>
  }

  return
}

const getMoveHeroAnimationComponent = (move?: MoveCard) => {
  if (!move?.target) {
    return
  }

  switch (move.target.type) {
    case LocationType.Army:
      return (props: any) => <MoveHeroAnimation { ...props } title="player.animation.choose"/>
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

  const player = game.players.find((p) => p.id === playerId)!

  const move = animation.move
  switch (move.type) {
    case MoveType.MoveCoin:
      return getMoveCoinAnimationComponent(game, player, move)
    case MoveType.MoveCard:
      return getMoveCardAnimationComponent(move)
    case MoveType.MoveHero:
      return getMoveHeroAnimationComponent(move)
    case MoveType.MoveGem:
      return getMoveGemAnimationComponent(move)
  }

  return
}
