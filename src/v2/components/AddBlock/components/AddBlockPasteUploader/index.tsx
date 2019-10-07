import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import usePasteListener from 'v2/hooks/usePasteListener'
import FileUploader from 'v2/components/UI/FileUploader'

const DropZone = styled(Box)`
  ${props => `display: ${{ resting: 'none', active: 'block' }[props.mode]};`}
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`

const Backdrop = styled(Box).attrs({
  bg: 'utility.translucent',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
`

interface AddBlockPasteUploader {
  onAddBlock: (props: any) => any
  channelId: string | number
  createBlock: (props: any) => Promise<any>
}

const AddBlockPasteUploader: React.FC<AddBlockPasteUploader> = ({
  onAddBlock,
  createBlock,
  channelId,
}) => {
  const [mode, setMode] = useState('resting')
  const [fileUrl, setFileUrl] = useState(null)

  usePasteListener({
    onPaste: url => {
      setMode('active')
      setFileUrl(url)
    },
  })

  const finishUpload = () => {
    setFileUrl(null)
  }

  const onUpload = useCallback(
    ({ url: value }) => {
      setFileUrl(null)
      setMode('resting')
      return createBlock({ variables: { channel_id: channelId, value } })
        .then(({ data: { create_block: { block } } }) => onAddBlock(block))
        .catch(err => {
          console.error(err)
        })
    },
    [setFileUrl, setMode, createBlock, channelId, onAddBlock]
  )

  return (
    <DropZone mode={mode}>
      <Backdrop>
        {fileUrl && (
          <FileUploader
            files={[fileUrl]}
            onUpload={onUpload}
            onComplete={finishUpload}
          />
        )}
      </Backdrop>
    </DropZone>
  )
}

export { AddBlockPasteUploader }
