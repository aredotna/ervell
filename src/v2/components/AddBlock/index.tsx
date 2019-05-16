import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'

import Box from 'v2/components/UI/Box'
import { FilledButton } from 'v2/components/UI/Buttons'
import DropZoneUploader from 'v2/components/UI/DropZoneUploader'
import { AddBlockInner } from 'v2/components/AddBlock/components/AddBlockInner'
import { AddBlockPrivateCTAInner } from 'v2/components/AddBlock/components/AddBlockPrivateCTAInner'

import createBlockMutation from 'v2/components/AddBlock/mutations/createBlock'

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
  onAddBlock: (props: any) => any
  isElligbleForPremium: boolean
}

interface AddBlockProps extends Props {
  createBlock: (props: any) => Promise<any>
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
      variables: { channel_id, value },
    })
      .then(({ data: { create_block: { block } } }) => {
        this.setState({
          mode: 'resting',
          inputKey: new Date().getTime(),
        })

        return onAddBlock(block)
      })
      .catch(err => {
        console.error(err)
        this.setState({ mode: 'error' })
      })
  }

  handleUpload = ({ url: value }) => {
    const { createBlock, onAddBlock, channel_id } = this.props

    return createBlock({
      variables: { channel_id, value },
    })
      .then(({ data: { create_block: { block } } }) => onAddBlock(block))
      .catch(err => {
        console.error(err)
      })
  }

  finishUpload = () => this.setState({ uploaderKey: new Date().getTime() })

  render() {
    const { isElligbleForPremium } = this.props
    const { mode, inputKey, uploaderKey } = this.state

    return (
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
                <AddBlockPrivateCTAInner />
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
    )
  }
}

export default graphql<Props>(createBlockMutation, {
  name: 'createBlock',
})(AddBlock)
