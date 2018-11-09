import { css } from 'styled-components';
import { fontSize, space, borderColor, color, width } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

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
  border: 1px solid ${props => props.theme.colors.gray.bold};
  background-color: ${props => props.theme.colors.gray.hint};
  color: black;
  ${borderColor}
  ${color}
  ${borderlessMixin}
`;

export const defaultMixin = css`
  all: initial;
  appearance: none;
  box-sizing: border-box;
  display: block;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.gray.medium};
  font-family: ${props => props.theme.fonts.sans};
  ${preset(width, { width: '100%' })}
  ${preset(color, { color: 'black' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(space, { px: 5, py: 4 })}
  ${borderColor}
  ${antialiased}

  ::placeholder {
    ${preset(color, { color: 'black' })}
    opacity: 0.5;
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
