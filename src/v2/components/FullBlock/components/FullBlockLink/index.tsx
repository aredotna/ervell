import React from 'react'
import { LightboxLayout } from 'v2/components/FullBlockLayout'
import { LinkViewMode } from 'v2/components/FullBlock'
import { FullBlockLinkScreenshot } from 'v2/components/FullBlock/components/FullBlockLink/components/FullBlockLinkScreenshot'
import { FullBlockLinkReader } from 'v2/components/FullBlock/components/FullBlockLink/components/FullBlockLinkReader'

import { FullBlockLinkQuery_block_Link as Block } from '__generated__/FullBlockLinkQuery'

export interface FullBlockLinkProps {
  layout: LightboxLayout
  block: Block
  linkViewMode: LinkViewMode
}

export const FullBlockLink: React.FC<FullBlockLinkProps> = ({
  linkViewMode,
  ...rest
}) => {
  const Content = {
    screenshot: props => <FullBlockLinkScreenshot {...props} />,
    reader: props => <FullBlockLinkReader {...props} />,
  }[linkViewMode]

  return <Content {...rest} />
}
