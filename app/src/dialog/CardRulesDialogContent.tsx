/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { FC, useCallback } from 'react';
import { useLegalMoves } from '../hook/rules.hook';
import { usePlayerId } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { isSameCardLocation } from '@gamepark/nidavellir/utils/location.utils';
import { MoveButton } from './moves/MoveButton';
import { useTranslation } from 'react-i18next';

type CardRulesDialogContentProps = {
  game: GameView;
  card: SecretCard;
  close: () => void;
  moveTypes?: MoveType[];
  cardRules: RuleDetail;
  CardComponent: FC<any>;
};

export type RuleDetail = {
  header: any;
  description: any;
};

const CardRulesDialogContent: FC<CardRulesDialogContentProps> = (props) => {
  const { game, card, moveTypes = [], cardRules, close, CardComponent } = props;
  const { t } = useTranslation();
  const playerId = usePlayerId();
  const predicate = useCallback(
    (move: any) => (move.id !== undefined ? card.id === move.id : isSameCardLocation(card.location, move.source)),
    [card]
  );
  const legalMoves = useLegalMoves(game, playerId, moveTypes, predicate);

  const hasActions = !!legalMoves.length;
  return (
    <div css={container}>
      <div css={cardContainer}>
        <CardComponent card={card} css={cardInRules} scale={2} />
      </div>
      <div css={descriptionContainer}>
        <div css={rulesContainer}>
          <span css={ruleHeader}>{cardRules.header}</span>
          <div css={ruleDescription}>
            <div>{cardRules.description}</div>
          </div>
          {hasActions && (
            <div css={movesContainer}>
              <div css={actionTitle}>
                <span>{t('Actions')}</span>
              </div>
              <div css={buttonContainer}>
                {legalMoves.map((m, index) => (
                  <MoveButton key={index} move={m} onClick={close} game={game} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const cardContainer = css`
  flex: 1;
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
  text-align: left;

  > div {
    font-size: 3em;
    white-space: pre-wrap;
    text-align: justify;
  }
`;

const movesContainer = css`
  flex: 1;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const cardInRules = css`
  position: relative;
`;

const actionTitle = css`
  font-weight: bold;
  font-family: 'Norse', 'Arial', serif;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.5);
  height: 5em;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 2em;

  > span {
    font-size: 4em;
  }
`;

const buttonContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
`;

export { CardRulesDialogContent };
