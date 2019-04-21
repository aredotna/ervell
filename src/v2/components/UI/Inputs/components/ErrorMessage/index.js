import styled from 'styled-components';

import Text from 'v2/components/UI/Text';

export default styled(Text).attrs({
  color: 'state.alert',
  fontSize: 1,
  my: 4,
})`
  cursor: default;
`;
