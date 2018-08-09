import { space } from 'styled-system';
import { preset } from 'react/styles/functions';
import styled from 'styled-components';
import GenericButton from 'react/components/UI/GenericButton';

const CTAButton = styled(GenericButton).attrs({
  f: 6,
})`
  ${space}
  ${preset(space, { mt: 6 })}
`;

export default CTAButton;
