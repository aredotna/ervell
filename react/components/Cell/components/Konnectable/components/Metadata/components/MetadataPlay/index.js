import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

import constants from 'react/styles/constants';

import { preset } from 'react/styles/functions';

import { fractional } from 'react/styles/mixins';

const Container = styled.span`
  position: relative;
  display: inline-block;
  margin-left: ${x => x.theme.space[4]};
  background-color: ${x => x.theme.colors.gray.light};
  border-radius: ${constants.radii.subtle};
  width: 1.33em;
  line-height: 1;
  ${preset(space, { ml: 3 })}
  ${fractional}

  // Right-facing Caret
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform: translate(-50%, -50%);
    border-top: 0.25em solid transparent;
    border-right: 0;
    border-bottom: 0.25em solid transparent;
    border-left: 0.5em solid ${x => x.theme.colors.gray.medium};
    pointer-events: none;
  }
`;

const MetadataPlay = (...props) => (
  <Container {...props}>
    &nbsp;
  </Container>
);

export default MetadataPlay;
