import styled, { css } from 'styled-components';

import Styles from 'react/styles';

export const inputVerticalPadding = '0.75em';
export const inputHorizontalPadding = '1em';
export const inputPadding = `${inputHorizontalPadding} ${inputVerticalPadding}`;
export const inputBorderRadius = '0.125em';

export const mixin = css`
  all: initial;
  box-sizing: border-box;
  display: block;
  width: 100%;
  appearance: none;
  padding: ${inputPadding};
  border-radius: ${inputBorderRadius};
  color: ${Styles.Colors.gray.semiBold};
  background-color: ${Styles.Colors.gray.hint};
  font-size: ${x => Styles.Type.size[x.size || 'base']};
  font-family: ${Styles.Type.font.sans};
  ${Styles.Type.mixins.antialiased}
`;

export const Input = styled.input`
  ${mixin}
`;

export const Textarea = styled.textarea`
  ${mixin}
`;

export default Input;
