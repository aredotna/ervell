import styled from 'styled-components';
import {
  display,
  space,
  width,
  height,
  alignItems,
  minHeight,
  justifyContent,
  flexDirection,
  border,
} from 'styled-system';

export default styled.div`
  box-sizing: border-box;
  ${display}
  ${width}
  ${height}
  ${minHeight}
  ${space}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
  ${border}
`;
