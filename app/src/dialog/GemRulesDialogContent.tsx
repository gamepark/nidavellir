/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { FC } from 'react';
import { GemRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog';
import { Trans } from 'react-i18next';
import { GemToken } from '../material/gem/GemToken';
import { Gems } from '@gamepark/nidavellir/gems/Gems';

type GemRulesDialogContentProps = {
  game: GameView;
  rulesDialog: GemRulesDialog;
  close: () => void;
};

const GemRulesDialogContent: FC<GemRulesDialogContentProps> = (props) => {
  const { rulesDialog } = props;
  const { gem } = rulesDialog;
  const gemValue = Gems[gem.id].value;
  return (
    <div css={container}>
      <div css={gemContainer}>
        <GemToken gem={gem} css={gemInRules} scale={2} />
      </div>
      <div css={descriptionContainer}>
        <div css={rulesContainer}>
          <span css={ruleHeader}>
            <Trans defaults="gem.rules.header" components={[<strong />]} values={{ value: gemValue }} />
          </span>
          <div css={ruleDescription}>
            <div>
              <Trans
                defaults="gem.rules.desc"
                components={[<strong />, <div css={divider} />]}
                values={{ value: gemValue }}
              />
              {gemValue === 6 && (
                <>
                  <div css={divider} />
                  <Trans defaults="gem.rules.gem6" components={[<strong />]} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const divider = css`
  width: 20%;
  border-bottom: 0.1em solid rgba(0, 0, 0, 0.5);
`;

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const gemContainer = css`
  flex: 1;
  display: flex;
  padding: 2em;
`;

const descriptionContainer = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 2em;
`;

const rulesContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
`;

const ruleHeader = css`
  font-size: 5em;
  text-align: center;
  font-family: 'Norse', 'Arial', serif;
  font-weight: bold;
`;

const ruleDescription = css`
  margin-top: 2em;
  margin-bottom: 2em;
  text-align: left;

  > div {
    font-size: 2.4em;
    white-space: pre-wrap;
    text-align: justify;
    padding-bottom: 1.5em;
  }
`;

const gemInRules = css`
  position: relative;
`;

export { GemRulesDialogContent };
