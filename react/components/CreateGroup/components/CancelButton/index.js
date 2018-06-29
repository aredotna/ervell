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
`;

const Cancel = ({ onClick, ...rest }) => (
  <Button onClick={onClick} {...rest}>
    Cancel
  </Button>
);

Cancel.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Cancel;
