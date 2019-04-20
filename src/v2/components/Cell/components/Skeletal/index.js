import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Box from 'v2/components/UI/Box';

const Container = styled(Box).attrs({
  mb: 8,
  p: 6,
  border: '1px solid',
  borderColor: 'gray.light',
})`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => `
    width: ${props.theme.constantValues.blockWidth};
    height: ${props.theme.constantValues.blockWidth};

    ${(
    {
      loading: `
        &:after {
          display: block;
          content: '●';
          color: ${props.theme.colors.gray.semiLight};
        }
      `,
      error: `
        border-color: ${props.theme.colors.state.alert};
        &:after {
          display: block;
          content: '×';
          color: ${props.theme.colors.state.alert};
        }
      `,
    }[props.mode])}
  `}
`;

const Skeletal = ({ mode, ...rest }) => ({
  pending: () => <Container mode={mode} {...rest} />,
  loading: () => <Container mode={mode} {...rest} />,
  error: () => <Container mode={mode} {...rest} />,
}[mode]());

Skeletal.propTypes = {
  mode: PropTypes.oneOf(['pending', 'loading', 'error']),
};

Skeletal.defaultProps = {
  mode: 'pending',
};

export default Skeletal;
