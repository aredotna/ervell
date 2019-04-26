import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { reject, find, findIndex } from 'underscore';

import Messenger from 'extension/src/lib/Messenger';

const TOTAL_BLOCK_LIMIT = 10;

export const ExtensionContext = React.createContext({
  blocks: [],
  selectedChannel: null,
  addBlock: () => {},
  removeBlock: () => {},
  editBlock: () => {},
  getBlock: () => {},
  selectChannel: () => {},
});

class Extension extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    window.addEventListener('message', this.receiveMessage);
    this.messenger = new Messenger(window.top);
  }

  state = {
    blocks: [],
    selectedChannel: null,
  }

  componentDidMount() {
    this.messenger.send({
      action: 'getInitialBlock',
    });
  }

  componentWillUnmount() {
    window.removeEventListener('message');
  }

  getBlock = id => find(this.state.blocks, block => (block.id === id))

  editBlock = (id, values) => {
    const { blocks } = this.state;
    const index = findIndex(blocks, block => (block.id === id));

    const updatedBlock = { ...blocks[index], ...values };

    const updatedBlocks = [
      ...blocks.slice(0, index),
      updatedBlock,
      ...blocks.slice(index + 1),
    ];

    this.setState({ blocks: updatedBlocks });
  }

  addBlock = (block) => {
    // if we are over the limit, don't add any more blocks
    if (this.state.blocks.length >= TOTAL_BLOCK_LIMIT) { return false; }

    this.setState({ blocks: [...this.state.blocks, block] });

    // Route to blocks overview page
    if (this.state.blocks.length > 0) { this.props.history.push('/blocks'); }
    return true;
  }

  receiveMessage = (message) => {
    const { action, value } = message.data;

    switch (action) {
      case 'drop':
        this.addBlock(value);
        break;
      default:
        break;
    }
  }


  removeBlock = (id) => {
    const blocks = reject(this.state.blocks, block => (block.id === id));
    this.setState({ blocks });

    // Route to blocks overview page
    if (blocks.length === 0) {
      this.props.history.push('/index.html');
      this.messenger.send({
        action: 'contract',
      });
    }
  }

  selectChannel = (channel) => {
    console.log('selectChannel', channel);
    this.setState({
      selectedChannel: channel,
    });
  }

  render() {
    const { blocks, selectedChannel } = this.state;
    const { children } = this.props;
    const {
      addBlock, removeBlock, editBlock, getBlock, selectChannel,
    } = this;

    return (
      <ExtensionContext.Provider value={{
        blocks, selectedChannel, addBlock, removeBlock, editBlock, getBlock, selectChannel,
      }}
      >
        {children}
      </ExtensionContext.Provider>
    );
  }
}

export default withRouter(Extension);
