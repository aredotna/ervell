import styled from 'styled-components';
import { lineHeight } from 'styled-system';

import { preset } from 'react/styles/functions';

import mixin from 'react/components/UI/Inputs/mixin';

const Textarea = styled.textarea`
  ${mixin}
  ${preset(lineHeight, { lineHeight: 1 })}
  resize: ${props => props.resize};
`;

Textarea.defaultProps = {
  resize: 'vertical',
};

export default Textarea;
