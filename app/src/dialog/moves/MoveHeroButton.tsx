/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero';
import { FC } from 'react';
import { CardLocation, InArmy } from '@gamepark/nidavellir/state/LocatedCard';
import Images from '../../images/Images';
import { LocationType } from '@gamepark/nidavellir/material/LocationType';
import { DwarfType } from '@gamepark/nidavellir/cards/DwarfDescription';
import { useTranslation } from 'react-i18next';

type MoveHeroButtonProps = {
  move: MoveHero;
};

const MoveHeroButton: FC<MoveHeroButtonProps> = (props) => {
  const { move } = props;
  const { target } = move;
  const { t } = useTranslation();

  const icon = getIcon(target);
  return (
    <>
      {!!icon && <div css={iconStyle(icon)}></div>}
      <span css={buttonStyle}>{t(getButtonText(move))}</span>
    </>
  );
};

const getButtonText = (move: MoveHero) => {
  switch (move.target.type) {
    case LocationType.Army:
      return getToArmyText(move);
  }

  return 'card.moves.place.command-zone';
};

const getToArmyText = (move: MoveHero) => {
  const location = move.target as InArmy;
  switch (location.column) {
    case DwarfType.Blacksmith:
      return 'card.moves.place.blacksmith';
    case DwarfType.Hunter:
      return 'card.moves.place.hunter';
    case DwarfType.Explorer:
      return 'card.moves.place.explorer';
    case DwarfType.Miner:
      return 'card.moves.place.miner';
    case DwarfType.Warrior:
      return 'card.moves.place.warrior';
  }
};

const iconStyle = (icon: any) => css`
  width: 5em;
  height: 5em;
  margin-right: 2em;
  background-image: url(${icon});
  background-size: cover;
`;

const buttonStyle = css`
  font-size: 3em;
  flex: 1;
  text-align: left;
`;

const getIcon = (target: CardLocation) => {
  switch (target.type) {
    case LocationType.Army:
      return getDwarfIcon(target.column);
    case LocationType.CommandZone:
      return Images.CommandIcon;
  }

  return null;
};

const getDwarfIcon = (type: DwarfType) => {
  switch (type) {
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
  }
};

export { MoveHeroButton };
