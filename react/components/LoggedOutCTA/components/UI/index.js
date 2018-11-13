import styled from 'styled-components';

import constants from 'react/styles/constants';
import Text from 'react/components/UI/Text';
import { GenericButtonLink } from 'react/components/UI/GenericButton';

const Copy = styled(Text).attrs({
  f: 5,
  py: 3,
  pr: 4,
})``;

const Button = styled(GenericButtonLink).attrs({
  mx: 3,
  px: [1, 3, 8],
  mb: [4, 0, 0],
})``;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  
  ${constants.media.mobile`
    flex-direction: column;
  `}
`;

export { Copy, Button, Container };
