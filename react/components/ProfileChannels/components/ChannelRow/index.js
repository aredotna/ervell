import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import HorizontalRule from 'react/components/UI/HorizontalRule';

const Row = styled(Box).attrs({
  mb: 9,
  // Accomodate connect menu outline border from getting cut off
  pt: 3,
  pr: 3,
  pl: 3,
})`
  overflow: hidden;

  // Neutralize the padding for the connect outline
  margin-top: -${x => x.theme.space[3]};
  margin-left: -${x => x.theme.space[3]};

  > * {
    flex-wrap: nowrap;
  }
`;

const ChannelRow = ({ children, ...rest }) => (
  <Row {...rest}>
    {children}
    <HorizontalRule my={0} color="gray.light" />
  </Row>
);

ChannelRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChannelRow;
