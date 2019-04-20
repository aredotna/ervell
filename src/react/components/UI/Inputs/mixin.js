import { css } from 'styled-components';
import { fontSize, fontFamily, space, borderColor, borders, color, width } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';
import { LINE_HEIGHTS } from 'react/styles/text';

export const borderlessMixin = css`
  ${props => props.borderless && `
    background-color: transparent;
    border-color: transparent;
    padding: 0;
  `}
`;

export const errorMixin = css`
  ${props => props.hasError && `
    &, &:focus {
      border-color: ${props.theme.colors.state.alert};
    }
  `}
`;

export const focusMixin = css`
  background-color: ${props => props.theme.colors.gray.hint};
  color: black;
  ${preset(borders, { border: '1px solid' })}
  ${preset(borderColor, { borderColor: 'gray.bold' })}
  ${color}
  ${borderlessMixin}
`;

export const defaultMixin = css`
  all: initial;
  appearance: none;
  box-sizing: border-box;
  display: block;
  background-color: white;
  line-height: ${LINE_HEIGHTS.input};
  ${preset(fontFamily, { font: 'sans' })}
  ${preset(width, { width: '100%' })}
  ${preset(color, { color: 'black' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(space, { px: 5, py: 4 })}
  ${preset(borders, { border: '1px solid' })}
  ${preset(borderColor, { borderColor: 'gray.medium' })}
  ${antialiased}

  ::placeholder {
    ${preset(color, { color: 'black' })}
    opacity: 0.5;
    font-family: inherit;
  }

  ${props => props.focus && focusMixin}
  &:focus {
    ${focusMixin}
  }

  ${props => props.disabled && `
    pointer-events: none;
    opacity: 0.5;
  `}

  ${errorMixin}
  ${borderlessMixin}
`;

export default defaultMixin;
