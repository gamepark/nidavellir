import { LocationType } from '../material/LocationType'
import { PositiveSequenceStrategy } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'

export const locationsStrategies = {
  [MaterialType.Card]: {
    [LocationType.Age1Deck]: new PositiveSequenceStrategy(),
    [LocationType.Age2Deck]: new PositiveSequenceStrategy(),
    [LocationType.Tavern]: new PositiveSequenceStrategy(),
    [LocationType.HeroesDeck]: new PositiveSequenceStrategy(),
    [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
    [LocationType.Discard]: new PositiveSequenceStrategy(),
    [LocationType.Army]: new PositiveSequenceStrategy("y"),
    [LocationType.DistinctionsDeck]: new PositiveSequenceStrategy(),
  },
  [MaterialType.Coin]: {
    [LocationType.Treasure]: new PositiveSequenceStrategy(),
    [LocationType.CommandZone]: new PositiveSequenceStrategy(),
    [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
    [LocationType.Discard]: new PositiveSequenceStrategy(),
    [LocationType.DistinctionsDeck]: new PositiveSequenceStrategy(),
  },
  [MaterialType.Distinction]: {
    [LocationType.CommandZone]: new PositiveSequenceStrategy(),
    [LocationType.DistinctionsDeck]: new PositiveSequenceStrategy()
  }
}
