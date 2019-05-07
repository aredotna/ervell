/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { omit } from 'underscore'

import Layout from 'extension/src/components/Layout'
import Messenger from 'extension/src/lib/Messenger'
import withExtensionContext from 'extension/src/components/Extension/withExtension'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'
import Count from 'v2/components/UI/Count'

import Block from 'extension/src/components/Blocks/components/Block'
import SelectedChannel from 'extension/src/components/Blocks/components/SelectedChannel'

import createBlockMutation from 'extension/src/components/Blocks/mutations/createBlock'

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  position: relative;
  width: 100%;
`

const Top = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const DropZone = styled(Box).attrs({ p: 7, mt: 10 })`
  border: 2px dashed ${x => x.theme.colors.gray.semiLight};
`

const BlocksContainer = styled(Box).attrs({ mt: 7 })`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
`

const Bottom = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
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
      context: { blocks, selectedChannel },
    } = this.props

    this.setState({ mode: 'saving' })

    Promise.all(
      blocks.map(block => {
        const values = {
          ...omit(block, 'id', 'type'),
          channel_id: selectedChannel.id,
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

  render() {
    const { blocks, removeBlock, selectedChannel } = this.props.context
    const { mode } = this.state

    return (
      <Layout tabIndex={0} onKeyDown={this.onKeyDown}>
        <Container>
          <Top>
            <DropZone>
              <Text f={5}>Drop text, links or images here.</Text>
            </DropZone>
            {!blocks.length && (
              <Box mt={3} align="center">
                <Text f={3}>or</Text>
                <Button
                  f={4}
                  my={2}
                  onClick={this.savePageAsLink}
                  disabled={!selectedChannel}
                >
                  {
                    {
                      resting: 'Save page as link',
                      saving: 'Saving...',
                      closing: 'Closing...',
                      error: 'Error',
                    }[mode]
                  }
                </Button>
                <Text f={2} pl={4} color="gray.regular">
                  ⌘ + shift + s
                </Text>
              </Box>
            )}
            <BlocksContainer>
              {blocks.map(block => (
                <Block block={block} key={block.id} removeBlock={removeBlock} />
              ))}
            </BlocksContainer>
          </Top>

          <Bottom>
            <SelectedChannel />

            {blocks.length > 0 && (
              <Button f={4} my={4} onClick={this.saveAndClose}>
                {mode === 'resting' && (
                  <span>
                    Connect&nbsp;
                    <Count label="block" amount={blocks.length} />
                    &nbsp;→
                  </span>
                )}

                {mode !== 'resting' &&
                  {
                    saving: 'Saving...',
                    closing: 'Closing...',
                    error: 'Error',
                  }[mode]}
              </Button>
            )}
          </Bottom>
        </Container>
      </Layout>
    )
  }
}

export default withExtensionContext(
  graphql(createBlockMutation, { name: 'createBlock' })(Blocks)
)
