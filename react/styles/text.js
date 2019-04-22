export const FONT_SIZES = {
  root: {
    desktop: '16px',
    mobile: '13px',
  },

  base: '1rem',
  lg: '1.25rem',
  md: '1rem',
  sm: '0.875rem',
  sx: '0.8125rem',
  xs: '0.75rem',
  xx: '0.625rem',
  h1: '2.5rem',
  h2: '2rem',
  h3: '1.75rem',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1rem',
};

const __FONT_SIZE_SCALE__ = [
  'xx', // 0
  'xs', // 1
  'sx', // 2
  'sm', // 3
  'md', // 4 (base)
  'lg', // 5
  'h4', // 6
  'h3', // 7
  'h2', // 8
  'h1', // 9
];

export const FONT_SIZE_NAMES = __FONT_SIZE_SCALE__;

export const FONT_SIZE_SCALE = __FONT_SIZE_SCALE__.map(name => FONT_SIZES[name]);

export const LINE_HEIGHTS = {
  compact: 1.15,
  base: 1.33,
  tall: 1.5,

  // Not a line-height on our scale but:
  // 1.125 * 16 (1rem) = 18
  // Which is as compact as the text input can get using line-height.
  // This is annoying but lets us be explicit about height calculations.
  input: 1.125,
};

export const __LINE_HEIGHT_SCALE__ = [
  'compact',
  'base',
  'tall',
];

export const LINE_HEIGHT_SCALE = __LINE_HEIGHT_SCALE__.map(name => LINE_HEIGHTS[name]);

export const FONT_FAMILIES = {
  sans: "'Arial', 'Helvetica Neue', 'Helvetica', sans-serif",
  narrow: "'Arial Narrow', 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif",
  serif: "'Times New Roman', serif",
  mono: "Menlo, Monaco, 'Bitstream Vera Sans Mono', Consolas, Courier, monospace",
};

export default {
  fonts: FONT_FAMILIES,
  fontSizes: FONT_SIZES,
  fontSizeScale: FONT_SIZE_SCALE,
  lineHeights: LINE_HEIGHTS,
  lineHeightScale: LINE_HEIGHT_SCALE,
};
