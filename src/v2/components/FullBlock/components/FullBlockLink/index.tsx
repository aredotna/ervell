import React from 'react'
import { LightboxLayout } from 'v2/components/FullBlockLayout'
import { LinkViewMode } from 'v2/components/FullBlock'
import { FullBlockLinkScreenshot } from 'v2/components/FullBlock/components/FullBlockLink/components/FullBlockLinkScreenshot'
import { FullBlockLinkReader } from 'v2/components/FullBlock/components/FullBlockLink/components/FullBlockLinkReader'

import { FullBlockLinkQuery_block_Link as Block } from '__generated__/FullBlockLinkQuery'
import { FullBlockLinkTweet } from './components/FullBlockLinkTweet'

export interface FullBlockLinkProps {
  layout: LightboxLayout
  block: Block
  linkViewMode: LinkViewMode
}

export const FullBlockLink: React.FC<FullBlockLinkProps> = ({
  linkViewMode,
  block,
  ...rest
}) => {
  if (block.source_url?.match(/twitter\.com/) && block.content) {
    return <FullBlockLinkTweet block={block} {...rest} />
  }

  const Content = {
    screenshot: props => <FullBlockLinkScreenshot {...props} />,
    reader: props => <FullBlockLinkReader {...props} />,
  }[linkViewMode]

  return <Content block={block} {...rest} />
}
