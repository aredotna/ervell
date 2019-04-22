import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import constants, { SPACING_SCALE, CONSTANT_VALUES } from 'react/styles/constants';
import colors, { COLOR_NAMES as colorNames } from 'react/styles/colors';
import text, { FONT_SIZE_NAMES as fontSizeNames } from 'react/styles/text';

const META = {
  colorNames,
  fontSizeNames,
};

const THEME = {
  colors,
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
};

export const wrapWithThemeProvider = (Component, props = {}) => (
  <ThemeProvider theme={THEME}>
    <Component {...props} />
  </ThemeProvider>
);

export const Themed = ({ children, ...rest }) => (
  <ThemeProvider theme={THEME} {...rest}>
    {children}
  </ThemeProvider>
);

Themed.propTypes = {
  children: PropTypes.node.isRequired,
};

export default THEME;
