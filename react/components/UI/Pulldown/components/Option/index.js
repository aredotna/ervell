import styled from 'styled-components';
import { fontSize, width, color, space } from 'styled-system';

import { preset } from 'react/styles/functions';

export default styled.div`
  position: relative;
  box-sizing: border-box;
  outline: none;
  background-color: white;
  cursor: pointer;
  user-select: none;
  font-family: ${x => x.theme.fonts.sans};
  ${preset(width, { width: '100%' })}
  ${preset(color, { color: 'black' })}
  ${preset(fontSize, { f: 4 })}
  ${preset(space, { px: 5, py: 4 })}
  ${fontSize}

  &:first-child {
    border-top-left-radius: 0.125em;
    border-top-right-radius: 0.125em;
  }

  &:last-child {
    border-bottom-left-radius: 0.125em;
    border-bottom-right-radius: 0.125em;
  }

  ${x => x.mode === 'expanded' && `
    &:hover {
      background-color: ${x.theme.colors.gray.light};
    }
  `}
`;
