/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useGame, useLegalMove, useLegalMoves, usePlay, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Card, CardDeck, Cards, isHero, isRoyalOffering } from '@gamepark/nidavellir/cards/Cards'
import { Trans, useTranslation } from 'react-i18next'
import { displayMaterialRules, isMoveItemType, MaterialGame, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { css } from '@emotion/react'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { ColumnButton, moveAction } from './ColumnButton'
import { Score } from '@gamepark/nidavellir/rules/helpers/Score'
import { FC } from 'react'
import { getTypes } from '@gamepark/nidavellir/cards/DwarfDescription'

export const DwarfCardRules = (props: MaterialRulesProps) => {
  const { item } = props
  const deck = item.location?.type === LocationType.Age1Deck || item.location?.type === LocationType.Age2Deck
  if (deck) {
    return <AgeDeckRule {...props} />
  }

  return <>
    <CardRule {...props}/>
  </>
}

const AgeDeckRule = (props: MaterialRulesProps) => {
  const { item } = props
  const rules = useRules<NidavellirRules>()!
  const age = item.location?.type === LocationType.Age1Deck ? 1 : 2
  const players = rules.players.length
  const { t } = useTranslation()
  return (
    <>
      <h2 css={norse}>{t('rule.age-deck', { age })}</h2>
      <p><Trans defaults="rules.age-deck.purpose" values={{
        players,
        age,
        drawnCards: (players === 2 ? 3 : players) * 3,
        tavernCards: (players === 2 ? 3 : players),
        round: players < 4 ? 4 : 3,
      }}><strong/></Trans></p>
      <hr/>
      <p><Trans defaults="rules.age-deck.remaining" values={{
        remaining: rules.material(MaterialType.Card).location(item.location!.type).length,
      }}>
        <strong/>
      </Trans></p>
    </>
  )
}

const CardRule = (props: MaterialRulesProps) => {
  const { item } = props
  if (isRoyalOffering(item.id.front)) {
    return <RoyalOfferingRules {...props} />
  }

  if (isHero(item.id.front) || item.id.back === CardDeck.Hero) {
    return <HeroRules {...props} />
  }

  return <DwarfRules {...props} />
}

const DwarfRules = (props: MaterialRulesProps) => {
  const { item, itemIndex } = props
  const { t } = useTranslation()
  const rules = useRules<NidavellirRules>()!
  const play = usePlay()

  const { previous, next } = getCardNavigation(rules, item, itemIndex!)

  // TODO: can be multiple type
  const type = item.id.front ? getTypes(Cards[item.id.front])?.[0] : undefined
  const dwarfClass = type ?? item.location?.id
  const chooseDwarfCard = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.Army)
  return (
    <>
      <h2 css={[title, norse]}>
        {!!previous.length &&
            <div css={navigation} onClick={() => play(displayMaterialRules(MaterialType.Card, previous.getItem(), previous.getIndex()), { local: true })}><span>&lt;</span></div>}
        {t(`dwarf-card.class.${dwarfClass}`)}
        {!!next.length &&
            <div css={navigation} onClick={() => play(displayMaterialRules(MaterialType.Card, next.getItem(), next.getIndex()), { local: true })}><span>&gt;</span></div>}
      </h2>
      <CardLocationRule {...props} />
      {dwarfClass && <p><Trans defaults={`rule.dwarf-card.class.${dwarfClass}`}><strong/></Trans></p>}
      <ScoreRules {...props} />
      {chooseDwarfCard && <ColumnButton move={chooseDwarfCard} {...props} />}
    </>
  )
}

const RoyalOfferingRules = (props: MaterialRulesProps) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const rules = useRules<NidavellirRules>()!
  const play = usePlay()

  const { previous, next } = getCardNavigation(rules, item, itemIndex!)
  const chooseRoyalOffering = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.Discard)

  return (
    <>
      <h2 css={[title, norse]}>
        {!!previous.length &&
            <div css={navigation} onClick={() => play(displayMaterialRules(MaterialType.Card, previous.getItem(), previous.getIndex()), { local: true })}><span>&lt;</span></div>}
        {t('royal-offering.name')}
        {!!next.length &&
            <div css={navigation} onClick={() => play(displayMaterialRules(MaterialType.Card, next.getItem(), next.getIndex()), { local: true })}><span>&gt;</span></div>}
      </h2>
      <CardLocationRule {...props} />
      <p><Trans defaults="rule.royal-offering" values={{ additionalValue: Cards[item.id.front].bonus }}><strong/></Trans></p>
      {chooseRoyalOffering && <PlayMoveButton move={chooseRoyalOffering} onPlay={closeDialog} css={moveAction()}>{t('rule.card.moves.royal-offering')}</PlayMoveButton>}
    </>
  )
}

const HeroRules = (props: MaterialRulesProps) => {
  const { item, itemIndex } = props
  const rules = useRules<NidavellirRules>()!
  const play = usePlay()
  const { previous, next } = getCardNavigation(rules, item, itemIndex!)
  const visible = item.id.front !== undefined
  return (
    <>
      <h2 css={[title, norse, normal]}>
        {!!previous.length &&
            <div css={[navigation, normal]} onClick={() => play(displayMaterialRules(MaterialType.Card, previous.getItem(), previous.getIndex()), { local: true })}>
                <span>&lt;</span></div>}
        <Trans defaults={visible ? `hero.name.${item.id.front}` : 'hero.name'}><strong css={rightMargin}/></Trans>
        {!!next.length &&
            <div css={navigation} onClick={() => play(displayMaterialRules(MaterialType.Card, next.getItem(), next.getIndex()), { local: true })}><span>&gt;</span></div>}
      </h2>
      <CardLocationRule {...props} />
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

const ChooseHeroMoves: FC<MaterialRulesProps> = (props) => {
  const { itemIndex } = props
  const chooseHeroMoves = useLegalMoves((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && (move.position.location?.type === LocationType.Army || move.position.location?.type === LocationType.CommandZone))
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

const CardLocationRule = (props: MaterialRulesProps) => {
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

const ScoreRules = (props: MaterialRulesProps) => {
  const { item } = props
  const { t } = useTranslation()
  const game = useGame<MaterialGame>()!
  const me = usePlayerId()
  const player = usePlayerName(item.location?.player)
  switch (item.location?.type) {
    case LocationType.Army: {
      const score = new Score(game, item.location?.player!).get(item.location?.id)
      const itsMe = item.location?.player === me
      return (
        <>
          <hr/>
          <p><Trans defaults={itsMe ? 'rule.army.score.mine' : 'rule.army.score'} values={{ type: t(`dwarf-card.class.${item.location?.id}`), score, player }}><strong/></Trans></p>
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


const getCardNavigation = (rules: NidavellirRules, item: Partial<MaterialItem>, itemIndex: number) => {
  const cards = rules.material(MaterialType.Card)
    .sort((item) => item.location.x!)
    .filter((other) => isSameLocation(item, other))

  const indexes = cards.getIndexes()
  const previous = cards.index(indexes[indexes.indexOf(itemIndex!) - 1])
  const next = cards.index(indexes[indexes.indexOf(itemIndex!) + 1])
  return { previous, next }
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

const navigation = css`
  margin-left: 0.4em;
  margin-right: 0.4em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  border-radius: 0.2em;
  border: 0.05em solid black;
  box-sizing: border-box;
  cursor: pointer;

  ${normal}
  &:hover,
  &:active {
    background-color: white;
  }
`

const norse = css`
  font-family: Norse, Arial, Serif
`

const title = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const rightMargin = css`
  margin-right: 0.1em
`
