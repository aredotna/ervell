const COLORS = {
  channel: {
    closed: '#D3D3D3',
    public: '#2BA425',
    open: '#2BA425', // alias `public`
    private: '#E24937',
  },
  state: {
    premium: '#17B0E2',
    alert: '#B08064',
    editable: '#131313',
    neutral: '#131313', // alias editable
    investor: '#F1CE57',
    supporter: '#6BD2B6',
    highlight: `rgba(247, 225, 199, 0.14)`,
  },
  gray: {
    extraBold: '#fff',
    bold: '#D3D3D3',
    base: '#D3D3D3', // Matches `textgray`
    semiBold: '#D3D3D3',
    medium: '#6E6E6E',
    regular: '#2F2F2F',
    semiLight: '#2F2F2F',
    light: '#2F2F2F',
    hint: '#131313',
    block: '#D3D3D3',
    input: '#080a0b',
  },
  utility: {
    translucent: 'rgba(0, 0, 0, 0.9)',
    semiTranslucent: 'rgba(0, 0, 0, 0.5)',
    transparent: 'rgba(0, 0, 0, 0.001)',
  },
  brand: {
    deepBlue: '#00075F',
  },
  white: 'white',
  black: 'black',
  lightGray: '#eee',
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
