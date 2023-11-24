import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemLocator } from '@gamepark/react-game'
import { AgeDeckLocator } from './AgeDeckLocator'
import { ArmyLocator } from './ArmyLocator'
import { CoinLocator } from './CoinLocator'
import { CommandZoneLocator } from './CommandZoneLocator'
import { DiscardLocator } from './DiscardLocator'
import { DistinctionDeckLocator } from './DistinctionDeckLocator'
import { GradeLocator } from './GradeLocator'
import { HeroDeckLocator } from './HeroDeckLocator'
import { PlayerBoardSpaceLocator } from './PlayerBoardSpaceLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { PlayerReminderLocator } from './PlayerReminderLocator'
import { tableLocator } from './TableLocator'
import { TavernLocator } from './TavernLocator'
import { TreasureLocator } from './TreasureLocator'

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
  [LocationType.Table]: tableLocator,
  [LocationType.Coin]: new CoinLocator(),
  [LocationType.Grade]: new GradeLocator(),
  [LocationType.PlayerReminder]: new PlayerReminderLocator()

}
