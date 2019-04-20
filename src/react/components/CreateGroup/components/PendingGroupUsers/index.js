import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PendingGroupUser from 'react/components/CreateGroup/components/PendingGroupUser';

export default class PendingGroupUsers extends Component {
  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    user_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  render() {
    const { user_ids, onRemove } = this.props;

    return (
      <div>
        {user_ids.map(id => (
          <PendingGroupUser
            key={id}
            id={id}
            onRemove={onRemove}
          />
        ))}
      </div>
    );
  }
}
