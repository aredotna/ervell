import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Badge from 'react/components/UI/Badge';

import blockLightboxAttachmentFragment from 'react/components/BlockLightbox/components/BlockLightboxAttachment/fragments/blockLightboxAttachment.js';

const Link = styled.a`
  display: block;
`;

const Player = styled.audio`
  &::-webkit-media-controls-panel {
    background-color: ${props => props.theme.colors.gray.light};
  }
`;

export default class BlockLightboxAttachment extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxAttachmentFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <Box
        display="flex"
        width="100%"
        height="100%"
        bg="gray.hint"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        flexDirection="column"
      >
        {block.file_content_type === 'application/pdf' &&
          <Box flex="1" width="100%">
            <iframe src={block.file_url} width="100%" height="100%" title={block.title} />
          </Box>
        }

        <Link
          href={block.file_url}
          rel="nofollow"
          target="_blank"
          download
        >
          <Box p={6}>
            {block.file_content_type === 'audio/mpeg' &&
              <Box my={3}>
                <Player controls>
                  <source src={block.file_url} type="audio/mpeg" />
                </Player>
              </Box>
            }

            <Badge mb={3} f={5}>
              {block.file_extension}
            </Badge>

            <Text f={5} fontWeight="bold" lineHeight={2}>
              Download {block.title}
            </Text>

            <Text f={5} fontWeight="bold" lineHeight={2} color="gray.medium">
              {block.file_size}
            </Text>
          </Box>
        </Link>
      </Box>
    );
  }
}
