import styled, { css } from 'styled-components';
import {
  display,
  space,
  width,
  height,
  alignItems,
  minHeight,
  maxHeight,
  justifyContent,
  flexDirection,
  borders,
  borderColor,
  borderRadius,
  bgColor,
} from 'styled-system';

export const mixin = css`
  box-sizing: border-box;
  ${display}
  ${width}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${space}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
  ${borders}
  ${borderColor}
  ${borderRadius}
  ${bgColor}
`;

export default styled.div`
  ${mixin}
`;
