/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card, CardDeck, Cards, isHero, isRoyalOffering } from '@gamepark/nidavellir/cards/Cards'
import { getTypes } from '@gamepark/nidavellir/cards/DwarfDescription'
import { DwarfType } from '@gamepark/nidavellir/cards/DwarfType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { Score } from '@gamepark/nidavellir/rules/helpers/Score'
import { Memory } from '@gamepark/nidavellir/rules/Memory'
import { MaterialHelpProps, PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ColumnButton, moveAction } from './ColumnButton'

export const DwarfCardHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const deck = item.location?.type === LocationType.Age1Deck || item.location?.type === LocationType.Age2Deck
  if (deck) {
    return <AgeDeckRule {...props} />
  }

  return <>
    <CardRule {...props}/>
  </>
}

const AgeDeckRule = (props: MaterialHelpProps) => {
  const { item } = props
  const rules = useRules<NidavellirRules>()!
  const age = item.location?.type === LocationType.Age1Deck ? 1 : 2
  const currentAge = rules.remind(Memory.Age)
  const players = rules.players.length
  const { t } = useTranslation()
  const started = currentAge >= age
  const isAgeEnded = currentAge > age
  return (
    <>
      <h2 css={norse}>{t('rule.age-deck', { age })}</h2>
      <p><Trans defaults="rule.age-deck.purpose" values={{
        players,
        age,
        drawnCards: (players === 2 ? 3 : players) * 3,
        tavernCards: (players === 2 ? 3 : players),
        round: players < 4 ? 4 : 3,
      }}><strong/></Trans></p>
      <hr/>
      <p><Trans defaults="rule.age-deck.remaining" values={{
        remaining: rules.material(MaterialType.Card).location(item.location!.type).length,
      }}>
        <strong/>
      </Trans></p>
      <p>
        { !started && (<Trans defaults="rule.age-deck.not-started" values={{ age }} />)}
        { started && (<Trans defaults="rule.age-deck.round" values={{ round: getRemainingRound(rules) }} />)}
        { isAgeEnded && (<Trans defaults="rule.age-deck.ended" />)}
      </p>
    </>
  )
}

const CardRule = (props: MaterialHelpProps) => {
  const { item } = props
  if (isRoyalOffering(item.id.front)) {
    return <RoyalOfferingRules {...props} />
  }

  if (isHero(item.id.front) || item.id.back === CardDeck.Hero) {
    return <HeroRules {...props} />
  }

  return <DwarfRules {...props} />
}

const DwarfRules = (props: MaterialHelpProps) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()

  // TODO: can be multiple type
  const type = item.id.front ? getTypes(Cards[item.id.front])?.[0] : undefined
  const dwarfClass = type ?? item.location?.id
  const legalMoves = useLegalMoves()
  const chooseDwarfCard = legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.Army)
  const discard = legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.Discard)

  return (
    <>
      <h2 css={[title, norse]}>
        <span css={css`flex: 1`}>{t(`dwarf-card.class.${dwarfClass}`)}</span>
       </h2>
      <CardLocationRule {...props} />
      {dwarfClass && <p><Trans defaults={`rule.dwarf-card.class.${dwarfClass}`}><strong/></Trans></p>}
      <ScoreRules {...props} />
      {chooseDwarfCard && <ColumnButton move={chooseDwarfCard} {...props} />}
      {discard && <PlayMoveButton move={discard} onPlay={closeDialog} css={moveAction()}>{t('rule.card.moves.discard')}</PlayMoveButton>}
    </>
  )
}

const RoyalOfferingRules = (props: MaterialHelpProps) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()

  const legalMoves = useLegalMoves()
  const discard = legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.Discard)
  return (
    <>
      <h2 css={[title, norse]}>
        <span css={css`flex: 1`}>{t('royal-offering.name')}</span>
      </h2>
      <CardLocationRule {...props} />
      <p><Trans defaults="rule.royal-offering" values={{ additionalValue: Cards[item.id.front].bonus }}><strong/></Trans></p>
      {discard && <PlayMoveButton move={discard} onPlay={closeDialog} css={moveAction()}>{t('rule.card.moves.royal-offering')}</PlayMoveButton>}
    </>
  )
}

