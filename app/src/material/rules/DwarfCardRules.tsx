/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { Cards, isHero, isRoyalOffering } from "@gamepark/nidavellir/cards/Cards";
import { useTranslation } from "react-i18next";
import { isMoveItemType } from "@gamepark/rules-api/dist/material/moves/items/MoveItem";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";

export const DwarfCardRules = (props: MaterialRulesProps) => {
  const { item} = props;
  const { t } = useTranslation()

  if (!item.id.front) {
    // TODO: Describe hidden card (age deck)
    return <p></p>
  }

  return <>
    <h2>{item.id.front ? t(`card.name.${item.id.front}`) : t('rules.card.age', { age: t(`faction.${item.id.back}`) })}</h2>
    <CardRule {...props}/>
    {item.id.front && <CardRule {...props}/>}
  </>
}

const CardLocationRule = (_props: MaterialRulesProps) => {
  return null;
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
  const { item, itemIndex, closeDialog } = props;
  const { t } = useTranslation()
  const dwarfClass = item.id.front ? Cards[item.id.front].type : undefined;
  const chooseDwarfCard = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.Army)

  return (
    <>
      <h2>{dwarfClass ? t(`dwarf-card.class.${dwarfClass}`) : t('rule.card.age', { age: t(`age.${item.id.back}`) })}</h2>
      <CardLocationRule {...props} />
      {dwarfClass && <p>{t(`rule.dwarf-card.class.${dwarfClass}`)}</p>}
      {chooseDwarfCard && <PlayMoveButton move={chooseDwarfCard} onPlay={closeDialog}>{t('card.choose')}</PlayMoveButton>}
    </>
  )
}


const RoyalOfferingRules = (_props: MaterialRulesProps) => {
  return null;
}


const HeroRules = (props: MaterialRulesProps) => {
  const { item, itemIndex, closeDialog } = props;
  const { t } = useTranslation()
  const placeInArmyMove = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.Army)
  const placeInCommandZoneMove = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.position.location?.type === LocationType.CommandZone)

  return (
    <>
      <h2>{t(`hero.name.${item.id.front}`)}</h2>
      <CardLocationRule {...props} />
      <p>{t(`rule.hero.${item.id.front}`)}</p>
      {placeInArmyMove && <PlayMoveButton move={placeInArmyMove} onPlay={closeDialog}>{t('card.choose.army', { type: placeInArmyMove.position.id })}</PlayMoveButton>}
      {placeInCommandZoneMove && <PlayMoveButton move={placeInCommandZoneMove} onPlay={closeDialog}>{t('card.choose.command-zone')}</PlayMoveButton>}
    </>
  )
}
