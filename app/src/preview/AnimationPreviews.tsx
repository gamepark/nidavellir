/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useMemo } from 'react';
import { Animation, useAnimations, usePlayerId } from '@gamepark/react-client';
import { View, ViewType } from '../material/View';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { PlayerId } from '@gamepark/nidavellir/state/Player';
import { playerPanelHeight, playerPanelsWidth } from '../material/Styles';

type AnimationPreviewProps = {
  game: GameView;
  player: PlayerId;
  view?: View;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
const AnimationComponents = {
  [MoveType.MoveCard]: <div />,
  [MoveType.MoveCoin]: <div />,
  [MoveType.MoveHero]: <div />,
  [MoveType.TransformCoin]: <div />,
  [MoveType.TradeCoins]: <div />,
};

const ANIMATION_PREVIEWS = [
  MoveType.MoveCard,
  MoveType.MoveHero,
  MoveType.MoveCoin,
  MoveType.TransformCoin,
  MoveType.TradeCoins,
];

const isAnimationVisible = (player: PlayerId, animation: Animation, view?: View) => {
  if (!view || view.type === ViewType.GLOBAL) {
    return false;
  }

  const playerAnimation =
    ((animation.action.move as any)?.target as any)?.player ??
    animation.action.consequences?.find((c) => ((c as any)?.target as any)?.player === player);
  if (!playerAnimation) {
    return false;
  }

  return playerAnimation !== view.type;
};

const usePlayerAnimations = (player: PlayerId, view?: View) => {
  const animations = useAnimations((a) => !a.action.cancelled && ANIMATION_PREVIEWS.includes(a.action.move.type));
  return useMemo(() => animations.filter((a) => isAnimationVisible(player, a, view)), [player, animations]);
};

const AnimationPreviews: FC<AnimationPreviewProps> = (props) => {
  const { player, game, view } = props;
  const me = usePlayerId();
  const playerPanelIndex = game.players.findIndex((p) => p.id === player)!;
  const animations = usePlayerAnimations(player, view);
  const hidden = !animations.length || player === me;

  return (
    <div
      css={[playerAnimationPosition(playerPanelIndex), playerAnimation, hidden && hiddenPreview(playerPanelIndex)]}
    ></div>
  );
};

const playerAnimationPosition = (index: number) => css`
  position: absolute;
  opacity: 1;
  transition: opacity 0.2s;
  transform: translate3d(-110%, ${1.5 + index * (1 + playerPanelHeight)}em, 1000em);
`;

const hiddenPreview = (index: number) => css`
  pointer-events: none;
  opacity: 0;
  transform: translate3d(-110%, ${1.5 + index * (1 + playerPanelHeight)}em, -1000em);
`;

const playerAnimation = css`
  background-color: #c3ebf1;
  border-radius: 1em;
  border: 0.1em solid black;
  width: ${playerPanelsWidth}em;
  height: ${playerPanelHeight}em;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 3em solid transparent;
    border-left-color: #c3ebf1;
    border-right: 0;
    margin-top: -3em;
    margin-right: -3em;
  }
`;

export { AnimationPreviews };
