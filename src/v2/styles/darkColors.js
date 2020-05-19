const COLORS = {
  channel: {
    closed: '#999',
    public: '#17ac10',
    open: '#17ac10', // alias `public`
    private: '#b60202',
  },
  state: {
    premium: '#00c5ff',
    alert: 'rgb(255, 94, 0)',
    editable: '#020024',
    neutral: '#020024', // alias editable
    investor: 'rgb(183, 158, 110)',
    supporter: '#00a06d',
  },
  gray: {
    extraBold: '#fff',
    bold: '#eee',
    base: '#a7a7a7', // Matches `textgray`
    semiBold: '#929292',
    medium: '#666',
    regular: '#333',
    semiLight: '#171717',
    light: '#111111',
    hint: '#080808',
    block: '#cccccc',
  },
  utility: {
    translucent: 'rgba(0, 0, 0, 0.9)',
    semiTranslucent: 'rgba(0, 0, 0, 0.5)',
    transparent: 'rgba(0, 0, 0, 0.001)',
  },
  white: 'white',
  black: 'black',
  middleGray: '#6d6d6d',
  background: 'black',
}

const {
  white: _white,
  black: _black,
  middleGray: _middleGray,
  ...colorObjs
} = COLORS

export const COLOR_NAMES = Object.keys(colorObjs).reduce(
  (memo, namespace) =>
    memo.concat(
      Object.keys(COLORS[namespace]).map(color => `${namespace}.${color}`)
    ),
  []
)

// From table: https://www.viget.com/articles/equating-color-and-transparency/
export const GRAY_ALPHA_VALUES = {
  bold: 0.8,
  base: 0.655, // Matches `textgray`
  semiBold: 0.575,
  medium: 0.4,
  regular: 0.2,
  semiLight: 0.09,
  light: 0.065,
  hint: 0.01,
}

export default COLORS
