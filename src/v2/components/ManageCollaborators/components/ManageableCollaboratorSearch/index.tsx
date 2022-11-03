import React from 'react'
import { useMutation } from '@apollo/client'

import CollaboratorSearch from 'v2/components/CollaboratorSearch'

import addChannelMemberMutation from 'v2/components/ManageCollaborators/components/ManageableCollaboratorSearch/mutations/addChannelMember'
import inviteCollaboratorMutation from 'v2/components/ManageCollaborators/components/ManageableCollaboratorSearch/mutations/inviteCollaborator'
import {
  addChannelMemberMutation as addChannelMemberMutationType,
  addChannelMemberMutationVariables,
} from '__generated__/addChannelMemberMutation'
import {
  inviteCollaborator,
  inviteCollaboratorVariables,
} from '__generated__/inviteCollaborator'

interface ManageableCollaboratorSearchProps {
  channel_id: string
}

const ManageableCollaboratorSearch: React.FC<ManageableCollaboratorSearchProps> = ({
  channel_id,
}) => {
  const [addChannelMember] = useMutation<
    addChannelMemberMutationType,
    addChannelMemberMutationVariables
  >(addChannelMemberMutation)
  const [inviteCollaborator] = useMutation<
    inviteCollaborator,
    inviteCollaboratorVariables
  >(inviteCollaboratorMutation)

  const add = ({ member_type, member_id }) => {
    return addChannelMember({
      variables: {
        member_id,
        member_type,
        channel_id,
      },
    })
  }

  const invite = ({ email }) => {
    return inviteCollaborator({
      variables: {
        email,
        channel_id,
      },
    })
  }

  return <CollaboratorSearch onAdd={add} onInvite={invite} />
}

export default ManageableCollaboratorSearch
