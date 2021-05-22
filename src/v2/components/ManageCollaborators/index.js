import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import compose from 'lodash.flowright'

import manageCollaboratorsQuery from 'v2/components/ManageCollaborators/queries/manageCollaborators'
import manageCollaboratorsFragment from 'v2/components/ManageCollaborators/fragments/manageCollaborators'
import removeChannelMemberMutation from 'v2/components/ManageCollaborators/mutations/removeChannelMember'

import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import TitledDialog from 'v2/components/UI/TitledDialog'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import ManagedMembers from 'v2/components/ManagedMembers'
import ManageableCollaboratorSearch from 'v2/components/ManageCollaborators/components/ManageableCollaboratorSearch'
import GroupCallToAction from 'v2/components/ManageCollaborators/components/GroupCallToAction'
import { LabelledInput, Label } from 'v2/components/UI/Inputs'

class ManageCollaborators extends Component {
  static propTypes = {
    openCreateGroup: PropTypes.func,
    removeChannelMember: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: propType(manageCollaboratorsFragment),
    }).isRequired,
  }

  static defaultProps = {
    openCreateGroup: null,
  }

  removeCollaborator = ({ member_id, member_type }) => {
    const { removeChannelMember, channel_id } = this.props

    return removeChannelMember({
      variables: {
        member_id,
        member_type,
        channel_id,
      },
    })
  }

  render() {
    const {
      channel_id,
      onClose,
      openCreateGroup,
      data: { loading, error },
    } = this.props

    if (loading) return <LoadingIndicator />
    if (error) {
      return <ErrorAlert m={6}>{error.message}</ErrorAlert>
    }

    const {
      data: {
        channel: { counts, memberships },
      },
    } = this.props

    return (
      <TitledDialog title="Edit collaborators" onDone={onClose}>
        <LabelledInput>
          <Label>Invite</Label>

          <ManageableCollaboratorSearch channel_id={channel_id} />
        </LabelledInput>

        {counts.collaborators > 0 && (
          <LabelledInput>
            <Label>Collaborators</Label>

            <ManagedMembers
              memberships={memberships}
              onRemove={this.removeCollaborator}
              confirmationWarning="Are you sure?"
              confirmationSelfWarning="You will lose access to this channel."
            />
          </LabelledInput>
        )}

        {openCreateGroup && counts.collaborators < 2 && (
          <GroupCallToAction onClick={openCreateGroup} />
        )}
      </TitledDialog>
    )
  }
}

export default compose(
  graphql(manageCollaboratorsQuery),
  graphql(removeChannelMemberMutation, { name: 'removeChannelMember' })
)(ManageCollaborators)
