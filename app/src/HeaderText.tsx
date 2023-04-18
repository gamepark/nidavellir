/** @jsxImportSource @emotion/react */
import { Animation, Player as PlayerInfos, useAnimation, usePlayerId, usePlayers } from '@gamepark/react-client'
import { useTranslation } from 'react-i18next'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { isEndOfGame } from '@gamepark/nidavellir/utils/age.utils'
import maxBy from 'lodash/maxBy'
import { Step } from '@gamepark/nidavellir/state/GameState'
import { Player, PlayerId } from '@gamepark/nidavellir/state/Player'
import { getPlayerWithHero, hasHero } from '@gamepark/nidavellir/utils/hero.utils'
import { Heroes, Uline } from '@gamepark/nidavellir/cards/Heroes'
import {
  isInArmy,
  isInCommandZone,
  isInDiscard,
  isInPlayerHand,
  isInTreasure,
  isOnPlayerBoard,
  isSameCoinLocation
} from '@gamepark/nidavellir/utils/location.utils'
import { TFunction } from 'i18next'
import { getActivePlayer } from '@gamepark/nidavellir/utils/player.utils'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import Move from '@gamepark/nidavellir/moves/Move'
import MoveView from '@gamepark/nidavellir/moves/MoveView'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero'
import { MoveDistinction } from '@gamepark/nidavellir/moves/MoveDistinction'
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard'
import { LocationType } from '@gamepark/nidavellir/state/Location'
import { getPlayerName } from './hook/player.hook'
import { Coins } from '@gamepark/nidavellir/coins/Coins'
import { CARD_RULES } from './dialog/AgeCardRulesDialogContent'
import { Cards } from '@gamepark/nidavellir/cards/Cards'
import { RoyalOffering } from '@gamepark/nidavellir/cards/Card'
import { HERO_RULES } from './dialog/HeroRulesDialogContent'
import { getPlayerCoinForTavern } from '@gamepark/nidavellir/utils/coin.utils'

type Props = {
  loading: boolean;
  game?: GameView;
};

const isDescribedAnimation = (a: Animation<Move | MoveView, PlayerId>) => {
  const move = a.move
  return !a.action.cancelled && ((move.type === MoveType.MoveCoin && (!move.target || isInTreasure(move.target) || (!isInPlayerHand(move.target) && move.player !== undefined)))
    || (move.type === MoveType.MoveCard && (isInArmy(move.target) || isInDiscard(move.target)) && move.player !== undefined)
    || (move.type === MoveType.MoveHero && (isInArmy(move.target) || isInCommandZone(move.target) || isInDiscard(move.target)) && move.player !== undefined)
    || (move.type === MoveType.MoveDistinction && move.player !== undefined))
}

export default function HeaderText({ loading, game }: Props) {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const players = usePlayers()
  const animation = useAnimation((a) => isDescribedAnimation(a))
  if (loading || !game) return <>{ t('header.loading') }</>


  if (isEndOfGame(game) && game.players.every((p) => p.score !== undefined)) {
    const winner = maxBy(game.players, (p) => p.score)!
    if (winner.id === playerId) {
      return <>End of the game. You win the game with { winner.score } points.</>
    }
    return (
      <>
        End of the game. Player #{ winner.id } wins the game with { winner.score } points.
      </>
    )
  }

  const animationText = animation ? getAnimationText(t, game, animation, players, playerId) : undefined
  const text = animationText ?? getHeader(t, game, players, playerId)
  return (
    <>
      { text }
    </>
  )
}

const getTavernName = (t: TFunction, tavern: number) => t(`tavern.${ tavern }.name`)

