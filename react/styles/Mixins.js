import { css } from 'styled-components';

import Colors from 'react/styles/Colors';

const outlineBorder = (size = '5px', color = Colors.gray.light, radius = '0.25em') =>
  css`
    display: block;
    content: '';
    position: absolute;
    pointer-events: none;
    top: -${size};
    right: -${size};
    bottom: -${size};
    left: -${size};
    border: ${size} solid ${color};
    border-radius: ${radius};
  `;

const hyphenate = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`;

const antialiased = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export default {
  outlineBorder,
  hyphenate,
  antialiased,
};
