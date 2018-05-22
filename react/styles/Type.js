import { css } from 'styled-components';

const size = {
  root: {
    desktop: '16px',
    mobile: '13px',
  },

  base: '1rem',
  lg: '1.25rem',
  sm: '0.875rem',
  xs: '0.8125rem',
  xx: '0.625rem',
  h1: '2.5rem',
  h2: '2rem',
  h3: '1.75rem',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1rem',
};

const lineHeight = {
  base: 1.33,
  tall: 1.5,
};

export default {
  size,
  lineHeight,

  font: {
    sans: "'Arial', 'Helvetica Neue', 'Helvetica', sans-serif",
    serif: "'Times New Roman', serif",
    mono: "Menlo, Monaco, 'Bitstream Vera Sans Mono', Consolas, Courier, monospace",
  },

  mixins: {
    antialiased: css`
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    `,
  },

  functions: {
    calculateLineHeight(fontSizeName, lineHeightName) {
      const fontSizeValue = parseFloat(size[fontSizeName], 10);
      const lineHeightValue = lineHeight[lineHeightName];
      return fontSizeValue * lineHeightValue;
    },
  },
};
