import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import blockLightboxContentPaneFragment from 'react/components/BlockLightbox/components/BlockLightboxContentPane/fragments/blockLightboxContentPane';

import Box from 'react/components/UI/Box';
import BlockLightboxImage from 'react/components/BlockLightbox/components/BlockLightboxImage';
import BlockLightboxText from 'react/components/BlockLightbox/components/BlockLightboxText';
import BlockLightboxLink from 'react/components/BlockLightbox/components/BlockLightboxLink';
import BlockLightboxAttachment from 'react/components/BlockLightbox/components/BlockLightboxAttachment';
import BlockLightboxEmbed from 'react/components/BlockLightbox/components/BlockLightboxEmbed';

const Container = styled(Box)`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class BlockLightboxContentPane extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxContentPaneFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    const Content = {
      Text: () => <BlockLightboxText block={block} />,
      Image: () => <BlockLightboxImage block={block} />,
      Link: () => <BlockLightboxLink block={block} />,
      Attachment: () => <BlockLightboxAttachment block={block} />,
      Embed: () => <BlockLightboxEmbed block={block} />,
    }[block.__typename];

    return (
      <Container>
        <Content />
      </Container>
    );
  }
}
