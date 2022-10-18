import React, { useCallback, useRef, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { useMutation, useQuery } from '@apollo/client'
import { without } from 'lodash'

import Alert from 'v2/components/UI/Alert'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import Box from 'v2/components/UI/Box'
import TitledDialog from 'v2/components/UI/TitledDialog'
import { LabelledInput, Label, Input, Textarea } from 'v2/components/UI/Inputs'
import CollaboratorSearch from 'v2/components/CollaboratorSearch'
import PendingGroupUsers from 'v2/components/CreateGroup/components/PendingGroupUsers'

import CREATE_GROUP_QUERY from 'v2/components/CreateGroup/queries/createGroup'
import ADD_GROUP_USERS from 'v2/components/CreateGroup/mutations/addGroupUsers'
import INVITE_GROUP_USER from 'v2/components/CreateGroup/mutations/inviteUser'
import CREATE_GROUP_MUTATION from 'v2/components/CreateGroup/mutations/createGroup'
import ADD_CHANNEL_MEMBER_MUTATION from 'v2/components/CreateGroup/mutations/addChannelMember'
import {
  createGroupMutation,
  createGroupMutationVariables,
} from '__generated__/createGroupMutation'
import {
  addGroupUsersMutation,
  addGroupUsersMutationVariables,
} from '__generated__/addGroupUsersMutation'
import {
  inviteUserMutation,
  inviteUserMutationVariables,
} from '__generated__/inviteUserMutation'
import {
  addChannelMemberGroupMutation,
  addChannelMemberGroupMutationVariables,
} from '__generated__/addChannelMemberGroupMutation'
import { CreateGroupModal as CreateGroupModalQuery } from '__generated__/CreateGroupModal'
import { MemberTypes } from '__generated__/globalTypes'

interface CreateGroupProps {
  channel_id?: string
  onClose: () => void
  setHasSeenNewGroupExplanation: () => void
}

type Mode = 'resting' | 'submitting' | 'error'

export const CreateGroupModal: React.FC<CreateGroupProps> = ({
  channel_id,
  onClose,
  setHasSeenNewGroupExplanation,
}) => {
  const { data, loading, error } = useQuery<CreateGroupModalQuery>(
    CREATE_GROUP_QUERY
  )
  const [mode, setMode] = useState<Mode>('resting')
  const [userIds, setUserIds] = useState<string[]>([])

  const label = {
    resting: 'Create Group',
    submitting: 'Saving...',
    error: 'Error',
  }[mode]

  const initialValues = {
    name: '',
    description: '',
  }

  const nameRef = useRef(null)
  const descriptionRef = useRef(null)

  const [createGroup] = useMutation<
    createGroupMutation,
    createGroupMutationVariables
  >(CREATE_GROUP_MUTATION)
  const [addGroupUsers] = useMutation<
    addGroupUsersMutation,
    addGroupUsersMutationVariables
  >(ADD_GROUP_USERS)
  const [inviteGroupUser] = useMutation<
    inviteUserMutation,
    inviteUserMutationVariables
  >(INVITE_GROUP_USER)
  const [addChannelMember] = useMutation<
    addChannelMemberGroupMutation,
    addChannelMemberGroupMutationVariables
  >(ADD_CHANNEL_MEMBER_MUTATION)

  const handleAddUser = useCallback(
    ({ member_id: user_id }) => {
      const newUserIds = new Set([...userIds, user_id])
      setUserIds(Array.from(newUserIds))
    },
    [setUserIds, userIds]
  )

  const handleInviteUser = useCallback(
    ({ email }) => {
      inviteGroupUser({ variables: { email } }).then(({ data }) => {
        const {
          invite_users: { users },
        } = data

        handleAddUser({ member_id: users[0].id })
      })
    },
    [inviteGroupUser, handleAddUser]
  )

  const handleRemoveUserId = useCallback(
    user_id => {
      setUserIds(without(userIds, user_id))
    },
    [userIds, setUserIds]
  )

  const onSubmit = useCallback(
    values => {
      setMode('submitting')

      createGroup({
        variables: {
          name: values.name,
          description: values.description,
        },
      })
        .then(
          ({
            data: {
              create_group: {
                group: { id, href },
              },
            },
          }) => {
            if (userIds.length === 0) return id

            return addGroupUsers({
              variables: { id: id.toString(), user_ids: userIds },
            }).then(() => {
              // If there's no channel context then redirect to the new group
              if (!channel_id) {
                window.location.href = href
                return id
              }

              // Pass along the group id
              return id
            })
          }
        )
        .then(group_id => {
          if (!channel_id) return null

          return addChannelMember({
            variables: {
              channel_id,
              member_id: group_id.toString(),
              member_type: MemberTypes.GROUP,
            },
          })
        })
        .then(onClose)
    },
    [setMode, addGroupUsers, userIds]
  )

  const { form, handleSubmit } = useForm({
    initialValues,
    onSubmit,
  })

  const nameField = useField('name', form)
  const descriptionField = useField('description', form)

  if (!data?.me.id || loading) {
    return <div />
  }

  const {
    me: { has_seen_new_group_explanation },
  } = data

  return (
    <TitledDialog title="New group" label={label} onDone={handleSubmit}>
      <form onSubmit={handleSubmit}>
        <div>
          {!has_seen_new_group_explanation && (
            <Alert mb={6} onClose={setHasSeenNewGroupExplanation}>
              A group is a shared account that many people can use to
              collaborate on Are.na. You can also create a group to transfer and
              separate channels from your personal profile.
              <br />
              <br />
              Once your group is created, you can add that group as a
              collaborator on any channel you have access to.
            </Alert>
          )}
        </div>
        {mode === 'error' && <ErrorAlert>{error.message}</ErrorAlert>}

        <LabelledInput>
          <Label>Name</Label>

          <Input
            placeholder="Enter group name"
            ref={nameRef}
            {...nameField.input}
          />
        </LabelledInput>

        <LabelledInput my={6} alignItems="start">
          <Label>Description</Label>

          <Textarea
            ref={descriptionRef}
            placeholder="Describe your group here"
            rows={4}
            {...descriptionField.input}
          />
        </LabelledInput>

        <LabelledInput>
          <Label>Invite</Label>

          <div>
            <CollaboratorSearch
              types={['USER']}
              onAdd={handleAddUser}
              onInvite={handleInviteUser}
            />

            {userIds.length > 0 && (
              <Box my={6}>
                <PendingGroupUsers
                  user_ids={userIds}
                  onRemove={handleRemoveUserId}
                />
              </Box>
            )}
          </div>
        </LabelledInput>
      </form>
    </TitledDialog>
  )
}

export default CreateGroupModal
