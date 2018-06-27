import styled from 'styled-components';

import Text from 'react/components/UI/Text';

export default styled(Text).attrs({
  fontSize: 6,
  lineHeight: 1,
  align: 'center',
  m: 5,
})`
  > a {
    font-weight: bold;
  }
`;
