import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, alignItems } from 'styled-system';

import constants from 'react/styles/constants';
import { preset } from 'react/styles/functions';

const Container = styled.div`
  display: flex;
  ${preset(space, { my: 7 })}
  ${preset(alignItems, { alignItems: 'flex-start' })}

  > label:first-child {
    margin: 0;
    flex-basis: 15%;
    font-weight: bold;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: ${x => x.theme.space[7]};
    overflow: hidden;
  }

  > *:last-child {
    flex: 1;
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
