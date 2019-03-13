import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import blockLightboxLinkFragment from 'react/components/BlockLightbox/components/BlockLightboxLink/fragments/blockLightboxLink';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Icons from 'react/components/UI/Icons';

const Screenshot = styled(Box)`
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
    background: linear-gradient(${props => props.theme.colors.utility.transparent} 0%,
      rgba(0, 0, 0, 0.125) 100%);
  }
`;


export default class BlockLightboxLink extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxLinkFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <Box p={6} width="100%" height="100%">
        <Box display="flex" flexDirection="column" height="100%" width="100%" border="1px solid" borderColor="gray.light" borderRadius="0.25em">
          <a href={block.source_url} target="_blank">
            <Box px={6} py={4} mb={4} display="flex" borderBottom="1px solid" borderColor="gray.light">
              <Icons name="Link" size="1rem" color="gray.base" mr={5} />

              <Text f={2} font="mono" color="gray.semiBold">
                <u>{block.source_url}</u>
              </Text>
            </Box>
          </a>

          <Screenshot bg="middleGray" flex="1" width="100%" position="relative">
            <a href={block.source_url} target="_blank">
              <Image width="100%" height="100%" backgroundImage={block.image_url} />
            </a>
          </Screenshot>
        </Box>
      </Box>
    );
  }
}
