import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from 'react/styles';

const Button = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  font-size: ${Styles.Type.size.base};
  font-weight: bold;
  color: ${Styles.Colors.gray.regular};
`;

const Component = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} {...rest}>
    {children}
  </Button>
);

Component.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Component;
