import { space } from 'styled-system';
import { preset } from 'react/styles/functions';
import styled from 'styled-components';
import GenericInput from 'react/components/UI/GenericInput';

const ChannelNameInput = styled(GenericInput).attrs({
  f: 9
})`
  ${space}
  ${preset(space, { mt: 5 })}
`;

export default ChannelNameInput;
