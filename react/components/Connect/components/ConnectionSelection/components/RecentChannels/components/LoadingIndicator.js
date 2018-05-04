import React from 'react';
import styled from 'styled-components';

import Styles from 'react/styles';

import { inputPadding } from 'react/components/UI/GenericInput';

const Indicator = styled.div`
  position: relative;
  margin-top: -1px;
  padding: ${inputPadding};
  line-height: 1;
  user-select: none;
  color: ${Styles.Colors.gray.semiBold};
  border: 1px solid ${Styles.Colors.gray.regular};
  background-color: ${Styles.Colors.gray.hint};
`;

export default props => (
  <div {...props}>
    <Indicator>
      Loading...
    </Indicator>
  </div>
);
