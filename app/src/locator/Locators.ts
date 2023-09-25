import { ItemLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { AgeDeckLocator } from './AgeDeckLocator'
import { DistinctionDeckLocator } from './DistinctionDeckLocator'
import { HeroDeckLocator } from './HeroDeckLocator'
import { TavernLocator } from './TavernLocator'
import { TreasureLocator } from './TreasureLocator'
import { PlayerBoardSpaceLocator } from './PlayerBoardSpaceLocator'
import { TableLocator } from './TableLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { CommandZoneLocator } from './CommandZoneLocator'
import { ArmyLocator } from './ArmyLocator'
import { DiscardLocator } from './DiscardLocator'
import { CoinLocator } from './CoinLocator'
import { GradeLocator } from './GradeLocator'

export const Locators: Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>> = {
  [LocationType.Age1Deck]: new AgeDeckLocator(),
  [LocationType.Age2Deck]: new AgeDeckLocator(),
  [LocationType.DistinctionsDeck]: new DistinctionDeckLocator(),
  [LocationType.HeroesDeck]: new HeroDeckLocator(),
  [LocationType.PlayerBoard]: new PlayerBoardSpaceLocator(),
  [LocationType.Tavern]: new TavernLocator(),
  [LocationType.Treasure]: new TreasureLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Discard]: new DiscardLocator(),
  [LocationType.Army]: new ArmyLocator(),
  [LocationType.CommandZone]: new CommandZoneLocator(),
  [LocationType.Table]: new TableLocator(),
  [LocationType.Coin]: new CoinLocator(),
  [LocationType.Grade]: new GradeLocator()

}
