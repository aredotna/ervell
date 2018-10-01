import React from 'react';
import styled, { css } from 'styled-components';

import Img from 'react/components/Blokk/components/Img';
import Connectable from 'react/components/Blokk/components/Connectable';

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

export default class Link extends Connectable {
  render() {
    const { src, title, mode } = this.props;

    return (
      <Container mode={mode}>
        <Img src={src} alt={title} />
      </Container>
    );
  }
}
