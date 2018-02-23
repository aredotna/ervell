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

  add = ({ member_type, member_id, channel_id }) =>
    this.props.addChannelMember({
      variables: {
        member_id,
        member_type,
        channel_id,
      },
    });

  invite = ({ email, channel_id }) =>
    this.props.inviteCollaborator({
      variables: {
        email,
        channel_id,
      },
    });

  render() {
    const { channel_id } = this.props;

    return (
      <CollaboratorSearch
        onAdd={this.add}
        onInvite={this.invite}
        channel_id={channel_id}
      />
    );
  }
}

export default compose(
  graphql(addChannelMemberMutation, { name: 'addChannelMember' }),
  graphql(inviteCollaboratorMutation, { name: 'inviteCollaborator' }),
)(ManageableCollaboratorSearch);
