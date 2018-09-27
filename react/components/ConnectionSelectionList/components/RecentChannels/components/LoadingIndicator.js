import React from 'react';
import styled from 'styled-components';

import { inputPadding } from 'react/components/UI/Inputs';
import { baseMixin as baseTextMixin } from 'react/components/UI/Text';

const Indicator = styled.div.attrs({
  f: 1,
})`
  ${baseTextMixin}
  position: relative;
  margin-top: -1px;
  padding: ${inputPadding}; // TODO
  line-height: 1;
  user-select: none;
  color: ${x => x.theme.colors.gray.semiBold};
  border: 1px solid ${x => x.theme.colors.gray.regular};
  background-color: ${x => x.theme.colors.gray.hint};
`;

export default props => (
  <div {...props}>
    <Indicator>
      Loading...
    </Indicator>
  </div>
);
