import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import blockLightboxImageFragment from 'react/components/BlockLightbox/components/BlockLightboxImage/fragments/blockLightboxImage';

import Box from 'react/components/UI/Box';

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;
`;

export default class BlockLightboxImage extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxImageFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <Box bg="black" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
        <Image
          src={block.image_url}
          alt={block.title}
          title={block.title}
        />
      </Box>
    );
  }
}
