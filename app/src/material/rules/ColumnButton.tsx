/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { DwarfType } from "@gamepark/nidavellir/cards/DwarfType";
import Images from "../../images/Images";
import { MoveItem } from "@gamepark/rules-api";
import { MaterialHelpProps, PlayMoveButton } from "@gamepark/react-game";

type ColumnButtonProps = {
  move: MoveItem
} & MaterialHelpProps

export const ColumnButton = (props: ColumnButtonProps) => {
  const { t } = useTranslation()
  const { move, closeDialog } = props;
  const icon = getDwarfIcon(move)
  return (
    <PlayMoveButton move={move} css={moveAction(true)} onPlay={closeDialog}>
      <div css={iconStyle(icon)}></div>
      {t(getToColumnText(move))}
    </PlayMoveButton>
  )
}

const getToColumnText = (move: MoveItem) => {
  switch (move.location.id) {
    case DwarfType.Blacksmith:
      return 'rule.card.moves.blacksmith';
    case DwarfType.Hunter:
      return 'rule.card.moves.hunter';
    case DwarfType.Explorer:
      return 'rule.card.moves.explorer';
    case DwarfType.Miner:
      return 'rule.card.moves.miner';
    case DwarfType.Warrior:
      return 'rule.card.moves.warrior';
    default:
      return 'rule.card.moves.command-zone';
  }
};

const getDwarfIcon = (move: MoveItem) => {
  switch (move.location.id) {
    case DwarfType.Blacksmith:
      return Images.BlacksmithIcon;
    case DwarfType.Hunter:
      return Images.HunterIcon;
    case DwarfType.Explorer:
      return Images.ExplorerIcon;
    case DwarfType.Miner:
      return Images.MinerIcon;
    case DwarfType.Warrior:
      return Images.WarriorIcon;
    default:
      return Images.CommandIcon
  }
};

export const greyBackground = '#E9E3D8'
export const moveAction = (icon: boolean = false) => css`
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
