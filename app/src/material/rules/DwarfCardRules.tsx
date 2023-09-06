/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useGame, useLegalMove, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Cards, isHero, isRoyalOffering } from "@gamepark/nidavellir/cards/Cards";
import { Trans, useTranslation } from "react-i18next";
import { isMoveItemType } from "@gamepark/rules-api/dist/material/moves/items/MoveItem";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { css } from "@emotion/react";
import NidavellirRules from "@gamepark/nidavellir/NidavellirRules";
import { ColumnButton, moveAction } from "./ColumnButton";
import { Score } from "@gamepark/nidavellir/rules/helpers/Score";
import { MaterialGame } from "@gamepark/rules-api/dist/material/MaterialGame";

export const DwarfCardRules = (props: MaterialRulesProps) => {
  const { item } = props;
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
  const rules = useRules<NidavellirRules>()!;
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
        round: players < 4 ? 4 : 3
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
  const { item } = props;
  if (isRoyalOffering(item.id.front)) {
    return <RoyalOfferingRules {...props} />
  }

  if (isHero(item.id.front)) {
    return <HeroRules {...props} />
  }

  return <DwarfRules {...props} />
}

const DwarfRules = (props: MaterialRulesProps) => {
  const { item, itemIndex } = props;
  const { t } = useTranslation()
  const dwarfClass = item.id.front ? Cards[item.id.front].type : undefined;
  const chooseDwarfCard = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.Army)
  return (
    <>
      <h2 css={norse}>{t(`dwarf-card.class.${dwarfClass}`)}</h2>
      <CardLocationRule {...props} />
      {dwarfClass && <p><Trans defaults={`rule.dwarf-card.class.${dwarfClass}`}><strong/></Trans></p>}
      <ScoreRules {...props} />
      {chooseDwarfCard && <ColumnButton move={chooseDwarfCard} {...props} />}
    </>
  )
}

const RoyalOfferingRules = (props: MaterialRulesProps) => {
  const { item, itemIndex, closeDialog } = props;
  const { t } = useTranslation()
  const chooseRoyalOffering = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.Discard)

  return (
    <>
      <h2 css={norse}>{t('royal-offering.name')}</h2>
      <CardLocationRule {...props} />
      <p><Trans defaults="rule.royal-offering" values={{ additionalValue: Cards[item.id.front].bonus }}><strong/></Trans></p>
      {chooseRoyalOffering && <PlayMoveButton move={chooseRoyalOffering} onPlay={closeDialog} css={moveAction()}>{t('rule.card.moves.royal-offering')}</PlayMoveButton>}
    </>
  )
}

const HeroRules = (props: MaterialRulesProps) => {
  const { item, itemIndex } = props;
  const chooseHeroMoves = useLegalMoves((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && (move.position.location?.type === LocationType.Army || move.position.location?.type === LocationType.CommandZone))

  return (
    <>
      <h2 css={[norse, normal]}><Trans defaults={`hero.name.${item.id.front}`}><strong/></Trans></h2>
      <CardLocationRule {...props} />
      <p><Trans defaults={`rule.hero.${item.id.front}`}><strong/></Trans></p>
      <ScoreRules {...props} />
      {chooseHeroMoves.map((move, index) => (
        <ColumnButton key={index} move={move} {...props} />
      ))}
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

  return null;
}

const ScoreRules = (props: MaterialRulesProps) => {
  const { item } = props;
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
          <p><Trans defaults={itsMe ? "rule.army.score.mine" : "rule.army.score"} values={{ type: t(`dwarf-card.class.${item.location?.id}`), score, player }}><strong/></Trans></p>
        </>
      )
    }
    case LocationType.CommandZone: {
      const score = new Score(game, item.location?.player!).get(item.location?.id)
      const itsMe = item.location?.player === me
      return (
        <>
          <hr/>
          <p><Trans defaults={itsMe ? "rule.command-zone.score.mine" : "rule.command-zone.score.score"} values={{ score, player }}><strong/></Trans></p>
        </>
      )

    }
  }

  return null;
}

const normal = css`
  font-weight: normal;
`

const norse = css`
  font-family: Norse, Arial, Serif
`