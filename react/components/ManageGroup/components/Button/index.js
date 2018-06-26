import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  font-size: ${x => x.theme.fontSizesIndexed.base};
  font-weight: bold;
  color: ${x => x.theme.colors.gray.medium};
  line-height: 1;
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
