import styled from 'styled-components';

import { mixin as typography } from 'react/components/UI/Type';

export default styled.h2.attrs({
  size: 'h2',
})`
  ${typography}
  text-align: center;
`;
