import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';

import manageCollaboratorsQuery from 'react/components/ManageCollaborators/queries/manageCollaborators';
import manageCollaboratorsFragment from 'react/components/ManageCollaborators/fragments/manageCollaborators';
import removeChannelMemberMutation from 'react/components/ManageCollaborators/mutations/removeChannelMember';

import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import TitledDialog from 'react/components/UI/TitledDialog';
import ManagedMembers from 'react/components/ManagedMembers';
import ManageableCollaboratorSearch from 'react/components/ManageCollaborators/components/ManageableCollaboratorSearch';
import GroupCallToAction from 'react/components/ManageCollaborators/components/GroupCallToAction';
import { LabelledInput, Label } from 'react/components/UI/Inputs';

class ManageCollaborators extends Component {
  static propTypes = {
    openCreateGroup: PropTypes.func,
    removeChannelMember: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    channel_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
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

    if (loading) return <LoadingIndicator />;

    const {
      data: {
        channel: {
          counts,
          memberships,
        },
      },
    } = this.props;

    return (
      <TitledDialog
        title="Edit collaborators"
        onDone={onClose}
      >
        <LabelledInput>
          <Label>
            Invite
          </Label>

          <ManageableCollaboratorSearch channel_id={channel_id} />
        </LabelledInput>

        {counts.collaborators > 0 &&
          <LabelledInput>
            <Label>
              Collaborators
            </Label>

            <ManagedMembers
              memberships={memberships}
              onRemove={this.removeCollaborator}
              confirmationWarning="Are you sure?"
              confirmationSelfWarning="You will lose access to this channel."
            />
          </LabelledInput>
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
