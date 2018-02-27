import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import CollaboratorSearch from 'react/components/CollaboratorSearch';

import addChannelMemberMutation from 'react/components/ManageCollaborators/components/ManageableCollaboratorSearch/mutations/addChannelMember';
import inviteCollaboratorMutation from 'react/components/ManageCollaborators/components/ManageableCollaboratorSearch/mutations/inviteCollaborator';

class ManageableCollaboratorSearch extends Component {
  static propTypes = {
    channel_id: PropTypes.number.isRequired,
    addChannelMember: PropTypes.func.isRequired,
    inviteCollaborator: PropTypes.func.isRequired,
  }

  add = ({ member_type, member_id }) => {
    const { channel_id, addChannelMember } = this.props;

    return addChannelMember({
      variables: {
        member_id,
        member_type,
        channel_id,
      },
    });
  }

  invite = ({ email }) => {
    const { channel_id, inviteCollaborator } = this.props;

    return inviteCollaborator({
      variables: {
        email,
        channel_id,
      },
    });
  }

  render() {
    return (
      <CollaboratorSearch
        onAdd={this.add}
        onInvite={this.invite}
      />
    );
  }
}

export default compose(
  graphql(addChannelMemberMutation, { name: 'addChannelMember' }),
  graphql(inviteCollaboratorMutation, { name: 'inviteCollaborator' }),
)(ManageableCollaboratorSearch);
