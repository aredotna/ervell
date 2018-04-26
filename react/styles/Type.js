export default {
  size: {
    root: {
      desktop: '16px',
      mobile: '13px',
    },

    base: '1rem',
    lg: '1.25rem',
    sm: '0.875rem',
    xs: '0.75rem',
    xx: '0.625rem',
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
  },

  lineHeight: {
    base: 1.33,
    tall: 1.5,
  },

  font: {
    sans: "'Arial', 'Helvetica Neue', 'Helvetica', sans-serif",
    serif: "'Times New Roman', serif",
    mono: "Menlo, Monaco, 'Bitstream Vera Sans Mono', Consolas, Courier, monospace",
  },

  mixins: {
    antialiased: `
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    `,
  },
};
