import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import Konnectable from 'react/components/Cell/components/Konnectable';

const Container = styled(Box).attrs({
  mb: 8,
})`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => `
    width: ${props.theme.constantValues.blockWidth};
    height: ${props.theme.constantValues.blockWidth};

    ${props.mode === 'loading' && `
      &:after {
        display: block;
        content: '●';
        color: ${props.theme.colors.gray.medium};
      }
    `}
  `}
`;

const Skeletal = ({ mode, ...rest }) => ({
  active: () => <Konnectable {...rest} />,
  loading: () => (
    <Container mode={mode} {...rest} />
  ),
  pending: () => <Container {...rest} />,
}[mode]());

Skeletal.propTypes = {
  isActive: PropTypes.bool,
};

Skeletal.defaultProps = {
  isActive: false,
};

export default Skeletal;
