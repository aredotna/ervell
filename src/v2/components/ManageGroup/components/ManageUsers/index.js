import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { gql } from '@apollo/client'
import compose from 'lodash.flowright'

import manageUsersFragment from 'v2/components/ManageGroup/components/ManageUsers/fragments/manageUsers'

import manageCollaboratorsQuery from 'v2/components/ManageCollaborators/queries/manageCollaborators'

import addGroupUserMutation from 'v2/components/ManageGroup/components/ManageUsers/mutations/addGroupUser'
import removeGroupUserMutation from 'v2/components/ManageGroup/components/ManageUsers/mutations/removeGroupUser'
import inviteGroupUserMutation from 'v2/components/ManageGroup/components/ManageUsers/mutations/inviteGroupUser'

import Box from 'v2/components/UI/Box'
import CollaboratorSearch from 'v2/components/CollaboratorSearch'
import ManagedMembers from 'v2/components/ManagedMembers'

import profileGroupUserListFragment from 'v2/components/ProfileMetadata/components/ProfileGroupUserList/fragments/profileGroupUserList'

class ManageUsers extends Component {
  static propTypes = {
    group: propType(manageUsersFragment).isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    addGroupUser: PropTypes.func.isRequired,
    removeGroupUser: PropTypes.func.isRequired,
    inviteGroupUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    channel_id: null,
  }

  getRefetchQueries = () => {
    const { group, channel_id } = this.props

    if (channel_id) {
      return [
        {
          query: manageCollaboratorsQuery,
          variables: { channel_id },
        },
      ]
    }

    return [
      {
        query: gql`
        query ManageUsersQuery {
          identity(id: "${group.id}") {
            identifiable {
              ...ProfileGroupUserList
            }
          }
        }
        ${profileGroupUserListFragment}
      `,
      },
    ]
  }

  handleAddUser = ({ member_id: user_id }) => {
    const { addGroupUser, group } = this.props

    const variables = { id: group.id, user_id }
    const refetchQueries = this.getRefetchQueries()

    return addGroupUser({
      variables,
      refetchQueries,
    })
  }

  handleRemoveUser = ({ member_id: user_id }) => {
    const { removeGroupUser, group } = this.props

    const variables = { id: group.id, user_id }
    const refetchQueries = this.getRefetchQueries()

    return removeGroupUser({
      variables,
      refetchQueries,
    })
  }

  handleInviteUser = ({ email }) => {
    const { inviteGroupUser, group } = this.props

    const variables = { id: group.id, email }
    const refetchQueries = this.getRefetchQueries()

    return inviteGroupUser({
      variables,
      refetchQueries,
    })
  }

  render() {
    const {
      group: { name, owner, memberships },
    } = this.props

    return (
      <div>
        <CollaboratorSearch
          types={['USER']}
          onAdd={this.handleAddUser}
          onInvite={this.handleInviteUser}
        />

        <Box my={6}>
          <ManagedMembers
            owner={owner}
            memberships={memberships}
            onRemove={this.handleRemoveUser}
            confirmationWarning="Are you sure?"
            confirmationSelfWarning={`
              Removing yourself from ${name} means you will
              lose access to all channels ${name} is collaborating on.
              There is no way to undo this action, and only the group’s
              creator can re-add you.
            `}
          />
        </Box>
      </div>
    )
  }
}

export default compose(
  graphql(addGroupUserMutation, { name: 'addGroupUser' }),
  graphql(removeGroupUserMutation, { name: 'removeGroupUser' }),
  graphql(inviteGroupUserMutation, { name: 'inviteGroupUser' })
)(ManageUsers)
