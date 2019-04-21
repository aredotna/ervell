import styled from 'styled-components';

import { mixin as text } from 'v2/components/UI/Text';

export default styled.pre.attrs({
  font: 'mono',
})`
  all: initial;
  ${text}
  white-space: pre;
`;
