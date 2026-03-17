import { NidavellirOptionsSpec } from '@gamepark/nidavellir/NidavellirOptions'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { NidavellirSetup } from '@gamepark/nidavellir/NidavellirSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { nidavellirAnimations } from './animation/NidavellirAnimation'
import App from './App'
import { Locators } from './locator/Locators'
import { material } from './material/Material'
import { Tutorial } from './tutorial/Tutorial'
import { ai } from './tutorial/TutorialAi'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="nidavellir"
      Rules={NidavellirRules}
      optionsSpec={NidavellirOptionsSpec}
      GameSetup={NidavellirSetup}
      material={material}
      locators={Locators}
      tutorial={new Tutorial()}
      animations={nidavellirAnimations}
      ai={ai}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
