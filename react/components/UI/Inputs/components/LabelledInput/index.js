import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, alignItems } from 'styled-system';

import { preset } from 'react/styles/functions';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  ${space}
  ${preset(alignItems, { alignItems: 'center' })}

  // TODO: Mobile

  > label:first-child {
    font-weight: bold;
    text-align: right;
    padding-right: ${x => x.theme.space[7]}
  }
`;

const LabelledInput = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);

LabelledInput.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LabelledInput;
