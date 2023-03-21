/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, HTMLAttributes } from 'react';

type NavigationMenuEntryProps = {
  label: string;
  selected?: boolean;
  icon?: any;
} & HTMLAttributes<HTMLButtonElement>;

const NavigationMenuEntry: FC<NavigationMenuEntryProps> = (props) => {
  const { label, selected, icon, ...rest } = props;
  return (
    <button css={[menuStyle(selected), !icon && dropShadow]} {...rest}>
      <span>{label}</span>
      {!!icon && <div css={buttonIcon(icon)} />}
    </button>
  );
};

const dropShadow = css`
  filter: drop-shadow(0.2em 0.2em 0.5em #000000);
`;

const buttonIcon = (icon: any) => css`
  position: absolute;
  width: 7em;
  height: 7em;
  top: 0;
  right: -4.2em;
  background-image: url(${icon});
  background-size: cover;
  //transform: translateZ(10em);
  ${dropShadow};
`;

const menuStyle = (selected: boolean = false) => css`
  position: absolute;
  padding-left: ${selected ? 3 : 1}em;
  will-change: transform, padding-left;

  &:hover {
    padding-left: 3em;
  }

  height: 7em;
  //border-radius: 0 5em 5em 0;
  border: 0;
  transition: 0.2s padding-left;
  cursor: pointer;
  background-color: ${selected ? '#c3ebf1' : 'lightgray'};
  transform-style: preserve-3d;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  ${dropShadow};

  > span {
    font-size: 3em;
    margin-right: 0.7em;
    color: black;
    font-family: 'Norse', 'Arial', serif;
    font-weight: bold;
    transform-style: preserve-3d;
  }

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 100%;
    top: 0;
    height: 0;
    width: 0;
    border-top: 3.5em solid transparent;
    border-bottom: 3.5em solid transparent;
    border-left: 2em solid ${selected ? '#c3ebf1' : 'lightgray'};
  }
`;

export { NavigationMenuEntry };
