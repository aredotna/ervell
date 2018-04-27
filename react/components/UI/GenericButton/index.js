import styled, { css } from 'styled-components';

import Styles from 'react/styles';

export const buttonBorderWidth = '0.075em';
export const buttonVerticalPadding = '0.75em';
export const buttonHorizontalPadding = '1.25em';
export const buttonPadding = `${buttonVerticalPadding} ${buttonHorizontalPadding}`;
export const buttonBorderRadius = '0.25em';

export const mixin = css`
  all: initial;
  display: inline-block;
  padding: ${buttonPadding};
  font-weight: bold;
  border: ${buttonBorderWidth} solid ${Styles.Colors.gray.regular};
  border-radius: ${buttonBorderRadius};
  font-size: ${x => Styles.Type.size[x.size || 'base']};
  font-family: ${Styles.Type.font.sans};
  line-height: 1;
  user-select: none;
  color: ${Styles.Colors.gray.bold};
  cursor: pointer;

  ${Styles.Type.mixins.antialiased}

  &:hover {
    border: ${buttonBorderWidth} solid ${Styles.Colors.gray.medium};
  }

  &:active {
    border: ${buttonBorderWidth} solid ${Styles.Colors.gray.regular};
  }
`;

export default styled.button`
  ${mixin}
`;
