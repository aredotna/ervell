import React from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import { truncate } from 'react/components/UI/Truncate';

import blockLightboxActionsFragment from 'react/components/BlockLightbox/components/BlockLightboxActions/fragments/blockLightboxActions';

import Box from 'react/components/UI/Box';
import MuteButton from 'react/components/MuteButton';
import BlockLightboxShare from 'react/components/BlockLightbox/components/BlockLightboxShare';

const Container = styled(Box)`
  > a {
    display: block;
  }
`;

const BlockLightboxActions = ({ block }) => (
  <Container>
    <BlockLightboxShare block={block} />

    {block.source &&
      <a
        href={block.source.url}
        rel="nofollow"
        target="_blank"
        dangerouslySetInnerHTML={{
          __html: (block.source.title ? `Source: ${truncate(block.source.title, 40)}` : 'Source'),
        }}
      />
    }

    {block.find_original_url &&
      <a href={block.find_original_url} rel="nofollow" target="_blank">
        Find original
      </a>
    }

    <MuteButton id={block.id} type="BLOCK" />
  </Container>
);

BlockLightboxActions.propTypes = {
  block: propType(blockLightboxActionsFragment).isRequired,
};

export default BlockLightboxActions;
