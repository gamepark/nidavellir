/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard';
import { FC } from 'react';
import { CardLocation } from '@gamepark/nidavellir/state/LocatedCard';
import Images from '../../images/Images';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import { DwarfType, RoyalOffering } from '@gamepark/nidavellir/cards/Card';
import { useTranslation } from 'react-i18next';
import { Cards } from '@gamepark/nidavellir/cards/Cards';
import GameView from '@gamepark/nidavellir/state/view/GameView';

type MoveCardButtonProps = {
  move: MoveCard;
  game: GameView;
};

const MoveCardButton: FC<MoveCardButtonProps> = (props) => {
  const { move /*game*/ } = props;
  const { target, id } = move;
  const { t } = useTranslation();
  //const playerId = usePlayerId();
  //const player = game.players.find((p) => p.id === playerId)!;

  const detail = getDetail(target, id);
  //const detail = player?.effects?.length ? getEffectDetail(player?.effects[0]) : getDetail(target, id);
  return (
    <>
      {!!detail?.icon && <div css={iconStyle(detail.icon)}></div>}
      <span css={buttonStyle}>{t(detail?.text ?? 'None')}</span>
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

const getDetail = (target: CardLocation, id?: number) => {
  switch (target.type) {
    case LocationType.Army:
      return getDwarfDetail(target.column);
    case LocationType.Discard:
      if (id !== undefined && Cards[id].type === RoyalOffering.RoyalOffering) {
        return { icon: Images.RoyalOfferingIcon, text: 'card.moves.choose-royal-offering' };
      }
  }

  return null;
};

const getDwarfDetail = (type: DwarfType) => {
  switch (type) {
    case DwarfType.Blacksmith:
      return { icon: Images.BlacksmithIcon, text: 'card.moves.choose.blacksmith' };
    case DwarfType.Hunter:
      return { icon: Images.HunterIcon, text: 'card.moves.choose.hunter' };
    case DwarfType.Explorer:
      return { icon: Images.ExplorerIcon, text: 'card.moves.choose.explorer' };
    case DwarfType.Miner:
      return { icon: Images.MinerIcon, text: 'card.moves.choose.miner' };
    case DwarfType.Warrior:
      return { icon: Images.WarriorIcon, text: 'card.moves.choose.warrior' };
  }

  return null;
};

export { MoveCardButton };
