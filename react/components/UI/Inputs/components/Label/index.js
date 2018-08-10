import styled from 'styled-components';

import { mixin as textMixin } from 'react/components/UI/Text';

export default styled.label.attrs({
  fontSize: 2,
  my: 2,
})`
  all: initial;
  ${textMixin}
  display: block;
  cursor: default;

  a {
    text-decoration: underline;
  }
`;
