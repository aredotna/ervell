import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';

const Dot = styled.span`
  display: inline-block;
  margin: 0 0.5em;
  &:after {
    content: '•';
  }
`;

const Label = ({ children, ...rest }) => (
  <Text display="inline" color="gray.medium" f={2} fontWeight="normal" {...rest}>
    <Dot />
    {children}
  </Text>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Label;
