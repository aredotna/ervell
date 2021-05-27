import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { MutationFunction as MutationFn } from '@apollo/client'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import usePasteListener from 'v2/hooks/usePasteListener'
import FileUploader from 'v2/components/UI/FileUploader'

import {
  createAddBlockMutation as CreateBlock,
  createAddBlockMutationVariables as CreateBlockVariables,
} from '__generated__/createAddBlockMutation'

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
  onAddBlock: ({ id: number }) => void
  channelId: string | number
  createBlock: MutationFn<CreateBlock, CreateBlockVariables>
}

const AddBlockPasteUploader: React.FC<AddBlockPasteUploader> = ({
  onAddBlock,
  createBlock,
  channelId,
}) => {
  const [mode, setMode] = useState('resting')
  const [fileUrl, setFileUrl] = useState(null)

  const handleErrors = useCallback(
    err => {
      console.error(err)
      setMode('error')
    },
    [setMode]
  )

  const onPaste = useCallback(
    url => {
      setMode('active')
      setFileUrl(url)
    },
    [setMode, setFileUrl]
  )

  usePasteListener({ onPaste })

  const finishUpload = useCallback(() => {
    setFileUrl(null)
  }, [setFileUrl])

  const onUpload = useCallback(
    ({ url: value }) => {
      setFileUrl(null)
      setMode('resting')
      return createBlock({
        variables: { channel_id: channelId.toString(), value },
      })
        .then(response => {
          if (response && response.data) {
            const { block } = response.data.create_block
            onAddBlock(block)
          }
        })
        .catch(err => {
          setMode('error')
          console.error(err)
        })
    },
    [setFileUrl, setMode, createBlock, channelId, onAddBlock]
  )

  return (
    <DropZone mode={mode}>
      <Backdrop>
        {mode === 'error' && (
          <Text
            mb={6}
            f={8}
            color="state.alert"
            textAlign="center"
            underlineLinks
          >
            There was a problem uploading your files.{' '}
            <Link onClick={finishUpload}>Close</Link>
          </Text>
        )}

        {fileUrl && (
          <FileUploader
            files={[fileUrl]}
            onUpload={onUpload}
            onComplete={finishUpload}
            onError={handleErrors}
          />
        )}
      </Backdrop>
    </DropZone>
  )
}

export { AddBlockPasteUploader }
