import { css, Global } from '@emotion/react';
import { NidavellirOptionsSpec } from '@gamepark/nidavellir/NidavellirOptions';
import Nidavellir from '@gamepark/nidavellir/Nidavellir';
import { GameProvider, setupTranslation } from '@gamepark/react-client';
import normalize from 'emotion-normalize';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NidavellirView from './NidavellirView';
import translations from './translations.json';
import NidavellirAnimations from './animation/NidavellirAnimations';
import { gameHeight, gameWidth } from './material/Styles';

setupTranslation(translations);

const style = css`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'Oswald', 'Roboto Light', serif;
    font-size: 1vh;
    @media (max-aspect-ratio: ${gameWidth}/${gameHeight}) {
      font-size: ${gameHeight / gameWidth}vw;
    }
  }

  #root {
    position: absolute;
    height: 100vh;
    width: 100vw;
    user-select: none;
    overflow: hidden;
    background-image: url(${process.env.PUBLIC_URL + '/cover-1920.jpg'});
    background-color: white;
    background-size: cover;
    background-position: center;
    color: #eee;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="nidavellir"
      Rules={Nidavellir}
      RulesView={NidavellirView}
      optionsSpec={NidavellirOptionsSpec}
      animations={new NidavellirAnimations()}
    >
      <App />
    </GameProvider>
    <Global styles={[normalize, style]} />
  </StrictMode>,
  document.getElementById('root')
);
