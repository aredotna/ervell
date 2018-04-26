import styled, { css } from 'styled-components';

import Styles from 'react/styles';

const buttonVerticalPadding = '0.75em';
const buttonHorizontalPadding = '1.25em';
const buttonPadding = `${buttonVerticalPadding} ${buttonHorizontalPadding}`;
const buttonBorderRadius = '0.25em';

export const mixin = css`
  all: initial;
  display: inline-block;
  padding: ${buttonPadding};
  font-weight: bold;
  border: 1px solid ${Styles.Colors.gray.regular};
  border-radius: ${buttonBorderRadius};
  font-size: ${x => Styles.Type.size[x.size || 'base']};
  font-family: ${Styles.Type.font.sans};
  line-height: 1;
  user-select: none;
  color: ${Styles.Colors.gray.bold};
  cursor: pointer;

  ${Styles.Type.mixins.antialiased}

  &:hover {
    border: 1px solid ${Styles.Colors.gray.medium};
  }

  &:active {
    border: 1px solid ${Styles.Colors.gray.regular};
  }

  &:first-child:not(:last-child) {
    border-radius: ${buttonBorderRadius} 0 0 ${buttonBorderRadius};
  }

  & + & {
    border-left: 0;
    border-radius: 0 ${buttonBorderRadius} ${buttonBorderRadius} 0;
  }
`;

export default styled.button`

  ${mixin}
`;
