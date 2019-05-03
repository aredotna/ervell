import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import { FilledButton } from 'v2/components/UI/Buttons'
import { Textarea } from 'v2/components/UI/Inputs'
import DropZoneUploader from 'v2/components/UI/DropZoneUploader'

import createBlockMutation from 'v2/components/AddBlock/mutations/createBlock'

const Button = styled(FilledButton)`
  &:hover {
    background-color: transparent;
  }
`

const Choose = styled(Link)`
  position: relative;
  border-bottom: 1px solid;
  z-index: 1;
  cursor: pointer;
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

const Tip = styled(Box)`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  user-select: none;
`

const Input = styled(Textarea).attrs({
  resize: 'none',
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

  &:focus {
    border: 0;
    background-color: ${props => props.theme.colors.gray.light};
    z-index: 2;
  }
`

const Message = styled(Box)`
  ${Text}:last-child {
    display: none;
  }
`

const Content = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;

  &:hover {
    background-color: ${props => props.theme.colors.gray.light};

    ${Message} {
      ${Text}:first-child {
        display: none;
      }

      ${Text}:last-child {
        display: block;
      }
    }
  }
`

interface Props {
  channel_id: string | number
  onAddBlock: (props: any) => any
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
            <Content>
              <Message p={6}>
                <Text f={9} color="gray.medium">
                  +
                </Text>

                <Text f={5} color="gray.medium">
                  Drop or <Choose onClick={openUploadDialog}>choose</Choose>{' '}
                  files, paste a URL (image, video, or link) or type text here
                </Text>
              </Message>

              <Input
                key={inputKey}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />

              {mode === 'active' && (
                <Tip pb={4}>
                  <Text f={0} color="gray.medium">
                    shift + enter for line break
                  </Text>
                </Tip>
              )}
            </Content>

            <Button
              py={6}
              f={4}
              color="utility.transparent"
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
          </Container>
        )}
      </DropZoneUploader>
    )
  }
}

export default graphql<Props>(createBlockMutation, {
  name: 'createBlock',
})(AddBlock)
