import styled, { css } from 'styled-components';
import { lineHeight } from 'styled-system';

import { preset } from 'react/styles/functions';

import inputMixin from 'react/components/UI/Inputs/mixin';

export const mixin = css`
  ${inputMixin}
  ${preset(lineHeight, { lineHeight: 1 })}
  resize: ${props => props.resize};
  white-space: pre-wrap;
`;

const Textarea = styled.textarea`
  ${mixin}
`;

Textarea.defaultProps = {
  resize: 'vertical',
};

export default Textarea;
