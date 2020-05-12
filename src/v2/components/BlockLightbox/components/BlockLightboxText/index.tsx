import React, { useState, useCallback } from 'react'

import Box from 'v2/components/UI/Box'
import { SansSerifText } from 'v2/components/UI/SansSerifText'
import Modal from 'v2/components/UI/Modal/Portal'
import ManageBlock from 'v2/components/ManageBlock'
import BlockLightboxModalDialog from 'v2/components/BlockLightbox/components/BlockLightboxModalDialog'

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

      <Box height="100%" width="100%">
        <Box
          height={['auto', '100%']}
          width="100%"
          p={[3, 9]}
          overflowScrolling
        >
          <Box
            minHeight="100%"
            width={{ DEFAULT: '100%', FULLSCREEN: '75%' }[layout]}
            maxWidth="55em"
            bg={{ DEFAULT: 'white', FULLSCREEN: 'gray.bold' }[layout]}
            border="1px solid"
            borderColor={
              { DEFAULT: 'gray.light', FULLSCREEN: 'gray.semiBold' }[layout]
            }
            px={7}
            py={6}
            mx="auto"
            overflow="hidden"
            onClick={block.can.manage ? openModal : undefined}
          >
            <SansSerifText
              color={{ DEFAULT: 'gray.block', FULLSCREEN: 'white' }[layout]}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </Box>

          {layout === 'FULLSCREEN' && block.title && (
            <SansSerifText>{block.title}</SansSerifText>
          )}
        </Box>
      </Box>
    </React.Fragment>
  )
}
