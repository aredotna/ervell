import theme from 'react/styles/theme';
import { themeGet } from 'styled-system';
import chroma from 'chroma-js';

const NUMBER = /(\d+(\.\d+)?)/;

export const parse = string => fn =>
  string.replace(NUMBER, subString => fn(parseFloat(subString)));

export const value = string => parse(string)(n => n);
export const round = string => parse(string)(n => Math.round(n));
export const ceil = string => parse(string)(n => Math.ceil(n));
export const add = (string, i) => parse(string)(n => n + parseFloat(i));
export const subtract = (string, by) => parse(string)(n => n - parseFloat(by));
export const multiply = (string, factor) => parse(string)(n => n * parseFloat(factor));
export const divide = (string, divisor) => parse(string)(n => n / parseFloat(divisor));

export const calculateLineHeight = (fontSizeName, lineHeightName) => {
  const fontSizeValue = parseFloat(theme.fontSizesIndexed[fontSizeName], 10);
  const lineHeightValue = theme.lineHeightsIndexed[lineHeightName];
  return fontSizeValue * lineHeightValue;
};

export const preset = (fn, presetProps = {}) =>
  props => fn({ ...presetProps, ...props });

export const defaultTo = (v, dV) =>
  ((v == null || v !== v) ? dV : v); // eslint-disable-line no-self-compare

export const lighten = (name, amount = 0.5) => {
  const color = themeGet(`colors.${name}`)({ theme });
  return chroma(color).alpha(amount);
};

export default {
  parse,
  value,
  round,
  ceil,
  add,
  subtract,
  multiply,
  divide,
  calculateLineHeight,
  preset,
  lighten,
};
