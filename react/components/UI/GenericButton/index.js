import styled, { css } from 'styled-components';
import { themeGet, fontSize } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

export const buttonBorderWidth = '2px';
export const buttonVerticalPadding = '0.75em';
export const buttonHorizontalPadding = '1.25em';
export const buttonPadding = `${buttonVerticalPadding} ${buttonHorizontalPadding}`;
export const buttonBorderRadius = '0.25em';

const activeMixin = css`
  border: ${buttonBorderWidth} solid ${x => x.theme.colors.gray.bold};
  color: ${x => x.theme.colors.gray.bold};
`;

const hoverMixin = css`
  border: ${buttonBorderWidth} solid ${x => x.theme.colors.gray.medium};
  color: ${x => x.theme.colors.gray.bold};
`;

const disabledMixin = css`
  pointer-events: none;
  opacity: 0.5;
`;

const buttonColor = ({ color, theme }) => {
  if (color) {
    const value = themeGet(`colors.${color}`, 'colors.gray.bold')({ theme });

    return `
      color: ${value};
      border-color: ${value};
    `;
  }

  return '';
};

export const mixin = css`
  all: initial;
  display: inline-block;
  padding: ${buttonPadding};
  border: ${buttonBorderWidth} solid ${x => x.theme.colors.gray.regular};
  border-radius: ${buttonBorderRadius};
  font-family: ${x => x.theme.fonts.sans};
  font-weight: bold;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  text-align: center;
  ${preset(fontSize, { f: 5 })}
  ${buttonColor}
  ${antialiased}

  ${x => x.minWidth && `min-width: ${x.minWidth};`}

  ${x => x.hover && hoverMixin}
  &:hover { ${hoverMixin} }

  ${x => x.active && activeMixin}
  &:active { ${activeMixin} }

  ${x => x.disabled && disabledMixin}
`;

export const GenericButtonLink = styled.a`
  ${mixin}
`;

const GenericButton = styled.a`
  ${mixin}
`;

export default GenericButton;
