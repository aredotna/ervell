import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import blockLightboxEmbedFragment from 'react/components/BlockLightbox/components/BlockLightboxEmbed/fragments/blockLightboxEmbed';

import Box from 'react/components/UI/Box';

const Container = styled(Box)`
  background-color: black;
  width: 95%;
  height: 95%;

  iframe {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }
`;

export default class BlockLightboxEmbed extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxEmbedFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <Container dangerouslySetInnerHTML={{ __html: block.embed_html }} />
    );
  }
}
