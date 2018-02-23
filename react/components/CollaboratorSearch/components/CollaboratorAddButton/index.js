import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CollaboratorAddButton extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    channel_id: PropTypes.number.isRequired,
    member_id: PropTypes.number.isRequired,
    member_type: PropTypes.string.isRequired,
  }

  state = {
    mode: 'resting',
  }

  addCollaborator = () => {
    const {
      member_id, member_type, channel_id, onAdd,
    } = this.props;

    this.setState({ mode: 'adding' });

    return onAdd({ member_id, member_type, channel_id })
      .catch(() => this.setState({ mode: 'error' }));
  }

  render() {
    const { mode } = this.state;

    return (
      <button
        type="button"
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
