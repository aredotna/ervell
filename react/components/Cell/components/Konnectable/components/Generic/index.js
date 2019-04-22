import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import Img from 'react/components/Cell/components/Konnectable/components/Img';

const hoverMixin = css`
  border: 1px solid ${props => props.theme.colors.gray.semiLight};
`;

const Container = styled(Box)`
  height: 100%;
  width: 100%;

  ${props => props.mode === 'hover' && hoverMixin}
  &:hover { ${hoverMixin} }
`;

export default class Generic extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    mode: PropTypes.oneOf(['resting', 'hover', 'overlay']),
  }

  static defaultProps = {
    title: null,
    mode: 'resting',
  }

  render() {
    const {
      src, title, mode, ...rest
    } = this.props;

    return (
      <Container
        mode={mode}
        border="1px solid"
        borderColor="transparent"
        {...rest}
      >
        <Img src={src} alt={title} />
      </Container>
    );
  }
}
