import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { MutationFunction as MutationFn } from '@apollo/client'
import { Mutation } from '@apollo/client/react/components'

import Box from 'v2/components/UI/Box'
import { FilledButton } from 'v2/components/UI/Buttons'
import DropZoneUploader from 'v2/components/UI/DropZoneUploader'
import { AddBlockPasteUploader } from 'v2/components/AddBlock/components/AddBlockPasteUploader'
import { AddBlockInner } from 'v2/components/AddBlock/components/AddBlockInner'
import { AddBlockCTAInner } from 'v2/components/AddBlock/components/AddBlockCTAInner'

import createBlockMutation from 'v2/components/AddBlock/mutations/createBlock'
import {
  createAddBlockMutation as CreateBlock,
  createAddBlockMutationVariables as CreateBlockVariables,
} from '__generated__/createAddBlockMutation'

const Button = styled(FilledButton).attrs({
  py: 6,
  f: 4,
  color: 'utility.transparent',
})`
  &:hover {
    background-color: transparent;
  }
`

const Container = styled(Box).attrs({
  bg: 'gray.hint',
})`
  display: flex;
  flex-direction: column;

  ${props => `
    width: ${props.theme.constantValues.blockWidth};
    height: ${props.theme.constantValues.blockWidth};
  `}
`

interface Props {
  channel_id: string | number
  onAddBlock: ({ id: number }) => void
  isElligbleForPremium: boolean
}

interface AddBlockProps extends Props {
  createBlock: MutationFn<CreateBlock, CreateBlockVariables>
}

class AddBlock extends PureComponent<AddBlockProps> {
  static defaultProps = {
    onAddBlock: () => {},
  }

  state = {
    mode: 'resting',
    value: '',
    inputKey: new Date().getTime(),
    uploaderKey: new Date().getTime(),
  }

  handleChange = ({ target: { value } }) => {
    const mode = value === '' ? 'resting' : 'active'
    this.setState({ value, mode })
  }

  handleKeyDown = e => {
    const { key, shiftKey } = e

    if (key === 'Enter' && !shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      this.handleSubmit()
    }

    // Allows <shift+enter> to pass through
  }

  handleSubmit = () => {
    const { createBlock, onAddBlock, channel_id } = this.props
    const { value } = this.state

    this.setState({ mode: 'submitting' })

    return createBlock({
      variables: { channel_id: channel_id.toString(), value },
    })
      .then(response => {
        if (response && response.data) {
          const { block } = response.data.create_block

          this.setState({
            mode: 'resting',
            inputKey: new Date().getTime(),
          })

          return onAddBlock(block)
        }
      })
      .catch(err => {
        console.error(err)
        this.setState({ mode: 'error' })
      })
  }

  handleUpload = ({ url: value }) => {
    const { createBlock, onAddBlock, channel_id } = this.props

    return createBlock({
      variables: { channel_id: channel_id.toString(), value },
    })
      .then(response => {
        if (response && response.data) {
          const { block } = response.data.create_block
          onAddBlock(block)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  finishUpload = () => this.setState({ uploaderKey: new Date().getTime() })

  render() {
    const {
      isElligbleForPremium,
      channel_id,
      onAddBlock,
      createBlock,
    } = this.props
    const { mode, inputKey, uploaderKey } = this.state

    return (
      <>
        <AddBlockPasteUploader
          createBlock={createBlock}
          channelId={channel_id}
          onAddBlock={onAddBlock}
        />
        <DropZoneUploader
          accept="image/*,audio/*,video/*,application/*" // TODO
          onUpload={this.handleUpload}
          onComplete={this.finishUpload}
          key={uploaderKey}
        >
          {({ openUploadDialog }) => (
            <Container pt={6} px={6}>
              {isElligbleForPremium ? (
                <>
                  <AddBlockCTAInner />
                  <Button href="/settings/billing">Register for Premium</Button>
                </>
              ) : (
                <>
                  <AddBlockInner
                    mode={mode}
                    inputKey={inputKey}
                    openUploadDialog={openUploadDialog}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                  />

                  <Button
                    onClick={this.handleSubmit}
                    disabled={mode === 'resting'}
                  >
                    {
                      {
                        resting: 'Add block →',
                        active: 'Add block →',
                        submitting: 'Adding...',
                        error: 'Error',
                      }[mode]
                    }
                  </Button>
                </>
              )}
            </Container>
          )}
        </DropZoneUploader>
      </>
    )
  }
}

const AddBlockContainer: React.FC<Props> = ({
  channel_id,
  onAddBlock,
  isElligbleForPremium,
}) => {
  return (
    <Mutation<CreateBlock, CreateBlockVariables> mutation={createBlockMutation}>
      {createBlock => {
        return (
          <AddBlock
            createBlock={createBlock}
            channel_id={channel_id}
            onAddBlock={onAddBlock}
            isElligbleForPremium={isElligbleForPremium}
          />
        )
      }}
    </Mutation>
  )
}

export default AddBlockContainer
