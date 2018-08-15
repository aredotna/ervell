import styled, { css } from 'styled-components';
import { themeGet, fontSize, space, alignSelf } from 'styled-system';

import { defaultTo, preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

export const BUTTON_DEFAULT_FONT_SIZE = 3;
export const BUTTON_VARIANTS = { LARGE: 'LARGE', SMALL: 'SMALL' };
export const BUTTON_LARGE_PADDING = { px: 8, py: 5 };
export const BUTTON_SMALL_PADDING = { px: 6, py: 5 };
export const BUTTON_SMALL_BORDER_WIDTH = '1px';
export const BUTTON_LARGE_BORDER_WIDTH = '2px';
export const BUTTON_BORDER_RADIUS = '0.25em';

export const buttonSize = x => (
  defaultTo(x.f, x.fontSize) < BUTTON_DEFAULT_FONT_SIZE
    ? BUTTON_VARIANTS.SMALL
    : BUTTON_VARIANTS.LARGE
);

export const buttonColor = ({ color, theme }) => {
  if (color) {
    const value = themeGet(`colors.${color}`, 'colors.gray.base')({ theme });

    return `
      color: ${value};
      border-color: ${value};
    `;
  }

  return '';
};

export const buttonPadding = x => preset(space, {
  LARGE: BUTTON_LARGE_PADDING,
  SMALL: BUTTON_SMALL_PADDING,
}[buttonSize(x)]);

export const buttonBorderWidth = x => ({
  LARGE: BUTTON_LARGE_BORDER_WIDTH,
  SMALL: BUTTON_SMALL_BORDER_WIDTH,
}[buttonSize(x)]);

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

export const mixin = css`
  all: initial;
  display: inline-block;
  ${preset(fontSize, { f: BUTTON_DEFAULT_FONT_SIZE })}
  border: ${buttonBorderWidth} solid ${x => x.theme.colors.gray.regular};
  border-radius: ${BUTTON_BORDER_RADIUS};
  font-family: ${x => x.theme.fonts.sans};
  font-weight: bold;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  text-align: center;
  ${alignSelf}
  ${buttonPadding}
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

export const GenericButton = styled.button`
  ${mixin}
`;

export const DividerButton = styled.button.attrs({ f: 4 })`
  all: initial;
  text-align: center;
  cursor: pointer;
  display: block;
  width: 100%;
  ${preset(fontSize, { f: BUTTON_DEFAULT_FONT_SIZE })}
  font-weight: bold;
  font-family: ${x => x.theme.fonts.sans};
  border-top: 1px solid ${x => x.theme.colors.gray.regular};
  color: ${x => x.theme.colors.gray.regular};
  padding: ${x => x.theme.space[5]} 0;

  &:hover {
    border-top-color: ${x => x.theme.colors.gray.bold};
    color: ${x => x.theme.colors.gray.bold};
  }

  &:active {
    border-top-color: ${x => x.theme.colors.gray.active};
    color: ${x => x.theme.colors.gray.active};
  }
`;

export default GenericButtonLink;
