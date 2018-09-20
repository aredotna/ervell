import { css } from 'styled-components';

import theme from 'react/styles/theme';

export const outlineBorder = (size = '5px', color = theme.colors.gray.light, radius = '0.25em') =>
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

export const hyphenate = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`;

export const breakWord = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
`;

export const breakAll = css`
  ${hyphenate}
  ${breakWord}
`;

export const antialiased = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const neutralMarginsY = css`
  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default {
  outlineBorder,
  hyphenate,
  antialiased,
  neutralMarginsY,
};
