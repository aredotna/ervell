/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { PureComponent } from 'react'

import { FullBlock as Block } from '__generated__/FullBlock'
import { LinkViewMode } from 'v2/components/FullBlock'

import FullBlockImage from 'v2/components/FullBlock/components/FullBlockImage'
import { FullBlockText } from 'v2/components/FullBlock/components/FullBlockText'
import { FullBlockLink } from 'v2/components/FullBlock/components/FullBlockLink'
import FullBlockAttachment from 'v2/components/FullBlock/components/FullBlockAttachment'
import FullBlockEmbed from 'v2/components/FullBlock/components/FullBlockEmbed'
import FullBlockPending from 'v2/components/FullBlock/components/FullBlockPending'

import {
  ContentContainer as Container,
  LightboxLayout,
} from 'v2/components/FullBlockLayout'

interface FullBlockContentPaneProps {
  block: Block
  layout: LightboxLayout
  children: React.ReactNode
  linkViewMode: LinkViewMode
}

export default class FullBlockContentPane extends PureComponent<
  FullBlockContentPaneProps
> {
  static defaultProps = {
    children: null,
  }

  render() {
    const { block, layout, children, linkViewMode, ...rest } = this.props

    const Content = {
      Text: props => <FullBlockText {...props} />,
      Image: props => <FullBlockImage {...props} />,
      Link: props => <FullBlockLink linkViewMode={linkViewMode} {...props} />,
      Attachment: props => <FullBlockAttachment {...props} />,
      Embed: props => <FullBlockEmbed {...props} />,
      PendingBlock: props => <FullBlockPending {...props} />,
    }[block.__typename]

    return (
      <Container
        height={['auto']}
        type={block.__typename}
        layout={layout}
        {...rest}
      >
        <Content block={block} layout={layout} />

        {children}
      </Container>
    )
  }
}
