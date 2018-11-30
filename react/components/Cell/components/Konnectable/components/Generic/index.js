import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Img from 'react/components/Cell/components/Konnectable/components/Img';

const hoverMixin = css`
  border: 1px solid ${x => x.theme.colors.gray.semiLight};
`;

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: 1px solid transparent;

  ${x => x.mode === 'hover' && hoverMixin}
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
    const { src, title, mode } = this.props;

    return (
      <Container mode={mode}>
        <Img src={src} alt={title} />
      </Container>
    );
  }
}
