import React from 'react'
import { LightboxLayout } from 'v2/components/BlockLightboxLayout'
import { LinkViewMode } from 'v2/components/BlockLightbox'
import { BlockLightboxLinkScreenshot } from 'v2/components/BlockLightbox/components/BlockLightboxLink/components/BlockLightboxLinkScreenshot'
import { BlockLightboxLinkReader } from 'v2/components/BlockLightbox/components/BlockLightboxLink/components/BlockLightboxLinkReader'

import { BlockLightbox_Link as Block } from '__generated__/BlockLightbox'

export interface BlockLightboxLinkProps {
  layout: LightboxLayout
  block: Block
  linkViewMode: LinkViewMode
}

export const BlockLightboxLink: React.FC<BlockLightboxLinkProps> = ({
  linkViewMode,
  ...rest
}) => {
  const Content = {
    screenshot: props => <BlockLightboxLinkScreenshot {...props} />,
    reader: props => <BlockLightboxLinkReader {...props} />,
  }[linkViewMode]

  return <Content {...rest} />
}
