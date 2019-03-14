import styled from 'styled-components';
import { lineHeight } from 'styled-system';

import { preset } from 'react/styles/functions';

import mixin from 'react/components/UI/Inputs/mixin';

export default styled.textarea`
  ${mixin}
  ${preset(lineHeight, { lineHeight: 1 })}
`;
