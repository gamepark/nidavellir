// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
// import { FC } from 'react';
// import GameView from '@gamepark/nidavellir/state/view/GameView';
// import { Player } from '@gamepark/nidavellir/state/Player';
// import { playerPanelScoreWidth } from '../../material/Styles';
// import { DwarfType } from '@gamepark/nidavellir/cards/DwarfDescription';
// import Images from '../../images/Images';
// import {
//   getBlacksmithScore,
//   getExplorerScore,
//   getHunterScore,
export class PlayerPanelScore{}//   getMinerScore,
//   getWarriorScore,
// } from '@gamepark/nidavellir/utils/score.utils';
//
// type PlayerPanelScoreProps = {
//   game: GameView;
//   player: Player;
// };
//
// const PlayerPanelScore: FC<PlayerPanelScoreProps> = (props) => {
//   const { game, player } = props;
//   return (
//     <div css={scoresContainer}>
//       <div css={scoreEntry}>
//         <div css={scoreIcon(DwarfType.Blacksmith)}></div>
//         <div css={scoreValue}>
//           <span>{getBlacksmithScore(game, player.id)}</span>
//         </div>
//       </div>
//       <div css={scoreEntry}>
//         <div css={scoreIcon(DwarfType.Hunter)}></div>
//         <div css={scoreValue}>
//           <span>{getHunterScore(game, player.id)}</span>
//         </div>
//       </div>
//       <div css={scoreEntry}>
//         <div css={scoreIcon(DwarfType.Explorer)}></div>
//         <div css={scoreValue}>
//           <span>{getExplorerScore(game, player.id)}</span>
//         </div>
//       </div>
//       <div css={scoreEntry}>
//         <div css={scoreIcon(DwarfType.Miner)}></div>
//         <div css={scoreValue}>
//           <span>{getMinerScore(game, player.id)}</span>
//         </div>
//       </div>
//       <div css={scoreEntry}>
//         <div css={scoreIcon(DwarfType.Warrior)}></div>
//         <div css={scoreValue}>
//           <span>{getWarriorScore(game, player.id)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// const scoresContainer = css`
//   position: absolute;
//   width: ${playerPanelScoreWidth}em;
//   height: 100%;
//   right: 0;
//   top: 0;
//   display: flex;
//   flex-direction: column;
// `;
//
// const scoreEntry = css`
//   flex: 1;
//   display: flex;
//   flex-direction: row;
//
//   &:not(:last-of-type) {
//     border-bottom: 0.1em solid black;
//   }
// `;
//
// const scoreIcon = (type: DwarfType) => css`
//   flex: 2;
//   background-size: contain;
//   background-image: url(${getDwarfIcon(type)!.icon});
//   background-color: gray;
// `;
//
// const scoreValue = css`
//   flex: 3;
//   font-family: 'Norse', 'Arial', serif;
//   color: black;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   padding-right: 0.5em;
//   background-color: white;
//
//   > span {
//     font-size: 2.5em;
//   }
// `;
//
// const getDwarfIcon = (type: DwarfType) => {
//   switch (type) {
//     case DwarfType.Blacksmith:
//       return { icon: Images.BlacksmithIcon };
//     case DwarfType.Hunter:
//       return { icon: Images.HunterIcon };
//     case DwarfType.Explorer:
//       return { icon: Images.ExplorerIcon };
//     case DwarfType.Miner:
//       return { icon: Images.MinerIcon };
//     case DwarfType.Warrior:
//       return { icon: Images.WarriorIcon };
//   }
//
//   return null;
// };
//
// export { PlayerPanelScore };
