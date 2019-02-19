import styled, { css } from 'styled-components';
import {
  display,
  position,
  space,
  width,
  height,
  alignItems,
  alignSelf,
  minHeight,
  maxHeight,
  justifyContent,
  flexDirection,
  borders,
  borderColor,
  borderRadius,
  bgColor,
  textAlign,
  flex,
  style,
} from 'styled-system';

import { neutralMargins } from 'react/styles/mixins';

const flexGrow = style({ prop: 'flexGrow' });
const flexShrink = style({ prop: 'flexShrink' });

export const mixin = css`
  box-sizing: border-box;
  ${display}
  ${position}
  ${width}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${space}
  ${flex}
  ${flexGrow}
  ${flexShrink}
  ${alignItems}
  ${alignSelf}
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
