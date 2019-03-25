import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import blockLightboxEmbedFragment from 'react/components/BlockLightbox/components/BlockLightboxEmbed/fragments/blockLightboxEmbed';

import Box from 'react/components/UI/Box';

const Embed = styled(Box)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => `${(props.embedHeight / (props.embedWidth + 10)) * 100}%`};
  overflow: hidden;
  background-color: black;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
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
      <Box width="90%" height="90%" p={6} display="flex" alignItems="center" justifyContent="center">
        <Embed
          embedWidth={block.embed_width}
          embedHeight={block.embed_height}
          dangerouslySetInnerHTML={{ __html: block.embed_html }}
        />
      </Box>
    );
  }
}
