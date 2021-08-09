const COLORS = {
  channel: {
    closed: '#4b3d67',
    public: '#17ac10',
    open: '#17ac10', // alias `public`
    private: '#b60202',
  },
  state: {
    premium: '#00BBF7',
    alert: 'rgb(255, 94, 0)',
    editable: '#fdffdb',
    neutral: '#fdffdb', // alias editable
    investor: 'rgb(183, 158, 110)',
    supporter: '#00a06d',
    highlight: `rgb(250, 255, 195)`,
  },
  gray: {
    extraBold: '#000',
    bold: '#333333',
    base: '#585858', // Matches `textgray`
    semiBold: '#6A6A6A',
    medium: '#999',
    regular: '#ccc',
    semiLight: '#e8e8e8',
    light: '#eee',
    hint: '#f7f7f7',
    block: 'rgb(51, 51, 51)',
    input: 'rgb(247, 245, 244)',
  },
  utility: {
    translucent: 'rgba(255, 255, 255, 0.9)',
    semiTranslucent: 'rgba(255, 255, 255, 0.5)',
    transparent: 'rgba(255, 255, 255, 0.001)',
  },
  brand: {
    deepBlue: '#00075F',
  },
  white: 'white',
  black: 'black',
  middleGray: '#929292',
  background: 'white',
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
