import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mixin } from 'react/components/UI/Text';

const Anchor = styled.a.attrs({
  display: 'block',
  role: 'button',
  tabIndex: 0,
})`
  ${mixin}
  text-decoration: none;

  &:hover,
  &:hover > * {
    color: black;
  }
`;

const Link = ({ children, ...rest }) => (
  <Anchor py={5} px="1rem" fontWeight="bold" {...rest}>
    {children}
  </Anchor>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Link;