const getMoveCoinAnimationText = (t: TFunction, _game: GameView, move: MoveCoin, players: PlayerInfos[], playerId?: PlayerId) => {
  if (move.player === undefined) {
    console.warn('It must not happen, but it is...')
  }

  const itsMe = move.player === playerId
  const playerInfo = players.find((p) => p.id === move.player)!
  if (!move.target && move.reveal) {
    const coin = _game.coins.find((c) => move.id !== undefined ? c.id === move.id : isSameCoinLocation(move.source!, c.location))!
    if (isOnPlayerBoard(coin.location) && (coin.location.index ?? 0) > 2) {
      return itsMe ? t('header.me.reveal-pouch') : t('header.other.reveal-pouch', {
        player: getPlayerName(t, move.player!, playerInfo.name)
      })
    }
  }
  switch (move.target?.type) {
    case LocationType.Discard:
      return itsMe ? t('header.me.coin.discard', { coin: Coins[move.id!].value }) : t('header.other.coin.discard', {
        player: getPlayerName(t, move.player!, playerInfo.name),
        coin: Coins[move.id!].value
      })
    case LocationType.PlayerBoard:
      if (_game.step === Step.Bids || (_game.step === Step.BidRevelation && hasHero(_game, move.player!, Uline))) {
        if ((move.target.index ?? 0) > 2) {
          return itsMe ? t('header.me.coin.bid.pouch') : t('header.other.coin.bid.pouch', { player: getPlayerName(t, move.player!, playerInfo.name) })
        }

        const tavern = move.target.index ?? 0
        return itsMe ? t('header.me.coin.bid.tavern', { tavern: getTavernName(t, tavern) }) : t('header.other.coin.bid.tavern', {
          player: getPlayerName(t, move.player!, playerInfo.name),
          tavern: getTavernName(t, tavern)
        })
      }

      if (move.id !== undefined) {
        return itsMe ? t('header.me.coin.obtain', { coin: Coins[move.id].value }) : t('header.other.coin.obtain-known', {
          player: getPlayerName(t, move.player!, playerInfo.name),
          coin: Coins[move.id].value
        })
      }

      return itsMe ? t('header.me.coin.obtain') : t('header.other.coin.obtain', { player: getPlayerName(t, move.player!, playerInfo.name) })

  }

  return
}

export const getMoveCardAnimationText = (t: TFunction, _game: GameView, move: MoveCard, players: PlayerInfos[], playerId?: PlayerId) => {
  if (move.player === undefined) {
    console.warn('It must not happen, but it is...')
  }

  const itsMe = move.player === playerId
  const playerInfo = players.find((p) => p.id === move.player)!
  switch (move.target.type) {
    case LocationType.Discard:
    case LocationType.Army:
      const card = Cards[move.id!]
      const rules = CARD_RULES.get(card.type)!(card)
      if (move.target.type === LocationType.Discard && card.type !== RoyalOffering.RoyalOffering) {
        return itsMe ? t('header.me.card.discard', { card: rules.header }) : t('header.other.card.discard', {
          card: rules.header,
          player: getPlayerName(t, move.player!, playerInfo.name)
        })
      }

      return itsMe ? t('header.me.card.choose', { card: rules.header }) : t('header.other.card.choose', {
        card: rules.header,
        player: getPlayerName(t, move.player!, playerInfo.name)
      })
  }

  return
}

export const getMoveHeroAnimationText = (t: TFunction, _game: GameView, move: MoveHero, players: PlayerInfos[], playerId?: PlayerId) => {
  if (move.player === undefined) {
    console.warn('It must not happen, but it is...')
  }

  const itsMe = move.player === playerId
  const playerInfo = players.find((p) => p.id === move.player)!
  switch (move.target.type) {
    case LocationType.Discard: {
      const hero = Heroes[move.id!]
      const rules = HERO_RULES.get(hero)!()
      return itsMe ? t('header.me.hero.discard', { hero: rules.header }) : t('header.other.hero.discard', {
        hero: rules.header,
        player: getPlayerName(t, move.player!, playerInfo.name)
      })

    }
    case LocationType.CommandZone:
    case LocationType.Army: {
      const hero = Heroes[move.id!]
      const rules = HERO_RULES.get(hero)!()
      return itsMe ? t('header.me.hero.recruit', { hero: rules.header }) : t('header.other.hero.recruit', {
        hero: rules.header,
        player: getPlayerName(t, move.player!, playerInfo.name)
      })
    }
  }

  return
}

