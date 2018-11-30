import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import LoadingIndicator from 'react/components/UI/LoadingIndicator';

const hoverMixin = css`
  border: 1px solid ${x => x.theme.colors.gray.semiLight};
`;

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: 1px solid transparent;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  ${x => x.mode === 'hover' && hoverMixin}
  &:hover { ${hoverMixin} }
`;

export default class PendingBlock extends PureComponent {
  static propTypes = {
    mode: PropTypes.oneOf(['resting', 'hover', 'overlay']),
  }

  static defaultProps = {
    mode: 'resting',
  }

  render() {
    const { mode } = this.props;

    return (
      <Container mode={mode}>
        <LoadingIndicator />
      </Container>
    );
  }
}
