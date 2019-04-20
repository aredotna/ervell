import styled from 'styled-components';
import { mixin, inputHorizontalPadding } from 'v2/components/UI/Inputs';
import AutosizeInput from 'react-input-autosize';

const ChannelTitleInput = styled(AutosizeInput).attrs({
  f: 6,
  my: 5,
})`
  max-width: 100%;

  input {
    // Note: Autosize input has box-sizing "content-box". Here we subtract
    // padding in input and border width to account for this when calculating max-width.
    max-width: calc(100% - ${inputHorizontalPadding} - ${inputHorizontalPadding} - 2px) !important;
    ${mixin}
  }

  div {
    box-sizing: content-box !important;
  }
`;

export default ChannelTitleInput;
