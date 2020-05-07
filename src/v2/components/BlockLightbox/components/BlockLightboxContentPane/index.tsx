import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { BlockLightbox as Block } from '__generated__/BlockLightbox'

import Box from 'v2/components/UI/Box'
import BlockLightboxImage from 'v2/components/BlockLightbox/components/BlockLightboxImage'
import { BlockLightboxText } from 'v2/components/BlockLightbox/components/BlockLightboxText'
import BlockLightboxLink from 'v2/components/BlockLightbox/components/BlockLightboxLink'
import BlockLightboxAttachment from 'v2/components/BlockLightbox/components/BlockLightboxAttachment'
import BlockLightboxEmbed from 'v2/components/BlockLightbox/components/BlockLightboxEmbed'
import BlockLightboxPending from 'v2/components/BlockLightbox/components/BlockLightboxPending'

import { LightboxLayout } from 'v2/components/BlockLightbox'

const Container = styled(Box).attrs({
  minHeight: ['75vh', 'auto', 'auto'],
  maxHeight: ['auto', 'auto', 'auto'],
  mb: [8, 0, 0],
})`
  position: relative;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.layout === 'FULLSCREEN' &&
    `
    background-color: ${props.theme.colors.gray.bold};
  `}
`

interface BlockLightboxContentPaneProps {
  block: Block
  layout: LightboxLayout
  children: React.ReactNode
}

export default class BlockLightboxContentPane extends PureComponent<
  BlockLightboxContentPaneProps
> {
  static defaultProps = {
    children: null,
  }

  render() {
    const { block, layout, children, ...rest } = this.props

    const Content = {
      Text: props => <BlockLightboxText {...props} />,
      Image: props => <BlockLightboxImage {...props} />,
      Link: props => <BlockLightboxLink {...props} />,
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
