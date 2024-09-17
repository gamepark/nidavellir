import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { AgeDeckLocator } from './AgeDeckLocator'
import { ArmyLocator } from './ArmyLocator'
import { CoinLocationDescription } from './CoinLocationDescription'
import { CommandZoneLocator } from './CommandZoneLocator'
import { DiscardLocator } from './DiscardLocator'
import { DistinctionDeckLocator } from './DistinctionDeckLocator'
import { HeroDeckLocator } from './HeroDeckLocator'
import { PlayerBoardSpaceLocator } from './PlayerBoardSpaceLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { PlayerReminderLocator } from './PlayerReminderLocator'
import { tableLocator } from './TableLocator'
import { TavernLocator } from './TavernLocator'
import { TreasureLocator } from './TreasureLocator'

export const Locators: Record<LocationType, Locator<PlayerId, MaterialType, LocationType>> = {
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
  [LocationType.Coin]: new Locator({ parentItemType: MaterialType.Coin, locationDescription: new CoinLocationDescription() }),
  [LocationType.Grade]: new Locator({
    locationDescription: new LocationDescription({ width: 2, height: 1 }),
    parentItemType: MaterialType.Card,
    positionOnParent: { x: 16, y: 10 }
  }),
  [LocationType.PlayerReminder]: new PlayerReminderLocator()

}
