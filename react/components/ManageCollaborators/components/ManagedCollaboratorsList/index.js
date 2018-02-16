import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import ManagedCollaborator from 'react/components/ManageCollaborators/components/ManagedCollaborator';
import managedCollaboratorFragment from 'react/components/ManageCollaborators/components/ManagedCollaborator/fragments/managedCollaborator';

export default class ManagedCollaboratorsList extends Component {
  static propTypes = {
    channel_id: PropTypes.number.isRequired,
    collaborators: PropTypes.arrayOf(propType(managedCollaboratorFragment)).isRequired,
  }

  render() {
    const { collaborators, channel_id } = this.props;

    return (
      <div>
        {collaborators.map(collaborator => (
          <ManagedCollaborator
            key={collaborator.id}
            collaborator={collaborator}
            channel_id={channel_id}
          />
        ))}
      </div>
    );
  }
}
