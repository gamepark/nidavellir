/** @jsxImportSource @emotion/react */
import { MaterialTutorial } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { NidavellirSetup } from '@gamepark/nidavellir/NidavellirSetup'

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 1
  options = { players: 2 }
  setup = new NidavellirSetup()

  players = [{ id: 1 }, { id: 2 }]

  steps = []
}