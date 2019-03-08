import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import blockLightboxLinkFragment from 'react/components/BlockLightbox/components/BlockLightboxLink/fragments/blockLightboxLink';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Overlay = styled(Box).attrs({
  px: 6,
  pb: 7,
  textAlign: 'center',
})`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;

  > {
    text-shadow: 2px 2px #ff0000;
  }
`;

const Screenshot = styled(Box)`
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Image = styled(Box)`
  position: relative;
  background-size: cover;
  background-position: top center;
  background-image: url(${props => props.backgroundImage});

  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 6em;
    background: linear-gradient(${props => props.theme.colors.utility.transparent} 0%, rgba(0, 0, 0, 0.5) 100%);
  }
`;


export default class BlockLightboxLink extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxLinkFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <Box display="flex" flexDirection="column" height="100%" width="100%">
        <Box border="2px solid" borderColor="gray.light" px={6} py={4} borderRadius="0.25em" mb={4} ml={6}>
          <a href={block.source_url} target="_blank">
            <Text f={2} font="mono" color="gray.semiBold">
              {block.source_url}
            </Text>
          </a>
        </Box>

        <Screenshot bg="middleGray" flex="1" width="100%" position="relative">
          <a href={block.source_url} target="_blank">
            <Image width="100%" height="100%" backgroundImage={block.image_url} />
          </a>

          <Overlay>
            <Text color="white" fontWeight="bold">
              Open URL in new tab
            </Text>
          </Overlay>
        </Screenshot>
      </Box>
    );
  }
}
