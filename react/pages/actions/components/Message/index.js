import styled from 'styled-components';

import { mixin as typography } from 'react/components/UI/Type';

export default styled.div.attrs({
  size: 'lg',
})`
  ${typography}
  text-align: center;

  > a {
    font-weight: bold;
  }
`;