export const getAnimationText = (t: TFunction, game: GameView, animation: Animation<MoveCoin | MoveHero | MoveDistinction | MoveCard, PlayerId>, players: PlayerInfos[], playerId?: PlayerId) => {

  const move = animation.move
  switch (move.type) {
    case MoveType.MoveCoin:
      return getMoveCoinAnimationText(t, game, move, players, playerId)
    case MoveType.MoveCard:
      return getMoveCardAnimationText(t, game, move, players, playerId)
    case MoveType.MoveHero:
      return getMoveHeroAnimationText(t, game, move, players, playerId)
    case MoveType.MoveDistinction:
  }


  return
}

export const getBidRevelationText = (t: TFunction, game: GameView, players: PlayerInfos[], playerId?: PlayerId) => {
  const playerWithUline = getPlayerWithHero(game, Uline)
  if (playerWithUline) {
    const itsMe = playerId === playerWithUline.id
    if (getPlayerCoinForTavern(game, playerWithUline.id, game.tavern) === undefined
      && game.players.every((p) => p.id === playerWithUline.id || !getPlayerCoinForTavern(game, p.id, game.tavern)!.hidden)) {
      const playerInfo = players.find((p) => p.id === playerWithUline.id)!
      return itsMe ? t('header.me.bids.uline') : t('header.other.bids.uline', {
        player: getPlayerName(t, playerWithUline.id, playerInfo.name)
      })
    } else if (!playerWithUline.ready) {
      return itsMe ? t('header.me.not-ready') : t('header.other.not-ready')
    }
  }

  return t('header.bids.revelation', { tavern: t(`tavern.${ game.tavern }.name`) })
}

export const getHeader = (t: TFunction, game: GameView, players: PlayerInfos[], playerId?: PlayerId) => {
  switch (game.step) {
    case Step.EnterDwarves:
      return t('header.turn-preparation')
    case Step.Bids:
      return getBidsText(t, game, players, playerId)
    case Step.BidRevelation:
      return getBidRevelationText(t, game, players, playerId)
    case Step.ElvalandTurn:
      return getElvalandTurnText(t, game, players, playerId)
  }

  return t('header.waiting')
}

const getMyElvalandTurnText = (t: TFunction, game: GameView, activePlayer: Player) => {
  if (activePlayer.playedCard === undefined) {
    return t('header.me.elvaland.choose-card', { tavern: getTavernName(t, game.tavern) })
  }

  return t('header.me.not-ready')
}

const getOtherElvalandTurnText = (t: TFunction, game: GameView, activePlayer: Player, players: PlayerInfos[], _playerId?: PlayerId) => {
  const playerInfo = players.find((p) => p.id === activePlayer.id)!
  if (activePlayer.playedCard === undefined) {
    return t('header.other.elvaland.choose-card', {
      tavern: getTavernName(t, game.tavern),
      player: getPlayerName(t, playerInfo.id, playerInfo.name)
    })
  }

  return t('header.other.not-ready', {
    player: getPlayerName(t, playerInfo.id, playerInfo.name)
  })
}

export const getElvalandTurnText = (t: TFunction, game: GameView, players: PlayerInfos[], playerId?: PlayerId) => {
  const activePlayer = getActivePlayer(game)

  if (!activePlayer) {
    return t('header.elvaland.end')
  }

  if (activePlayer.id === playerId) {
    return getMyElvalandTurnText(t, game, activePlayer)
  } else {
    return getOtherElvalandTurnText(t, game, activePlayer, players, playerId)
  }
}

export const getBidsText = (t: TFunction, game: GameView, _players: PlayerInfos[], playerId?: PlayerId) => {
  const me = game.players.find((p) => p.id === playerId)
  if (me && !me.ready) {
    if (!hasHero(game, me.id, Uline)) {
      const coinOnTavern = game.coins
        .find((c) => isOnPlayerBoard(c.location) && c.location.player && c.location.index === game.tavern)

      if (coinOnTavern) {
        return t('header.me.not-ready')
      }

      return t('header.me.bids')
    }
  }

  return t('header.waiting')
}
