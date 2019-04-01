import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import blockLightboxImageFragment from 'react/components/BlockLightbox/components/BlockLightboxImage/fragments/blockLightboxImage';

import Text from 'react/components/UI/Text';
import Link from 'react/components/UI/Link';

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;
`;

export default class BlockLightboxImage extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxImageFragment).isRequired,
    layout: PropTypes.oneOf(['DEFAULT', 'FULLSCREEN']).isRequired,
  }

  render() {
    const { block, layout } = this.props;

    return (
      <Link
        width="90%"
        height="95%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        href={block.original_image_url}
        target="_blank"
        p={6}
      >
        <Image
          src={block.image_url}
          alt={block.title}
          title={block.title}
        />

        {layout === 'FULLSCREEN' && block.title &&
          <Text mt={6} f={5} lineHeight={2} color="gray.hint" fontWeight="bold" textAlign="center">
            {block.title}
          </Text>
        }
      </Link>
    );
  }
}
