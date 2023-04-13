/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin'
import { FC, useCallback } from 'react'
import { useLegalMoves } from '../hook/rules.hook'
import { usePlayerId } from '@gamepark/react-client'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { MoveButton } from './moves/MoveButton'
import { Trans, useTranslation } from 'react-i18next'
import { CoinToken } from '../material/coin/CoinToken'
import { LocationType } from '@gamepark/nidavellir/state/Location'
import { CoinRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import { Player } from '@gamepark/nidavellir/state/Player'
import { Effect } from '@gamepark/nidavellir/effects/Effect'
import { EffectType } from '@gamepark/nidavellir/effects/EffectType'
import { Coin0, Coins, HuntingMasterCoin } from '@gamepark/nidavellir/coins/Coins'
import { filterCoinMoves, getTreasureCoinForValue, getTreasureCoins } from '@gamepark/nidavellir/utils/coin.utils'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import { TransformCoin } from '@gamepark/nidavellir/moves/TransformCoin'
import { TradeCoins } from '@gamepark/nidavellir/moves/TradeCoins'
import { RuleDetail } from './CardRulesDialogContent'
import { Ylud } from '@gamepark/nidavellir/cards/Heroes'
import { isInPlayerHand, isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils'
import { hasHero } from '@gamepark/nidavellir/utils/hero.utils'

type CoinRulesDialogContentProps = {
  game: GameView;
  rulesDialog: CoinRulesDialog;
  close: () => void;
  moveTypes?: MoveType[];
};

const CoinRulesDialogContent: FC<CoinRulesDialogContentProps> = (props) => {
  const { game, rulesDialog, close } = props
  const { coin } = rulesDialog
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const predicate = useCallback(
    (move: MoveCoin | TransformCoin | TradeCoins) => filterCoinMoves(game, coin, move),
    [coin, game]
  )
  const legalMoves = useLegalMoves(
    game,
    [MoveType.MoveCoin, MoveType.TransformCoin, MoveType.TradeCoins],
    playerId,
    predicate
  )
  const player = game.players.find((p) => p.id === playerId)
  const rules = getCoinRules(game, coin, player)

  const hasActions = !!legalMoves.length
  const isHidden =
    coin.hidden &&
    (isOnPlayerBoard(coin.location) || (isInPlayerHand(coin.location) && coin.location.player !== playerId))
  return (
    <div css={ container }>
      <div css={ coinContainer }>
        <CoinToken coin={ coin } css={ coinInRules } scale={ 2 }
                   transform={ () => (isHidden ? 'rotateY(180deg)' : '') }/>
      </div>
      <div css={ descriptionContainer }>
        <div css={ rulesContainer }>
          <span css={ ruleHeader }>{ rules?.header }</span>
          <div css={ ruleDescription }>
            { rules?.description?.map((d, index) => (
              <div key={ index }>{ d }</div>
            )) }
          </div>
          { hasActions && (
            <div css={ movesContainer }>
              <div css={ actionTitle }>
                <span>{ t('Actions') }</span>
              </div>
              <div css={ buttonContainer }>
                { legalMoves.map((m, index) => (
                  <MoveButton key={ index } move={ m } onClick={ close } game={ game }/>
                )) }
              </div>
            </div>
          ) }
        </div>
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const coinContainer = css`
  flex: 1;
  display: flex;
  padding: 2em;
`

const descriptionContainer = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 2em;
`

const rulesContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`

const ruleHeader = css`
  font-size: 5em;
  text-align: center;
  font-family: 'Norse', 'Arial', serif;
  font-weight: bold;
  white-space: pre;
`

const ruleDescription = css`
  margin-top: 2em;
  margin-bottom: 2em;
  text-align: left;

  > div {
    font-size: 2.4em;
    white-space: pre-wrap;
    text-align: justify;
    padding-bottom: 1.5em;
  }
`

const movesContainer = css`
  flex: 1;
  margin-top: 3em;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const coinInRules = css`
  position: relative;
`

const actionTitle = css`
  font-weight: bold;
  font-family: 'Norse', 'Arial', serif;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.5);
  height: 5em;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 2em;

  > span {
    font-size: 4em;
  }
`

const buttonContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
`

const getSpecialCoinDescription = (coin: SecretCoin): any[] => {
  if (coin.id !== undefined) {
    if (Coins[coin.id] === HuntingMasterCoin || Coins[coin.id] === Coin0) {
      return [
        <Trans
          defaults="coin.rules.desc.exchange-coin"
          components={ [<strong/>] }
          values={ {
            value: Coins[coin.id].value
          } }
        />
      ]
    }
  }
  return []
}

const getCoinRules = (game: GameView, coin: SecretCoin, player?: Player): RuleDetail | undefined => {
  if (player && player.effects?.length && (coin.location as any)?.player === player.id) {
    const rule = getCoinEffectRules(game, coin, player.effects[0])
    if (rule) {
      return rule
    }
  }

  const specialEffect = getSpecialCoinDescription(coin)
  switch (coin.location.type) {
    case LocationType.Treasure:
      return {
        header: <Trans defaults="coin.rules.header.treasure"/>,
        description: [<Trans defaults="coin.rules.desc.treasure" components={ [<strong/>] }/>, ...specialEffect]
      }
    case LocationType.PlayerHand:
      const ylud = hasHero(game, coin.location.player, Ylud)
      return {
        header: <Trans defaults={ 'coin.rules.header.hand' }/>,
        description: [
          <Trans defaults={ ylud ? 'coin.rules.desc.hand-ylud' : 'coin.rules.desc.hand' } components={ [<strong/>] }/>,
          ...specialEffect
        ]
      }
    case LocationType.PlayerBoard:
      return {
        header: <Trans defaults="coin.rules.header.board"/>,
        description: [<Trans defaults="coin.rules.desc.board" components={ [<strong/>] }/>, ...specialEffect]
      }
    case LocationType.Discard:
      return {
        header: <Trans defaults="coin.rules.header.discard"/>,
        description: [<Trans defaults="coin.rules.desc.discard" components={ [<strong/>] }/>, ...specialEffect]
      }

    case LocationType.DistinctionsDeck:
      return {
        header: <Trans defaults="coin.rules.header.distinction"/>,
        description: [<Trans defaults="coin.rules.desc.distinction" components={ [<strong/>] }/>, ...specialEffect]
      }
  }
}

const getCoinEffectRules = (game: GameView, coin: SecretCoin, effect: Effect): RuleDetail | undefined => {
  switch (effect.type) {
    case EffectType.TRADE_COIN: {
      const c = Coins[coin.id!]
      return {
        header: <Trans defaults="coin.rules.header.trade-coin"/>,
        description: [
          <Trans
            defaults={ !c.value ? 'coin.rules.desc.cant-trade' : 'coin.rules.desc.trade-coin' }
            components={ [<strong/>] }
          />
        ]
      }
    }
    case EffectType.TRANSFORM_COIN: {
      const c = Coins[coin.id!]
      const newCoin = getTreasureCoinForValue(getTreasureCoins(game), Coins[coin.id!].value + effect.additionalValue)
      return {
        header: <Trans defaults="coin.rules.header.transform-coin"/>,
        description: [
          <Trans
            defaults={ !c.value ? 'coin.rules.desc.cant-transform' : 'coin.rules.desc.transform-coin' }
            components={ [<strong/>] }
            values={ {
              additionalValue: effect.additionalValue,
              newValue: Coins[newCoin.id!].value
            } }
          />
        ]
      }
    }
  }

  return undefined
}

export { CoinRulesDialogContent }
