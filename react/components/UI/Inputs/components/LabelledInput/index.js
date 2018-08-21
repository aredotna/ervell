import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, alignItems } from 'styled-system';

import constants from 'react/styles/constants';
import { preset } from 'react/styles/functions';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  ${space}
  ${preset(alignItems, { alignItems: 'center' })}

  > label:first-child {
    font-weight: bold;
    text-align: right;
    padding-right: ${x => x.theme.space[7]}
  }

  ${constants.media.mobile`
    display: block;

    > label:first-child {
      text-align: left;
      padding: 0 0 ${x => x.theme.space[3]} ${x => x.theme.space[3]};
    }
  `}
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
