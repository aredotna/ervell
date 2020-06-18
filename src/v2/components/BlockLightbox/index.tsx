import React, { useState, useCallback } from 'react'
import { unescape } from 'underscore'

import constants from 'v2/styles/constants'

import { BlockLightbox as Block } from '__generated__/BlockLightbox'

import Title from 'v2/components/UI/Head/components/Title'
import BlockLightboxContentPane from 'v2/components/BlockLightbox/components/BlockLightboxContentPane'
import BlockLightboxMetadataPane from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane'
import { SplitPane } from 'v2/components/UI/SplitPane'

import {
  LightboxContainer as Container,
  LightboxLayout,
  LightboxContext,
} from 'v2/components/BlockLightboxLayout'

interface BlockLightboxProps {
  block: Block
  context: LightboxContext
  layout: LightboxLayout
  children: React.ReactNode
}

export type LinkViewMode = 'screenshot' | 'reader'
export type OnLinkViewModeChange = (mode: LinkViewMode) => void

const BlockLightbox: React.FC<BlockLightboxProps> = ({
  block,
  layout,
  context,
  children,
  ...rest
}) => {
  const [linkViewMode, setLinkViewMode] = useState<LinkViewMode>('screenshot')

  const onLinkViewModeChange = useCallback<OnLinkViewModeChange>(
    (mode: LinkViewMode) => {
      setLinkViewMode(mode)
    },
    [setLinkViewMode]
  )

  return (
    <>
      <Container {...rest}>
        {block.title && <Title>{unescape(block.title)}</Title>}

        <SplitPane context={context} layout={layout}>
          <BlockLightboxContentPane
            block={block}
            layout={layout}
            linkViewMode={linkViewMode}
          >
            {children}
          </BlockLightboxContentPane>

          {layout === 'DEFAULT' && (
            <BlockLightboxMetadataPane
              block={block}
              linkViewMode={linkViewMode}
              onLinkViewModeChange={onLinkViewModeChange}
              pt={context === 'MODAL' ? constants.topBarHeight : undefined}
            />
          )}
        </SplitPane>
      </Container>
    </>
  )
}

export default BlockLightbox
