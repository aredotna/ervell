import React, { useState, useCallback } from 'react'

import { SansSerifText } from 'v2/components/UI/SansSerifText'
import Modal from 'v2/components/UI/Modal/Portal'
import { ManageBlock } from 'v2/components/ManageBlock'
import BlockLightboxModalDialog from 'v2/components/BlockLightbox/components/BlockLightboxModalDialog'

import { TextBoxContainer } from 'v2/components/BlockLightboxLayout'

import { BlockLightbox_Text as Block } from '__generated__/BlockLightbox'

interface BlockLightboxTextProps {
  layout: 'DEFAULT' | 'FULLSCREEN'
  block: Block
}

export const BlockLightboxText: React.FC<BlockLightboxTextProps> = ({
  layout,
  block,
}) => {
  const [mode, setMode] = useState<'resting' | 'editing'>('resting')

  const openModal = useCallback(
    (e: any) => {
      if (
        window.getSelection().toString() ||
        window.getSelection().toString() !== '' ||
        e.target.tagName.toLowerCase() === 'a'
      ) {
        return false
      }
      setMode('editing')
    },
    [setMode]
  )

  const closeModal = useCallback(() => {
    setMode('resting')
  }, [setMode])

  return (
    <React.Fragment>
      {mode === 'editing' && (
        <Modal onClose={closeModal} Dialog={BlockLightboxModalDialog}>
          <ManageBlock block={block} onDone={closeModal} autoFocus="body" />
        </Modal>
      )}

      <TextBoxContainer
        layout={layout}
        onClick={block.can.manage ? openModal : undefined}
      >
        <SansSerifText
          color={{ DEFAULT: 'gray.block', FULLSCREEN: 'white' }[layout]}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />

        {layout === 'FULLSCREEN' && block.title && (
          <SansSerifText>{block.title}</SansSerifText>
        )}
      </TextBoxContainer>
    </React.Fragment>
  )
}
