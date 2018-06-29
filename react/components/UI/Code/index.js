import styled from 'styled-components';

import { mixin as text } from 'react/components/UI/Text';

export default styled.pre.attrs({
  font: 'mono',
})`
  ${text}
  display: inline-block;
  margin: 0;
`;
