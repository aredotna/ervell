import styled, { css } from 'styled-components';
import {
  display,
  position,
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
  textAlign,
} from 'styled-system';

import { neutralMargins } from 'react/styles/mixins';

export const mixin = css`
  box-sizing: border-box;
  ${display}
  ${position}
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
  ${textAlign}
  ${neutralMargins}
`;

export default styled.div`
  ${mixin}
`;
