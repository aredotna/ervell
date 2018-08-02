import { space } from 'styled-system';
import { preset } from 'react/styles/functions';
import styled from 'styled-components';
import { mixin } from 'react/components/UI/GenericInput';
import AutosizeInput from 'react-input-autosize';

const ChannelNameInput = styled(AutosizeInput).attrs({
  f: 8
})`
  input {
    ${mixin}
    ${space}
    ${preset(space, { mt: 3 })}
  }
`;

export default ChannelNameInput;
