import { LocationType } from '../material/LocationType'
import { PositiveSequenceStrategy } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { TreasureLocationStrategy } from "./TreasureLocationStrategy";
import { OnlyAddPositiveStrategy } from "./OnlyAddPositiveStrategy";

export const locationsStrategies = {
  [MaterialType.Card]: {
    [LocationType.Age1Deck]: new PositiveSequenceStrategy(),
    [LocationType.Age2Deck]: new PositiveSequenceStrategy(),
    [LocationType.Tavern]: new OnlyAddPositiveStrategy(),
    [LocationType.HeroesDeck]: new OnlyAddPositiveStrategy(),
    [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
    [LocationType.Discard]: new PositiveSequenceStrategy(),
    [LocationType.Army]: new PositiveSequenceStrategy(),
    [LocationType.DistinctionsDeck]: new PositiveSequenceStrategy(),
  },
  [MaterialType.Coin]: {
    [LocationType.Treasure]: new TreasureLocationStrategy(),
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
