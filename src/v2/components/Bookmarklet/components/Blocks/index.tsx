/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from '@apollo/client/react/hoc'
import { MutationFunction } from '@apollo/client'
import { omit } from 'underscore'

import Layout from 'v2/components/Bookmarklet/components/Layout'
import PaneMessenger from 'lib/PaneMessenger'
import withExtensionContext, {
  ExtensionContextProps,
} from 'v2/components/Bookmarklet/components/Extension/withExtension'

import Box from 'v2/components/UI/Box'
import Count from 'v2/components/UI/Count'

import DividerButton from 'v2/components/UI/Buttons/components/DividerButton'

import Block from 'v2/components/Bookmarklet/components/Blocks/components/Block'
import { ConnectionSelectionList } from 'v2/components/ConnectionSelectionList'
import { ConnectCTA } from 'v2/components/Bookmarklet/components/Blocks/components/ConnectCTA'

import createBlockMutation from 'v2/components/Bookmarklet/components/Blocks/mutations/createBlock'
import CurrentPageInfo from 'v2/components/Bookmarklet/components/Blocks/components/CurrentPageInfo'
import { SelectableChannel } from '__generated__/SelectableChannel'

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  width: 100%;
  justify-content: space-between;
`

const Section = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
`

const BlocksContainer = styled(Box)`
  display: flex;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;

  ${props =>
    props.isEmpty &&
    `
    background-color: ${props.theme.colors.gray.hint};
  `}
`

const Bottom = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`

const ConnectContainer = styled(Box)`
  position: relative;
`

interface BlocksProps {
  context: ExtensionContextProps
  query: any
  isSafari: boolean
  createBlock: MutationFunction
}

class Blocks extends Component<BlocksProps> {
  messenger = null
  layoutRef = null

  constructor(props) {
    super(props)
    this.messenger = new PaneMessenger(window.top)
    this.layoutRef = React.createRef()
    window.addEventListener('message', this.receiveMessage)
  }

  state = {
    mode: 'resting',
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage)
  }

  receiveMessage = message => {
    const { action } = message.data

    switch (action) {
      case 'saveCurrentPage':
        this.savePageAsLink()
        break
      default:
        break
    }
  }

  handleConnectionSelect = (
    isSelected: boolean,
    channel: SelectableChannel
  ) => {
    const {
      context: { selectChannel, unselectChannel },
    } = this.props

    if (isSelected) {
      selectChannel(channel)
    } else {
      unselectChannel(channel)
    }
  }

  savePageAsLink = () => {
    const {
      context: { selectedChannels, currentPage },
      createBlock,
    } = this.props

    this.setState({ mode: 'saving' })

    const values = {
      value: currentPage.url,
      channel_ids: selectedChannels.map(c => c.id),
    }

    createBlock({
      variables: values,
    }).then(() => {
      this.setState({ mode: 'closing' })

      this.messenger.send({
        action: 'close',
      })
    })
  }

  saveAndClose = () => {
    const {
      createBlock,
      context: { block, selectedChannels },
    } = this.props

    // If no channels are selected, go ahead and close
    if (selectedChannels.length === 0) {
      this.setState({ mode: 'closing' })

      return this.messenger.send({
        action: 'close',
      })
    }

    // if there is no block, go ahead and save the current page.
    if (!block) {
      return this.savePageAsLink()
    }

    // Now if we're all good, start the saving process
    this.setState({ mode: 'saving' })

    const values = {
      ...omit(block, 'id', 'type'),
      channel_ids: selectedChannels.map(c => c.id),
    }

    return createBlock({
      variables: values,
    }).then(() => {
      this.setState({ mode: 'closing' })

      this.messenger.send({
        action: 'close',
      })
    })
  }

  onKeyDown = () => {}

  render() {
    const {
      block,
      removeBlock,
      selectedChannels,
      currentPage,
    } = this.props.context
    const { isSafari } = this.props
    const { mode } = this.state

    return (
      <Layout isSafari={isSafari}>
        <Container>
          <Section mb={5}>
            {!block && currentPage && (
              <BlocksContainer isEmpty>
                <CurrentPageInfo
                  currentPage={currentPage}
                  isSafari={isSafari}
                />
              </BlocksContainer>
            )}
            {block && (
              <BlocksContainer>
                <Block block={block} key={block.id} removeBlock={removeBlock} />
              </BlocksContainer>
            )}
          </Section>

          <Section mb={4} flex={1}>
            <ConnectContainer flex={1}>
              <ConnectCTA />

              <ConnectionSelectionList
                onConnectionSelection={this.handleConnectionSelect}
                selectedChannels={selectedChannels}
              />
            </ConnectContainer>
          </Section>

          <Bottom>
            <DividerButton f={4} mt={4} onClick={this.saveAndClose}>
              {mode === 'resting' && selectedChannels.length > 0 && (
                <span>
                  Save to&nbsp;
                  <Count label="channel" amount={selectedChannels.length} />
                  &nbsp;→
                </span>
              )}

              {mode === 'resting' && selectedChannels.length === 0 && (
                <span>Cancel</span>
              )}

              {mode !== 'resting' &&
                {
                  saving: 'Saving...',
                  closing: 'Closing...',
                  error: 'Error',
                }[mode]}
            </DividerButton>
          </Bottom>
        </Container>
      </Layout>
    )
  }
}

export default withExtensionContext(
  graphql<{ createBlock }>(createBlockMutation, { name: 'createBlock' })(Blocks)
)
