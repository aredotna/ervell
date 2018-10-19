import styled, { css } from 'styled-components';
import { themeGet, fontSize, space } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

export const activeMixin = css`
  border-color: ${x => x.theme.colors.gray.bold};
  color: ${x => x.theme.colors.gray.bold};
`;

export const hoverMixin = css`
  border-color: ${x => x.theme.colors.gray.medium};
  color: ${x => x.theme.colors.gray.bold};
`;

export const disabledMixin = css`
  pointer-events: none;
  opacity: 0.5;
`;

export const buttonColor = (props) => {
  const defaultColor = props.theme.colors.gray.base;
  const defaultBorderColor = props.theme.colors.gray.regular;
  const color = themeGet(`colors.${props.color}`, defaultColor)(props);

  return `
    color: ${color};
    border-color: ${color === defaultColor ? defaultBorderColor : color};
  `;
};

export const mixin = css`
  all: initial;
  display: block;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-family: ${x => x.theme.fonts.sans};
  border-top: 1px solid;
  cursor: pointer;
  ${preset(space, { pt: 5, pb: 6, px: 5 })}
  ${preset(fontSize, { f: 4 })}
  ${buttonColor}
  ${antialiased}

  ${x => x.hover && hoverMixin}
  &:hover { ${hoverMixin} }

  ${x => x.active && activeMixin}
  &:active { ${activeMixin} }

  ${x => x.disabled && disabledMixin}
`;

export const DividerButton = styled.button`
  ${mixin}
`;

export const DividerButtonLink = styled.a`
  ${mixin}
`;

export default DividerButton;
