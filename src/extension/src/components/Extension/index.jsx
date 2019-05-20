import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { find, without } from 'underscore'

import Messenger from 'extension/src/lib/Messenger'

export const ExtensionContext = React.createContext({
  block: null,
  selectedChannels: [],
  currentPage: null,
  addBlock: () => {},
  removeBlock: () => {},
  editBlock: () => {},
  getBlock: () => {},
  selectChannel: () => {},
  getChannel: () => {},
  unselectChannel: () => {},
})

class Extension extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    window.addEventListener('message', this.receiveMessage)
    this.messenger = new Messenger(window.top)
  }

  state = {
    block: null,
    selectedChannels: [],
    currentPage: null,
  }

  componentDidMount() {
    this.messenger.send({
      action: 'getCurrentPage',
    })

    this.messenger.send({
      action: 'getInitialBlock',
    })
  }

  componentWillUnmount() {
    window.removeEventListener('message')
  }

  editBlock = values => {
    const { block } = this.state

    const updatedBlock = { ...block, ...values }

    this.setState({ block: updatedBlock })
  }

  addBlock = block => {
    this.setState({ block: block })
  }

  getChannel = id => find(this.state.selectedChannels, id)

  receiveMessage = message => {
    const { action, value } = message.data

    switch (action) {
      case 'drop':
        this.addBlock(value)
        break
      case 'currentPage':
        this.setState({ currentPage: value })
        break
      default:
        break
    }
  }

  selectChannel = channelId => {
    this.setState({
      selectedChannels: [...this.state.selectedChannels, channelId],
    })
  }

  unselectChannel = channelId => {
    const selectedChannels = without(this.state.selectedChannels, channelId)
    this.setState({ selectedChannels })
  }

  render() {
    const { block, selectedChannels, currentPage } = this.state
    const { children } = this.props
    const { addBlock, editBlock, selectChannel, unselectChannel } = this

    return (
      <ExtensionContext.Provider
        value={{
          block,
          selectedChannels,
          addBlock,
          editBlock,
          selectChannel,
          unselectChannel,
          currentPage,
        }}
      >
        {children}
      </ExtensionContext.Provider>
    )
  }
}

export default withRouter(Extension)
