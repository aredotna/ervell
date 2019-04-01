import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

import blockLightboxTextFragment from 'react/components/BlockLightbox/components/BlockLightboxText/fragments/blockLightboxText';

export default class BlockLightboxText extends PureComponent {
  static propTypes = {
    layout: PropTypes.oneOf(['DEFAULT', 'FULLSCREEN']).isRequired,
    block: propType(blockLightboxTextFragment).isRequired,
  }

  render() {
    const { block, layout } = this.props;

    return (
      <Box height="100%" width="100%">
        <Box
          height="100%"
          width="100%"
          p={9}
          overflowScrolling
        >
          <Box
            minHeight="100%"
            width={{ DEFAULT: '100%', FULLSCREEN: '75%' }[layout]}
            maxWidth="55em"
            bg={{ DEFAULT: 'white', FULLSCREEN: 'gray.bold' }[layout]}
            border="1px solid"
            borderColor={{ DEFAULT: 'gray.light', FULLSCREEN: 'gray.semiBold' }[layout]}
            px={7}
            py={6}
            mx="auto"
            overflow="hidden"
          >
            <Text
              font="serif"
              f={[4, 4, 5]}
              lineHeight={2}
              color={{ DEFAULT: 'gray.base', FULLSCREEN: 'white' }[layout]}
              dangerouslySetInnerHTML={{ __html: block.content }}
              boldLinks
              hoverLinks={{ color: 'black' }}
            />
          </Box>

          {layout === 'FULLSCREEN' && block.title &&
            <Text mt={6} f={5} lineHeight={2} color="gray.hint" fontWeight="bold" textAlign="center">
              {block.title}
            </Text>
          }
        </Box>
      </Box>
    );
  }
}
