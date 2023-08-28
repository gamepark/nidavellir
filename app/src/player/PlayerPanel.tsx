// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
export class PlayerPanel {}
// import { Avatar } from '@gamepark/react-client'
// import GameView from '@gamepark/nidavellir/state/view/GameView'
// import { FC } from 'react'
// import { playerPanelHeight, playerPanelsWidth } from '../material/Styles'
// //import { Player } from '@gamepark/nidavellir/state/Player'
// import { PlayerPanelTaverns } from './panel/PlayerPanelTaverns'
// import { PlayerPanelScore } from './panel/PlayerPanelScore'
// import { usePlayerName } from '../hook/player.hook'
//
// type PlayerPanelProps = {
//   player: Player;
//   index: number;
//   game: GameView;
//   selected: boolean;
//   onPanelClick: (playerId: number) => void;
// };
//
// const PlayerPanel: FC<PlayerPanelProps> = (props) => {
//   const { player, index, selected, game, onPanelClick } = props
//   const name = usePlayerName(player.id)
//   const { id } = player
//
//   return (
//     <div css={ [playerPanel(index), selected && selectedPanel] } onClick={ () => onPanelClick(id) }>
//       <Avatar playerId={ id } css={ avatarStyle }/>
//
//       <div css={ playerName }>
//         <span>{ name }</span>
//       </div>
//       <PlayerPanelTaverns game={ game } player={ player }/>
//       <PlayerPanelScore game={ game } player={ player }/>
//     </div>
//   )
// }
//
// const avatarStyle = css`
//   height: 5em;
//   width: 5em;
//   position: absolute;
//   top: 1em;
//   left: 1em;
// `
//
// const playerName = css`
//   position: absolute;
//   top: 0.4em;
//   left: 7em;
//
//   > span {
//     font-size: 3em;
//     color: black;
//     font-family: 'Norse', 'Arial', serif;
//     font-weight: bold;
//   }
// `
//
// const playerPanel = (index: number) => css`
//   position: absolute;
//   transform: translate3d(1em, ${ 1.5 + index * (1 + playerPanelHeight) }em, 0);
//   height: ${ playerPanelHeight }em;
//   width: ${ playerPanelsWidth - 2 }em;
//   background-color: #e9e3d8;
//   border-radius: 1em;
//   cursor: pointer;
//   border: 0.2em solid black;
//   overflow: hidden;
// `
//
// const selectedPanel = css`
//   background-color: #c3ebf1;
// `
//
// export { PlayerPanel }
