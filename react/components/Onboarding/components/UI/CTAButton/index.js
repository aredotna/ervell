import GenericButton from 'react/components/UI/GenericButton';
import styled from 'styled-components';

const CTAButton = styled(GenericButton).attrs({
  f: 6
})`
  margin-top: ${x => x.theme.space[6]}
`;

export default CTAButton;
