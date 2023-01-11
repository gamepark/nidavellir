/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useMemo } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { Player } from '@gamepark/nidavellir/state/Player';
import { getArmy } from '@gamepark/nidavellir/utils/player.utils';
import { playerPanelScoreWidth } from '../../material/Styles';
import { DwarfType } from '@gamepark/nidavellir/cards/Card';
import { HeroType } from '@gamepark/nidavellir/cards/Hero';
import Images from '../../images/Images';

type PlayerPanelScoreProps = {
  game: GameView;
  player: Player;
};

const PlayerPanelScore: FC<PlayerPanelScoreProps> = (props) => {
  const { game, player } = props;
  const army = useMemo(() => getArmy(game, player.id), [game]);

  //TODO: compute score of each type
  console.log('Army', army);
  return (
    <div css={scoresContainer}>
      <div css={scoreEntry}>
        <div css={scoreIcon(DwarfType.Blacksmith)}></div>
        <div css={scoreValue}>
          <span>999</span>
        </div>
      </div>
      <div css={scoreEntry}>
        <div css={scoreIcon(DwarfType.Hunter)}></div>
        <div css={scoreValue}>
          <span>999</span>
        </div>
      </div>
      <div css={scoreEntry}>
        <div css={scoreIcon(DwarfType.Explorer)}></div>
        <div css={scoreValue}>
          <span>999</span>
        </div>
      </div>
      <div css={scoreEntry}>
        <div css={scoreIcon(DwarfType.Miner)}></div>
        <div css={scoreValue}>
          <span>999</span>
        </div>
      </div>
      <div css={scoreEntry}>
        <div css={scoreIcon(DwarfType.Warrior)}></div>
        <div css={scoreValue}>
          <span>999</span>
        </div>
      </div>
    </div>
  );
};

const scoresContainer = css`
  position: absolute;
  width: ${playerPanelScoreWidth}em;
  height: 100%;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const scoreEntry = css`
  flex: 1;
  display: flex;
  flex-direction: row;

  &:not(:last-of-type) {
    border-bottom: 0.1em solid black;
  }
`;

const scoreIcon = (type: DwarfType) => css`
  flex: 2;
  background-size: contain;
  background-image: url(${getDwardIcon(type)!.icon});
  background-color: gray;
`;

const scoreValue = css`
  flex: 3;
  font-family: 'Norse', 'Arial', serif;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5em;

  > span {
    font-size: 2.5em;
  }
`;

const getDwardIcon = (type: DwarfType | HeroType) => {
  switch (type) {
    case DwarfType.Blacksmith:
      return { icon: Images.BlacksmithIcon };
    case DwarfType.Hunter:
      return { icon: Images.HunterIcon };
    case DwarfType.Explorer:
      return { icon: Images.ExplorerIcon };
    case DwarfType.Miner:
      return { icon: Images.MinerIcon };
    case DwarfType.Warrior:
      return { icon: Images.WarriorIcon };
  }

  return null;
};

export { PlayerPanelScore };
