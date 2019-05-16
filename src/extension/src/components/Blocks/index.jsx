/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { omit } from 'underscore'

import Layout from 'extension/src/components/Layout'
import Messenger from 'extension/src/lib/Messenger'
import withExtensionContext from 'extension/src/components/Extension/withExtension'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { truncate } from 'v2/components/UI/Truncate'
import Count from 'v2/components/UI/Count'

import DividerButton from 'v2/components/UI/Buttons/components/DividerButton'

import Block from 'extension/src/components/Blocks/components/Block'
import ConnectionSelectionList from 'v2/components/ConnectionSelectionList'

import createBlockMutation from 'extension/src/components/Blocks/mutations/createBlock'

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

const CurrentPage = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const Bottom = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`

class Blocks extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    createBlock: PropTypes.func.isRequired,
    query: PropTypes.object,
  }

  static defaultProps = {
    query: null,
  }

  messenger = null
  layoutRef = null

  constructor(props) {
    super(props)
    this.messenger = new Messenger(window.top)
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

  handleConnectionSelect = (isSelected, channelId) => {
    const {
      context: { selectChannel, unselectChannel },
    } = this.props

    if (isSelected) {
      selectChannel(channelId)
    } else {
      unselectChannel(channelId)
    }
  }

  savePageAsLink = () => {
    const {
      context: { selectedChannels, currentPage },
      createBlock,
    } = this.props

    this.setState({ mode: 'saving' })

    const values = { value: currentPage.url, channel_ids: selectedChannels }

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
      channel_ids: selectedChannels,
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
    const { mode } = this.state

    return (
      <Layout>
        <Container>
          <Section mb={5}>
            {!block && currentPage && (
              <BlocksContainer isEmpty>
                <CurrentPage>
                  <Text f={4}>Save</Text>
                  <Text f={4}>
                    &quot;
                    <span
                      dangerouslySetInnerHTML={{
                        __html: unescape(truncate(currentPage.title, 40)),
                      }}
                    />
                    &quot;
                  </Text>

                  <Text f={4}>as a link</Text>

                  <Text
                    f={1}
                    my={7}
                    font="mono"
                    color="gray.semiBold"
                    breakWord
                  >
                    <u>{unescape(truncate(currentPage.url, 40))}</u>
                  </Text>

                  <Text f={2} mt={7}>
                    (You can also drag text or images here)
                  </Text>
                </CurrentPage>
              </BlocksContainer>
            )}
            {block && (
              <BlocksContainer>
                <Block block={block} key={block.id} removeBlock={removeBlock} />
              </BlocksContainer>
            )}
          </Section>

          <Section mb={4} flex={1}>
            <Box flex={1}>
              <ConnectionSelectionList
                onConnectionSelection={this.handleConnectionSelect}
              />
            </Box>
          </Section>

          <Bottom>
            <DividerButton f={4} my={4} onClick={this.saveAndClose}>
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
  graphql(createBlockMutation, { name: 'createBlock' })(Blocks)
)
