import { NidavellirOptionsSpec } from '@gamepark/nidavellir/NidavellirOptions'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { NidavellirSetup } from "@gamepark/nidavellir/NidavellirSetup";
import { material } from "./material/Material";
import { Locators } from "./locator/Locators";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { NidavellirAnimations } from "./animation/NidavellirAnimation";

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="nidavellir" GameSetup={NidavellirSetup} Rules={NidavellirRules} optionsSpec={NidavellirOptionsSpec}
                  material={material as Record<MaterialType, any>} locators={Locators} animations={new NidavellirAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)

