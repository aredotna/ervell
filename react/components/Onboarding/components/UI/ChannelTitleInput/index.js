import { space } from 'styled-system';
import { preset } from 'react/styles/functions';
import styled from 'styled-components';
import { mixin, inputHorizontalPadding } from 'react/components/UI/GenericInput';
import AutosizeInput from 'react-input-autosize';

const ChannelTitleInput = styled(AutosizeInput).attrs({
  f: 8
})`
  max-width: 100%;

  input {
    // Note: Autosize input has box-sizing "content-box". Here we subtract
    // padding in input to account for this when calculating max-width.
    max-width: calc(100% - ${inputHorizontalPadding} - ${inputHorizontalPadding}) !important;
    ${mixin}
    ${space}
    ${preset(space, { mt: 3 })}
  }

  div {
    box-sizing: content-box !important;
  }
`;

export default ChannelTitleInput;
