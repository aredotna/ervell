import React, { useState, useCallback } from 'react'
import { unescape } from 'underscore'

import constants from 'v2/styles/constants'

import { FullBlock as Block } from '__generated__/FullBlock'

import Title from 'v2/components/UI/Head/components/Title'
import FullBlockContentPane from 'v2/components/FullBlock/components/FullBlockContentPane'
import FullBlockMetadataPane from 'v2/components/FullBlock/components/FullBlockMetadataPane'
import { SplitPane } from 'v2/components/UI/SplitPane'

import {
  LightboxContainer as Container,
  LightboxLayout,
  LightboxContext,
} from 'v2/components/FullBlockLayout'

interface FullBlockProps {
  block: Block
  context: LightboxContext
  layout: LightboxLayout
  children: React.ReactNode
}

export type LinkViewMode = 'screenshot' | 'reader'
export type OnLinkViewModeChange = (mode: LinkViewMode) => void

const FullBlock: React.FC<FullBlockProps> = ({
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
          <FullBlockContentPane
            block={block}
            layout={layout}
            linkViewMode={linkViewMode}
          >
            {children}
          </FullBlockContentPane>

          {layout === 'DEFAULT' && (
            <FullBlockMetadataPane
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

export default FullBlock
