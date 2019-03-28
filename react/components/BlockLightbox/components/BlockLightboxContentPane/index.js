import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import blockLightboxContentPaneFragment from 'react/components/BlockLightbox/components/BlockLightboxContentPane/fragments/blockLightboxContentPane';

import Box from 'react/components/UI/Box';
import BlockLightboxImage from 'react/components/BlockLightbox/components/BlockLightboxImage';
import BlockLightboxText from 'react/components/BlockLightbox/components/BlockLightboxText';
import BlockLightboxLink from 'react/components/BlockLightbox/components/BlockLightboxLink';
import BlockLightboxAttachment from 'react/components/BlockLightbox/components/BlockLightboxAttachment';
import BlockLightboxEmbed from 'react/components/BlockLightbox/components/BlockLightboxEmbed';
import BlockLightboxPending from 'react/components/BlockLightbox/components/BlockLightboxPending';

const Container = styled(Box).attrs({
  height: ['75vh', 'auto', 'auto'],
  minHeight: ['75vh', 'auto', 'auto'],
  maxHeight: ['auto', 'auto', 'auto'],
  mb: [8, 0, 0],
})`
  position: relative;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.layout === 'FULLSCREEN' && `
    background-color: ${props.theme.colors.gray.bold};
  `}
`;

export default class BlockLightboxContentPane extends PureComponent {
  static propTypes = {
    layout: PropTypes.oneOf(['DEFAULT', 'FULLSCREEN']).isRequired,
    block: propType(blockLightboxContentPaneFragment).isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const {
      block,
      layout,
      children,
      ...rest
    } = this.props;

    const Content = {
      Text: props => <BlockLightboxText {...props} />,
      Image: props => <BlockLightboxImage {...props} />,
      Link: props => <BlockLightboxLink {...props} />,
      Attachment: props => <BlockLightboxAttachment {...props} />,
      Embed: props => <BlockLightboxEmbed {...props} />,
      PendingBlock: props => <BlockLightboxPending {...props} />,
    }[block.__typename];

    return (
      <Container layout={layout} {...rest}>
        <Content block={block} layout={layout} />

        {children}
      </Container>
    );
  }
}
