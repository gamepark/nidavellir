import { NidavellirOptionsSpec } from '@gamepark/nidavellir/NidavellirOptions'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { NidavellirSetup } from '@gamepark/nidavellir/NidavellirSetup'
import { material } from './material/Material'
import { Locators } from './locator/Locators'
import { NidavellirAnimations } from './animation/NidavellirAnimation'
import { Tutorial } from './tutorial/Tutorial'
import { ai } from './tutorial/TutorialAi'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="nidavellir"
                  GameSetup={NidavellirSetup}
                  Rules={NidavellirRules}
                  optionsSpec={NidavellirOptionsSpec}
                  material={material}
                  locators={Locators}
                  tutorial={new Tutorial()}
                  animations={new NidavellirAnimations()}
                  ai={ai}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)

