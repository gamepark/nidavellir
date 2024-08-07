/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Images from "../../images/Images";
import { MoveItem } from "@gamepark/rules-api";
import { MaterialHelpProps, PlayMoveButton } from "@gamepark/react-game";
import { Tavern } from "@gamepark/nidavellir/material/Tavern";
import { PlayerBoardSpace } from "@gamepark/nidavellir/material/PlayerBoardSpace";
import { LocationType } from '@gamepark/nidavellir/material/LocationType'


type PlaceCoinButtonProps = {
  move: MoveItem
} & MaterialHelpProps

export const  PlaceCoinButton = (props: PlaceCoinButtonProps) => {
  const { t } = useTranslation()
  const { move, closeDialog } = props;
  const icon = getSpaceIcon(move)
  return (
    <PlayMoveButton move={move} css={moveAction(!!icon)} onPlay={closeDialog}>
      {!!icon && <div css={iconStyle(icon)}></div>}
      {t(getToColumnText(move))}
    </PlayMoveButton>
  )
}

const getToColumnText = (move: MoveItem) => {
  if (move.location.type === LocationType.Hand) {
    return  'rule.coin.moves.hand';
  }

  switch (move.location.id) {
    case Tavern.LaughingGoblin:
      return  'rule.coin.moves.laughing-goblin';
    case Tavern.DancingDragon:
      return  'rule.coin.moves.dancing-dragon';
    case Tavern.ShiningHorse:
      return  'rule.coin.moves.shining-horde';
    case PlayerBoardSpace.Pouch1:
      return  'rule.coin.moves.pouch1';
    case PlayerBoardSpace.Pouch2:
    default:
      return  'rule.coin.moves.pouch2';
  }
};

const getSpaceIcon = (move: MoveItem) => {
  if (move.location.type === LocationType.Hand) return

  switch (move.location.id) {
    case PlayerBoardSpace.LaughingGoblin:
      return Images.LaughingGoblinIcon;
    case PlayerBoardSpace.DancingDragon:
      return Images.DancingDragonIcon;
    case PlayerBoardSpace.ShiningHorse:
      return Images.ShiningHorseIcon;
    case PlayerBoardSpace.Pouch1:
    case PlayerBoardSpace.Pouch2:
    default:
      return Images.PouchIcon
  }
};

export const greyBackground = '#E9E3D8'
export const moveAction = (icon: boolean) => css`
  border: 0.1em solid black;
  border-radius: 0.8em;
  background-color: ${greyBackground};
  font-family: 'Norse', 'Arial', serif;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5em 1em 0.5em ${icon? 2: 1}em;

  &:hover,
  &:active {
    background-color: white;
  }
`

const iconStyle = (icon: any) => css`
  position: absolute;
  transform: translate(-1.5em, 0);
  width: 1.2em;
  height: 1.2em;
  background-image: url(${icon});
  background-size: cover;
`;
