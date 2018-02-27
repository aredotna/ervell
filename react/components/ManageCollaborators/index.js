import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import manageCollaboratorsQuery from 'react/components/ManageCollaborators/queries/manageCollaborators';
import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';
import removeChannelMemberMutation from 'react/components/ManageCollaborators/mutations/removeChannelMember';

import TitledDialog from 'react/components/UI/TitledDialog';
import ManagedMembers from 'react/components/ManagedMembers';
import ManageableCollaboratorSearch from 'react/components/ManageCollaborators/components/ManageableCollaboratorSearch';
import GroupCallToAction from 'react/components/ManageCollaborators/components/GroupCallToAction';

class ManageCollaborators extends Component {
  static propTypes = {
    openCreateGroup: PropTypes.func,
    removeChannelMember: PropTypes.func.isRequired,
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

  removeCollaborator = ({ member_id, member_type }) => {
    const { removeChannelMember, channel_id } = this.props;

    return removeChannelMember({
      variables: {
        member_id,
        member_type,
        channel_id,
      },
    });
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

            <ManagedMembers
              members={collaborators}
              onRemove={this.removeCollaborator}
              confirmationWarning="Are you sure?"
              confirmationSelfWarning="You will lose access to this channel."
            />
          </TitledDialog.Section>
        }

        {openCreateGroup && counts.collaborators < 2 &&
          <GroupCallToAction onClick={openCreateGroup} />
        }
      </TitledDialog>
    );
  }
}

export default compose(
  graphql(manageCollaboratorsQuery),
  graphql(removeChannelMemberMutation, { name: 'removeChannelMember' }),
)(ManageCollaborators);
