import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import blockLightboxFragment from 'react/components/BlockLightbox/fragments/blockLightbox';

import Box from 'react/components/UI/Box';
import BlockLightboxContentPane from 'react/components/BlockLightbox/components/BlockLightboxContentPane';
import BlockLightboxMetadataPane from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane';

const Container = styled(Box).attrs({
  flexDirection: ['column', 'row', 'row'],
})`
  display: flex;
  height: 100%;
`;

export default class BlockLightbox extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <Container>
        <BlockLightboxContentPane block={block} />
        <BlockLightboxMetadataPane block={block} />
      </Container>
    );
  }
}
