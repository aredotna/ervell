import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'

import { useWidthOf } from 'v2/hooks/useCurrentWidth'
import DropZoneUploader from 'v2/components/UI/DropZoneUploader'
import { AddBlockPasteUploader } from 'v2/components/AddBlock/components/AddBlockPasteUploader'

import Box from 'v2/components/UI/Box'
import Link from 'v2/components/UI/Link'
import { Textarea } from 'v2/components/UI/Inputs'
import GenericButton from 'v2/components/UI/GenericButton'

import CREATE_BLOCK_MUTATION from './mutations/createBlock'
import {
  tableCreateAddBlockMutation,
  tableCreateAddBlockMutationVariables,
} from '__generated__/tableCreateAddBlockMutation'
import Text from 'v2/components/UI/Text'
import constants from 'v2/styles/constants'

const Button = styled(GenericButton).attrs({
  bg: 'gray.light',
})`
  border-radius: 0px;
  height: 100%;
  width: 60px;
  border: 0px solid transparent;
  padding: 0;
  &:hover {
    border: 0px solid transparent !important;
  }
`

const Message = styled(Box)`
  text-align: left;
`

const Choose = styled(Link)`
  position: relative;
  border-bottom: 1px solid;
  z-index: 1;
  cursor: pointer;
`

const Input = styled(Textarea).attrs({
  resize: 'none',
  f: 2,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: transparent;
  overflow: hidden;

  &:focus {
    border: 0;
    background-color: ${props => props.theme.colors.gray.light};
    z-index: 2;
  }
`

const Container = styled(Box)`
  position: relative;
  line-height: 0;
  vertical-align: top;
  height: 100%;
  width: 100%;
`

const AddFieldContainer = styled(Box)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.gray.hint};
  top: 0;
  right: 60px;
  height: 100%;
  padding: ${constants.space[5]};
  justify-content: flex-start;
  line-height: 1;
  align-items: center;
  width: ${({ containerWidth, buttonWidth }) =>
    `${containerWidth - buttonWidth - 2}px`};
  display: ${({ mode }) => (mode == 'resting' ? 'none' : 'flex')};
`

type AddButtonState = 'resting' | 'ready' | 'active' | 'submitting' | 'error'

interface TableAddButtonInnerProps {
  containerWidth: number
  buttonWidth: number
  mode: AddButtonState
  channelId: number
  openUploadDialog: () => void
  handleOnChange: (value: string) => void
  handleOnKeyDown: (e: any) => void
  value: string
}

const TableAddButtonInner: React.FC<TableAddButtonInnerProps> = ({
  containerWidth,
  buttonWidth,
  mode,
  openUploadDialog,
  handleOnChange,
  handleOnKeyDown,
  value,
}) => {
  return (
    <AddFieldContainer
      mode={mode}
      containerWidth={containerWidth}
      buttonWidth={buttonWidth}
    >
      {value.length == 0 && (
        <Message p={6}>
          <Text f={2} fontWeight="normal">
            Drop or <Choose onClick={openUploadDialog}>choose</Choose> files,
            paste a URL (image, video, or link) or type text here
          </Text>
        </Message>
      )}
      <Input onChange={handleOnChange} onKeyDown={handleOnKeyDown} />
    </AddFieldContainer>
  )
}

interface TableAddButtonProps {
  channelId: number
  addBlock: () => void
}

export const TableAddButton: React.ForwardRefExoticComponent<TableAddButtonProps & {
  ref?: React.Ref<HTMLElement>
}> = React.forwardRef(
  (
    { channelId, addBlock },
    forwardedRef: React.MutableRefObject<HTMLInputElement | null> | null
  ) => {
    const ref = useRef<HTMLElement>()
    const [value, setValue] = useState<string>('')

    const { width: containerWidth } = useWidthOf({ ref: forwardedRef })
    const { width: buttonWidth } = useWidthOf({ ref })

    const [mode, setMode] = useState<AddButtonState>('resting')
    const [uploaderKey, setUploaderKey] = useState<number>(new Date().getTime())

    const [createBlock] = useMutation<
      tableCreateAddBlockMutation,
      tableCreateAddBlockMutationVariables
    >(CREATE_BLOCK_MUTATION)

    //
    // On button press
    //
    const handleOnClick = useCallback(() => {
      if (mode === 'resting') {
        return setMode('ready')
      }

      if (mode === 'ready') {
        return setMode('resting')
      }

      if (mode === 'active') {
        setMode('submitting')
        return createBlock({
          variables: { value, channel_id: channelId.toString() },
        }).then(() => {
          setMode('resting')
          setValue('')
          finishUpload()
          addBlock()
        })
      }
    }, [setMode, mode, value])

    //
    // On input change
    //
    const handleOnChange = useCallback(({ target: { value } }) => {
      setValue(value)

      if (value.length == 0) {
        setMode('ready')
      }

      if (value.length > 0) {
        setMode('active')
      }
    }, [])

    const handleKeyDown = useCallback(
      e => {
        const { key, shiftKey } = e

        if (key === 'Enter' && !shiftKey) {
          e.preventDefault()
          e.stopPropagation()
          handleOnClick()
        }

        // Allows <shift+enter> to pass through
      },
      [handleOnClick]
    )

    //
    // On successful upload (drop or choose file)
    //
    const handleUpload = useCallback(
      ({ url: value }) => {
        return createBlock({
          variables: { channel_id: channelId.toString(), value },
        })
          .then(response => {
            if (response && response.data) {
              addBlock()
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      [createBlock, addBlock]
    )

    //
    // Callback for upload finishing
    //
    const finishUpload = useCallback(() => {
      setUploaderKey(new Date().getTime())
    }, [setUploaderKey])

    return (
      <Container ref={ref}>
        <AddBlockPasteUploader
          createBlock={createBlock}
          channelId={channelId}
          onAddBlock={addBlock}
        />
        <DropZoneUploader
          accept="image/*,audio/*,video/*,application/*" // TODO
          onUpload={handleUpload}
          onComplete={finishUpload}
          key={uploaderKey}
        >
          {({ openUploadDialog }) => (
            <>
              <Button onClick={handleOnClick} f={1}>
                {
                  {
                    resting: 'Add +',
                    ready: 'Cancel',
                    active: 'Save',
                    submitting: 'Saving...',
                    error: 'Error',
                  }[mode]
                }
              </Button>

              <TableAddButtonInner
                key={uploaderKey}
                value={value}
                handleOnChange={handleOnChange}
                handleOnKeyDown={handleKeyDown}
                openUploadDialog={openUploadDialog}
                channelId={channelId}
                mode={mode}
                containerWidth={containerWidth}
                buttonWidth={buttonWidth}
              />
            </>
          )}
        </DropZoneUploader>
      </Container>
    )
  }
)
