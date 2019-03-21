import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

import blockLightboxTextFragment from 'react/components/BlockLightbox/components/BlockLightboxText/fragments/blockLightboxText';

const Container = styled(Box)`
`;

export default class BlockLightboxText extends PureComponent {
  static propTypes = {
    layout: PropTypes.oneOf(['DEFAULT', 'FULLSCREEN']).isRequired,
    block: propType(blockLightboxTextFragment).isRequired,
  }

  render() {
    const { block, layout } = this.props;

    return (
      <Container height="100%" width="100%">
        <Box
          height="100%"
          width="100%"
          p={9}
          overflowScrolling
        >
          <Box
            minHeight="100%"
            bg={{ DEFAULT: 'white', FULLSCREEN: 'gray.bold' }[layout]}
            border="1px solid"
            borderColor={{ DEFAULT: 'gray.light', FULLSCREEN: 'gray.semiBold' }[layout]}
            px={7}
            py={6}
          >
            <Text
              font="serif"
              f={5}
              lineHeight={2}
              color={{ DEFAULT: 'gray.base', FULLSCREEN: 'white' }[layout]}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </Box>
        </Box>
      </Container>
    );
  }
}
