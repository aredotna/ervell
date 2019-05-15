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
// import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'
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

  componentDidMount() {
    const {
      context: { setPageUrl },
      query,
    } = this.props
    if (query && query.original_source_url) {
      setPageUrl(query.original_source_url)
    }
  }

  componentDidUpdate() {
    const {
      context: { blocks },
    } = this.props

    if (blocks.length > 0) {
      this.messenger.send({
        action: 'expand',
      })
    }
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
      context: { selectedChannel, pageUrl },
      createBlock,
    } = this.props

    this.setState({ mode: 'saving' })

    const values = { value: pageUrl, channel_id: selectedChannel.id }

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
      context: { blocks, selectedChannels },
    } = this.props

    this.setState({ mode: 'saving' })

    Promise.all(
      blocks.map(block => {
        const values = {
          ...omit(block, 'id', 'type'),
          channel_ids: selectedChannels,
        }

        return createBlock({
          variables: values,
        })
      })
    ).then(() => {
      this.setState({ mode: 'closing' })

      this.messenger.send({
        action: 'close',
      })
    })
  }

  onKeyDown = () => {}

  render() {
    const { blocks, removeBlock, selectedChannels } = this.props.context
    const { mode } = this.state

    return (
      <Layout tabIndex={0} onKeyDown={this.onKeyDown}>
        <Container>
          <Section mb={4}>
            <BlocksContainer isEmpty={blocks.length === 0}>
              {blocks.map(block => (
                <Block block={block} key={block.id} removeBlock={removeBlock} />
              ))}
            </BlocksContainer>
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
              {mode === 'resting' && (
                <span>
                  Save to&nbsp;
                  <Count label="channel" amount={selectedChannels.length} />
                  &nbsp;→
                </span>
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
