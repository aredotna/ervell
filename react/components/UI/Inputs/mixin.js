import { css } from 'styled-components';
import { fontSize, space, borderColor, color, width } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

const borderlessMixin = css`
  ${x => x.borderless && `
    background-color: transparent;
    border-color: transparent;
    padding: 0;
  `}
`;

const focusMixin = css`
  border: 1px solid ${x => x.theme.colors.gray.bold};
  background-color: ${x => x.theme.colors.gray.hint};
  color: black;
  ${borderColor}
  ${color}
  ${borderlessMixin}
`;

export default css`
  all: initial;
  appearance: none;
  box-sizing: border-box;
  display: block;
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.medium};
  font-family: ${x => x.theme.fonts.sans};
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

  ${x => x.focus && focusMixin}
  &:focus {
    ${focusMixin}
  }

  ${x => x.disabled && `
    pointer-events: none;
    opacity: 0.5;
  `}

  ${x => x.hasError && `
    &, &:focus {
      border-color: ${x.theme.colors.state.alert};
    }
  `}

  ${borderlessMixin}
`;
