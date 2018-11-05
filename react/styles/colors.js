const COLORS = {
  channel: {
    closed: '#4b3d67',
    public: '#17ac10',
    open: '#17ac10', // alias `public`
    private: '#b60202',
  },
  state: {
    premium: '#00c5ff',
    alert: 'rgb(255, 94, 0)',
    editable: '#fdffdb',
    investor: 'rgb(183, 158, 110)',
  },
  gray: {
    bold: '#333',
    base: '#585858', // Matches `textgray`
    semiBold: '#6d6d6d',
    medium: '#999',
    regular: '#ccc',
    semiLight: '#e8e8e8',
    light: '#eee',
    extraLight: 'rgb(250, 250, 250)',
    hint: '#f7f7f7',
  },
  utility: {
    translucent: 'rgba(255, 255, 255, 0.9)',
    transparent: 'rgba(255, 255, 255, 0.001)',
  },
  white: 'white',
  black: 'black',
};

const { white: _white, black: _black, ...colorObjs } = COLORS;

export const COLOR_NAMES = Object.keys(colorObjs).reduce(
  (memo, namespace) =>
    memo.concat(Object.keys(COLORS[namespace]).map(color =>
      `${namespace}.${color}`)),
  [],
);

export default COLORS;
