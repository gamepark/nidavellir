import { LocationType } from '../material/LocationType'
import { FillGapStrategy, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { TreasureLocationStrategy } from './TreasureLocationStrategy'

export const locationsStrategies = {
  [MaterialType.Card]: {
    [LocationType.Age1Deck]: new PositiveSequenceStrategy(),
    [LocationType.Age2Deck]: new PositiveSequenceStrategy(),
    [LocationType.Tavern]: new FillGapStrategy(),
    [LocationType.HeroesDeck]: new FillGapStrategy(),
    [LocationType.Hand]: new PositiveSequenceStrategy(),
    [LocationType.Discard]: new PositiveSequenceStrategy(),
    [LocationType.Army]: new PositiveSequenceStrategy(),
    [LocationType.DistinctionsDeck]: new PositiveSequenceStrategy(),
    [LocationType.CommandZone]: new PositiveSequenceStrategy()
  },
  [MaterialType.Coin]: {
    [LocationType.Treasure]: new TreasureLocationStrategy(),
    [LocationType.Hand]: new PositiveSequenceStrategy(),
    [LocationType.Discard]: new PositiveSequenceStrategy(),
    [LocationType.DistinctionsDeck]: new PositiveSequenceStrategy()
  },
  [MaterialType.Gem]: {
    [LocationType.PlayerBoard]: new PositiveSequenceStrategy()
  },
  [MaterialType.Distinction]: {
    [LocationType.CommandZone]: new PositiveSequenceStrategy(),
    [LocationType.DistinctionsDeck]: new PositiveSequenceStrategy()
  }
}
