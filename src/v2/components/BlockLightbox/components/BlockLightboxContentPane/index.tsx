import React, { PureComponent } from 'react'

import { BlockLightbox as Block } from '__generated__/BlockLightbox'
import { LinkViewMode } from 'v2/components/BlockLightbox'

import BlockLightboxImage from 'v2/components/BlockLightbox/components/BlockLightboxImage'
import { BlockLightboxText } from 'v2/components/BlockLightbox/components/BlockLightboxText'
import { BlockLightboxLink } from 'v2/components/BlockLightbox/components/BlockLightboxLink'
import BlockLightboxAttachment from 'v2/components/BlockLightbox/components/BlockLightboxAttachment'
import BlockLightboxEmbed from 'v2/components/BlockLightbox/components/BlockLightboxEmbed'
import BlockLightboxPending from 'v2/components/BlockLightbox/components/BlockLightboxPending'

import {
  ContentContainer as Container,
  LightboxLayout,
} from 'v2/components/BlockLightboxLayout'

interface BlockLightboxContentPaneProps {
  block: Block
  layout: LightboxLayout
  children: React.ReactNode
  linkViewMode: LinkViewMode
}

export default class BlockLightboxContentPane extends PureComponent<
  BlockLightboxContentPaneProps
> {
  static defaultProps = {
    children: null,
  }

  render() {
    const { block, layout, children, linkViewMode, ...rest } = this.props

    const Content = {
      Text: props => <BlockLightboxText {...props} />,
      Image: props => <BlockLightboxImage {...props} />,
      Link: props => (
        <BlockLightboxLink linkViewMode={linkViewMode} {...props} />
      ),
      Attachment: props => <BlockLightboxAttachment {...props} />,
      Embed: props => <BlockLightboxEmbed {...props} />,
      PendingBlock: props => <BlockLightboxPending {...props} />,
    }[block.__typename]

    return (
      <Container height={['auto']} layout={layout} {...rest}>
        <Content block={block} layout={layout} />

        {children}
      </Container>
    )
  }
}