const HeroRules = (props: MaterialHelpProps) => {
  const { t } = useTranslation()
  const { item } = props
  const visible = item.id.front !== undefined
  return (
    <>
      <h2 css={[title, norse, normal]}>
        <span css={css`flex: 1`}><Trans defaults={visible ? `hero.name.${item.id.front}` : 'hero.name'}><strong css={rightMargin}/></Trans></span>
      </h2>
      <CardLocationRule {...props} />
      <p>{t('rule.recruitment')}</p>
      <hr/>
      {visible && <p><Trans defaults={`rule.hero.${item.id.front}`} values={getValues(item.id.front)}><strong/></Trans></p>}
      {visible && <ScoreRules {...props} />}
      <ChooseHeroMoves {...props} />
    </>
  )
}

const getValues = (card: Card) => {
  if (card === Card.Grid) {
    return { additionalValue: 7 }
  }

  return undefined
}

const ChooseHeroMoves: FC<MaterialHelpProps> = (props) => {
  const { itemIndex } = props
  const chooseHeroMoves = useLegalMoves((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && (move.location.type === LocationType.Army || move.location.type === LocationType.CommandZone))
  if (!chooseHeroMoves.length) return null

  return (
    <>
      <hr/>
      <div css={buttonContainer}>
        {chooseHeroMoves.map((move) => <ColumnButton key={JSON.stringify(move)} move={move} {...props} />)}
      </div>
    </>
  )
}

const CardLocationRule = (props: MaterialHelpProps) => {
  const { item } = props
  const location = item.location
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const player = usePlayerName(item.location?.player)
  switch (location?.type) {
    case LocationType.Army:
      return <>
        <p>{item.location?.player === playerId ? t('rule.card.army.mine') : t('rule.card.army', { player })}</p>
        <hr/>
      </>
    case LocationType.CommandZone:
      return <>
        <p>{item.location?.player === playerId ? t('rule.card.command-zone.mine') : t('rule.card.command-zone', { player })}</p>
        <hr/>
      </>
    case LocationType.Hand:
      return <>
        <p>{item.location?.player === playerId ? t('rule.card.hand.mine') : t('rule.card.hand', { player })}</p>
        <hr/>
      </>
    case LocationType.Discard:
      return <>
        <p>{t('rule.card.discard')}</p>
        <hr/>
      </>
    case LocationType.Tavern:
      return <>
        <p>{t('rule.card.tavern', { tavern: t(`tavern.${item.location?.id}`) })}</p>
        <hr/>
      </>
  }

  return null
}

const ScoreRules = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  const rules = useRules<NidavellirRules>()!
  const game = rules.game
  const me = usePlayerId()
  const player = usePlayerName(item.location?.player)
  switch (item.location?.type) {
    case LocationType.Army: {
      const score = new Score(game, item.location?.player!).get(item.location?.id)
      const itsMe = item.location?.player === me
      if (item.id.front === Card.Thrud) return null
      return (
        <>
          <hr/>
          <p>{t(itsMe ? `rule.army.score.mine.${item.location.id}` : `rule.army.score.${item.location.id}`, {
            score,
            player,
            number: rules.material(MaterialType.Card)
              .location(LocationType.Army)
              .locationId(item.location.id)
              .player(item.location?.player)
              .filter((item) => !getTypes(Cards[item.id.front]).includes(DwarfType.Neutral)).length
            })}
          </p>
        </>
      )
    }
    case LocationType.CommandZone: {
      const score = new Score(game, item.location?.player!).get(item.location?.id)
      const itsMe = item.location?.player === me
      return (
        <>
          <hr/>
          <p><Trans defaults={itsMe ? 'rule.command-zone.score.mine' : 'rule.command-zone.score'} values={{ score, player }}><strong/></Trans></p>
        </>
      )

    }
  }

  return null
}

const getRoundPerAge = (rule: NidavellirRules) => {
  const playerCount = rule.game.players.length
  if (playerCount <= 3) {
    return 4
  }

  return 3
}

const getRemainingRound = (rule: NidavellirRules) => {
  const playerCount = rule.game.players.length
  const round = rule.remind(Memory.Round)
  const age = rule.remind(Memory.Age)
  if (playerCount <= 3) {
    return age * getRoundPerAge(rule) - round + 1
  }

  return age * getRoundPerAge(rule) - round + 1
}

export const isSameLocation = (item: Partial<MaterialItem>, other: MaterialItem) => {
  return item.location?.type === other.location.type && item.location.id === other.location.id && item.location.player === other.location.player
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


const normal = css`
  font-weight: normal;
`

const norse = css`
  font-family: Norse, Arial, serif
`

const title = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.1em;
`

const rightMargin = css`
  margin-right: 0.1em
`
