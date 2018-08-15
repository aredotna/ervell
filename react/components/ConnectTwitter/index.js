import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import TitledDialog from 'react/components/UI/TitledDialog';

export default class ConnectTwitter extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  render() {
    const { mode } = this.state;

    return (
      <TitledDialog
        title="Find friends"
        label={{
          resting: 'Done',
        }[mode]}
        onDone={this.handleSubmit}
      >
        <h1>hI!</h1>
      </TitledDialog>
    );
  }
}
