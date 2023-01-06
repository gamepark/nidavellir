/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero';
import { FC } from 'react';
import { CardLocation } from '@gamepark/nidavellir/state/LocatedCard';
import Images from '../../images/Images';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { DwarfType } from '@gamepark/nidavellir/cards/Card';
import { HeroType } from '@gamepark/nidavellir/cards/Hero';
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
      <span css={buttonStyle}>{t('Recruit this hero')}</span>
    </>
  );
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
    case LocationType.PlayerBoard:
      return getDwarfIcon(target.column);
  }

  return null;
};

const getDwarfIcon = (type: DwarfType | HeroType) => {
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
    case HeroType.Neutral:
      return Images.CommandIcon;
  }
};

export { MoveHeroButton };
