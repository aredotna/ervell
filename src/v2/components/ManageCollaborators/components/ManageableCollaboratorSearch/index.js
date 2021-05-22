import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'
import compose from 'lodash.flowright'

import CollaboratorSearch from 'v2/components/CollaboratorSearch'

import addChannelMemberMutation from 'v2/components/ManageCollaborators/components/ManageableCollaboratorSearch/mutations/addChannelMember'
import inviteCollaboratorMutation from 'v2/components/ManageCollaborators/components/ManageableCollaboratorSearch/mutations/inviteCollaborator'

class ManageableCollaboratorSearch extends Component {
  static propTypes = {
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    addChannelMember: PropTypes.func.isRequired,
    inviteCollaborator: PropTypes.func.isRequired,
  }

  add = ({ member_type, member_id }) => {
    const { channel_id, addChannelMember } = this.props

    return addChannelMember({
      variables: {
        member_id,
        member_type,
        channel_id,
      },
    })
  }

  invite = ({ email }) => {
    const { channel_id, inviteCollaborator } = this.props

    return inviteCollaborator({
      variables: {
        email,
        channel_id,
      },
    })
  }

  render() {
    return <CollaboratorSearch onAdd={this.add} onInvite={this.invite} />
  }
}

export default compose(
  graphql(addChannelMemberMutation, { name: 'addChannelMember' }),
  graphql(inviteCollaboratorMutation, { name: 'inviteCollaborator' })
)(ManageableCollaboratorSearch)
