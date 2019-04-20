import { css } from 'styled-components';
import { blend } from 'chroma-js';
import { themeGet } from 'styled-system';

import theme from 'v2/styles/theme';

export const __outlineBorder__ = (
  size = '5px',
  color = theme.colors.gray.light,
  radius = '0.25em'
) => `
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

export const outlineBorder = (
  size = '5px',
  color = theme.colors.gray.light,
  radius = '0.25em'
) => __outlineBorder__(size, color, radius);

export const overflowEllipsis = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

export const neutralMarginsX = css`
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export const neutralMargins = css`
  ${x => x.neutralMarginsY && neutralMarginsY}
  ${x => x.neutralMarginsX && neutralMarginsX}
`;

export const channelVisibilityForegroundColor = css`
  ${props => {
    const color =
      theme.colors.channel[props.visibility] ||
      themeGet(`colors.${props.color}`, props.theme.colors.gray.base)(props);

    return `
      color: ${color};
      border-color: ${
        props.mode === 'hover'
          ? `border-color: ${color};`
          : blend(color, '#bbb', 'screen')
      };

      &:hover {
        border-color: ${color};
      }
    `;
  }}
`;

export const fractional = css`
  -webkit-transform: scale(0.99); // Hack to force fractional pixels in Chrome
`;

export const overflowScrolling = css`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export default {
  outlineBorder,
  hyphenate,
  antialiased,
  neutralMarginsY,
  channelVisibilityForegroundColor,
  fractional,
  overflowScrolling,
};
