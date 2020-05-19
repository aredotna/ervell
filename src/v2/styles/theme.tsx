import React from 'react'
import { ThemeProvider } from 'styled-components'

import constants, { SPACING_SCALE, CONSTANT_VALUES } from 'v2/styles/constants'
import colors, { COLOR_NAMES as colorNames } from 'v2/styles/colors'
import darkColors from 'v2/styles/darkColors'
import text, { FONT_SIZE_NAMES as fontSizeNames } from 'v2/styles/text'

const META = {
  colorNames,
  fontSizeNames,
}

const THEME = {
  colors,
  name: 'default',
  fonts: text.fonts,
  fontSizes: text.fontSizeScale,
  fontSizesIndexed: text.fontSizes,
  lineHeights: text.lineHeightScale,
  lineHeightsIndexed: text.lineHeights,
  breakpoints: Object.values(constants.breakpoints),
  meta: META,
  space: SPACING_SCALE,
  z: constants.z,
  constantValues: CONSTANT_VALUES,
  radii: constants.radii,
}

const DARK_THEME = {
  ...THEME,
  name: 'dark',
  colors: darkColors,
}

interface ThemedProps {
  theme: 'dark' | 'default'
}

export const wrapWithThemeProvider = (Component, props = {}) => (
  <ThemeProvider theme={THEME}>
    <Component {...props} />
  </ThemeProvider>
)

export const Themed: React.FC<ThemedProps> = ({ children, theme, ...rest }) => (
  <ThemeProvider theme={theme == 'dark' ? DARK_THEME : THEME} {...rest}>
    {children}
  </ThemeProvider>
)

export default THEME
