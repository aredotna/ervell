import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import removeCreditCardMutation from 'react/components/Billing/components/MyCreditCard/components/ManageMyCreditCards/components/RemoveCard/mutations/removeCreditCard';

class RemoveCard extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    removeCreditCard: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { id, removeCreditCard } = this.props;

    this.setState({ mode: 'removing' });

    removeCreditCard({ variables: { id } })
      .catch((err) => {
        console.error(err);
        this.setState({ mode: 'error' });
      });
  }

  render() {
    const { mode } = this.state;

    return (
      <a
        onClick={this.handleClick}
        role="button"
        tabIndex={0}
        disabled={mode !== 'resting'}
      >
        {{
          resting: 'Remove card',
          removing: 'Removing...',
          error: 'Error',
        }[mode]}
      </a>
    );
  }
}

export default graphql(removeCreditCardMutation, {
  name: 'removeCreditCard',
})(RemoveCard);
