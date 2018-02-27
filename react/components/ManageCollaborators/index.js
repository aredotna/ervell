import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import manageCollaboratorsQuery from 'react/components/ManageCollaborators/queries/manageCollaborators';
import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';

import TitledDialog from 'react/components/UI/TitledDialog';
import ManagedCollaboratorList from 'react/components/ManageCollaborators/components/ManagedCollaboratorList';
import ManageableCollaboratorSearch from 'react/components/ManageCollaborators/components/ManageableCollaboratorSearch';
import GroupCallToAction from 'react/components/ManageCollaborators/components/GroupCallToAction';

class ManageCollaborators extends Component {
  static propTypes = {
    openCreateGroup: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    channel_id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: propType(manageCollaboratorsFragment),
    }).isRequired,
  }

  static defaultProps = {
    openCreateGroup: null,
  }

  render() {
    const {
      channel_id, onClose, openCreateGroup, data: { loading },
    } = this.props;

    if (loading) return <div />;

    const {
      data: {
        channel: {
          counts,
          collaborators,
        },
      },
    } = this.props;

    return (
      <TitledDialog
        title="Edit collaborators"
        onDone={onClose}
      >
        <TitledDialog.Section>
          <TitledDialog.Label>
            Invite
          </TitledDialog.Label>

          <ManageableCollaboratorSearch channel_id={channel_id} />
        </TitledDialog.Section>

        {counts.collaborators > 0 &&
          <TitledDialog.Section>
            <TitledDialog.Label>
              {counts.collaborators} Collaborator{counts.collaborators === 1 ? '' : 's'}
            </TitledDialog.Label>

            <ManagedCollaboratorList
              collaborators={collaborators}
              channel_id={channel_id}
            />
          </TitledDialog.Section>
        }

        {openCreateGroup &&
          <GroupCallToAction onClick={openCreateGroup} />
        }
      </TitledDialog>
    );
  }
}

export default graphql(manageCollaboratorsQuery)(ManageCollaborators);
