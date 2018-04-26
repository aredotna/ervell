import styled from 'styled-components';

import Styles from 'react/styles';

const inputVerticalPadding = '0.75em';
const inputHorizontalPadding = '1em';
const inputPadding = `${inputHorizontalPadding} ${inputVerticalPadding}`;
const inputBorderRadius = '0.125em';

export default styled.input`
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
