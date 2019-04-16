import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import Messenger from 'extension/src/lib/Messenger';

export const ExtensionContext = React.createContext({
  blocks: [],
  addBlock: () => {},
  removeBlock: () => {},
  editBlock: () => {},
});

class Extension extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
    window.addEventListener('message', this.receiveMessage);
    this.messenger = new Messenger(window.top);
  }

  state = {
    blocks: [],
    addBlock: this.addBlock,
    removeBlock: () => {},
    editBlock: () => {},
  }

  componentDidMount() {
    this.messenger.send({
      action: 'getInitialBlock',
    });
  }

  componentWillUnmount() {
    window.removeEventListener('message');
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

  addBlock = (block) => {
    this.setState({ blocks: [...this.state.blocks, block] });

    // Route to blocks overview page
    if (this.state.blocks.length > 0) { this.props.history.push('/blocks'); }
  }

  render() {
    const {
      blocks, addBlock, removeBlock, editBlock,
    } = this.state;

    const { children } = this.props;

    return (
      <ExtensionContext.Provider value={{
        blocks, addBlock, removeBlock, editBlock,
      }}
      >
        {children}
      </ExtensionContext.Provider>
    );
  }
}

export default withRouter(Extension);
