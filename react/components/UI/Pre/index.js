import styled from 'styled-components';

import { mixin as text } from 'react/components/UI/Text';

export default styled.pre.attrs({
  font: 'mono',
})`
  all: initial;
  ${text}
  white-space: pre;
`;
