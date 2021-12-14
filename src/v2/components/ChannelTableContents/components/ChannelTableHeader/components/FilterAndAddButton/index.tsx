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
import Text from 'v2/components/UI/Text'
import Icon from 'v2/components/UI/Icons'
import Overlay from 'v2/components/UI/Overlay'

import constants from 'v2/styles/constants'

import CREATE_BLOCK_MUTATION from './mutations/createBlock'
import {
  tableCreateAddBlockMutation,
  tableCreateAddBlockMutationVariables,
} from '__generated__/tableCreateAddBlockMutation'
import Filter from '../FilterContainer'
import { ConnectableTypeEnum } from '__generated__/globalTypes'
import { ChannelTableConnectors_channel_connectors } from '__generated__/ChannelTableConnectors'

const AddButton = styled(GenericButton).attrs({
  bg: 'gray.light',
})`
  border-radius: 0px;
  height: 100%;
  width: 60px;
  border: 0px solid transparent;
  padding: 0;
  border-left: 1px solid ${x => x.theme.colors.gray.light};
  &:hover {
    border: 0px solid transparent !important;
  }
`

const Middle = styled(Box).attrs({
  bg: 'white',
})`
  width: 10px;
  height: 110%;
  transform: translateY(-1px);
`

const FilterButton = styled(GenericButton).attrs({
  bg: 'gray.hint',
})`
  border-radius: 0px;
  height: 100%;
  width: 36px;
  border: 0px solid transparent;
  padding: 0;
  border-right: 1px solid ${x => x.theme.colors.gray.light};
  &:hover {
    border: 0px solid transparent !important;
    border-right: 1px solid ${x => x.theme.colors.gray.light} !important;
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
  text-align: right;
  display: flex;
  justify-content: space-between;
`

const AddFieldContainer = styled(Box)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.gray.hint};
  top: 0;
  right: ${({ offsetWidth }) => `${offsetWidth}px`};
  height: 100%;
  padding: ${constants.space[5]};
  justify-content: flex-start;
  line-height: 1;
  align-items: center;
  width: ${({ containerWidth, offsetWidth }) =>
    `${containerWidth - offsetWidth - 2}px`};
  display: ${({ mode }) => (mode == 'resting' ? 'none' : 'flex')};
`

type AddButtonState = 'resting' | 'ready' | 'active' | 'submitting' | 'error'
type FilterButtonState =
  | 'resting'
  | 'open'
  | 'active'
  | 'activeAndOpen'
  | 'error'

interface TableAddButtonInnerProps {
  containerWidth: number
  offsetWidth: number
  mode: AddButtonState
  channelId: number
  openUploadDialog: () => void
  handleOnChange: (value: string) => void
  handleOnKeyDown: (e: any) => void
  value: string
}

const TableAddButtonInner: React.FC<TableAddButtonInnerProps> = ({
  containerWidth,
  offsetWidth,
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
      offsetWidth={offsetWidth}
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
  setType: (value: ConnectableTypeEnum) => void
  setUser: (value: ChannelTableConnectors_channel_connectors) => void
}

export const TableAddButton: React.ForwardRefExoticComponent<TableAddButtonProps & {
  ref?: React.Ref<HTMLElement>
}> = React.forwardRef(
  (
    { channelId, addBlock, setType, setUser },
    forwardedRef: React.MutableRefObject<HTMLInputElement | null> | null
  ) => {
    const buttonContainerRef = useRef<HTMLElement>()
    const filterRef = useRef<HTMLElement>()
    const [value, setValue] = useState<string>('')

    const { width: containerWidth } = useWidthOf({ ref: forwardedRef })
    const { width: buttonContainerWidth } = useWidthOf({
      ref: buttonContainerRef,
    })

    const [mode, setMode] = useState<AddButtonState>('resting')
    const [filterMode, setFilterMode] = useState<FilterButtonState>('resting')
    const [uploaderKey, setUploaderKey] = useState<number>(new Date().getTime())

    console.log({ containerWidth, buttonContainerWidth })

    const [createBlock] = useMutation<
      tableCreateAddBlockMutation,
      tableCreateAddBlockMutationVariables
    >(CREATE_BLOCK_MUTATION)

    //
    // On filter button press
    //
    const handleFilterClick = useCallback(() => {
      if (filterMode == 'open') {
        return setFilterMode('resting')
      }
      if (filterMode === 'activeAndOpen') {
        return setFilterMode('active')
      }
      if (filterMode === 'active') {
        return setFilterMode('activeAndOpen')
      }
      if (filterMode === 'resting') {
        return setFilterMode('open')
      }
    }, [setFilterMode, filterMode])

    //
    // On add button press
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
      <Container ref={buttonContainerRef}>
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
              <Box position="relative" ref={filterRef}>
                <FilterButton f={1} onClick={handleFilterClick}>
                  <Icon name="Filters" size="1rem" />
                </FilterButton>
                {filterRef.current &&
                  (filterMode == 'open' || filterMode === 'activeAndOpen') && (
                    <Overlay
                      alignToY="bottom"
                      alignToX="right"
                      anchorY="top"
                      anchorX="right"
                      targetEl={() => filterRef.current}
                      offsetY={5}
                      onClose={() => setFilterMode('resting')}
                    >
                      <Filter
                        id={channelId}
                        setType={setType}
                        setUser={setUser}
                      />
                    </Overlay>
                  )}
              </Box>
              <Middle />
              <AddButton onClick={handleOnClick} f={1}>
                {
                  {
                    resting: 'Add +',
                    ready: 'Cancel',
                    active: 'Save',
                    submitting: 'Saving...',
                    error: 'Error',
                  }[mode]
                }
              </AddButton>

              <TableAddButtonInner
                key={uploaderKey}
                value={value}
                handleOnChange={handleOnChange}
                handleOnKeyDown={handleKeyDown}
                openUploadDialog={openUploadDialog}
                channelId={channelId}
                mode={mode}
                containerWidth={containerWidth}
                offsetWidth={buttonContainerWidth}
              />
            </>
          )}
        </DropZoneUploader>
      </Container>
    )
  }
)
