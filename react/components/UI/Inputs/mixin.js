import { css } from 'styled-components';
import { fontSize, space, borderColor } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

const focusMixin = css`
  border: 1px solid ${x => x.theme.colors.gray.bold};
  background-color: ${x => x.theme.colors.gray.hint};
  color: black;
  ${borderColor}
`;

export default css`
  all: initial;
  box-sizing: border-box;
  display: block;
  width: 100%;
  appearance: none;
  color: black;
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.medium};
  font-family: ${x => x.theme.fonts.sans};
  ${preset(fontSize, { f: 4 })}
  ${preset(space, { px: 5, py: 4 })}
  ${borderColor}
  ${antialiased}

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
`;
