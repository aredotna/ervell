import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import addCollaboratorMutation from 'react/components/CollaboratorSearch/components/CollaboratorAddButton/mutations/addCollaborator';

class CollaboratorAddButton extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    channel_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  addCollaborator = () => {
    const {
      user_id, channel_id, mutate, onAdd,
    } = this.props;

    this.setState({ mode: 'adding' });

    return mutate({
      variables: {
        user_id,
        channel_id,
      },
    })
      .then(onAdd)
      .catch(() => this.setState({ mode: 'error' }));
  }

  render() {
    const { mode } = this.state;

    return (
      <button
        className="Button Button--size-xs"
        onClick={this.addCollaborator}
      >
        {{
          resting: 'Add',
          adding: 'Adding...',
          error: 'Error',
        }[mode]}
      </button>
    );
  }
}

export default graphql(addCollaboratorMutation)(CollaboratorAddButton);
