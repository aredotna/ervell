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
  px: [8],
  my: [4, 0, 0],
})``;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  
  ${constants.media.mobile`
    flex-direction: column;
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: row;
`;

export { Copy, Button, Container, ButtonContainer };
