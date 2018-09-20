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

export const antialiased = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const neutralMarginsY = css`
  &:first-child { margin-top: 0; }
  &:last-child { margin-bottom: 0; }
`;

export const neutralMarginsX = css`
  &:first-child { margin-left: 0; }
  &:last-child { margin-right: 0; }
`;

export const neutralMargins = css`
  ${x => x.neutralMarginsY && neutralMarginsY}
  ${x => x.neutralMarginsX && neutralMarginsX}
`;

export default {
  outlineBorder,
  hyphenate,
  antialiased,
  neutralMarginsY,
};
